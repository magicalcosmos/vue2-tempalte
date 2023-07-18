/* eslint-disable no-undef */
import ArrayInit from '../../../../../src/views/components/Dialog/ArrayInit.vue';
import BaseDialog from '../../../../../src/views/components/Dialog/BaseDialog.vue';
import { shallowMount } from '@vue/test-utils';
import i18n from '../../../../../src/i18n';
import Mock from 'mockjs';
const _data = Mock.mock({
  length: 10,
  data: {
    '@init': {
      '#': {
        '@init': {
          '@ctor': {
            '@value': ''
          }
        }
      }
    }
  }
});
const mountItem = {
  mocks: {
    $t: key => i18n.t(key)
  }
};
const factory = options => {
  return shallowMount(ArrayInit, {
    ...mountItem,
    ...options
  });
};

describe('ArrayInit', () => {
  it('renders ArrayInit ', () => {
    const wrapper = factory();
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.isVisible()).toBe(true);
    expect(wrapper.contains(BaseDialog)).toBe(true);
    expect(wrapper.find(BaseDialog).isVisible()).toBe(true);
    expect(wrapper.find('.fun_select').exists()).toBe(false);
    wrapper.destroy();
  });
  describe('Test attributes', () => {
    it('Test title', () => {
      const wrapper = factory();
      expect(wrapper.attributes('title')).toBe(i18n.t('dialog.array_init'));
      expect(wrapper.attributes('confirm')).toBe(i18n.t('button.sure'));
      wrapper.destroy();
    });
  });
  it('Test innerText', () => {
    const wrapper = factory();
    expect(wrapper.find('.header_size').text()).toMatch(i18n.t('dialog.array_init_tips'));
    wrapper.destroy();
  });

  describe('Test props', () => {
    it('Test visible', () => {
      const wrapper = factory({
        propsData: {
          visible: true
        },
        stubs: {
          'base-dialog': BaseDialog
        }
      });
      expect(wrapper.find('.base-dialog').isVisible()).toBe(true);
      expect(wrapper.vm.isShow).toBe(true);
      expect(wrapper.vm.elementTypeName).toBe('');
      expect(wrapper.vm.options).toEqual([]);
      wrapper.destroy();
    });
    it('Test data', async() => {
      const wrapper = factory();
      expect(wrapper.vm.elementTypeName).toBe('');
      expect(wrapper.vm.options).toEqual([]);
      await wrapper.setData({
        data: _data
      });
      expect(wrapper.vm.currentData).toEqual(_data);
      expect(wrapper.vm.options.length).toBeGreaterThan(0);
      wrapper.destroy();
    });
  });

  describe('Test methods', () => {
    it('Test handleConfirm', async() => {
      const wrapper = factory();
      await wrapper.setProps({
        data: _data
      });
      wrapper.vm.handleConfirm();
      await wrapper.vm.$nextTick();
      expect(wrapper.emitted('save')).toBeTruthy();
      wrapper.destroy();
    });
    it('Test handleCancel', async() => {
      const wrapper = factory();
      wrapper.vm.handleCancel();
      await wrapper.vm.$nextTick();
      expect(wrapper.emitted('update:visible')).toBeTruthy();
      expect(wrapper.emitted('update:visible')[0][0]).toBe(false);
      expect(wrapper.vm.elementTypeName).toBe('');
      expect(wrapper.vm.options).toEqual([]);
      wrapper.destroy();
    });
    it('Test handleClose', async() => {
      const wrapper = factory();
      wrapper.vm.handleClose();
      await wrapper.vm.$nextTick();
      expect(wrapper.emitted('update:visible')).toBeTruthy();
      expect(wrapper.emitted('update:visible')[0][0]).toBe(false);
      expect(wrapper.vm.elementTypeName).toBe('');
      expect(wrapper.vm.options).toEqual([]);
      wrapper.destroy();
    });
    it('Test getOptions', async() => {
      const wrapper = factory();
      wrapper.vm.getOptions();
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.options.length).toBe(0);
      await wrapper.setProps({
        data: _data
      });
      expect(wrapper.vm.options.length).toBeGreaterThan(0);
      wrapper.destroy();
    });
    it('Test show', async() => {
      const wrapper = factory();
      wrapper.vm.show();
      await wrapper.vm.$nextTick();
      expect(wrapper.emitted('update:visible')).toBeTruthy();
      expect(wrapper.emitted('update:visible')[0][0]).toBe(true);
      expect(wrapper.vm.options).toHaveLength(0);
      wrapper.destroy();
    });
    it('Test hide', async() => {
      const wrapper = factory();
      wrapper.vm.hide();
      await wrapper.vm.$nextTick();
      expect(wrapper.emitted('update:visible')).toBeTruthy();
      expect(wrapper.emitted('update:visible')[0][0]).toBe(false);
      expect(wrapper.vm.elementTypeName).toBe('');
      expect(wrapper.vm.options).toEqual([]);
      wrapper.destroy();
    });
    it('Test reset', async() => {
      const wrapper = factory();
      wrapper.vm.reset();
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.elementTypeName).toBe('');
      expect(wrapper.vm.options).toEqual([]);
      wrapper.destroy();
    });
  });
});
