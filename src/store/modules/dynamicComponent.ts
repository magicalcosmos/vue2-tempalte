import { common } from '@/utils';
const messages = {
  state: {
    // 动态组件
    dynamicComponentParams: {
      data: '',
      componentName: '',
      save: () => {},
      cancel: () => {},
      dynamicCustomData: {}
    }
  },
  mutations: {
    DYNAMIC_COMPONENT: (state, params) => {
      for (const key in params) {
        if (typeof params[key] === 'function' || typeof params[key] !== 'object') {
          state.dynamicComponentParams[key] = params[key];
        } else {
          // 解除引用
          state.dynamicComponentParams[key] = common.deepClone(params[key]);
        }
      }

    }
  },

  actions: {
    DYNAMIC_COMPONENT: ({ commit }, params) => {
      commit('DYNAMIC_COMPONENT', params);
    }
  }
};

export default messages;
