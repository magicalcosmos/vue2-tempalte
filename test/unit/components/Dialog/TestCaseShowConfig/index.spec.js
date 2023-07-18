/* eslint-disable no-undef */
import TestCaseShowConfig from '@v/components/Dialog/TestCaseShowConfig';
import BaseDialog from '@v/components/Dialog/BaseDialog';
import i18n from '@/i18n';
import common from '@/utils/common';
import { mount, shallowMount } from '@vue/test-utils';
import Mock, { Random } from 'mockjs';
import { VARIABLETYPE } from '../../../../../src/utils/dict';

import RCheckbox from '@/components/RCheckbox/index.js';
import RCheckboxGroup from '@/components/RCheckboxGroup/index.js';
window['vm'].$i18n = i18n;

const mockData = Mock.mock({
  functionId: '61a04417e5b77906f0ff7211',
  dataDepth: 1,
  dataType: [2, 1],
  variableType: [1, 2, 3, 10, 20, 23]
});
const mountItem = {
  mocks: {
    $t: (a, b) => i18n.t(a, b),
    $message: {
      error: () => {}
    }
  },
  stubs: {
    RCheckboxGroup,
    RCheckbox
  },
  slots: {
    BaseDialog
  },
  propsData: {
    data: mockData
  }
};
const componentName = 'TestCaseShowConfig.vue';

let wrapper;
beforeEach(() => {
  wrapper = mount(TestCaseShowConfig, mountItem);
});
afterEach(() => {
  wrapper.destroy();
});
describe(`${componentName} UI`, () => {
  it(`[${componentName}] should be existed`, () => {
    expect(wrapper.exists()).toBe(true);
  });
  it(`[${componentName}] BaseDialog component should be existed`, () => {
    expect(wrapper.findComponent(BaseDialog).exists()).toBe(true);
  });

  const title = '配置用例数据展示';
  it(`[${componentName}] title should be ${title}`, () => {
    expect(wrapper.find('.dialog-title').text()).toContain(title);
  });

  const dataDeep = '数据深度';
  it(`[${componentName}] data deep should be ${dataDeep}`, () => {
    expect(wrapper.find('.data-deep').text()).toContain(dataDeep);
  });

  const dataType = '数据类型';
  it(`[${componentName}] data type should be ${dataType}`, () => {
    expect(wrapper.find('.data-type').text()).toContain(dataType);
  });
  const input = '输入';
  const output = '输出';
  it(`[${componentName}] data type optons are [${input}，${output}]`, () => {
    const dataTypeText = wrapper.find('.data-type').text();
    expect(dataTypeText).toContain(input);
    expect(dataTypeText).toContain(output);
  });

  const variableType = '变量类型';
  it(`[${componentName}] variable type should be ${variableType}`, () => {
    expect(wrapper.find('.variable-type').text()).toContain(variableType);
  });
  const params = '形参';
  const global = '全局变量';
  const statics = '局部静态变量';
  const stubs = '桩函数';
  const pointerTarget = '指针目标';
  const absoluteAddress = '绝对地址';
  it(`[${componentName}] variable type optons are [${params}，${global}，${statics}，${stubs}，${pointerTarget}，${absoluteAddress}]`, () => {
    const dataTypeText = wrapper.find('.variable-type').text();
    expect(dataTypeText).toContain(params);
    expect(dataTypeText).toContain(global);
    expect(dataTypeText).toContain(statics);
    expect(dataTypeText).toContain(stubs);
    expect(dataTypeText).toContain(pointerTarget);
    expect(dataTypeText).toContain(absoluteAddress);
  });

  const confirm = '确认';
  it(`[${componentName}] variable type should be ${confirm}`, () => {
    expect(wrapper.find('.buttons .confirm').text()).toContain(confirm);
  });
  const cancel = '取 消';
  it(`[${componentName}] variable type should be ${cancel}`, () => {
    expect(wrapper.find('.buttons .cancel').text()).toContain(cancel);
  });
});

describe(`${componentName} Function`, () => {
  const cancel = '取 消';
  it(`[${componentName}] variable type should be ${cancel}`, () => {
    expect(wrapper.find('.buttons .cancel').text()).toContain(cancel);
  });
});
