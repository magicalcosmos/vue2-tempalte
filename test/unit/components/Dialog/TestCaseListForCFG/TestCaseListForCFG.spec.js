/* eslint-disable no-undef */
import TestCaseListForCFG from '../../../../../src/views/components/Dialog/TestCaseListForCFG.vue';
import BaseDialog from '../../../../../src/views/components/Dialog/BaseDialog.vue';
import { mount, shallowMount } from '@vue/test-utils';
import Mock from 'mockjs';
import i18n from '../../../../../src/i18n';
const _data = Mock.mock({
  'data|1-10': [{
    name: '@word()'
  }]
}).data;
const mountItem = {
  mocks: {
    $t: key => i18n.t(key)
  },
  stubs: {
    'base-dialog': BaseDialog
  }
};
const factory = options => {
  return mount(TestCaseListForCFG, {
    ...mountItem,
    ...options
  });
};

describe('TestCaseListForCFG', () => {
  it('renders TestCaseListForCFG ', () => {
    const wrapper = factory();
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.isVisible()).toBe(false);
    expect(wrapper.find('.dialog-test-case-item').exists()).toBe(false);
    expect(wrapper.contains(BaseDialog)).toBe(true);
    wrapper.destroy();
  });
  describe('Test text', () => {
    it('Test title', () => {
      const wrapper = factory();
      expect(wrapper.find('.dialog-title span').text()).toBe(i18n.t('dialog.test_case_check'));
      wrapper.destroy();
    });
    it('Test confirm', () => {
      const wrapper = factory();
      expect(wrapper.find('.confirm').text()).toBe(i18n.t('button.sure'));
      wrapper.destroy();
    });
    it('Test title', () => {
      const wrapper = factory();
      expect(wrapper.find('.test-case-path-passed').text()).toBe(i18n.t('dialog.test_case_path_passed') + ':');
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
      wrapper.destroy();
    });
    it('Test data', async() => {
      const wrapper = factory();
      await wrapper.setProps({
        data: _data
      });
      expect(wrapper.vm.currentData).toEqual(_data);
      expect(wrapper.findAll('.dialog-test-case-list li').length).toBe(_data.length);
      wrapper.destroy();
    });
  });

  describe('Test events', () => {
    it('Test handleConfirm', async() => {
      const wrapper = factory();
      await wrapper.find('.confirm').trigger('click');
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
    it('Test handleClick', async() => {
      const wrapper = factory();
      await wrapper.setProps({
        data: _data
      });
      await wrapper.findAll('.dialog-test-case-list li').at(0).trigger('click');
      expect(wrapper.emitted('click')).toBeTruthy();
      expect(wrapper.emitted('click')[0][0]).toBe(_data[0]);
      wrapper.destroy();
    });
  });
  describe('Test methods', () => {
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
