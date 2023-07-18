// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueWorker from 'vue-worker';
import i18n from '@/i18n';
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import '@/theme/default/index.scss'; // global css
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import utils from '@/utils/utils';
import common from '@/utils/common';
import RWebSocket from '@/utils/websocket';
import Log from '@/utils/log';
import '@/icons'; // icon
import 'normalize.css/normalize.css'; // A modern alternative to CSS resets
import '../static/fonts/iconfont'; // global css
import '@/utils/jsextend';
import filters from '@/filters/index'; // global filters
import '@/utils/redefined';
import Variable from '@/utils/variable';
import RocketUI from '@/components/rocket-ui';
import directives from '@/directives';
import * as Paths from '@/router/paths';
Vue.use(filters);
Vue.use(directives);
Vue.use(RocketUI, { i18n: (key, value) => i18n.t(key, value) });
Vue.use(VueWorker);

//路由权限跳转控制
import './permission';

Vue.config.productionTip = false;
Vue.prototype.common = common;
Vue.prototype.utils = utils;
Vue.prototype.$log = Log;
Vue.prototype.$ws = RWebSocket;
Vue.prototype.$var = Variable;
Vue.prototype.$paths = Paths;

window['vm'] = new Vue({
  i18n,
  router,
  store,
  render: create => create(App)
}).$mount('#app');
