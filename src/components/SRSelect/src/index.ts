import { Component, Model, Prop, Vue, Watch } from 'vue-property-decorator';
import Popper from '@/utils/popper';
import Options from './Options.vue';
@Component({
  components: {
    Options
  }
})
class SrSelect extends Vue {
  @Model('change', { type: String }) value!: string;
  @Prop({ default: '' }) comparedValue!: string;
  @Prop({ default: '' }) diffValue!: string;
  @Prop({ default: () => {
    return [];
  } }) options!: Array<any>; // If there is compared sign
  @Prop({ default: '' }) sign!: string; // If there is compared sign
  @Prop({ default: '-' }) defaultValue!: string; // If there is compared sign
  @Prop({ default: '200px' }) width!: string; // If there is compared sign
  @Prop() selector!: string; // If there is compared sign
  @Prop({ default: false }) enterable!: boolean; // 是否可输入

  private isClose: boolean = true;
  private currentValue: string = this.value;
  private currentComparedValue: string = this.comparedValue;
  private currentSign: string = this.sign;
  private isShowEdit: boolean = false;
  private currentOptions: Array<any> = this.options;
  // 是显示选择
  private isShowOptions: boolean = false;
  // 样式
  private optionsStyle: any = {};

  // 打开时的数据状态
  private selectedData: any;
  // 用于标记
  private tagClass: string = 'sr-select-20201029001';
  private originValue: string = this.value;
  private isEditing: boolean = false;
  private currentNode: any;
  private popper: any;
  private currentDiffValue: string = this.diffValue; // v-model may be not really show data;
  @Watch('comparedValue')
  getComparedValue(comparedValue: string) {
    this.currentComparedValue = comparedValue;
  }

  @Watch('diffValue')
  getDiffValue(diffValue: string) {
    this.currentDiffValue = diffValue;
  }

  @Watch('sign')
  getSign(sign: string) {
    this.currentSign = sign;
  }

  @Watch('options')
  getOptions(options: Array<any>) {
    this.currentOptions = options;
  }

  handleBlur() {
    this.isEditing = false;
    if (this.currentValue !== this.originValue) {
      let value = this.currentValue;
      for (let i = 0; i < this.options.length; ++i) {
        if (value === this.options[i].value) {
          this.currentValue = this.options[i].label;
          value = this.options[i].label;
          break;
        }
      }
      this.currentOptions = this.options;
      this.$emit('blur', this);
    }
  }

  handleClick(evt: any) {
    if (this.isClose) {
      if (!this.popper) {
        this.popper = new Popper(this.selector ? this.selector : this.$el, this.calOptionsPos);
        this.popper.addScrollEvent();
      }
      this.currentNode = evt.currentTarget.parentNode.parentNode;
      this.calOptionsPos();
      this.$refs.refOptions.show();
      this.$emit('click', { thisObject: this });
    } else {
      this.handleClose();
    }
  }

  calOptionsPos() {
    const clientRect = this.currentNode.getBoundingClientRect();
    this.isClose = false;
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
    let topHeight = 204;
    if (this.currentOptions.length < 6) {
      topHeight = 34 * this.currentOptions.length;
    }
    this.optionsStyle = {
      left: left + 'px',
      top: (top + topHeight > height ? top - topHeight - 4 - clientHeight : top) + 'px'
    };
  }

  handleMouseEnter() {
    this.timeout && clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.isShowEdit = true;
    }, this.$var.SCROLLDELAY);
  }

  handleMouseLeave() {
    this.timeout && clearTimeout(this.timeout);
    if (this.isClose) {
      this.isShowEdit = false;
    }
  }

  handleSelected(data: any, options: any) {
    this.handleClose();
    this.$emit('change', data.label);
    this.$emit('selected', data, options);
  }

  handleClose() {
    this.$refs.refOptions.hide();
    this.isClose = true;
    this.isShowEdit = false;
    this.popper && this.popper.removeScrollEvent();
    this.popper = null;
  }

  handleFocus() {
    this.isEditing = true;
  }

  initEvent(evt: Event) {
    if (!this.$el.contains(evt.target)) {
      if (this.$refs.refOptions) {
        this.$refs.refOptions.reset();
        this.handleClose();
      }
    }
  }

  mounted() {
    this.currentValue = this.value;
    document.addEventListener('click', this.initEvent);
  }

  beforeDestroy() {
    const srOptions = document.querySelectorAll('.sr-options');
    srOptions &&
      srOptions.forEach((item: HTMLDivElement) => {
        item.style.display = 'none';
      });
  }
}
export default SrSelect;
