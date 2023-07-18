const config = {
  state: {
    ws: '',
    webSocketMessage: ''
  },

  mutations: {
    SET_WEBSOCKET: (state, ws) => {
      state.ws = ws;
    },
    SET_WEBSOCKET_MESSAGE: (state, webSocketMessage) => {
      state.webSocketMessage = webSocketMessage;
    }
  },
  actions: {
    setWebSocket: ({ commit }, ws) => {
      commit('SET_WEBSOCKET', ws);
    },
    setWebSocketMessage: ({ commit }, webSocketMessage) => {
      commit('SET_WEBSOCKET_MESSAGE', webSocketMessage);
    }
  }
};

export default config;
