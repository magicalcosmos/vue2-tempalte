const progress = {
  state: {
    percentage: '0%',
    visible: false
  },

  mutations: {
    SET_PERCENTAGE: (state, percentage) => {
      state.percentage = percentage;
    },
    SET_VISIBLE: (state, visible) => { 
      state.visible = visible;
    }
  },
  actions: {
    /**
     * set percentage
     * @param param0 
     */
    setFloatingBallPercentage({ commit }, percentage) {
      commit('SET_PERCENTAGE', percentage);
    },
    /**
     * is show percentage
     */
    setFloatingBallVisible({ commit }, visible) {
      commit('SET_VISIBLE', visible);
    }
  }
};

export default progress;
