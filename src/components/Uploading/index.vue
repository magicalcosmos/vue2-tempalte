<template>
  <div class="loading bg">
    <div class="loading-pop">
      <div class="loading-pop-wrap">
        <img src="@img/ticpsh_loading.gif" class="loading-img" />
        <br/>
        <!-- 普通加载loading -->
        <span v-if="isLoading" class="loading">{{$t('load.loading')}}</span>

        <!-- 特殊上传loading, 可取消 -->
        <span v-if="upload.isUploading" class="loading">
          <span>{{$t('load.uploading')}}</span>
          <a class="cancelable" @click="handleCancel">{{$t('load.cancelable')}}</a>
        </span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
class Loading extends Vue {
  get isLoading() { // loading or downloading status
    return this.$store.state.loading.isLoading;
  }
  get upload() { // uploading status
    return this.$store.state.loading.upload;
  }
  /**
   * cancel upload event 
   */
  handleCancel() {
    const handleCancel = this.$store.state.loading.upload.handleCancel;
    handleCancel && handleCancel();
  } 

}
export default Loading;
</script>
