<template>
  <section :class="`${tagClass} cascader cascader-options ${loading ? 'cascader-options-loading' : ''} ${order === 'rightToLeft' ? 'right-to-left' : ''}`" v-loading="loading" v-show="isShow">
    <ul :class="`${tagClass} cascader-list`" ref="firstScrollId">
      <li v-for="(data, index) in currentOptions" :class="'cascader-20201028001 cascader-item ' + (isSelected(data.value) ? 'selected' : '')" :key="`firstScrollId${index}`" @click.stop="handleClick(data, 'first')">
          <i v-if="order === 'rightToLeft' && data.children && data.children.length" class="r-icon-arrow-left"></i>
          <i :class="'r-icon-check' + (!secondOptionsLen && isSelected(data.value) ? '' : ' v-hide')" ></i><span>{{ data.label }}</span>
          <i v-if="order === 'leftToRight' && data.children && data.children.length" class="r-icon-arrow-right"></i>
      </li>
    </ul>
    <ul :class="`${tagClass} cascader-list cascader-lists`" v-if="secondOptionsLen" ref="secondScrollId">
      <cascader-virtualscroll
        ref="virtualScroll"
        :parent-selected="isFirstSelected"
        :selected-value="secondExpand ? secondExpand.value : ''"
        :options="thirdOptions"
        :data-name="'secondOptionsMap'"
        :order="order"
        :tagClass="tagClass"
        @handleListClick="handleClick"></cascader-virtualscroll>
    </ul>
    <!-- maybe thirdOptions in the future -->
    <!-- <ul :class="`${tagClass} cascader-list`" v-if="thirdOptions.length" id="thirdScrollId">
      <li v-for="(data, index) in thirdOptions" :class="`${tagClass} cascader-item ${data.selected ? 'selected' : ''}`" :key="index" @click.stop="handleClick(data, 'third')">
          <i v-show="data.selected " class="r-icon-check" ></i><span>{{ data.label }}</span>
      </li>
    </ul> -->
  </section>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component
class CascaderOptions extends Vue {
  @Prop({ default: 'leftToRight' }) order!: string;
  @Prop({ default: '' }) value!: any;
  @Prop({ default: '' }) path!: string;
  @Prop({ default: false }) visible!: boolean;
  @Prop({ default: '[]' }) operator!: string;
  @Prop() tagClass!: string;

  public currentOptions: Array<any> = [];
  public isShow: boolean = this.visible;
  public loading: boolean = false;
  public secondOptions: Array<any> = [];
  public thirdOptions: Array<any> = [];
  public currentPath: string = this.path;
  public firstSelect: any = null; // 第一层选中
  public secondSelect: any = null; // 第二层选中
  public firstExpand: any = null; // 第一层展开
  public secondExpand: any = null; // 第二层展开
  @Watch('value')
  getValue(value: any) {
    // this.filterValue(value);
  }

  @Watch('visible')
  getVisible(visible: any) {
    this.isShow = visible;
    // this.filterValue(this.value);
  }
  get secondOptionsLen() {
    return this.$store.state.cascader.secondOptionsMap && this.$store.state.cascader.secondOptionsMap.length > 0;
  }

  isSelected(value: string) {
    return this.firstExpand && this.firstExpand.value === value;
  }

  get isFirstSelected() {
    return this.firstSelect && this.firstExpand && this.firstSelect.value === this.firstExpand.value;
  }
  /**
    * filter special character
    * @param value
    */
  filterValue(value: any) {
    if (this.operator === '[]') { // 是否是数组
      let name = '';
      let index: any;
      if (value.contains('[')) {
        // 匹配文指针目标中的数组 如 &sum[0]
        const arrMatch = value.match(/\[(\d*)\]/);
        if (arrMatch) {
          index = Number(arrMatch[1]);
        }
        if (value.contains('&')) {
          name = value.match(/\&(\S*)\[/)[1];
        } else if (value.contains('@')) {
          name = value.match(/\@(\S*)\[/)[1];
        } else {
          name = value.split('[')[0];
        }
        // this.setSelectedValue(name, index);
      } else {
        name = value.replace('&', '').replace('@', '');
        index = '';
        // this.setSelectedValue(value.replace('&', '').replace('@', ''), '');
      }
      const first = {
        value: name,
        label: name
      };
      const second = {
        value: index,
        label: index
      };
      this.firstSelect = first;
      this.firstExpand = first;
      this.secondSelect = second;
      this.secondExpand = second;
      this.setSelectedValue(name, index);
    }
  }
  /**
    *set selected value, highlight
    * @param name
    * @param index
    */
  setSelectedValue(name: string, index: string) {
    if (this.currentOptions && this.currentOptions.length) {
      for (let i = 0, fstLen = this.currentOptions.length; i < fstLen; ++i) {
        const first = this.currentOptions[i];
        const children = first.children;
        const selectFirst = first.value === name;
        if (children && children.length) {
          // for (let j = 0, sndLen = children.length; j < sndLen; ++j) {
          //   const child = children[j];
          //   this.$set(child, 'parent', first);
          //   if (selectFirst && child.value == index) { // eslint-disable-line
          //     // this.$set(child, 'selected', true);
          //     this.secondSelect = this.getOptionItem(child);
          //     this.secondExpand = this.getOptionItem(child);
          //   }
          // }
          if (selectFirst) {
            this.firstSelect = this.getOptionItem(first);
            this.firstExpand = this.getOptionItem(first);
            this.$store.dispatch('SET_SECOND_OPTIONS_MAP', Object.freeze(children));
            // 设置选中元素滚动到可视区域
            const _this = this;
            this.$nextTick(() => {
              this.handleScroll('firstScrollId', i);
              this.$nextTick(() => {
                this.$refs.virtualScroll.scrollView(parseInt(index));
              });
            });
          }
        } else {
          if (selectFirst) {
            this.firstSelect = this.getOptionItem(first);
            this.firstExpand = this.getOptionItem(first);
            this.$nextTick(() => {
              this.handleScroll('firstScrollId', i);
            });
          }
        }
      }
    }
    this.loading = false;
    this.$forceUpdate();
  }

  getOptionItem(data: any) {
    return {
      label: data.label || '',
      value: data.value
    };
  }
  /**
    * scroll events
    * @param id
    * @param index
    */
  handleScroll(id: string, index: number) {
    const scrollIndex = index - 5;
    const el: any = this.$refs[id];
    if (el && scrollIndex > 0) {
      el.scrollTop = scrollIndex * 34;
    }
  }
  /**
    * select option
    * @param data
    * @param layer
    */
  handleClick(data: any, layer: string) {
    let secondOptions = this.$store.state.cascader.secondOptionsMap;
    if (layer === 'first') {
      if (!data.children || (data.children && data.children.length < 1)) {
        // this.$set(this, 'secondOptions', []);
        secondOptions = [];
        this.$store.dispatch('SET_SECOND_OPTIONS_MAP', []);
      }
      secondOptions.length ? this.$refs.virtualScroll.scrollToTop() : '';
    } else if (layer === 'second') {
      this.$store.dispatch('SET_SECOND_OPTIONS_MAP', Object.freeze(secondOptions));
      // this.$set(this, 'secondOptions', []);
    } else {
    }

    const optionData = this.getOptionItem(data);
    if (data.children && data.children.length) {
      this[`${layer}Expand`] = optionData;
      if (layer === 'first') {
        this.$store.dispatch('SET_SECOND_OPTIONS_MAP', Object.freeze(data.children));
      } else {
        this.firstSelect = optionData;
        // this.$set(this, 'secondOptions', data.children);
      }
    } else {
      this.firstSelect = this.firstExpand;
      this[`${layer}Select`] = optionData;
      this[`${layer}Expand`] = optionData;
      this.$emit('update:visible', false);
      const selectedData = [optionData];
      if (layer === 'second') {
        selectedData.unshift(this.getOptionItem(this.firstSelect));
      }
      this.$emit('selected', selectedData);
    }
  }

  reset() {
    this.firstSelect = null;
    this.firstExpand = null;
    this.secondSelect = null;
    this.secondExpand = null;
    if (document.getElementById('firstScrollId')) {
      document.getElementById('firstScrollId').scrollTop = 0;
    }
    if (document.getElementById('secondScrollId')) {
      document.getElementById('secondScrollId').scrollTop = 0;
    }
    if (document.getElementById('thirdScrollId')) {
      document.getElementById('thirdScrollId').scrollTop = 0;
    }
    this.$store.dispatch('SET_SECOND_OPTIONS_MAP', []);
    this.secondOptions = [];
  }
  hide() {
    this.isShow = false;
  }
  show() {
    if (this.$el.parentNode !== document.body) {
      document.body.append(this.$el);
    }
    this.isShow = true;
    this.loading = true;
    this.reset();// 重置选中
  }
  setOptions() {
    try {
      const options = this.$store.state.cascader.optionsMap[this.currentPath];
      this.currentOptions = Object.freeze(options) || [];
      this.filterValue(this.value);
    } catch (e) {
      this.loading = false;
      this.$log.error('Cascader options get data from store occur error: ', e);
    }
  }
  mounted() {
  }
}
export default CascaderOptions;
</script>

