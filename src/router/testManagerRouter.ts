import { CommonPath } from './paths';
const testManagerRouter = [
  {
    title: 'board',
    path: CommonPath.HomePage,
    redirect: 'redirect',
    hidden: true,
    meta: {
      isRequiredAuthentication: true
    }
  }
];
export default testManagerRouter;
