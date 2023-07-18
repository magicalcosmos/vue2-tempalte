/* eslint-disable no-undef */
import ReportDefect from '@/views/components/Dialog/ReportDefect.vue';
import { shallowMount } from '@vue/test-utils';
import i18n from '@/i18n';
import { BaseDialog } from '@/views/components';
import { common } from '@/utils';
import Mock from 'mockjs';
import { FunctionsManagement, TestCaseManagement } from '@/api';

common.i18n = key => i18n.t(key);
FunctionsManagement.codeDefects = (functionId, params, callback) => {
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
TestCaseManagement.list = (params, callback) => {
  return new Promise((resolve, reject) => {
    if (params) {
      resolve();
      callback('', {
        data: {
          tests: [
            {
              testId: '614aca3f32a0497cd2be43fa',
              number: 1
            }
          ]
        }
      });
    } else {
      reject();
      callback('unkonw error', null);
    }
  });
};

FunctionsManagement.codeDefect = (defectId, callback) => {
  return new Promise((resolve, reject) => {
    if (defectId) {
      resolve();
      callback('', {
        data: {
          tests: [
            {
              testId: '614aca3f32a0497cd2be43fa',
              number: 1
            }
          ]
        }
      });
    } else {
      reject();
      callback('unkonw error', null);
    }
  });
};

const _codeDefectsData = Mock.mock({
  data: {
    'data|1-10': [
      {
        visible: true,
        functionId: '614aca3132a0497cd2be4009',
        defaultTestcase: {
          testId: '614aca3f32a0497cd2be43fa',
          number: 1
        },
        updateType: 'CREATE',
        defectId: '@id'
      }
    ]
  }
});

const _data = Mock.mock({
  visible: true,
  functionId: '614aca3132a0497cd2be4009',
  defaultTestcase: {
    testId: '614aca3f32a0497cd2be43fa',
    number: 1
  },
  updateType: 'CREATE',
  defectId: '@id'
});

const mountItem = {
  mocks: {
    $t: key => i18n.t(key)
  }
};

const factory = options => {
  return shallowMount(ReportDefect, {
    ...mountItem,
    ...options
  });
};

describe('ReportDefect.vue', () => {
  it('Render ReportDefect', () => {
    const wrapper = factory();
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.contains(BaseDialog)).toBe(true);
    expect(wrapper.find('.container').exists()).toBe(true);
    expect(wrapper.find('r-form').exists()).toBe(true);
    expect(wrapper.find('r-form-item').exists()).toBe(true);
    expect(wrapper.find('r-autocomplete').exists()).toBe(true);
    expect(wrapper.find('.mt-1.mb-1').exists()).toBe(true);
    expect(wrapper.findAll('.mt-1.mb-1').length).toBe(wrapper.vm.submitForm.locations.length);
    expect(wrapper.find('.inline-select').exists()).toBe(true);
    expect(wrapper.findAll('.inline-select r-option').length).toBe(wrapper.vm.selectLocationType().length);
    wrapper.destroy();
  });
  it('Test attributes', () => {
    const wrapper = factory();
    const selectLocationType = wrapper.vm.selectLocationType();
    expect(wrapper.attributes('title')).toBe(wrapper.vm.ADtitle);
    expect(wrapper.attributes('confirm')).toBe(i18n.t('button.sure'));
    expect(wrapper.findAll('r-form-item').at(0).attributes('label')).toBe(i18n.t('testcase.defect_desc'));
    expect(
      wrapper.findAll('r-form-item').at(1).attributes('label')).toBe(i18n.t('dialog.code_defect_location'));
    for (let i = 0; i < selectLocationType.length; i++) {
      const label = wrapper.vm.locationTypes[selectLocationType[i]].label;
      const value = wrapper.vm.locationTypes[selectLocationType[i]].value;
      expect(wrapper.findAll('.inline-select r-option').at(i).attributes('label')).toBe(label);
      expect(wrapper.findAll('.inline-select r-option').at(i).attributes('title')).toBe(label);
      expect(wrapper.findAll('.inline-select r-option').at(i).attributes('value')).toBe(value);
    }
    expect(wrapper.findAll('r-form-item').at(1).findAll('r-input').at(0).attributes('placeholder')).toBe(i18n.t('dialog.line_location'));
    expect(wrapper.findAll('r-form-item').at(1).findAll('r-input').at(1).attributes('placeholder')).toBe(i18n.t('dialog.col_location'));
    expect(wrapper.findAll('r-form-item').at(2).attributes('label')).toBe(i18n.t('dialog.link_testcase'));
    wrapper.destroy();
  });
  describe('Test Props', () => {
    it('Test the visible of Props', async() => {
      const wrapper = factory({
        propsData: {
          data: _data
        }
      });
      await wrapper.setProps({
        visible: true
      });
      await wrapper.vm.$nextTick();
      expect(wrapper.props('visible')).toBe(true);
      expect(wrapper.vm.submitForm).not.toBeNull();
      expect(wrapper.vm.functionId).toBe(_data.functionId);
      expect(wrapper.vm.defaultTestcase).toEqual(_data.defaultTestcase);
      expect(wrapper.vm.defectId).toBe(_data.defectId);
      expect(wrapper.vm.updateType).toBe(_data.updateType);
      expect(wrapper.vm.testcaseSelectNumberList.length).toBeGreaterThan(0);
      expect(wrapper.vm.testcaseList.length).toBeGreaterThan(0);
      wrapper.destroy();
    });
  });
});
