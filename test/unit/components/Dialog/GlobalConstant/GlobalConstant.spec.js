/* eslint-disable no-undef */
import GlobalConstant from '../../../../../src/views/components/Dialog/GlobalConstant.vue';
import { shallowMount } from '@vue/test-utils';
import i18n from '../../../../../src/i18n';
import Mock from 'mockjs';

const _globals = Mock.mock({
  data: [
    {
      type: '@word(2, 5)',
      label: '@word(2, 5)',
      native: true,
      value: '@word(2, 5)',
      tags: {
        required: true
      }
    }
  ]
}).data;

const mountItem = {
  mocks: {
    $t: key => i18n.t(key)
  }
};
const factory = options => {
  return shallowMount(GlobalConstant, {
    ...mountItem,
    ...options
  });
};

describe('Test GlobalConstant', () => {
  it('renders GlobalConstant', () => {
    const wrapper = factory();
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.isVisible()).toBe(true);
    expect(wrapper.find('.constant-dialog .global-constant').exists()).toBe(true);
    expect(wrapper.find('.constant-dialog .global-constant').isVisible()).toBe(false);
    expect(wrapper.find('r-scrollbar').exists()).toBe(true);
    expect(wrapper.find('r-form').exists()).toBe(true);
    expect(wrapper.find('r-table').exists()).toBe(true);
    expect(wrapper.find('r-table-column').exists()).toBe(true);
    wrapper.destroy();
  });
  describe('Test props', () => {
    it('Test visible', async() => {
      const wrapper = factory();
      await wrapper.setProps({
        visible: true
      });
      expect(wrapper.vm.isShow).toEqual(true);
      expect(wrapper.find('.constant-dialog .global-constant').isVisible()).toBe(true);
      wrapper.destroy();
    });
    it('Test globals', async() => {
      const wrapper = factory();
      await wrapper.setProps({
        globals: _globals
      });
      expect(wrapper.vm.currentGlobals.globals).toEqual(_globals);
      expect(wrapper.find('r-table').attributes('data')).not.toBeNull();
      wrapper.destroy();
    });
  });
  describe('Test methods', () => {
    it('Test handleCancel', async() => {
      const wrapper = factory();
      wrapper.vm.handleCancel();
      await wrapper.vm.$nextTick();
      expect(wrapper.emitted('update:visible')).toBeTruthy();
      expect(wrapper.emitted('update:visible')[0]).toEqual([false]);
      expect(wrapper.vm.currentGlobals.globals).toEqual(wrapper.vm.globals_backup);
      wrapper.destroy();
    });
    it('Test isRequired', async() => {
      const wrapper = factory();
      expect(wrapper.vm.isRequired(_globals[0].tags)).toBe(_globals[0].tags.required);
      expect(wrapper.vm.isRequired()).toBe(false);
      wrapper.destroy();
    });
    it('Test isChildren', async() => {
      const wrapper = factory();
      expect(wrapper.vm.isChildren({ isChildren: true })).toBe('isChildren');
      expect(wrapper.vm.isChildren()).toBe('');
      wrapper.destroy();
    });
    it('Test hasInput', async() => {
      const wrapper = factory();
      expect(wrapper.vm.hasInput('1')).toBe('has-input');
      expect(wrapper.vm.valid).toBe(true);
      expect(wrapper.vm.hasInput()).toBe('no-input');
      expect(wrapper.vm.valid).toBe(false);
      wrapper.destroy();
    });
    it('Test show', async() => {
      const wrapper = factory();
      const bool = Mock.mock('@boolean');
      wrapper.vm.show(bool);
      expect(wrapper.emitted('update:visible')).toBeTruthy();
      expect(wrapper.emitted('update:visible')[0]).toEqual([bool]);
      wrapper.destroy();
    });
    it('Test handleClose', async() => {
      const wrapper = factory();
      wrapper.vm.handleClose();
      await wrapper.vm.$nextTick();
      expect(wrapper.emitted('update:visible')).toBeTruthy();
      expect(wrapper.emitted('update:visible')[0]).toEqual([false]);
      wrapper.destroy();
    });
  });
});
