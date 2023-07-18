import {} from '@/utils/dict';
const auth = {
  inserted(el, bindings, vnode) {
    const value = bindings.value;
    const state = vnode.context.$store.state;
    let isShow = state.user.privilege[value];
    const privilege = state.user.privilege;
    const license = state.routes.licenseStatus.license;
    const modules = license && license.modules;
    let elArray;
    if (value.indexOf('_') !== -1) {
      elArray = value.split('_');
      let mod = null;
      if (elArray.length === 3) {
        isShow = privilege[elArray[0]] || privilege[elArray[1]];
        mod = elArray[2];
      } else if (elArray.length > 0) {
        isShow = privilege[elArray[0]];
        mod = elArray[1];
      }
      if (modules && mod && (!modules[mod] || modules[mod].status === undefined)) {
        isShow = false;
      }
      // no license
      if (license === undefined) {
        isShow = false;
      }
    } else if (value.indexOf('&') !== -1) {
      elArray = value.split('&');
      if (elArray.length === 2) {
        isShow = isShow = privilege[elArray[0]] || privilege[elArray[1]];
      }
    }
    !isShow && el.parentNode.removeChild(el);
  }
};
export default auth;
