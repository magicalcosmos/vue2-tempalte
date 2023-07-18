const tree = {
  state: {
    construct: '',
    testCaseFileTreeDataMap: {} // 文件树数据
  },

  mutations: {
    SET_TREE_CONSTRUCT: (state, construct) => {
      state.construct = construct;
    },
    SET_TEST_CASE_FILE_TREE_DATA_MAP: (state, data) => {
      state.testCaseFileTreeDataMap = data;
    }
  },
  actions: {
    SET_TREE_CONSTRUCT: ({ commit }, construct) => {
      commit('SET_TREE_CONSTRUCT', construct);
    },
    SET_TEST_CASE_FILE_TREE_DATA_MAP: ({ commit }, data) => {
      commit('SET_TEST_CASE_FILE_TREE_DATA_MAP', data);
    }
  }
};

export default tree;
