import RBreadcrumb from './src/breadcrumb';

/* istanbul ignore next */
RBreadcrumb.install = function(Vue) {
  Vue.component(RBreadcrumb.name, RBreadcrumb);
};

export default RBreadcrumb;
