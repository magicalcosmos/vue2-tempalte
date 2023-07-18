import {
  CommonRouter,
  AdminRouter,
  TesterRouter,
  TestManagerRouter,
  InvalidLicenseRouter,
  NotFoundRouter,
  CommonWithHeaderRouter
} from '@/router/router';
import { ROLES, LICENSESTATUS, MODULESTATUS, LICENSEFUNC } from '@/utils/dict';
const routes = {
  state: {
    licenseStatus: {},
    routers: CommonRouter,
    addRouters: []
  },
  mutations: {
    SET_LICENSE_STATUS: (state, licenseStatus) => {
      state.licenseStatus = licenseStatus;
    },
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      state.routers = CommonRouter.concat(routers);
    }
  },
  actions: {
    initRoutes({ commit }, licenseStatus) {
      function setLicenseStatus(router) {
        // 包含静态、单元、集成的许可证
        const modules = licenseStatus.license && licenseStatus.license.modules;
        // 许可证失效状态
        const moduleStatus = [MODULESTATUS.EXPIRED, MODULESTATUS.BEFORE, MODULESTATUS.IN, MODULESTATUS.EXCEPTION];
        // 许可证的key
        const moduleKey = [LICENSEFUNC.STATICANALYZE, LICENSEFUNC.UNITTEST, LICENSEFUNC.INTEGRATION_TEST];
        moduleKey.forEach(item => {
          if (modules && router) {
            router.children.map((route: any) => {
              const module = modules[item];
              // 静态、单元、集成许可证不存在或过期
              if (
                route.meta[item] !== undefined &&
                (module === undefined || moduleStatus.includes(module.status))
              ) {
                route.meta[item] = LICENSESTATUS.INVALID;
              }
            });
          }
        });
      }
      return new Promise((resolve, reject) => {
        const role = this.state.user.role;
        var accessedRouters = [];
        if ((role & ROLES.SUPERADMIN) > 0 || (role & ROLES.ADMIN) > 0) {
          accessedRouters = accessedRouters.concat(AdminRouter);
        }
        if ((role & ROLES.TESTER) > 0) {
          setLicenseStatus(TesterRouter[0]);
          accessedRouters = accessedRouters.concat(TesterRouter);
        }
        if (licenseStatus.licenseStatus > LICENSESTATUS.NORMAL) {
          accessedRouters = accessedRouters.concat(InvalidLicenseRouter);
        }
        if ((role & ROLES.TESTERMANAGER) > 0) {
          setLicenseStatus(TestManagerRouter[0]);
          accessedRouters = accessedRouters.concat(TestManagerRouter);
        }

        // 测试人员与测试经理公用页面
        if ((role & ROLES.TESTER) > 0 || (role & ROLES.TESTERMANAGER) > 0) {
          accessedRouters = accessedRouters.concat(CommonWithHeaderRouter);
        }
        accessedRouters = accessedRouters.concat(NotFoundRouter);
        commit('SET_ROUTERS', accessedRouters);
        commit('SET_LICENSE_STATUS', licenseStatus);
        if (accessedRouters.length < 1) {
          reject('No roles!');
        } else {
          resolve(accessedRouters);
        }
      });
    }
  }
};

export default routes;
