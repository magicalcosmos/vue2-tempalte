import RPopover from './src/main';
import directive from './src/directive';
import Vue from 'vue';

Vue.directive('popover', directive);

/* istanbul ignore next */
RPopover.install = function(Vue) {
  Vue.directive('popover', directive);
  Vue.component(RPopover.name, RPopover);
};
RPopover.directive = directive;

export default RPopover;
