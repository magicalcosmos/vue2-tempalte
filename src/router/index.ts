import Vue from 'vue';
import Router from 'vue-router';
import { CommonRouter } from './router';
!process.env.VUE_APP_TEST_ENV && Vue.use(Router); // solved => [vue-test-utils] could not overwrite property $route, this is usually caused by a plugin that has added the property as a read-only value
Vue.config.productionTip = false;

const scrollBehavior = function(to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition;
  }
  if (to.hash) {
    return {
      selector: to.hash
    };
  }
};

export default new Router({
  mode: 'history', //后端支持可开
  base: '',
  scrollBehavior: scrollBehavior,
  routes: CommonRouter
});
// for Avoided redundant navigation to current location
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
