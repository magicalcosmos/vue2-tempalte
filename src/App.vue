<template>
  <div id="app">
    <transition>
      <keep-alive :include="componentNames">
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from 'vue-property-decorator';
@Component
class App extends Vue {
  get componentNames() {
    return this.$store.state.catchComponents.componentNames;
  }
}
export default App;
</script>
