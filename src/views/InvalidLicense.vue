<template>
  <section class="invalid-license">
    <div class="invalid-license-content"></div>
    <div class="exception">{{ $t('license.exception') }}</div>
    <div class="check" v-if="privilege.admin">{{ $t('license.admin_check')}}<span class="here-click" @click="handleHereClick">{{$t('common.here_click')}}</span>{{$t('license.to_update')}}</div>
    <div class="check" v-else>{{ $t('license.check') }}</div>
  </section>
</template>
<script lang='ts'>
import { Component, Prop, Vue, Watch, Emit, Mixins } from 'vue-property-decorator';
import PreventBrowserBack from '@/views/components/mixins/preventBrowserBack';
@Component
class InvalidLicense extends Mixins(PreventBrowserBack) {
  get privilege() {
    return this.$store.state.user.privilege;
  }
  handleHereClick() {
    this.$router.push({
      path: this.$paths.AdminPath.License
    });
  }

  mounted() {
    // 登录页进入后不允许后退 2021年9月9日13:42:12
    if (this.$route.query.currentPath === this.$route.path) {
      this.preventBack();
    }
  }
};
export default InvalidLicense;
</script>

<style lang="scss" scoped>
  .invalid-license {
    .invalid-license-content {
      background-image: url("../../static/img/icon_certificate_invalid.svg");
      background-repeat: no-repeat;
      width: 400px;
      height: 350px;
      margin: 40px auto;
    }
    width: 100%;
    height: 100%;
    text-align: center;
    .r-icon-document-delete {
      font-size: 80px;
      margin-top: 100px;
    }
    .exception {
      font-size: 30px;
      margin-top: 10px;
      color: $font-color-important;
      font-weight: bolder;
    }
    .check {
      font-size: 28px;
      margin-top: 10px;
      color: #666666;
      font-weight: bolder;
    }
    .here-click {
      color: $primary-color;
      cursor: pointer;
    }
  }
</style>
