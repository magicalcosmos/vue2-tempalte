<template>
  <div class="app-wrapper d-flex flex-column">
    <Head v-if="!this.$route.meta.hideHeader"></Head>
    <div class="out-app-main flex-grow-1">
      <app-main></app-main>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { AppMain, Head } from '@/views/components';
import router from '@/router';
import { watch } from 'fs';
@Component({
  components: {
    AppMain,
    Head
  }
})
class Layout extends Vue {
  private fullHeight: number = document.documentElement.clientHeight - 36;
  handleListenWindowResize() {
    window.onresize = () => {
      this.fullHeight = document.documentElement.clientHeight - 36;
    };
  }
  mounted() {
    // this.handleListenWindowResize();
  }
}

export default Layout;
</script>
