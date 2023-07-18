const defect = {
  state: {
    /**
     * 缺陷列表
     */
    defectsList: [],
    rulesMap: {},
    filesDefinedMap: {}, // 文件分类数据
    reloadDefectTreeStatus: false // 数据重载标识
  },

  mutations: {
    SAVE_DEFECTS_LIST: (state, defectsList) => {
      state.defectsList = defectsList;
    },
    SAVE_RULES_MAP: (state, rulesMap) => {
      state.rulesMap = rulesMap;
    },
    SAVE_FILES_DEFINED_MAP: (state, data) => {
      state.filesDefinedMap = data;
    },
    CHANGE_RELOAD_DEFECT_TREE_STATUS: (state) => {
      state.reloadDefectTreeStatus = !state.reloadDefectTreeStatus;
    }
  },

  actions: {
    SAVE_DEFECTS_LIST: ({ commit }, defectsList) => {
      commit('SAVE_DEFECTS_LIST', defectsList);
    },
    SAVE_RULES_MAP: ({ commit }, rulesMap) => {
      commit('SAVE_RULES_MAP', rulesMap);
    },
    SAVE_FILES_DEFINED_MAP: ({ commit }, data) => {
      commit('SAVE_FILES_DEFINED_MAP', data);
    },
    CHANGE_RELOAD_DEFECT_TREE_STATUS: ({ commit }) => {
      commit('CHANGE_RELOAD_DEFECT_TREE_STATUS');
    }
  }
};

export default defect;
