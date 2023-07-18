const hide = {
  inserted(el, bindings, vnode) {
    const value = bindings.value;
    el.style.visibility = !value ? 'hidden' : 'visible';
  }
};
export default hide;
