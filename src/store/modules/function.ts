const func = {
  state: {
    functionData: {},
    funcConstructorStatus: false
  },

  mutations: {
    setFunctionData: (state, data) => {
      state.functionData = data;
    },
    FUNC_CONSTRUCTOR_STATUS: (state, has) => {
      state.funcConstructorStatus = has;
    }
  },

  actions: {
    SET_FUNCTION_DATA: ({ commit }, data) => {
      commit('setFunctionData', data);
    },
    // If func has constructor
    FUNC_CONSTRUCTOR_STATUS: ({ commit }, has) => {
      commit('FUNC_CONSTRUCTOR_STATUS', has);
    }
  }
};

export default func;
