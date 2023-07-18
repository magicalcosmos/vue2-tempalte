/* eslint-disable no-undef */
import CopyCompile from '../../../../../src/views/components/Dialog/CopyCompile.vue';
import BaseDialog from '../../../../../src/views/components/Dialog/BaseDialog.vue';
import RForm from '../../../../../src/components/RForm/src/form.vue';
import RFormItem from '../../../../../src/components/RForm/src/form-item.vue';
import RInput from '../../../../../src/components/RInput/src/input.vue';
import { mount, shallowMount } from '@vue/test-utils';
import i18n from '../../../../../src/i18n';
import Mock from 'mockjs';
const mountItem = {
  mocks: {
    $t: key => i18n.t(key)
  }
};
const factory = options => {
  return shallowMount(CopyCompile, {
    ...mountItem,
    ...options
  });
};

describe('CopyCompile', () => {
  it('renders CopyCompile ', () => {
    const wrapper = factory();
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.isVisible()).toBe(false);
    expect(wrapper.contains(BaseDialog)).toBe(true);
    wrapper.destroy();
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
  });

  describe('Test methods', () => {
    it('Test handleConfirm', async() => {
      const wrapper = mount(CopyCompile, {
        ...mountItem,
        stubs: {
          'r-form': RForm,
          'r-form-item': RFormItem,
          'r-input': RInput
        }
      });
      await wrapper.find('input').setValue(Mock.mock('@word()'));
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
      wrapper.destroy();
    });
    it('Test handleClose', async() => {
      const wrapper = factory();
      wrapper.vm.handleClose();
      await wrapper.vm.$nextTick();
      expect(wrapper.emitted('update:visible')).toBeTruthy();
      expect(wrapper.emitted('update:visible')[0][0]).toBe(false);
      wrapper.destroy();
    });
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
