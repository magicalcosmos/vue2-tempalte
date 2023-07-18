import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { TestCaseListForCFG } from '@/views/components';
import common from '@/utils/common';
import * as d3 from 'd3';
import dagreD3 from 'dagre-d3';
import { COVERAGES } from '@/utils/dict';
import ViewTestCaseMixin from '@/views/components/mixins/ViewTestCaseMixin';
import utils from '@/utils/utils';
@Component({
  components: {
    TestCaseListForCFG
  },
  mixins: [ViewTestCaseMixin]
})
class DagreGraph extends Vue {
  @Prop({
    default: () => {
      return {
        data: {}
      };
    }
  })
  data!: {
    CFGData: any;
    nodes: any[];
    edges: any[];
  };

  @Prop({
    default: () => {
      return {};
    }
  })
  version!: object;

  private renderer: any;
  private graph: any = null;
  private direction: string = 'LR';
  private directions: Array<any> = [
    {
      prop: 'LR',
      label: common.i18n('graph.LR')
    },
    {
      prop: 'TB',
      label: common.i18n('graph.TB')
    }
  ];
  private zoom: any = null;
  public svg: any = null;
  private container: any = null;
  private containerId: string = '';
  private width: number = 0;
  private height: number = 0;
  private currentVersion: any = this.version;
  private currentData: any = {};
  private nodeIdMap: any = {};
  private isTestCaseListVisible: boolean = false;
  /** * test case list */
  private testCaseList: Array<any> = [];

  private currentNodes: Array<any> = [];
  private currentEdges: Array<any> = [];
  private transform = {
    x: 0,
    y: 0,
    scale: 1
  };
  private selectedTestCases = null;

  private showPopover = false;

  @Watch('version')
  getVersion(version: any) {
    this.currentVersion = version;
  }
  @Watch('data')
  getData(data: any) {
    this.selectedTestCases = null;
    this.currentData = data.CFGData;
    this.currentNodes = data.nodes;
    this.currentEdges = data.edges;
    if (this.currentData.nodes && !this.currentData.isUpdate) {
      this.initGraph();
    } else {
      this.setNodeIdMap();
    }
  }

  // watch test case data from store change
  get testCases() {
    const testCases = this.$store.getters.testcase.testCaseList;
    this.regroupData(testCases);
    return testCases;
  }

  get functionData() {
    const functionData = this.$store.getters.func.functionData;
    return functionData;
  }


  /**
   * change CFG direction
   * @param direction LR: left to righ, TB: top to bottom
   */
  changeDirection(direction: string) {
    if (!this.currentData.nodes) {
      return;
    }
    this.direction = direction;
    this.setDirection();
    this.refresh();
  }

  /**
   * CFG direction setttings
   */
  setDirection() {
    this.graph.setGraph({
      rankdir: this.direction
    });
  }

  /**
   * scale svg
   * @param percent
   */
  zoomCtrl(percent: number | string) {
    this.transform.scale = parseInt(percent.toString()) / 100;
    if (this.svg && this.zoom) {
      this.svg.call(this.zoom.transform, d3.zoomIdentity.scale(this.transform.scale));
      const data = d3.zoomTransform(this.svg.node());
      this.rerenderDagre(data);
    }
  }

  /**
   * reset all settings
   */
  zoomReset() {
    if (!this.currentData.nodes) {
      return;
    }
    this.setDirection();

    // 重置大小
    this.transform.scale = 1;
    this.refresh();

    // 重置svg移动位置
    this.svg.call(this.zoom.transform, d3.zoomIdentity.translate(0, 0).scale(1));
  }

  /**
   * control the svg zoom to up or down
   * @param label the node name
   */
  paintingDiamond(label: number) {
    const currentG = d3.select(`.bash-operator-${label}`);
    if (currentG && currentG._groups[0]) {
      const g = currentG._groups[0][0];
      if (g) {
        const attributes = g.childNodes[0].attributes;
        const point1 = `${attributes.x.textContent},0`;
        const point2 = `0,${attributes.y.textContent}`;
        const point3 = `${-attributes.x.textContent},0`;
        const point4 = `0,${-attributes.y.textContent}`;
        const polygon = this.createTag('polygon', {
          nodeValue: label,
          points: `${point1} ${point2} ${point3} ${point4}`,
          class: `statement-judge diamond_${label}`
        });
        g.appendChild(polygon);
        const text: any = this.createTag('text', {
          x: -4,
          y: 4
        });
        text.innerHTML = label;
        g.appendChild(text);
      }
    }
  }
  /**
   * control the canvas zoom to up or down
   * @param label the node name
   */
  paintingOutSideFrame(label: any) {
    const currentG = d3.select(`.outside-frame-${label}`);
    if (currentG && currentG._groups[0]) {
      const g = currentG._groups[0][0];
      if (g) {
        const animatedPoints = g.childNodes[0].animatedPoints;
        const rect = this.createTag('rect', {
          height: Math.abs(animatedPoints[0].y * 2),
          width: Math.abs(animatedPoints[1].x * 2),
          x: animatedPoints[1].x,
          y: animatedPoints[0].y,
          class: `coverages select-outside-frame react_${label}`
        });
        g.prepend(rect);
      }
    }
  }
  /**
   * painting mcdc data
   * @param label 名称
   * @param rate 覆盖率
   */
  paintingMCDC(label: number, rate: number) {
    this.$nextTick(() => {
      const currentG = d3.select('.special-select-' + label);
      if (rate < 1 && currentG && currentG._groups[0]) {
        const g = currentG._groups[0][0];
        if (g) {
          if (g.childNodes.length === 2) {
            const animatedPoints = g.childNodes[0].animatedPoints;
            const point1 = `${animatedPoints[0].x},${animatedPoints[0].y}`;
            let point2 = '';
            let point3 = '';
            let point4 = '';
            let point5 = '';
            let newX = 0;
            let newY = 0;
            if (rate <= 0.5) {
              newX = animatedPoints[1].x * rate * 2;
              newY = animatedPoints[0].y * (1 - rate * 2);
              point2 = `${newX} ${newY}`;
              point4 = `${-newX} ${newY}`;
            } else {
              point2 = `${animatedPoints[1].x},${animatedPoints[1].y}`;
              point5 = `${animatedPoints[3].x},${animatedPoints[3].y}`;
              const newRate = rate - 0.5;
              newX = animatedPoints[3].x * (1 - newRate * 2);
              newY = animatedPoints[2].y * newRate * 2;
              point3 = `${-newX} ${newY}`;
              point4 = `${newX} ${newY}`;
            }
            const polygon = this.createTag('polygon', {
              points: `${point1} ${point2} ${point3} ${point4} ${point5}`,
              class: `coverages mcdc polygon_${label}`
            });
            g.appendChild(polygon);
          }
        }
      }
    });
  }

  removeMCDCTag(label: number) {
    this.$nextTick(() => {
      const currentG = d3.select(`.special-select-${label}`).select('.mcdc');
      if (currentG) {
        currentG.remove();
      }
    });
  }

  /**
   * create html tag
   * @param tag
   * @param attrs
   */
  createTag(tag: string, attrs: any) {
    const NS = 'http://www.w3.org/2000/svg';
    const domElements = document.createElementNS(NS, tag);
    for (const attr in attrs) {
      domElements.setAttribute(attr, attrs[attr]);
    }
    return domElements;
  }

  getDiamondNode(item: any, label: number) {
    return {
      id: `cfg${item.id + 1}`,
      label,
      shape: 'diamond'
    };
  }

  public diamondNode = {};
  /**
   * set diamond for cfg
   * @param item
   * @param label
   */
  setDiamond(item: any, label: number) {
    const state = item.state || 'no-status';
    this.diamondNode = this.getDiamondNode(item, label);
    this.diamondNode['class'] = `SelectOperator outside-frame-${label} dagre ${state}`;
    this.graph.setNode(item.id, this.diamondNode);
    this.setDiamondMCDC(item, label, this.diamondNode);
  }

  /**
   * 设置菱形MCDC
   */
  setDiamondMCDC(item: any, label: number, node) {
    // const node = this.getDiamondNode(item, label);
    this.removeMCDCTag(label);
    const state = item.state || 'no-status';
    let rate: number;
    const mcdc = this.showTable(item.id);
    mcdc &&
      mcdc.sort((a, b) => {
        return a.mcdc - b.mcdc;
      });
    const subMCDC = mcdc && mcdc[0] && mcdc[0].mcdc;
    const isMCDC = subMCDC !== undefined && subMCDC !== 1;
    if (isMCDC) {
      rate = 1 - subMCDC;
      node['class'] = `SelectOperator dagre ${state} outside-frame-${label} special-select-${label} ${
        rate === 1 ? 'no-coverage' : ''
      }`;
    }
    if (rate && rate !== 1) {
      this.paintingMCDC(label, rate);
    }
  }

  /**
   * 通用设置节点
   * @param item
   * @param label
   * @param shape
   */
  setCommonNode(item: any, label: number, shape: string) {
    const state = item.state || 'no-status';
    // const style = item.matches ? 'stroke:red;stroke-width:3;stroke-opacity:0.5' : '';

    let className = `${item.value.operator} dagre ${state}`;
    if (item.value.operator === 'BashOperator') {
      className += ` BaseOperaterClick bash-operator-${label}`;
    }
    this.graph.setNode(item.id, {
      id: 'cfg' + (item.id + 1),
      label,
      shape,
      class: className
      // style
    });
  }

  /**
   * Set nodeId map
   */
  setNodeIdMap() {
    this.nodeIdMap = {};
    this.currentNodes.forEach(item => {
      this.nodeIdMap[item.id] = item;
      const label = item.value.label;
      switch (item.value.operator) {
        case 'SelectOperator':
          if (Object.keys(item.value.testIds).length > 0) {
            this.setDiamondMCDC(item, label, this.diamondNode);
          } else {
            this.removeMCDCTag(label);
          }
          break;
      }
    });
  }

  /**
   * 画节点
   */
  strokeNodes() {
    // 获取之前的nodes缓存并清除
    this.clearNodes();
    // 通过operator来画shape(BranchPythonMapOperator: 分支； JoinOperator：合流)
    this.nodeIdMap = {};
    this.currentNodes.forEach(item => {
      this.nodeIdMap[item.id] = item;
      const label = item.value.label;
      switch (item.value.operator) {
        case 'BranchPythonMapOperator':
          this.setCommonNode(item, label, 'ellipse');
          break;
        case 'JoinOperator':
          this.setCommonNode(item, label, 'circle');
          break;
        case 'SelectOperator':
          this.setDiamond(item, label);
          // this.setDiamondMCDC(item, label);
          break;
        case 'BashOperator':
          this.setCommonNode(item, label, 'rect');
          if (item.value.decisions && item.value.decisions.length) {
            this.$nextTick(() => {
              this.paintingDiamond(label);
            });
          }
          break;
        default:
          this.setCommonNode(item, label, 'rect');
      }
    });
  }
  /**
   * @description 画线
   */
  strokeEdges() {
    this.clearEdges();
    //一个脚本节点时：不渲染eage
    if (this.currentNodes.length > 1) {
      this.currentEdges.forEach(item => {
        this.graph.setEdge(item.from, item.to, {
          id: `cfg${item.id}`,
          label: item.label,
          class: item.state
          // style: 'stroke: ' + item.color + ';fill: none;',
          // arrowheadStyle: item.color !== '' ? 'fill: ' + item.color + ';stroke: #78C06E' : 'fill: ' + item.color
          // arrowhead: 'vee',
          // curve: d3.curveBasis
        });
      });
    }

    // Center the graph
    this.renderer && this.renderer(this.container, this.graph);
    this.rerenderDagre();
  }

  /**
   * 重新计算Dagre图的位置
   * @param 数据偏移量
   */
  rerenderDagre(data = { x: 0, y: 0 }) {
    const transformInfo = this.getTransformInfo(document.getElementById(`cfg${this.graph.nodeCount()}`));
    if (this.direction === 'LR') {
      this.transform.x = 20 + data.x;
      this.transform.y = this.height / 2 - transformInfo.y - 40 + data.y;
    } else {
      this.transform.x = this.height / 2 - transformInfo.x + data.x;
      this.transform.y = 20 + data.y;
    }
    this.dagreTransfrom();
  }

  /**
   * dagre移动
   */
  dagreTransfrom() {
    this.container &&
      this.container.attr(
        'transform',
        `translate(${this.transform.x}, ${this.transform.y}) scale(${this.transform.scale})`
      );
  }

  /**
   * 删除节点
   */
  clearNodes() {
    const nodes = this.graph.nodes();
    //移出点
    if (nodes.length) {
      nodes.forEach((node: any) => {
        this.graph.removeNode(node);
      });
    }
  }

  /**
   * 正则匹配transform的x, y
   * @param querySelector 偏移位置信息
   */
  getTransformInfo(querySelector) {
    if (!querySelector) {
      return { x: 0, y: 0, scale: 1 };
    }
    const loc = querySelector.attributes['transform'].value;
    const reg = /\d+[.]{0,}[0-9]+/g;
    const locArr = loc.match(reg);
    return {
      x: locArr[0],
      y: locArr[1],
      scale: locArr.length > 2 ? parseFloat(locArr[2]) : 1
    };
  }

  /**
   * 删除连线
   */
  clearEdges() {
    const edges = this.graph.edges();
    if (edges.length) {
      edges.forEach((edge: any) => {
        this.graph.removeEdge(edge);
      });
    }
  }
  /**
   * 清除画布
   */
  //
  clearGraph() {
    // 获取之前的nodes缓存并清除
    this.zoomCtrl(100);
    this.currentNodes = [];
    this.currentEdges = [];
    // this.clearNodes();
    // this.clearEdges();
    this.container && this.container.html('');
  }

  /**
   * 动态设置nodes和edges
   * @param data Object { nodes: {}, edges: {}}
   */
  setNodesAndEdges(data: any) {
    if (data.nodes) {
      this.currentNodes = data.nodes;
    }
    if (data.edges) {
      this.currentEdges = data.edges;
    }
  }

  /**
   * 给Graph节点添加事件
   */
  addGraphEvents() {
    const _this = this; // 保存上下文
    //  添加点击事件
    //  d代表绑定的数据，i代表元素在集合中的位置，group代表相关的元素集合
    this.svg.selectAll('g.node').on('click', function(event: any, data: any, index: number, group: any) {
      _this.$emit('linkageCode', data);
    });

    this.svg
      .selectAll('g.SelectOperator, g.BaseOperaterClick')
      .on('dblclick', function(data: any, index: number, group: any) {
        _this.$emit('showTable', index);
      });
    this.handleGContextMenu();
    this.handleGClick();
  }

  showTable(id: string) {
    const version: any = this.currentVersion;
    const coverages = version[common.currentTestType()].coverages;
    const nodeData = this.getFunctionDataById(id);
    let decisions: Array<any>;
    if (nodeData && nodeData.decisions) {
      decisions = nodeData.decisions;
    } else {
      return decisions;
    }
    if (decisions && decisions.length > 0 && (coverages & COVERAGES.MCDCCOVERAGE) > 0) {
      decisions.forEach((decision: any, iii: number) => {
        const conditionLength = Object.keys(decision.conditions).length; // 条件个数
        if (decision.cases.length > 0) {
          let coveredCaseCount = 0;
          decision.cases.forEach((ca: any, ii: number) => {
            if (ca.testIds && Object.keys(ca.testIds).length > 0) {
              coveredCaseCount += 1;
            }
            const conditionsMap = new Map();
            ca.conditions.forEach((condition: any) => {
              conditionsMap.set(condition.id, condition.value);
            });
            for (let i = 0; i < conditionLength; i += 1) {
              if (!conditionsMap.has(i)) {
                decisions[iii].cases[ii].conditions.splice(i, 0, { id: i, value: '-' });
              }
            }

            ca.conditions.sort((a, b) => {
              return a.id - b.id;
            });
          });
          const mcdc = coveredCaseCount / decision.cases.length;
          decisions[iii].mcdc = mcdc;
        }
      });
    }
    return decisions;
  }
  /**
   * get function data by id
   * @param id
   */
  getFunctionDataById(id: number | string) {
    // 当前函数的所有参数数据this.selectedFunctionData.blocks
    if (this.currentData) {
      for (const node of this.currentData.nodes) {
        /*eslint-disable*/
        if (node !== undefined && node.nodeId !== undefined && node.nodeId == id) {
          return node;
        }
        /*eslint-enable*/
      }
    }
    return null;
  }
  /**
   * right click of nodes
   */
  handleGContextMenu() {
    const _this = this;
    this.svg.on('contextmenu', function(event: any, data: any, index: number, group: any) {
      event.preventDefault();
      event.stopPropagation();
      let target: any = event.target;
      while (target.outerHTML.indexOf('node') === -1 && target.outerHTML.indexOf('darge') === -1) {
        target = target.parentNode;
      }
      if (target.id) {
        const data = _this.nodeIdMap[target.id.replace('cfg', '') - 1];
        _this.$set(_this, 'testCaseList', []);
        if (data && data.value && data.value.testIds) {
          const testIds = Object.keys(data.value.testIds);
          _this.groupOverrideTestCases(_this.testCaseList, testIds);
        }
        if (_this.testCaseList.length) {
          _this.isTestCaseListVisible = true;
        }
      }
    });
  }
  /**
   * click node
   */
  handleGClick() {
    this.svg.on('click', function(event: any, data: any, index: number, group: any) {
      event.preventDefault();
      event.stopPropagation();
      const testCaseOptions: any = document.querySelector('.test-case-selection .r-select__caret');
      const functionOptions: any = document.querySelector('.function-selection .r-select__caret');
      try {
        if (testCaseOptions.className.indexOf('is-reverse') !== -1) {
          testCaseOptions.click();
        }
        if (functionOptions.className.indexOf('is-reverse') !== -1) {
          functionOptions.click();
        }
      } catch (e) {}
    });
  }
  /**
   * select a test case for projectmain page tab switch and test case list selected
   * @param data test case data
   */
  handleClick(data: any) {
    this.$store.dispatch('SET_CFG_TEST_CASE_SELECTED', {});
    this.$store.dispatch('SET_CFG_TEST_CASE_SELECTED', data);
    this.$store.dispatch('SAVE_IS_NODE_CLICK', true);
    this.isTestCaseListVisible = false;
  }
  /**
   * calculate svg view box parameters
   * @param isResetViewBox if initialize
   */
  calSvgViewBox(isResetViewBox?: boolean) {
    /*eslint-disable */
    const dagre = d3.select(this.$el).select('svg.dagre');
    let viewBox = `0 0 ${this.width} ${this.height}`;
    let preserveAspectRatio = 'xMinYMin meet';
    // if (isResetViewBox) {
    //   //  对于节点过多的  svg定位位置不一样
    //   if (this.currentNodes.length > 40) {
    //     viewBox = `0 400 ${this.width} ${this.height}`;
    //     preserveAspectRatio = 'xMinYMin slice';
    //   } else if (this.currentNodes.length > 20 && this.currentNodes.length < 40) {
    //     viewBox = `0 0 ${this.width * 2} ${this.height * 2}`;
    //     preserveAspectRatio = 'xMinYMin slice';
    //   }
    // }
    this.svg = dagre.attr('preserveAspectRatio', preserveAspectRatio).attr('viewBox', viewBox);
    /*eslint-enable */
  }
  /**
   * 设置覆盖路径
   * @param data 选中的测试用例数据
   */
  setCoverPaths(data: Array<any>) {
    // 如果清空测试用例，则删除MCDC tag
    this.removeCoverPaths();
    data.forEach(testCase => {
      if (testCase && testCase.id !== -1) {
        try {
          this.currentNodes.forEach((item: any) => {
            if (item.value.testIds && item.value.testIds[testCase.id]) {
              this.setClass(item.id + 1, 'success');
            }
          });
          this.currentEdges.forEach((item: any) => {
            if (item.testIds && item.testIds[testCase.id]) {
              this.setClass(item.id, 'success');
            }
          });
        } catch (e) {
          this.$log.error("function 'setCoverPaths' occur errors: ", e);
        }
      }
    });
    this.selectedTestCases = data;
  }
  /**
   * 移除覆盖路径
   */
  removeCoverPaths() {
    this.currentNodes.forEach((item: any) => {
      let replaceState = 'no-status';
      if (item.value.operator === 'SelectOperator' && (Object.keys(item.value.testIds).length === 0 || this.testCases.length === 0)) {
        replaceState = 'no-coverage';
      }
      this.removeClass(item.id + 1, 'success', replaceState);
    });
    this.currentEdges.forEach((item: any) => {
      this.removeClass(item.id, 'success');
    });
  }
  /**
   * set common style for svg element
   * @param id
   * @param state
   */
  setClass(id: number | string, state: string) {
    const currentState = 'success';
    const noStatus = 'no-status';
    const noCoverage = 'no-coverage';
    const cfgElement = d3.select(`#cfg${id}`);
    if (cfgElement.size() < 1) {
      // 当没有找到元素，不做任何处理
      return;
    }
    let className = cfgElement.attr('class');
    if (className && className.indexOf(currentState) === -1) {
      className = className.replace(`${noStatus}`, '');
      if (className.indexOf(noCoverage) !== -1) {
        className = className.replace(`${noCoverage}`, '');
      }
      cfgElement.attr('class', `${className} ${state}`);
    }
  }
  /**
   * remove class by id
   * @param id
   * @param state
   * @param replaceState 默认为no-status
   */
  removeClass(id: number | string, state: string, replaceState = 'no-status') {
    try {
      const cfgElement = d3.select(`#cfg${id}`);
      if (cfgElement.size() < 1) {
        // 当没有找到元素，不做任何处理
        return;
      }
      const className = cfgElement.attr('class');
      cfgElement.attr('class', className.replace(state, replaceState));
    } catch (error) {
      this.$log.error(error);
    }
  }

  initGraphData() {
    if (!this.containerId) {
      return false;
    }
    const container: any = document.getElementById(this.containerId);
    this.width = container.clientWidth;
    this.height = container.clientHeight;

    this.calSvgViewBox();
    //add text
    this.container = this.svg.select('g.container');
    try {
      const group = this.container.select('g')._groups[0][0];
      if (group) {
        group.innerHTML = '';
      }
    } catch (e) {
      this.$log.error(e);
      return false;
    }
    // 添加鼠标滚轮放大缩小事件
    this.zoom = d3.zoom().on('zoom', () => {
      const data = d3.zoomTransform(this.svg.node());
      this.transform.scale = data.k;
      this.rerenderDagre(data);
    });

    this.svg.call(this.zoom).on('dblclick.zoom', null);

    //add nodes
    this.strokeNodes();
    //add edges
    this.strokeEdges();
    //add events
    this.addGraphEvents();
  }

  initGraph() {
    // 重置位置
    // try {
    //   this.zoom.scaleTo(this.svg, 1);
    // } catch (error) {
    //   this.$log.error(error);
    // }
    if (this.currentNodes.length) {
      this.initGraphData();
    }
  }

  refresh() {
    this.strokeNodes();
    this.strokeEdges();
    this.selectedTestCases && this.setCoverPaths(this.selectedTestCases);
  }
  /******* Vue life cycle **********/
  created() {
    this.containerId = common.uuid();
    this.graph = new dagreD3.graphlib.Graph()
      .setGraph({
        rankdir: this.direction
      })
      .setDefaultEdgeLabel(function() {
        return {};
      });

    /*eslint-disable */
    this.renderer = new dagreD3.render();
    /*eslint-enable */
  }
  mounted() {
    this.$nextTick(() => {
      this.rerenderDagre();
    });
    //this.zoom.scaleTo(this.svg, 1);
    // // 重置位置
    //this.svg.call(this.zoom.transform, d3.zoomIdentity.translate(20, 20).scale(1));
  }
}
export default DagreGraph;
