const catchComponents = {
  state: {
    componentNames: [],
    /**
     * 当前活动的组件名
     */
    activeComponentName: ''
  },

  mutations: {
    SET_NAME: (state, name) => {
      state.componentNames = name;
    },
    SET_ACTIVE_COMPONENT_NAME: (state, name) => {
      state.activeComponentName = name;
    }
  }
};

export default catchComponents;
