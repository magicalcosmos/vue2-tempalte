<!--
 * @Author: your name
 * @Date: 2020-06-28 14:56:02
 * @LastEditTime: 2020-10-23 10:03:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /rocket-web/src/components/AppMain/index.vue
-->
<template>
  <section class="app-main">
    <transition name="fade" mode="out-in">
      <keep-alive :include="componentNames">
        <router-view></router-view>
      </keep-alive>
    </transition>
    <loading v-show="loading"></loading>
    <!-- Dynamic Component start -->
    <component
      :is="dynamicComponent"
      :visible.sync="dynamicVisible"
      :data="dynamicData"
      :customData="dynamicCustomData"
      @save="dynamicSave"
    >
    </component>
    <!-- Dynamic Component end -->
    <input type="hidden" v-model="dynamicComponentParams" />
  </section>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Loading } from '@/components';
import { asyncComponentsTestCase } from './index.ts';

@Component({
  components: {
    Loading,
    ...asyncComponentsTestCase
  }
})
class AppMain extends Vue {
  //动态组件相关设置
  public dynamicComponent: string = '';
  public dynamicData: any = {};
  public dynamicSave: Function = () => {};
  public dynamicCancel: Function = () => {};
  public dynamicVisible: boolean = false;
  public dynamicCustomData: any = {}; // 传入除了data以外的自定义的数据

  /** 用于子孙组件调用根组件的handleDynamicComponent方法 */
  get dynamicComponentParams() {
    const params = this.$store.state.dynamicComponent.dynamicComponentParams;
    params.componentName && this.handleDynamicComponent(params);
    return this.$store.state.dynamicComponent.dynamicComponentParams;
  }

  /**
   * 动态组件公用方法
   * @param dynamicComponentAttributes
   */
  handleDynamicComponent(dynamicComponentAttributes: IDynamicComponentAttributes) {
    const componentName = dynamicComponentAttributes.componentName;
    this.dynamicVisible = true;
    this.dynamicData = dynamicComponentAttributes.data;
    this.dynamicCustomData = dynamicComponentAttributes.dynamicCustomData;
    this.dynamicSave = dynamicComponentAttributes.save;
    this.dynamicCancel = dynamicComponentAttributes.cancel;
    if (this.dynamicComponent !== componentName) {
      this.dynamicComponent = componentName;
    }
  }

  /**
   * 全局loading加载
   */
  get loading() {
    const loading = this.$store.state.loading;
    return loading.isLoading || loading.upload.isUploading;
  }

  get componentNames() {
    return this.$store.state.catchComponents.componentNames;
  }
}
export default AppMain;
</script>
