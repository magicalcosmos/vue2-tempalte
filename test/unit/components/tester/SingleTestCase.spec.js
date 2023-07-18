/* eslint-disable no-undef */
import SingleTestCase from '@/views/components/tester/TestCase/SingleTestCase/index.vue';
import TestCaseTree from '@/views/components/tester/TestCaseTree/index.vue';
import { shallowMount } from '@vue/test-utils';
import store from '../../../../src/store';
import Mock from 'mockjs';
import i18n from '@/i18n';
import common from '@/utils/common';
import { FunctionsManagement, TestCaseManagement } from '@/api';
import { typeSystemData, variablesData, functionInvokeData, testCaseData } from './SingleTestCaseData.js';

common.i18n = key => i18n.t(key);

const data = {
  functionId: '61722aeb358f1d10e9f93b39',
  testId: '61722afb358f1d10e9f93ce2',
  fileId: '616fd5f0780b8c7e9baf2c8c',
  number: 1,
  rowIndex: 0
};
TestCaseManagement.getTypeSystem = function(testId, callback) {
  return new Promise((resolve, reject) => {
    if (testId) {
      resolve(typeSystemData);
      callback(null, typeSystemData);
    } else {
      reject();
      callback({}, null);
    }
  });
};
FunctionsManagement.getVariables = function(functionId, callback) {
  return new Promise((resolve, reject) => {
    if (functionId) {
      resolve(variablesData);
      callback(null, variablesData);
    } else {
      reject();
      callback({}, null);
    }
  });
};

FunctionsManagement.fetchFunctionInvokeData = function(functionId, callback) {
  return new Promise((resolve, reject) => {
    if (functionId) {
      resolve(functionInvokeData);
      callback(null, functionInvokeData);
    } else {
      reject();
      callback({}, null);
    }
  });
};

TestCaseManagement.detail = function(testId, callback) {
  return new Promise((resolve, reject) => {
    if (testId) {
      resolve(testCaseData);
      callback(null, testCaseData);
    } else {
      reject();
      callback({}, null);
    }
  });
};

const mountItem = {
  store,
  mocks: {
    $t: key => i18n.t(key),
    common: {
      isIntegrationTest: () => {
        return true;
      }
    }
  }
};

const factory = options => {
  return shallowMount(SingleTestCase, {
    ...options,
    ...mountItem
  });
};



describe('SingleTestCase.vue', () => {
  it('Renders SingleTestCase', async() => {
    const wrapper = factory();
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('div.single-test-case').isVisible()).toBe(true);
    expect(wrapper.contains(TestCaseTree)).toBe(true);
    expect(wrapper.find('section.pop-over-malloc').isVisible()).toBe(true);
    expect(wrapper.contains('r-button')).toBe(true);
    expect(wrapper.contains('r-menu')).toBe(true);
    expect(wrapper.contains('r-submenu')).toBe(true);
    expect(wrapper.contains('r-menu-item-group')).toBe(true);
    expect(wrapper.contains('r-menu-item')).toBe(true);
    wrapper.destroy();
  });
  it('Test test', () => {
    const wrapper = factory();
    expect(wrapper.find('div.single-test-case span').text()).toBe(wrapper.vm.getTestCaseTableData);
    expect(wrapper.find('r-menu-item[index="add_ab_addr"]').text()).toBe(i18n.t('button.add_ab_addr'));
    expect(wrapper.find('r-menu-item[index="add_ex_var"]').text()).toBe(i18n.t('button.add_ex_var'));
    expect(wrapper.find('r-menu-item[index="init_code"]').text()).toBe(i18n.t('button.init_code'));
    expect(wrapper.find('r-menu-item[index="delete"]').text()).toBe(i18n.t('button.delete_test_case'));
    wrapper.destroy();
  });

  describe('Test props', () => {
    it('Test the data of props', async() => {
      const wrapper = factory();
      await wrapper.setProps({
        data: data
      });
      expect(wrapper.props('data')).toEqual(data);
      expect(wrapper.vm.currentData).toEqual(data);
      expect(wrapper.vm.typeSystemData).toEqual(typeSystemData.data);
      expect(wrapper.vm.testCaseData).toEqual(testCaseData.data);
      wrapper.destroy();
    });
    it('Test the version of props', async() => {
      const wrapper = factory();
      await wrapper.setProps({
        version: data
      });
      expect(wrapper.props('version')).toEqual(data);
      wrapper.destroy();
    });
  });
});


