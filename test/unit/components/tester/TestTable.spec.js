/* eslint-disable no-undef */
import TestTable from '@/views/components/tester/TestTable/index.vue';
import { shallowMount } from '@vue/test-utils';
import i18n from '@/i18n';
import common from '@/utils/common.ts';
import Mock from 'mockjs';
import RWebSocket from '@/utils/websocket';
import { FunctionsManagement, TestCaseManagement } from '@/api';
import store from '../../../../src/store';


const _codeDefectsData = Mock.mock({
  data: {
    data: []
  }
});
FunctionsManagement.codeDefects = function(functionId, params, callback) {
  return new Promise((resolve, reject) => {
    if (functionId && params) {
      resolve();
      callback('', _codeDefectsData);
    } else {
      reject();
      callback('unkonw error', null);
    }
  });
};

const listData = Mock.mock({
  data: {
    pagination: {
      page: 1,
      perPage: 10000,
      order: 'asc',
      sortBy: 'number',
      total: 1
    },
    tests: [
      {
        testId: '616e740cdae51504e9416d90',
        functionId: '616e70e3dae51504e9416a9b',
        kind: 0,
        description: '',
        result: {
          kind: 4,
          log: null,
          location: null
        },
        userDefinedFields: [],
        number: 1
      }
    ]
  }
});
TestCaseManagement.list = function(params, callback) {
  return new Promise((resolve, reject) => {
    if (params) {
      resolve();
      callback('', listData);
    } else {
      reject();
      callback('unkonw error', null);
    }
  });
};

const mountItem = {
  store,
  mocks: {
    $t: key => i18n.t(key),
    $ws: RWebSocket
  }
};

const factory = options => {
  return shallowMount(TestTable, {
    ...options,
    ...mountItem
  });
};
const wsMessage = {
  cmd: 'add',
  domain: 'testCase',
  data: {
    projectId: '616cd5eeed00316bd7128b64',
    versionId: '616cd6ceed00316bd7128c23',
    fileId: '616cd746ed00316bd7128c6c',
    functionId: '616e70e3dae51504e9416a9b',
    kind: 0,
    data: {},
    description: '',
    number: 1,
    testId: '616e740cdae51504e9416d90'
  }
};
const data = {
  functionId: '616d251b8ceab03b724b6ddc',
  selectedFile: {
    id: '616cd746ed00316bd7128c6c',
    fileId: '616cd746ed00316bd7128c6c',
    parentId: '616cd746ed00316bd7128c68',
    fileName: 'main.c',
    name: 'main.c',
    path: './main.c',
    status: 205,
    kind: 1,
    statementCoverage: 0.36363636363636365,
    branchCoverage: 0.5,
    invokeCoverage: 1,
    invokedFuncCoverage: 0.8333333333333334,
    defectsCount: {},
    failed: true,
    fileCount: {
      _c: 1
    },
    blockFilesCount: {},
    content: '#include "func.h"\n#include <stdio.h>\n#define BASE_ADDR 0x10000000\n#define EXT_ADDR (BASE_ADDR + 100)\nint g1=1;\nint g2=2;\nstatic int g6;\nint main1(){\n    \n    int a=10;\n    int b=20;\n    int sum=add1(a,b);\n    printf("sum:%d",sum);\n   printf("g:%d",g1+g2);\n  printf("g6:%d",g6);\n   static int s1=1;\n   printf("s1:%d",s1);\n    return 0;\n}\n\nint test_main_pointer(int *p) {\n  if (!p) return 0;\n  if (p[10]) return 1;\n  if (*p) return 2;\n  return 3;\n}\n\n\nint testFixAddr(int p1)\n{\n  int x = *((int *)BASE_ADDR + 1);\n  return x + p1;\n}\n\n',
    repository: {}
  },
  functionData: {
    id: '616d251b8ceab03b724b6ddc',
    elementId: '616d251b8ceab03b724b6ddc',
    fileId: '616cd746ed00316bd7128c6c',
    parentId: '616cd746ed00316bd7128c6c',
    name: 'main1',
    fullName: 'main1()',
    kind: 30,
    status: 0,
    index: 1,
    language: 'c',
    unread: false,
    isConstructor: false,
    userDefinedFields: [
      {
        value: null,
        key: '60a4b9cddf811414fc5d906a',
        name: 'test-func'
      }
    ],
    testCaseCreate: true,
    location: {
      column: 1,
      line: 8
    },
    statementCoverage: 0,
    invokeCoverage: 1,
    invokedFuncCoverage: 1,
    failed: false,
    functionId: '616d251b8ceab03b724b6ddc',
    functionName: 'main1',
    description: ''
  },
  version: {
    versionId: '616cd6ceed00316bd7128c23',
    versionName: 'v1',
    createAt: 1634522830000,
    visitAt: 1634522830075,
    finishAt: 1634522830075,
    environmentChanged: false,
    headers: {
      suffixes: [
        '.h'
      ]
    },
    languages: {
      c: {
        standard: 'c89',
        suffixes: [
          '.c'
        ]
      }
    },
    includes: [
      './'
    ],
    macros: [],
    caseSensitive: true,
    systemType: 32,
    repository: {
      type: 'git',
      url: 'http://localhost:9526/6139a0f6e9160d28d93c40b2/616cd5eeed00316bd7128b64'
    },
    language: 'c',
    environment: 'localhost',
    ignoreAsm: true,
    projectType: 'gcc',
    exits: [],
    rootDirectory: {
      id: '616cd746ed00316bd7128c68',
      fileId: '616cd746ed00316bd7128c68',
      fileName: '.',
      name: '.',
      path: '.',
      status: 201,
      kind: 2,
      statementCoverage: 0.5238095238095238,
      branchCoverage: 0.38461538461538464,
      mcdcCoverage: 0.2727272727272727,
      invokeCoverage: 0.9473684210526315,
      invokedFuncCoverage: 0.9230769230769231,
      defectsCount: {},
      failed: true,
      fileCount: {
        _: 1,
        _c: 6,
        _h: 1
      },
      blockFilesCount: {}
    },
    unitTest: {
      eventReminder: {
        defectsCleared: 0,
        configConfirmed: true,
        parsed: false,
        regressionStatusPrompt: 0,
        firstVisit: 0
      },
      timeoutTestGen: 10,
      timeoutTestRun: 10,
      coverages: 7,
      status: 1,
      strictOutputCheck: false
    },
    staticAnalyze: {
      eventReminder: {
        defectsCleared: 0,
        configConfirmed: false,
        parsed: false,
        regressionStatusPrompt: 0,
        firstVisit: 0
      },
      status: 1
    },
    integrationTest: {
      eventReminder: {
        defectsCleared: 0,
        configConfirmed: true,
        parsed: true,
        regressionStatusPrompt: 0,
        firstVisit: 0
      },
      fileRelation: true,
      timeoutTestRun: 10,
      coverages: 30,
      status: 1,
      strictOutputCheck: false
    }
  }
};

describe('TestTable.vue', () => {
  it('Renders TestTable', async() => {
    const wrapper = factory();
    const copyData = common.deepClone2(data);
    await wrapper.setProps({
      data: copyData
    });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('#testTableId').exists()).toBe(true);
    expect(wrapper.contains('r-table')).toBe(true);
    expect(wrapper.contains('r-table-column')).toBe(true);
    expect(wrapper.find('.code-defect-enter').isVisible()).toBe(true);
    wrapper.destroy();
  });
  describe('Test Props', () => {
    it('Test the data of Props', async() => {
      const wrapper = factory();
      const copyData = common.deepClone2(data);
      await wrapper.setProps({
        data: copyData
      });
      expect(wrapper.props('data')).toEqual(copyData);
      expect(wrapper.vm.currentData).toEqual(copyData);
      expect(wrapper.vm.functionId).toEqual(copyData.functionData.functionId);
      expect(wrapper.vm.tableData).not.toBeNull();
      expect(wrapper.emitted('listenTable')).toBeTruthy();
      expect(wrapper.emitted('listenTable')[0]).toEqual([listData.data.tests, wrapper.vm.isFilter]);
      wrapper.destroy();
    });
    it('Test the wsMessage of Props', async() => {
      const wrapper = factory({
        propsData: {
          data: data
        }
      });
      await wrapper.setProps({
        wsMessage: wsMessage
      });
      expect(wrapper.props('wsMessage')).toEqual(wsMessage);
      expect(wrapper.vm.tableData).not.toBeNull();
      wrapper.destroy();
    });
    it('Test the isShowCFG of Props', async() => {
      const wrapper = factory();
      const copyData = common.deepClone2(data);
      const _isShowCFG = true;
      await wrapper.setProps({
        data: copyData,
        isShowCFG: _isShowCFG
      });
      expect(wrapper.props('isShowCFG')).toEqual(_isShowCFG);
      expect(wrapper.emitted('selectedTestCaseList')).toBeTruthy();
      const selectedTestCaseList = wrapper.vm.tableData.filter((item, index) => {
        return item.isSelect;
      });
      expect(wrapper.emitted('selectedTestCaseList')[0]).toEqual([selectedTestCaseList]);
      wrapper.destroy();
    });
  });
  describe('Test Methods', () => {
    it('Test currentRowSelect', async() => {
      const wrapper = factory();
      wrapper.setProps({
        data: data
      });
      const val = Mock.mock('@word');
      await wrapper.vm.currentRowSelect(val);
      expect(wrapper.vm.currentRow).toEqual(val);
      wrapper.destroy();
    });
    it('Test selectSingleTestCase', async() => {
      const wrapper = factory();
      const copyData = common.deepClone2(data);
      await wrapper.setProps({
        data: copyData
      });
      const row = { index: 0 };
      const column = {};
      const event = {};
      await wrapper.vm.selectSingleTestCase(row, column, event);
      expect(wrapper.emitted('click')).toBeTruthy();
      expect(wrapper.emitted('click')[0]).toEqual([row, column, event]);
      wrapper.destroy();
    });
    it('Test tableRowClassName', async() => {
      const wrapper = factory();
      const copyData = common.deepClone2(data);
      await wrapper.setProps({
        data: copyData
      });
      const params = { row: { isSelect: true }, rowIndex: 0 };
      const res = await wrapper.vm.tableRowClassName(params);
      expect(res).toEqual('current-row');
      wrapper.destroy();
    });
    it('Test handleCellMouseEnter', async() => {
      const wrapper = factory();
      const copyData = common.deepClone2(data);
      await wrapper.setProps({
        data: copyData
      });
      const row = {};
      const column = {};
      const cell = {
        className: ''
      };
      const event = {};
      await wrapper.vm.handleCellMouseEnter(row, column, cell, event);
      expect(cell.className).toEqual(' description-over');
      wrapper.destroy();
    });
    it('Test handleCellMouseLeave', async() => {
      const wrapper = factory();
      const copyData = common.deepClone2(data);
      await wrapper.setProps({
        data: copyData
      });
      const row = {};
      const column = {};
      const cell = {
        className: ' description-over'
      };
      const event = {};
      await wrapper.vm.handleCellMouseLeave(row, column, cell, event);
      expect(cell.className).toEqual('');
      wrapper.destroy();
    });
    it('Test handleException', async() => {
      const wrapper = factory();
      const copyData = common.deepClone2(data);
      await wrapper.setProps({
        data: copyData
      });
      const testCase = {};
      const name = Mock.mock('@name');
      await wrapper.vm.handleException(testCase, name);
      expect(wrapper.emitted('dynamicComponent')).toBeTruthy();
      expect(wrapper.emitted('dynamicComponent')[0]).toEqual([testCase, 'CompiledError', wrapper.vm.handleLocation]);
      wrapper.destroy();
    });
    it('Test handleLocation', async() => {
      const wrapper = factory();
      const copyData = common.deepClone2(data);
      await wrapper.setProps({
        data: copyData
      });
      const location = {};
      await wrapper.vm.handleLocation(location);
      expect(wrapper.emitted('customFunction')).toBeTruthy();
      expect(wrapper.emitted('customFunction')[0]).toEqual([location]);
      wrapper.destroy();
    });
  });
});



