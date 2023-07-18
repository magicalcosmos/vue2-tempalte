import common from '@/utils/common';
import { Component, Prop, Vue, Watch, Mixins } from 'vue-property-decorator';
import VirtualScrollCheckbox from '@mixins/VirtualScrollCheckbox';

@Component
class VirtualScroll extends Mixins(VirtualScrollCheckbox) {
  @Prop({
    default: () => {
      return [];
    }
  }) data!: Array<any>; // 数据
  @Prop({
    default: 'id'
  }) keyName!: string; // 必传，唯一 key，要与data中的属性对应
  @Prop({
    default: 10
  })
  scrollWidth!: number; // 滚动条宽度
  @Prop({
    default: true
  })
  showScrollbar!: boolean; // 显示滚动条
  @Prop({
    default: 0
  })
  containerHeight!: number;// 容器高度
  @Prop({
    default: 25
  }) size!: number;// 行高
  @Prop({
    default: 25
  }) indent!: number;// 子节点缩进距离
  @Prop({
    default: 'ulClass'
  })
  ulClass!: string;// ul class
  @Prop({
    default: 'liClass'
  })
  liClass!: Function | string;// li class
  @Prop({
    default: false
  })
  isTree!: boolean;// type of tree
  @Prop({
    default: 'icon-triangle-down'
  })
  expandIcon!: string;// expand icon
  @Prop({
    default: 'icon-triangle-fold'
  })
  foldIcon!: string;// fold icon
  @Prop({
    default: 'children'
  })
  childKey!: string;// child key
  @Prop({
    default: 'id'
  })
  dataId!: string;// id key
  @Prop({
    default: false
  })
  besideExpand!: string;// expand event in parent component
  @Prop({
    default: false
  }) isTreeData!: boolean;
  @Prop({
    default: false
  }) showCheckbox!: boolean; // 显示复选框
  @Prop({
    default: false
  }) defaultExpandAll!: boolean; // 默认展开所有
  @Prop({
    default: () => []
  }) defaultCheckedKeys!: Array<any>; // 默认勾选的节点的 key 的数组
  @Prop({
    default: 'sr-item-selected'
  }) selectedCls!: string;
  @Prop({
    default: true
  }) hoverHighLightCurrentRow!: boolean; // 鼠标悬浮高亮
  @Prop({
    default: true
  }) highLightCurrentRow!: boolean; // 高亮当前行
  @Prop({
    default: false
  }) checkStrictly!: boolean; // 复选框是否遵循父子级之间不相互关联
  @Prop({
    default: () => {
      return () => true;
    }
  }) filterNodeMethod!: boolean; // 过滤方法过滤条件
  @Prop({
    default: () => {
      return () => {};
    }
  }) liStyle!: any; // 节点行内样式
  @Prop({
    default: ''
  }) keyword!: string; // 搜索关键字
  private currentData: Array<any> = [];
  private treeData: Array<any> = [];
  private containSize = 0;
  private startIndex = 0;
  private scrollDirty: boolean = false;
  private scrollHeight: number = 0;
  private currentRow: any = {}; // 当前选中的row
  private expandMap: any = {}; // 展开的nodekey
  @Watch('data', {
    immediate: true,
    deep: true
  })
  getData(data) {
    if (this.isTreeData) {
      this.groupData(this.currentData);
    } else {
      this.treeData = common.deepClone(data);
    }
    this.getContainSize();
  }

  @Watch('keyword')
  getKeyword(newWord: any, oldWord: any) {
    this.groupData(this.currentData);
    this.getContainSize();
  }

  /**
   * get node class
   * @param node
   * @return string
   */
  lineClass(node) {
    return typeof this.liClass === 'function' ? this.liClass(node) : this.liClass;
  }

  /**
   * get blank fill style for scroll
   */
  get blankFillStyle() {
    let startIndex = 0;
    if (this.startIndex <= this.containSize) {
      startIndex = 0;
    } else {
      startIndex = this.startIndex - this.containSize;
    }
    return {
      paddingTop: startIndex * this.size + 'px',
      paddingBottom: this.treeData.length - this.endIndex + 'px',
      height: this.treeData.length * this.size + 'px'
    };
  }
  /**
   * calculate end index of visible data list
   */
  get endIndex() {
    let endIndex = this.startIndex + this.containSize * 2;
    if (!this.treeData[endIndex] && this.treeData.length) {
      endIndex = this.treeData.length;
    }
    return endIndex;
  }
  /**
   * get visible data
   */
  get visibleData() {
    let startIndex = 0;
    if (this.startIndex <= this.containSize) {
      startIndex = 0;
    } else {
      startIndex = this.startIndex - this.containSize;
    }
    return this.treeData.slice(startIndex, this.endIndex);
  }

  handleItemClick(node, nodes, index, e) {
    this.currentRow = node;
    this.$emit('node-click', node, nodes, index, e);
  }

  /**
   * padding left of each item for fold
   * @param data
   */
  getItemStyle(data) {
    const style = {
      ...this.liStyle(data),
      paddingLeft: data.nodeLevel * this.indent + 'px',
      height: this.size + 'px',
      lineHeight: this.size + 'px'
    };
    return style;
  }

  groupData(data) {
    const result = [];
    this.currentData = this.filter(this.data, this.keyword);
    this.handleData(result, this.currentData, 0);
    this.treeData = [...result];
    this.initDefaultCheckedNodes();
  }
  /**
   * assemble data
   * @param result
   * @param origin data
   * @param nodeLevel
   */
  handleData(result: Array<any>, data: Array<any>, nodeLevel: number, parentKey: string = null, parentExpand: boolean = false) {
    for (let i = 0; i < data.length; ++i) {
      const newObj = data[i];
      this.$set(newObj, 'nodeLevel', nodeLevel);
      this.$set(newObj, 'checked', this.getNode(newObj[this.keyName]) && this.getNode(newObj[this.keyName]).checked !== undefined ? this.getNode(newObj[this.keyName]).checked : false);
      // this.$set(newObj, 'indeterminate', false);
      // 设置勾选状态  checked indeterminate 这段只适用于checkStrictly为true的情况
      // if (this.defaultCheckedKeys.includes(newObj[this.keyName])) {
      //   this.$set(newObj, 'checked', true);
      // } else {
      //   this.$set(newObj, 'checked', Object.prototype.hasOwnProperty.call(this.nodesMap, newObj[this.keyName]) && this.nodesMap[newObj[this.keyName]].checked ? true : false);
      // }
      for (const obj in data[i]) {
        const value = data[i][obj];
        if (obj === this.childKey) {
          if (value && value.length) {
            this.$set(newObj, 'hasChildren', true);
          } else { // 没有children则不显示展开图标
            this.$set(newObj, 'hasChildren', false);
          }
          this.$set(newObj, 'expanded', Object.prototype.hasOwnProperty.call(this.expandMap, newObj[this.keyName]) ? this.expandMap[newObj[this.keyName]] : !!this.defaultExpandAll);
        }
      }
      this.$set(newObj, 'nodeIndex', result.length);
      parentKey && this.$set(newObj, 'parentKey', parentKey);
      this.registerNode(newObj, this.keyName);
      if (parentExpand || !parentKey) {
        result.push(newObj);
      }
      if (data[i].hasOwnProperty(this.childKey)) { // 添加展开的children
        const children = data[i][this.childKey];
        if (children && children.length) {
          this.handleData(result, children, nodeLevel + 1, newObj[this.keyName], (parentExpand || !parentKey) && newObj.expanded);
        }
      }
    }
  }

  /**
   * expand event
   * @param item
   */
  handleExpand(rowData: any) {
    if (this.besideExpand) {
      this.$emit('expandEvent', rowData);
    } else {
      rowData.expanded = !rowData.expanded;
      let rowIdx = -1; // 当前行的索引
      let childrenNum = 0; // 当前行的子节点数量
      const treeData = this.treeData;
      for (let i = 0; i < treeData.length; ++i) {
        const item = treeData[i];
        if (item[this.dataId] === rowData[this.dataId]) {
          rowIdx = i;
          if (rowData.expanded) break;
        } else if (rowIdx !== -1 && i > rowIdx) {
          if (item.nodeLevel > rowData.nodeLevel) {
            childrenNum += 1;
          } else {
            break;
          }
        }
      }
      this.expandMap[rowData[this.keyName]] = rowData.expanded;
      if (rowData.expanded) {
        const children = [];
        this.handleData(children, rowData[this.childKey], rowData.nodeLevel + 1, rowData[this.keyName], true);
        this.treeData.splice(rowIdx + 1, 0, ...children);
      } else {
        this.treeData.splice(rowIdx + 1, childrenNum);
      }
    }

  }
  @Watch('containerHeight')
  getContainerHeight() {
    this.getContainSize();
  }

  /**
   * get contain size
   */
  getContainSize() {
    this.$nextTick(() => {
      const el: any = this.$refs.refScrollContainer;
      this.scrollHeight = this.containerHeight > 0 ? this.containerHeight : el.offsetHeight;
      this.containSize = ~~(this.scrollHeight / this.size) + 2;
      this.setContainStyle();
    });
  }

  /**
   * Sets Contain Style
   */
  setContainStyle() {
    const el: any = this.$refs.refScrollContainer;
    if (el) {
      el.style.maxHeight = this.scrollHeight + 'px';
      el.style.minHeight = this.size + 'px';
    }
  }

  /**
   * common scroll event
   * @param current
   * @param target
   */
  handleScroll() {
    if (!this.scrollDirty) {
      this.scrollDirty = true;
      window.requestAnimationFrame(() => {
        this.setDataStartIndex();
        this.$emit('virtualScroll');
        this.scrollDirty = false;
      });
    }
  }

  /**
   * calculate start index again
   */
  setDataStartIndex() {
    const currentIndex = Math.floor(this.$refs.refScrollContainer.scrollTop / this.size);
    if (this.startIndex === currentIndex) {
      return;
    }
    this.startIndex = currentIndex;
  }

  /**
   * reset container scroll
   */
  resetScroll(scrollTop?: number) {
    this.$refs.refScrollContainer.scrollTop = scrollTop || 0;
    this.$refs.refScrollContainer.scrollLeft = 0;
    if (!scrollTop) {
      this.startIndex = 0;
    }
  }

  mounted() {
    this.getContainSize();
    window.addEventListener('resize', this.getContainSize);
    window.onorientationchange = this.getContainSize;
  }
  beforeDestroy() {
    window.removeEventListener('resize', this.getContainSize);
    window.onorientationchange = null;
  }
}

export default VirtualScroll;
