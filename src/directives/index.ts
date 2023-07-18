import Auth from './auth';
import Hide from './hide';
import Drag from './drag';
import DragScroll from './dragscroll';
import focus from './focus';

export default Vue => {
  Vue.directive('auth', Auth);
  Vue.directive('hide', Hide);
  Vue.directive('drag', Drag);
  Vue.directive('dragscroll', DragScroll);
  Vue.directive('focus', focus);
};
