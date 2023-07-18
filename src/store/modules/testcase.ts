const testcase = {
  state: {
    fileTreeNodeSelected: '',
    testCaseList: [], //all test cases data for single function
    isNodeClick: false,
    mallocData: [],
    stubsData: [],
    absoluteAddressData: [],
    absoluteAddressExpData: [],
    copyTestCaseData: '',
    deleteTestCaseData: '',
    cfgTestCaseSelected: {},
    /** 选中的测试用例，主要用于CFG和调用关系图 */ 
    selectedTestCases: [],
    functionInvokeData: [],
    /** 折叠记忆 */ 
    foldMemory: {},
    /** 用例搜索关键字 */
    searchKeyword: {}, 
    /** 搜索折叠记忆 */
    searchFoldMemory: {}, 
    /** 用例显示配置 */
    testcaseFieldConfig: {}, 
    /** 选中的需要删除的用例 */
    testCaseForDelete: [], 
    /** 函数调用数据 */
    invokesData: {} 
  },
  mutations: {
    FILE_TREE_NODE_SELECTED: (state, fileTreeNodeSelected) => {
      state.fileTreeNodeSelected = fileTreeNodeSelected;
    },
    SAVE_TEST_CASE_DATA: (state, testCaseData) => {
      state.testCaseList = testCaseData;
    },
    SAVE_IS_NODE_CLICK: (state, status) => {
      state.isNodeClick = status;
    },
    SET_MALLOC_DATA: (state, mallocData) => {
      state.mallocData = mallocData;
    },
    SET_STUBS_DATA: (state, stubsData) => {
      state.stubsData = stubsData;
    },
    SET_ABSOLUTE_ADDRESS_DATA: (state, absoluteAddressData) => {
      state.absoluteAddressData = absoluteAddressData;
    },
    SET_SELECTED_ABSOLUTE_ADDRESS_EXP_DATA: (state, absoluteAddressExpData) => {
      state.absoluteAddressExpData = absoluteAddressExpData;
    },
    SET_CFG_TEST_CASE_SELECTED: (state, cfgTestCaseSelected) => {
      state.cfgTestCaseSelected = cfgTestCaseSelected;
    },
    COPY_TEST_CASE: (state, copyTestCaseData) => {
      state.copyTestCaseData = copyTestCaseData;
    },
    DELETE_TEST_CASE: (state, deleteTestCaseData) => {
      state.deleteTestCaseData = deleteTestCaseData;
    },
    SET_FUNCTION_INVOKE_DATA: (state, data) => {
      state.functionInvokeData = data;
    },
    SET_FOLD_MEMORY: (state: any, data: any) => {
      if (data && data.key) {
        state.foldMemory[data.key] = data.value;
      } else {
        state.foldMemory = {};
      }
    },
    SET_SEARCH_KEYWORD: (state: any, data: any) => {
      if (data && data.key) {
        state.searchKeyword[data.key] = data.value;
      } else {
        state.searchKeyword = {};
      }
    },
    SET_SEARCH_FOLD_MEMORY: (state: any, data: any) => {
      if (data && data.key) {
        state.searchFoldMemory[data.key] = data.value;
      } else {
        state.searchFoldMemory = {};
      }
    },
    SET_TESTCASE_FIELD_CONFIG: (state, data) => {
      state.testcaseFieldConfig = data;
    },
    SET_TESTCASE_FOR_DELETE: (state, data) => {
      state.testCaseForDelete = data;
    },
    SET_FUNCTION_INVOKES: (state, data) => {
      state.invokesData = data;
    },
    SET_SELECTED_TEST_CASES: (state, data) => {
      state.selectedTestCases = data;
    }
  },
  actions: {
    FILE_TREE_NODE_SELECTED: ({ commit }, fileTreeNodeSelected) => {
      commit('FILE_TREE_NODE_SELECTED', fileTreeNodeSelected);
    },
    SAVE_TEST_CASE_DATA: ({ commit }, testCaseData) => {
      commit('SAVE_TEST_CASE_DATA', testCaseData);
    },
    SAVE_IS_NODE_CLICK: ({ commit }, status) => {
      commit('SAVE_IS_NODE_CLICK', status);
    },
    SET_MALLOC_DATA: ({ commit }, mallocData) => {
      commit('SET_MALLOC_DATA', mallocData);
    },
    SET_STUBS_DATA: ({ commit }, stubsData) => {
      commit('SET_STUBS_DATA', stubsData);
    },
    SET_ABSOLUTE_ADDRESS_DATA: ({ commit }, absoluteAddressData) => {
      commit('SET_ABSOLUTE_ADDRESS_DATA', absoluteAddressData);
    },
    SET_SELECTED_ABSOLUTE_ADDRESS_EXP_DATA: ({ commit }, absoluteAddressExpData) => {
      commit('SET_SELECTED_ABSOLUTE_ADDRESS_EXP_DATA', absoluteAddressExpData);
    },
    // for cfg right click, test case selected
    SET_CFG_TEST_CASE_SELECTED: ({ commit }, cfgTestCaseSelected) => {
      commit('SET_CFG_TEST_CASE_SELECTED', cfgTestCaseSelected);
    },
    COPY_TEST_CASE: ({ commit }, copyTestCaseData) => {
      // for copy test case data
      commit('COPY_TEST_CASE', copyTestCaseData);
    },
    DELETE_TEST_CASE: ({ commit }, deleteTestCaseData) => {
      // for delete test case data
      commit('DELETE_TEST_CASE', deleteTestCaseData);
    },
    SET_FUNCTION_INVOKE_DATA: ({ commit }, data) => {
      commit('SET_FUNCTION_INVOKE_DATA', data);
    },
    SET_FOLD_MEMORY: ({ commit }, data: any) => {
      commit('SET_FOLD_MEMORY', data);
    },
    SET_SEARCH_KEYWORD: ({ commit }, data: any) => {
      commit('SET_SEARCH_KEYWORD', data);
    },
    SET_SEARCH_FOLD_MEMORY: ({ commit }, data: any) => {
      commit('SET_SEARCH_FOLD_MEMORY', data);
    },
    SET_TESTCASE_FIELD_CONFIG: ({ commit }, data: any) => {
      commit('SET_TESTCASE_FIELD_CONFIG', data);
    },
    SET_TESTCASE_FOR_DELETE: ({ commit }, data: any) => {
      commit('SET_TESTCASE_FOR_DELETE', data);
    },
    SET_FUNCTION_INVOKES: ({ commit }, data) => {
      commit('SET_FUNCTION_INVOKES', data);
    },
    SET_SELECTED_TEST_CASES: ({ commit }, data) => {
      commit('SET_SELECTED_TEST_CASES', data);
    }
  }
};

export default testcase;
