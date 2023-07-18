const config = {
  state: {
    API_BASE: '',
    WS_ENDPOINT: ''
  },

  mutations: {
    SET_CONFIG: (state, configObject) => {
      state.API_BASE = configObject.API_BASE;
      state.WS_ENDPOINT = configObject.WS_ENDPOINT;
    }
  },
  actions: {
    setConfig: ({ commit }, configObject) => {
      commit('SET_CONFIG', configObject);
    }
  }
};

export default config;
