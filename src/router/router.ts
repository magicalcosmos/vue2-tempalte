import CommonRouterData from './commonRouter';
import CommonWithHeaderRouterData from './commonWithHeaderRouter';
import AdminRouterData from './adminRouter';
import TesterRouterData from './testerRouter';
import TestManagerRouterData from './testManagerRouter';

/**
 * handle router data
 * @param newRouter
 * @param routerData
 * @param directory
 */
function handleRouter(newRouter: Array<any>, routerData: Array<any>, directory?: string) {
  routerData.map((routes: any) => {
    if (!routes.component) {
      routes.component = () => import(`@/views/${directory ? directory + '/' : ''}${routes.name}`);
    } else {
      routes.children && routes.children.map((child: any) => {
        child.component = () => import(`@/views/${directory ? directory + '/' : ''}${child.name}`);
      });
    }
    if (directory === undefined || directory === null) {
      newRouter.push(routes);
    }
    return routes;
  });
  if (directory !== undefined) {
    newRouter.push({
      path: '',
      component: () => import('@/views/Layout/index.vue'),
      name: 'Layout',
      hidden: true,
      children: routerData
    });
  }
}
const CommonRouter = [];
const CommonWithHeaderRouter = [];
const AdminRouter = [];
const TesterRouter = [];
const TestManagerRouter = [];

handleRouter(CommonRouter, CommonRouterData, undefined);
handleRouter(CommonWithHeaderRouter, CommonWithHeaderRouterData, '');
handleRouter(TestManagerRouter, TestManagerRouterData, 'testManager');
handleRouter(AdminRouter, AdminRouterData, 'systemManagement');
handleRouter(TesterRouter, TesterRouterData, 'tester');

const NotFoundRouter = [{ path: '*', redirect: '/404' }];
const InvalidLicenseRouter = [{ path: '*', redirect: '/invalidLicense' }];

export { CommonRouter, CommonWithHeaderRouter, AdminRouter, TesterRouter, TestManagerRouter, NotFoundRouter, InvalidLicenseRouter };
