/* eslint-disable no-undef */
import FuncDesc from '../../../../../src/views/components/Dialog/FuncDesc.vue';
import BaseDialog from '../../../../../src/views/components/Dialog/BaseDialog.vue';
import RInput from '../../../../../src/components/RInput/src/input.vue';
import { mount, shallowMount } from '@vue/test-utils';
import Mock from 'mockjs';
import i18n from '../../../../../src/i18n';
const _data = Mock.mock({
  description: '@word()',
  'userDefinedFields|1-10': [{
    name: '@word()',
    'key|+1': 1,
    value: '@word()'
  }],
  functionId: '@id',
  testId: '@id'
});
const mountItem = {
  mocks: {
    $t: key => i18n.t(key)
  },
  stubs: {
    'base-dialog': BaseDialog,
    'r-input': RInput
  }
};
const factory = options => {
  return mount(FuncDesc, {
    ...mountItem,
    ...options
  });
};

describe('FuncDesc', () => {
  it('renders FuncDesc ', () => {
    const wrapper = factory();
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.isVisible()).toBe(false);
    expect(wrapper.contains(BaseDialog)).toBe(true);
    wrapper.destroy();
  });
  describe('Test text', () => {
    it('Test title', () => {
      const wrapper = factory();
      expect(wrapper.find('.dialog-title span').text()).toBe(i18n.t('testcase.function_info'));
      wrapper.destroy();
    });
    it('Test confirm', () => {
      const wrapper = factory();
      expect(wrapper.find('.confirm').text()).toBe(i18n.t('button.sure'));
      wrapper.destroy();
    });
    it('Test title', () => {
      const wrapper = factory();
      expect(wrapper.find('.defined-title').text()).toBe(i18n.t('project.fun_desc'));
      wrapper.destroy();
    });
  });
  describe('Test props', () => {
    it('Test visible', () => {
      const wrapper = factory({
        propsData: {
          visible: true
        }
      });
      expect(wrapper.isVisible()).toBe(true);
      expect(wrapper.vm.showDialog).toBe(true);
      wrapper.destroy();
    });
    it('Test data', async() => {
      const wrapper = factory();
      await wrapper.setProps({
        data: _data
      });
      expect(wrapper.vm.description).toBe(_data.description);
      expect(wrapper.vm.userDefinedFields).toEqual(_data.userDefinedFields);
      expect(wrapper.find(`.textarea-desc textarea[placeholder=${i18n.t('project.attention_fun_desc')}]`).element.value).toBe(_data.description);
      expect(wrapper.findAll(`.textarea-desc textarea[placeholder=${i18n.t('project.attention_fun_info')}]`).length).toBe(_data.userDefinedFields.length);
      wrapper.destroy();
    });
  });

  describe('Test events', () => {
    it('Test handleConfirm', async() => {
      const wrapper = factory();
      await wrapper.setProps({
        data: _data
      });
      await wrapper.find('.confirm').trigger('click');
      expect(wrapper.emitted('save')).toBeTruthy();
      wrapper.destroy();
    });
    it('Test handleClose', async() => {
      const wrapper = factory();
      await wrapper.find('.icon-close').trigger('click');
      expect(wrapper.emitted('update:visible')).toBeTruthy();
      expect(wrapper.emitted('update:visible')[0][0]).toBe(false);
      wrapper.destroy();
    });
    it('Test handleClose', async() => {
      const wrapper = factory();
      await wrapper.find('.icon-close').trigger('click');
      expect(wrapper.emitted('update:visible')).toBeTruthy();
      expect(wrapper.emitted('update:visible')[0][0]).toBe(false);
      wrapper.destroy();
    });
  });
  describe('Test methods', () => {
    it('Test show', async() => {
      const wrapper = factory();
      wrapper.vm.show();
      await wrapper.vm.$nextTick();
      expect(wrapper.emitted('update:visible')).toBeTruthy();
      expect(wrapper.emitted('update:visible')[0][0]).toBe(true);
      wrapper.destroy();
    });
    it('Test hide', async() => {
      const wrapper = factory();
      wrapper.vm.hide();
      await wrapper.vm.$nextTick();
      expect(wrapper.emitted('update:visible')).toBeTruthy();
      expect(wrapper.emitted('update:visible')[0][0]).toBe(false);
      wrapper.destroy();
    });
  });
});
