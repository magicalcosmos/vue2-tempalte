
<template>
	<iframe
    id="manualId"
    :src="`/static/help/manual.html?${+new Date()}`"
    frameborder="0"
    height="100%"
    width="100%"
    onselectstart="return false"
  ></iframe>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
class Manual extends Vue {
  mounted() {
    const interval = setInterval(() => {
      let iframe = (document.getElementById('manualId') as any).contentWindow.document.body;
      if (iframe) {
        iframe.style.userSelect = 'none';
        clearInterval(interval);
      }
      iframe = null;
    }, 500);
  }
}
export default Manual; 
</script>
