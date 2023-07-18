/* eslint-disable no-undef */
import TestCaseWithDetail from '@/views/components/tester/TestCase/TestCaseWithDetail.vue';
import NoCaseTest from '@/views/components/tester/NoCaseTest.vue';
import TestTable from '@/views/components/tester/TestTable/index.vue';
import { shallowMount } from '@vue/test-utils';
import i18n from '@/i18n';
import { AddAbsoluteAddress, AddExternalVariables, SingleTestCase } from '@/views/components';
import common from '@/utils/common.ts';
import Mock from 'mockjs';

const mountItem = {
  mocks: {
    $t: key => i18n.t(key)
  }
};

const factory = options => {
  return shallowMount(TestCaseWithDetail, {
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

describe('TestCaseWithDetail.vue', () => {
  it('Renders TestCaseWithDetail', () => {
    const wrapper = factory({
      propsData: {
        data: data
      }
    });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.no-case-test-parent').isVisible()).toBe(false);
    expect(wrapper.contains(NoCaseTest)).toBe(true);
    expect(wrapper.contains('r-split-panes')).toBe(true);
    expect(wrapper.contains('r-pane')).toBe(true);
    expect(wrapper.find('r-split-panes').isVisible()).toBe(true);
    expect(wrapper.find('r-pane').isVisible()).toBe(true);
    expect(wrapper.contains(TestTable)).toBe(true);
    expect(wrapper.contains(SingleTestCase)).toBe(true);
    expect(wrapper.contains(AddAbsoluteAddress)).toBe(true);
    expect(wrapper.contains(AddExternalVariables)).toBe(true);
    wrapper.destroy();
  });
  describe('Test Props', () => {
    it('Test the data of Props', async() => {
      const wrapper = factory({
        propsData: {
          data: data
        }
      });
      const copyData = common.deepClone2(data);
      await wrapper.setProps({
        data: copyData
      });
      expect(wrapper.vm.testCaseData.fileId).toEqual(copyData.selectedFile.fileId);
      expect(wrapper.vm.selectedFile).toEqual(copyData.selectedFile);
      expect(wrapper.vm.currentData).toEqual(copyData);
      expect(wrapper.vm.isUnitTest).toEqual(common.isUnitTest());
      expect(wrapper.vm.enable).toEqual(true);
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
      expect(wrapper.vm.currentWSMessage).toEqual(wsMessage);
      wrapper.destroy();
    });
    it('Test the isShowCFG of Props', async() => {
      const wrapper = factory({
        propsData: {
          data: data
        }
      });
      const _isShowCFG = Mock.mock('@boolean');
      await wrapper.setProps({
        isShowCFG: _isShowCFG
      });
      expect(wrapper.vm.isShowCFG).toEqual(_isShowCFG);
      wrapper.destroy();
    });
    it('Test the isCSourceCode of Props', async() => {
      const wrapper = factory({
        propsData: {
          data: data
        }
      });
      const _isCSourceCode = Mock.mock('@boolean');
      await wrapper.setProps({
        isCSourceCode: _isCSourceCode
      });
      expect(wrapper.vm.isCSourceCode).toEqual(_isCSourceCode);
      wrapper.destroy();
    });
    it('Test the functionStatus of Props', async() => {
      const wrapper = factory({
        propsData: {
          data: data
        }
      });
      const _functionStatus = Mock.mock('@boolean');
      await wrapper.setProps({
        functionStatus: _functionStatus
      });
      expect(wrapper.vm.functionStatus).toEqual(_functionStatus);
      wrapper.destroy();
    });
    it('Test the TemfileId of Props', async() => {
      const wrapper = factory({
        propsData: {
          data: data
        }
      });
      const _TemfileId = Mock.mock('@guid');
      await wrapper.setProps({
        TemfileId: _TemfileId
      });
      expect(wrapper.vm.TemfileId).toEqual(_TemfileId);
      wrapper.destroy();
    });
    it('Test the code of Props', async() => {
      const wrapper = factory({
        propsData: {
          data: data
        }
      });
      await wrapper.setProps({
        code: data.selectedFile.content
      });
      expect(wrapper.vm.code).toEqual(data.selectedFile.content);
      wrapper.destroy();
    });
  });
  describe('Test Methods', () => {
    it('Test handleShowSingleTestCase', async() => {
      const wrapper = factory({
        propsData: {
          data: data
        }
      });
      const testCaseData = {
        functionId: data.functionId,
        testId: wsMessage.data.testId,
        fileId: data.selectedFile.fileId,
        number: wsMessage.data.number,
        index: 1
      };
      await wrapper.vm.handleShowSingleTestCase(testCaseData);
      expect(wrapper.vm.testCaseData.functionId).toEqual(testCaseData.functionId);
      expect(wrapper.vm.testCaseData.testId).toEqual(testCaseData.testId);
      expect(wrapper.vm.testCaseData.fileId).toEqual(testCaseData.fileId);
      expect(wrapper.vm.testCaseData.number).toEqual(testCaseData.number);
      expect(wrapper.vm.testCaseData.rowIndex).toEqual(testCaseData.index);
      wrapper.destroy();
    });
    it('Test handleDynamicComponent', async() => {
      const wrapper = factory({
        propsData: {
          data: data
        }
      });
      const _data = Mock.mock('@word');
      const componentName = Mock.mock('@word');
      const save = () => 1;
      const dynamicCustomData = Mock.mock('@word');
      await wrapper.vm.handleDynamicComponent(_data, componentName, save, dynamicCustomData);
      expect(wrapper.emitted('dynamicComponent')).toBeTruthy();
      expect(wrapper.emitted('dynamicComponent')[0]).toEqual([_data, componentName, save, dynamicCustomData]);
      wrapper.destroy();
    });
    it('Test handleCustomFunction', async() => {
      const wrapper = factory({
        propsData: {
          data: data
        }
      });
      const location = Mock.mock('@integer(1, 10)');
      await wrapper.vm.handleCustomFunction(location);
      expect(wrapper.emitted('customFunction')).toBeTruthy();
      expect(wrapper.emitted('customFunction')[0]).toEqual(['location', location]);
      wrapper.destroy();
    });
    it('Test handleSelectedTestCaseList', async() => {
      const wrapper = factory({
        propsData: {
          data: data
        }
      });
      const _dataArray = Mock.mock('@range(10)');
      await wrapper.vm.handleSelectedTestCaseList(_dataArray);
      expect(wrapper.emitted('selectedTestCaseList')).toBeTruthy();
      expect(wrapper.emitted('selectedTestCaseList')[0]).toEqual([_dataArray]);
      wrapper.destroy();
    });
    it('Test handleTestCaseMethod', async() => {
      const wrapper = factory({
        propsData: {
          data: data
        }
      });
      const _dataArray = Mock.mock('@range(10)');
      await wrapper.vm.handleTestCaseMethod(_dataArray);
      expect(wrapper.emitted('method')).toBeTruthy();
      expect(wrapper.emitted('method')[0]).toEqual([_dataArray]);
      wrapper.destroy();
    });
    it('Test handleLinkCode', async() => {
      const wrapper = factory({
        propsData: {
          data: data
        }
      });
      const locations = {};
      await wrapper.vm.handleLinkCode(locations);
      expect(wrapper.emitted('linkCode')).toBeTruthy();
      expect(wrapper.emitted('linkCode')[0]).toEqual([locations]);
      wrapper.destroy();
    });
    it('Test reloadFunctionData', async() => {
      const wrapper = factory({
        propsData: {
          data: data
        }
      });
      await wrapper.vm.reloadFunctionData();
      expect(wrapper.emitted('reloadFunctionData')).toBeTruthy();
      wrapper.destroy();
    });
    it('Test buttonOperate', async() => {
      const wrapper = factory({
        propsData: {
          data: data
        }
      });
      const method = Mock.mock('@word');
      await wrapper.vm.buttonOperate(method);
      expect(wrapper.emitted('operateButton')).toBeTruthy();
      expect(wrapper.emitted('operateButton')[0]).toEqual([method]);
      wrapper.destroy();
    });
    it('Test handleAddAbsAddrShow', async() => {
      const wrapper = factory({
        propsData: {
          data: data
        }
      });
      await wrapper.vm.handleAddAbsAddrShow();
      expect(wrapper.vm.addAbsAddrVisible).toBe(true);
      wrapper.destroy();
    });
    it('Test handleAddExternalVariable', async() => {
      const wrapper = factory({
        propsData: {
          data: data
        }
      });
      await wrapper.vm.handleAddExternalVariable();
      expect(wrapper.vm.functionId).toEqual(data.functionId);
      expect(wrapper.vm.addExternalVariablesVisible).toEqual(true);
      wrapper.destroy();
    });
    it('Test handleUpdateVisible', async() => {
      const wrapper = factory({
        propsData: {
          data: data
        }
      });
      const bool = Mock.mock('@boolean');
      await wrapper.vm.handleUpdateVisible(bool);
      expect(wrapper.vm.functionId).toEqual('');
      expect(wrapper.vm.addExternalVariablesVisible).toEqual(bool);
      wrapper.destroy();
    });
    it('Test handleTestCaseData', async() => {
      const wrapper = factory({
        propsData: {
          data: data
        }
      });
      const testCaseData = Mock.mock('@range(10)');
      await wrapper.vm.handleTestCaseData(testCaseData);
      expect(wrapper.emitted('testCaseData')).toBeTruthy();
      expect(wrapper.emitted('testCaseData')[0]).toEqual([testCaseData]);
      wrapper.destroy();
    });
    it('Test handleAddTestCase', async() => {
      const wrapper = factory({
        propsData: {
          data: data
        }
      });
      const testCaseData = Mock.mock('@range(10)');
      await wrapper.vm.handleAddTestCase(testCaseData);
      expect(wrapper.emitted('addTestCase')).toBeTruthy();
      wrapper.destroy();
    });
  });
});



