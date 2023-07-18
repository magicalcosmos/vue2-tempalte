<template>
  <div class="loading bg">
    <div class="loading-pop">
      <div class="loading-pop-wrap">
        <img src="@img/ticpsh_loading.gif" class="loading-img" />
        <!-- 普通加载loading -->
        <span v-if="isLoading" class="content">{{$t('load.loading')}}</span>

        <!-- 特殊上传loading, 可取消 -->
        <span v-if="upload.isUploading" class="content">
          {{$t('load.uploading')}}
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
