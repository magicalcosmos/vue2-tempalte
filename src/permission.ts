import Vue from 'vue';
import router from './router';
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css'; // Progress 进度条样式

import LocalStorage from '@/utils/localStorage';
import { default as store } from './store';
import common from '@/utils/common';
import { LICENSEFUNC, LICENSESTATUS, MODULESTATUS } from '@/utils/dict';
import { CommonPath, AdminPath } from '@/router/paths';

import config from '../package.json';

function setTitleDynamically() {
  document.title = config.productName;
}

function nextPage(role, to, next) {
  if (!role) { // 刷新浏览器重新获取用户信息
    common
      .getUserInformation()
      .then((status: any) => {
        next({ ...to, replace: true }); // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
      })
      .catch(error => {
        if (error && error.message === 'Network Error') {
          Vue.prototype.$message.error(error.message);
        } else if (error && error.message === 'LICENSE NOT FOUND') {
          if (to.fullPath === CommonPath.HomePage) {
            next({
              path: CommonPath.InvalidLicense
            });
          } else {
            next({ ...to, replace: true }); // 未创建许可证时需要跳转页面
          }
        } else {
          next({
            path: CommonPath.Login
          });
        }
      });
  } else {
    next();
  }
};
router.beforeEach((to, from, next) => {
  NProgress.start();
  setTitleDynamically();
  if (to.meta.isRequiredAuthentication === false) {
    // 不需要鉴权
    next();
  } else if (LocalStorage.getToken()) {
    // 用户角色
    const role = store.getters.user.role;
    // 页面不受License控制
    if (to.meta.isWithoutRequiredLicense) {
      nextPage(role, to, next);
    } else {
      // 许可证全局状态
      const licenseStatus = store.getters.licenseStatus.licenseStatus;
      if (to.meta && (to.meta.staticAnalyze || to.meta.unitTest || to.meta.integrationTest)) {
        // 静态、单元、集成许可证不存在或过期
        next({
          path: CommonPath.InvalidLicense
        });
      } else if (to.path === CommonPath.Login) {
        // 登录页
        next({
          path: CommonPath.HomePage
        });
        NProgress.done(); // if current page is dashboard will not trigger	afterEach hook, so manually handle it
      } else if (licenseStatus === LICENSESTATUS.USERS_OVER_LIMIT) {
        // 用户人数超过上限
        next({
          path: CommonPath.InvalidLicense
        });
      } else {
        nextPage(role, to, next);
      }
    }
  } else {
    // 退出登录
    next({
      path: CommonPath.Login
    });
  }
  NProgress.done();
});

router.afterEach(() => {
  NProgress.done(); // 结束Progress
});
