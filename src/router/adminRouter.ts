import { CommonPath, AdminPath } from './paths';
const adminRouter = [
  {
    title: '管理人员主页',
    path: CommonPath.HomePage,
    redirect: AdminPath.UserList,
    hidden: true,
    meta: {
      isRequiredAuthentication: true
    }
  }];
export default adminRouter;
