<template>
  <section class="sr-select-tree">
    <div
      :class="['selected-value', !arrowDown ? 'selecting' : '']"
      :style="{ height, width }"
      @click="toggleMenu"
    >
      <span v-if="!itemName" class="select-please" v-text="$t('select.select_please')"></span>
      <span v-else class="item-name">
        <span>{{ itemName }}</span>
        <i class="iconfont icon-close" @click.stop.prevent="resetChecked"></i>
      </span>
      <span v-show="count" class="count">+{{ count }}</span>
      <i :class="['iconfont icon-arrow-down', !arrowDown ? 'rotate' : '']"></i>
    </div>
    <transition name="r-zoom-in-top" @before-enter="handleMenuEnter" @after-leave="doDestroy">
      <div
        v-show="!arrowDown"
        ref="refSRSelectTreePopper"
        class="sr-select-tree-popper"
        :style="style"
      >
        <RTree
          ref="refRTree"
          :data="currentData"
          :default-checked-keys="value"
          node-key="id"
          default-expand-all
          show-checkbox
          @check="treeCheckedEvent"
        ></RTree>
      </div>
    </transition>
  </section>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch, Model } from 'vue-property-decorator';
import common from '@/utils/common';

@Component
class SRSelectTree extends Vue {
  @Model('change', { type: Array }) value!: Array<number>;

  @Prop() data!: Array<number>;

  @Prop({
    default: '200px'
  }) width: string;

  @Prop({
    default: '22px'
  }) height: string;

  private arrowDown: boolean = true;
  private style: any = {};

  get reDefinedMap() {
    const map = {};
    this.saveDataToCache(this.currentData, map);
    return map;
  };

  get itemName() {
    if (this.value.indexOf(-1) !== -1) {
      return common.i18n('testcase.all'); 
    }
    this.value.sort((a, b) => a - b);
    const data = this.getFirstLabel(this.currentData, this.value[0]);
    return data ? data.label : '';
  }

  get count() {
    let len = this.value.length;
    if (this.value.indexOf(-1) !== -1) { // 移除部
      --len;
    }
    this.value && this.value.forEach((id) => {
      if (this.reDefinedMap[id] && this.reDefinedMap[id].data && this.reDefinedMap[id].data.groupId) { // 移除编组
        --len;
      }
    });
    return len;
  }

  get currentData() {
    this.handleClose();
    return this.data;
  }

  /**
   * 设置复选框值
   * @param checkedkeys
   */
  setCheckedKeys(checkedKeys: Array<string>) {
    this.$refs.refRTree && this.$refs.refRTree.setCheckedKeys(checkedKeys);
  }

  /**
   * 保存数据到缓存中
   * @param data
   * @param map
   */
  saveDataToCache(data, map) {
    data && data.forEach((item) => {
      if (item.id) {
        map[item.id] = item;
      }
      if (item.children && item.children.length) {
        this.saveDataToCache(item.children, map);
      }
    });
  }

  /**
   * 获取第一个复选框选中的label
   * @param data
   * @param id
   */
  getFirstLabel(data: any, id: number) {
    const nodes = this.getCheckedNodes();
    for (let i = 0; nodes && i < nodes.length; ++i) {
      if (nodes[i].id === id) {
        return nodes[i];
      }
    }
    return null;
  }

  getCheckedNodes() {
    return this.$refs.refRTree ? this.$refs.refRTree.getCheckedNodes() : []; 
  }

  getCheckedKeys() {
    return this.$refs.refRTree ? this.$refs.refRTree.getCheckedKeys() : []; 
  }

  /**
   * 选择事件
   * @param currentChecked 当前选择项相关数据
   * @param treeChecked 树相关数据
   */
  treeCheckedEvent(currentChecked, treeChecked) {
    this.$emit('change', treeChecked.checkedKeys);
    this.$emit('selected', treeChecked.checkedNodes);
    this.$emit('current-check', currentChecked);
  }

  /**
   * 计算位置
   */
  calOptionsPos(evt) {
    const currentNode = evt.currentTarget.parentNode;
    const clientRect = currentNode.getBoundingClientRect();
    const body = document.body;
    const html = document.documentElement;
    const height = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const clientHeight = clientRect.height;
    const left = clientRect.left;
    const top = clientRect.top + clientHeight;
    const topHeight = 201;
    this.style = {
      left: left + 'px',
      top: (top + topHeight > height ? top - topHeight - 4 - clientHeight : top) + 'px',
      width: clientRect.width
    };
  }

  /**
  * 下拉折叠事件
  * @param evt
  */
  toggleMenu(evt: Event) {
    this.arrowDown = !this.arrowDown; 
    this.calOptionsPos(evt);
    this.$emit('change', this.value);
  }

  handleClose() {
    this.arrowDown = true;
  }
   
  handleMenuEnter() {}

  resetChecked() {
    this.setCheckedKeys([]);
    this.$emit('change', []);
    this.$emit('selected', []);
    this.$emit('current-check', null);
  }

  doDestroy() {}

  initEvent(evt) {
    if (!this.$el.contains(evt.target)) {
      this.handleClose();
    }
  }

  mounted() { 
    // document.body.appendChild(this.$refs.refSRSelectTreePopper);
    document.addEventListener('click', this.initEvent);
  }

  beforeDestroy() {
    document.removeEventListener('click', this.initEvent);
    this.handleClose();
  }
} 

export default SRSelectTree;
</script>
