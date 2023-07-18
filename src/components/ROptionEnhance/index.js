import ROptionEnhance from '../RSelectEnhance/src/option';

/* istanbul ignore next */
ROptionEnhance.install = function(Vue) {
  Vue.component(ROptionEnhance.name, ROptionEnhance);
};

export default ROptionEnhance;
