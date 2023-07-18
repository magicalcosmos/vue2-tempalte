const key = 'isCloseTips';
const license = {
  state: {
    /**
     * 关闭许可证到期提示，0表示不关闭提示，1标识关闭提示
     */
    closeTips: parseInt(localStorage.getItem(key))
  },

  mutations: {
    setCloseTips: (state, closeTips) => {
      state.closeTips = closeTips;
      localStorage.setItem(key, closeTips);
    }
  },

  actions: {
    SET_CLOSE_TIPS: ({ commit }, closeTips) => {
      commit('setCloseTips', closeTips);
    }
  }
};

export default license;
