import { Component, Prop, Vue, Watch, InjectReactive } from 'vue-property-decorator';
import G6, { Util } from '@antv/g6';
import { common } from '@/utils';
import registerTreeNode from './registerTreeNode';
import registerTreeEdge from './registerTreeEdge';
import { addResizeListener, removeResizeListener } from '@/components/RSrc/utils/resize-event.js';
import { debounce } from 'throttle-debounce';
@Component
class InvokeGraph extends Vue {
  container = null;
  graph = null;

  /** 函数名悬浮框 */
  functionName = '';
  filePath = '';
  functionType = '';
  fileDesc = '';

  /** 源数据 */
  @Prop() data!: any;

  /** 版本信息 */
  @InjectReactive('VersionKey') readonly version!: any;

  /** 项目信息 */
  @InjectReactive('ProjectKey') readonly project!: any;

  /** 文件树选中的节点 */
  @InjectReactive('NodeKey') readonly fileTreeNodeData!: any;

  /** 选中的测试用例 */
  @InjectReactive('TestCasesSelectedKey') readonly testCasesSelected!: Array<string|number>;

  /** 源数据 */
  currentData: any = this.data;

  /** 当前节点 */
  currentNode: any = {};

  /** 缓存每个节点的指向, 用于数据折叠 */
  redefinedDataMap: any = {};

  /** 有覆盖到测试用例的颜色 */
  coveredColor = '#00AF16';

  /** 默认边的颜色 */
  defaultEdgeColor = '#A3B1BF';

  /** 未定义边框颜色 */
  undefinedBorderColor = '#d1d1d1';

  /** 未定义背景色 */
  undefinedBackgroundColor = '#dbdbdb';

  /** 白色 */
  whiteColor = '#fff';

  /** 字体默认颜色 */
  fontColor = '#666';


  @Watch('data')
  getData(newData: Array<any>) {
    this.currentData = newData;
    this.graph && this.graph.clear();
    this.$nextTick(() => {
      this._InitRootNode();
      Util.traverseTree(this.currentData, (item, parent) => {
        item.id = common.uuid();
        // path用于判断函数是否存在，如果存在，不再有展开节点
        item.path = parent ? `${parent.functionId}_${item.functionId}` : item.functionId;
        this.redefinedDataMap[item.id] = item;
        item.name = common.ellipsis(item.functionName, 30);
        // 存取路径, 将来传递给服务端
        if (item.functionId) {
          item.invokeChain = [item.functionId];
          if (parent && parent.invokeChain) {
            item.invokeChain = [].concat(parent.invokeChain, item.invokeChain);
          }
        }

        Object.assign(item, this._getNodeStyle(item));
      });
      this.graph.edge(data => {
        const newData = this.graph.findDataById(data.target, this.currentData);
        let style = this._getEdgeStyle();
        if (newData.coveredCaseIds.length > 0) {
          style = this._getEdgeStyle(true);
        }
        return {
          shape: 'cubic-horizontal',
          style
        };
      });
      this.graphChangeSize();
      this.graph.data(this.currentData);
      this.graph.render();
      this.zoomCtrl(1);
    });
  }

  /**
   * 监听下拉框选中的测试用例数据变化
   */
  @Watch('$store.state.testcase.selectedTestCases')
  getSelectedTestCases() {
    this.$nextTick(() => {
      const nodes = this.graph.getNodes();
      const edges = this.graph.getEdges();
      Util.traverseTree(this.currentData, (data) => {
        if (data.coveredCaseIds && data.coveredCaseIds.length) {
          Object.assign(data, this._getNodeStyle(data));
          const item = this.graph.findById(data.id);
          item && this.graph.updateItem(item, data);
        }
      });
      this.graph.data(this.currentData);

      // 更新根节点
      edges.length < 1 && nodes.forEach((node) => {
        const data = node.get('model');
        this.graph.updateItem(node, this._getNodeStyle(data));
      });

      // 更新边
      edges.forEach(edge => {
        // 边
        const edgeData = edge.get('model');

        // 目标节点
        const targetNode = edgeData.targetNode;
        const targetData = targetNode.get('model');
        const targetCoveredCaseIds = targetData.coveredCaseIds;

        //===== 目标节点 ====//
        // 目标节点是否覆盖
        if (targetNode) {
          // 更新目标数据
          this.graph.updateItem(targetNode, this._getNodeStyle(targetData));

          // 更新线数据
          this.graph.updateItem(edge, {
            edgeStyle: this._getEdgeStyle(this._getCoveredTestCaseIds(targetCoveredCaseIds).length > 0)
          });
        }
      });

    });
  }

  /**
   * 获取边覆盖样式
   * @param item 节点数据
   */
  _getNodeStyle(item) {
    let style: any = {};
    // 是否有测试用例覆盖
    const hasCoveredCaseIds = item.coveredCaseIds && item.coveredCaseIds.length > 0;

    // 是否有选中的测试用例覆盖
    const isCovered = hasCoveredCaseIds && this._getCoveredTestCaseIds(item.coveredCaseIds).length > 0;

    // 非根节点
    if (!item.isRoot) {
      // 计算与前一个节点之间的连线样式
      style.edgeStyle = this._getEdgeStyle(isCovered);
      style.nodeStyle = {
        fill: this.whiteColor,
        stroke: this.defaultEdgeColor
      };
      // 展开节点样式
      style.expandStyle = {
        stroke: isCovered ? this.coveredColor : this.defaultEdgeColor
      };
      style.labelStyle = {
        fill: this.fontColor
      };
      // 如果有测试用例覆盖
      if (isCovered) {
        // 计算与前一个节点之间的连线样式
        style.edgeStyle = this._getEdgeStyle(isCovered);
        style.nodeStyle = {
          fill: this.coveredColor,
          stroke: this.coveredColor
        };
        style.labelStyle = {
          fill: this.whiteColor
        };
      } else {
        // 打桩状态
        if (item.enableStub) {
          style.nodeStyle = {
            fill: this.undefinedBackgroundColor,
            stroke: this.undefinedBorderColor,
            cursor: 'default'
          };
          style.labelCfg = {
            style: {
              cursor: 'default'
            }
          };
        }
      }

      // 添加iconfont
      let iconfont = {};
      switch (item.functionType) {
        case 'manual':
          iconfont = {
            text: '\ue7bd'
          };
          break;
        case 'sysFunc':
          iconfont = {
            text: '\ue886'
          };
          break;
        case 'defined':
          iconfont = {
            text: '\ue7d5'
          };
          break;
        case 'unDefined':
          iconfont = {
            text: '\ue7d4'
          };
          break;
        case 'special':
          iconfont = {
            text: '\ue663'
          };
          break;
      }
      if (Object.keys(iconfont).length) {
        item.iconfont = Object.assign(iconfont, {
          fill: isCovered ? this.whiteColor : this.fontColor,
          fontSize: 14
        });
      }
    } else {
      // 根节点处理默认
      style = {
        expandStyle: {
          stroke: isCovered ? this.coveredColor : this.defaultEdgeColor
        }
      };
    }
    return style;
  }
  /**
   * 获取边覆盖样式
   * @param isCovered 是否覆盖, true为覆盖的样式，false为默认样式
   */
  _getEdgeStyle(isCovered = false) {
    if (isCovered) {
      return {
        stroke: this.coveredColor,
        endArrow: {
          fill: this.coveredColor,
          stroke: this.coveredColor,
          path: G6.Arrow.triangle(5, 5, 5),
          d: 8
        }
      };
    }

    return {
      stroke: this.defaultEdgeColor,
      endArrow: {
        fill: this.defaultEdgeColor,
        stroke: this.defaultEdgeColor,
        path: G6.Arrow.triangle(5, 5, 5),
        d: 8
      }
    };
  }

  /**
   * 组装数据
   * @param data
   */
  _InitRootNode() {
    Object.assign(this.currentData, {
      isRoot: true,
      nodeStyle: {
        stroke: '#3269F6',
        fill: '#3269F6'
      },
      labelCfg: {
        style: {
          fill: this.whiteColor
        }
      }
    });
  }

  /**
   * 获取图的选项
   */
  getOptions() {
    const width = ((document.body.offsetWidth * 0.77) / 2).toFixed();
    const height = this.container.offsetHeight || 500;
    return {
      container: this.container,
      width,
      height,
      fitView: false,
      animate: false,
      // plugins: [toolTip(G6)],
      modes: {
        default: [
          {
            type: 'collapse-expand',
            onChange: (item, collapsed) => {
              const model = item.get('model');

              collapsed = !collapsed;
              this.graph.updateItem(item, {
                collapsed
              });

              if (collapsed) {
                Util.traverseTree(this.redefinedDataMap[model.id], treeNode => {
                  treeNode.collapsed = true;
                });
              }
              return true;
            }
          },
          {
            type: 'drag-canvas',
            allowDragOnItem: true, // 允许节点拖拽
            enableOptimize: true
          },
          {
            type: 'zoom-canvas',
            enableOptimize: true
          }
        ]
      },
      defaultNode: {
        type: 'tree-node',

        anchorPoints: [
          [0, 0.5],
          [1, 0.5]
        ],
        style: {
          radius: 5
        },
        linePoints: {
          left: true,
          right: true,
          size: 5
        }
      },
      defaultEdge: {
        type: 'tree-edge',
        style: {
          stroke: this.defaultEdgeColor,
          endArrow: {
            fill: this.fontColor,
            stroke: this.fontColor,
            path: G6.Arrow.triangle(5, 5, 5),
            d: 8
          }
        }
      },
      layout: {
        type: 'compactBox',
        direction: 'LR',
        preventOverlap: true,
        getId: function getId(d) {
          return d.id;
        },
        getHeight: function getHeight() {
          return 16;
        },
        getWidth: function getWidth() {
          return 16;
        },
        getVGap: function getVGap() {
          return 10;
        },
        getHGap: function getHGap(item) {
          return 60 + item.name.length * 3;
        }
      }
    };
  }

  /**
   * 获取覆盖的测试用例
   * @param coveredCaseIds 选中的测试用例
   */
  _getCoveredTestCaseIds(coveredCaseIds: Array<string|number>) : Array<string|number> {
    const selectedTestCases = this.$store.state.testcase.selectedTestCases;
    if (selectedTestCases) {
      return coveredCaseIds.filter((coveredCaseId: string) => selectedTestCases.includes(coveredCaseId));
    }
    return [];
  }
  /**
   * 初始化代码
   */
  _Init() {
    this.container = document.getElementById('invokeGraphId');
    this.graph = new G6.TreeGraph(this.getOptions());
    // 单击事件
    this.graph.on('click', e => {
      const model = e.item && e.item._cfg && e.item._cfg.model;
      this.currentNode = model;
      if (e.target.cfg.name !== 'collapse-icon' && e.name !== 'text-shape:click') {
        model && this.$emit('node-click', model);
      }
    });

    // 节点展开折叠事件
    this.graph.on('collapse-icon:click', evt => {
      const model = evt.item.get('model');
      this.graph.updateItem(evt.item, {
        collapsed: !model.collapsed
      });
      if (!model.collapsed && !model.hasOwnProperty('children')) {
        this.$emit('node-collapse', model, data => {
          data.map(item => {
            item.id = common.uuid();
            if (model.path.indexOf(item.functionId) !== -1) {
              item.end = true;
            }
            // 存取路径, 将来传递给服务端
            if (model.invokeChain && item.functionId) {
              item.invokeChain = [].concat(model.invokeChain, [item.functionId]);
            }
            item.path = `${model.path}_${item.functionId}`;
            item.collapsed = true;
            item.name = common.ellipsis(item.functionName, 30);
            Object.assign(item, this._getNodeStyle(item));
            this.redefinedDataMap[item.id] = item;
          });
          this.graph.updateChildren(data, evt.item._cfg.id);
          this.graph.layout();
        });
      }
    });

    //  当前被操作的节点 item
    this.graph.on('itemcollapsed', e => {
      // const model = e.item && e.item._cfg && e.item._cfg.model;
      // this.currentNode = model;
      // Util.traverseTree(this.redefinedDataMap[model.id], (item) => {
      //   item.collapsed = true;
      // });
      //
      // model.functionId && this.$emit('node-click', model);
    });

    //  当前被操作的节点 item
    this.graph.on('node:contextmenu', e => {
      e.preventDefault();
      e.stopPropagation();
      const model = e.item && e.item._cfg && e.item._cfg.model;
      this.$emit('node-contextmenu', model);
    });

    // Tooltip 自动缩放
    this.graph.on('wheelzoom', e => {
      // e.stopPropagation();
      // // 这里的 className 根据实际情况而定，默认是 g6-component-tooltip
      // const tooltips = Array.from(document.getElementsByClassName('g6-component-tooltip'));
      // tooltips.forEach((tooltip) => {
      //   if (tooltip && tooltip.style) {
      //     tooltip.style.transform = `scale(${this.graph.getZoom()})`;
      //   }
      // });
    });

    /** 鼠标悬浮在node显示函数名悬浮框 */
    this.graph.on('node:mouseenter', e => {
      const model = e.item.getModel();
      this.functionName = model.functionName;
      this.fileDesc = model.fileDesc || '';
      this.filePath = model.filePath || '-';
      this.functionType = this.getFunctiontypeTranslation(e.item.getModel()) || '-';
      const toolTip = document.querySelector('#invoke-graph-tooltip') as HTMLDivElement;
      toolTip.className = 'invoke-graph-tooltip-show';
      toolTip.style.left = e.canvasX + 10 + 'px';
      toolTip.style.top = e.canvasY + e.item.getBBox().height * 2 + 'px';
    });

    /** 鼠标离开node隐藏函数名悬浮框 */
    this.graph.on('node:mouseleave', e => {
      const toolTip = document.querySelector('#invoke-graph-tooltip');
      toolTip.className = '';
    });

    addResizeListener(this.container, this.resizeListener);
  }

  resizeListener() {
    return debounce(100, () => this.graphChangeSize())();
  }

  /**
   * 更改图的尺寸
   */
  graphChangeSize() {
    const container = document.getElementById('invokeGraphId');
    if (!this.graph || this.graph.get('destroyed')) {
      return;
    }

    if (!container || !container.offsetWidth || !container.offsetHeight) {
      return;
    }
    this.graph.changeSize(container.offsetWidth, container.offsetHeight);
  }

  /**
   * 下载
   */
  handleDownload() {
    this.$confirm(
      common.i18n('dialog.invoke_graph').replace('xxxx', this.fileTreeNodeData.functionName),
      common.i18n('dialog.tip')
    ).then(() => {
      this.graph.downloadFullImage(
        `${this.project.projectName}_${this.version.versionName}_${this.fileTreeNodeData.functionName}`,
        'image/jpeg',
        {
          backgroundColor: '#fff',
          padding: 10
        }
      );
    });
  }

  /**
   * 缩放
   * @param percent 百分比
   */
  zoomCtrl(percent: number | string) {
    if (typeof percent === 'string' && percent.indexOf('%') !== -1) {
      percent = parseFloat(percent) / 100;
    }
    this.graph.zoomTo(percent);
    if (percent === 1) {
      this.initPosition();
    }
  }

  /**
   * 重置数据
   */
  zoomReset() {
    this.zoomCtrl(1);
  }

  /**
   * 将起始节点放置在左边，上下居中
   */
  initPosition() {
    if (this.currentData && this.currentData.id) {
      const item = this.graph.findById(this.currentData.id);
      const bbox = item.getBBox();
      this.graph.focusItem(this.currentData.id, false);
      this.$nextTick(() => {
        this.graph.translate(-this.container.offsetWidth / 2 + 20, -bbox.height * 2, false);
      });
    }
  }

  /**
   * 获取当前选中的节点
   */
  getCurrentNode() {
    return this.currentNode;
  }

  /**
   * 函数类型翻译
   * @param functionType 函数类型
   */
  getFunctiontypeTranslation = (data) => {
    let res = '';
    switch (data.functionType) {
      case 'entryFunc':
        res = common.i18n('function.entry_func');
        break;
      case 'sysFunc':
        res = common.i18n('function.system_function');
        break;
      case 'defined':
        // 分为项目
        res = common.i18n(`function.defined_function${data.insideProject ? '' : '_outside'}`);
        break;
      case 'unDefined':
        res = common.i18n('function.undefined_function');
        break;
      case 'manual':
        res = common.i18n('function.create_stub_function_manual');
        break;
      case 'special':
        res = common.i18n('function.template_specialization_function');
        break;
    }
    return res;
  };

  mounted() {
    registerTreeNode(G6);
    registerTreeEdge(G6);
    this._Init();
  }

  beforeDestroy() {
    removeResizeListener(this.container, this.resizeListener);
  }
}
export default InvokeGraph;
