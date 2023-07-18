const cascader = {
  state: {
    // 用来保存定制化的cascader options, 为了避免大数组造成的页面卡顿
    optionsMap: {},
    secondOptionsMap: []
  },
  mutations: {
    SET_OPTIONS_MAP: (state: any, options: any) => {
      state.optionsMap[options.key] = options.value;
    },
    SET_SECOND_OPTIONS_MAP: (state: any, options: any) => {
      state.secondOptionsMap = options;
    }
  },
  actions: {
    SET_OPTIONS_MAP: ({ commit }, options: any) => {
      commit('SET_OPTIONS_MAP', options);
    },
    SET_SECOND_OPTIONS_MAP: ({ commit }, options: any) => {
      commit('SET_SECOND_OPTIONS_MAP', options);
    }
  }
};

export default cascader;
