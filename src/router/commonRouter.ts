import { CommonPath } from './paths';
const commonRouter = [
  {
    title: '登录',
    path: CommonPath.Login,
    name: 'Login',
    hidden: true,
    meta: {
      isRequiredAuthentication: false
    }
  },
  {
    title: '版本信息',
    path: CommonPath.VersionInfo,
    name: 'VersionInfo',
    hidden: true,
    meta: {
      isRequiredAuthentication: true
    }
  },
  {
    title: '无法找到页面',
    path: CommonPath.NotFound,
    name: 'NotFound',
    hidden: true,
    meta: {
      isRequiredAuthentication: false
    }
  },
  {
    title: '测试组件页面',
    path: CommonPath.TestComponents,
    name: 'TestComponents',
    hidden: true,
    meta: {
      isRequiredAuthentication: false
    }
  },
  {
    title: '修改密码',
    path: CommonPath.ChangePassword,
    name: 'ChangePassword',
    meta: {
      isRequiredAuthentication: true
    }
  },
  {
    title: '通用header',
    path: '/error',
    name: 'Layout',
    component: () => import('@/views/Layout/index.vue'),
    hidden: true,
    children: [
      {
        title: '无效的证书',
        path: CommonPath.InvalidLicense,
        name: 'InvalidLicense',
        hidden: true,
        meta: {
          isRequiredAuthentication: true,
          isWithoutRequiredLicense: true
        }
      }
    ]
  },
  {
    title: '跳转页面（postmessage）',
    path: CommonPath.Redirect,
    name: 'Redirect',
    hidden: true,
    meta: {
      isRequiredAuthentication: true
    }
  }
];
export default commonRouter;
