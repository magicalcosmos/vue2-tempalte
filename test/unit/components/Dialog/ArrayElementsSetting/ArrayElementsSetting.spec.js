/* eslint-disable no-undef */
import ArrayElementsSetting from '../../../../../src/views/components/Dialog/ArrayElementsSetting.vue';
import BaseDialog from '../../../../../src/views/components/Dialog/BaseDialog.vue';
import { shallowMount } from '@vue/test-utils';
import i18n from '../../../../../src/i18n';
import Mock from 'mockjs';
import '@/utils/jsextend';
const _data = Mock.mock({
  length: 10,
  indexs: [1, 2, 3, 4, 5]
});
const mountItem = {
  mocks: {
    $t: key => i18n.t(key)
  }
};
const factory = options => {
  return shallowMount(ArrayElementsSetting, {
    ...mountItem,
    ...options
  });
};

describe('ArrayElementsSetting', () => {
  it('renders ArrayElementsSetting ', () => {
    const wrapper = factory();
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.isVisible()).toBe(true);
    expect(wrapper.contains(BaseDialog)).toBe(true);
    expect(wrapper.find(BaseDialog).isVisible()).toBe(true);
    expect(wrapper.find('.tips.error-message').isVisible()).toBe(false);
    wrapper.destroy();
  });
  describe('Test attributes', () => {
    it('Test title', () => {
      const wrapper = factory();
      expect(wrapper.attributes('title')).toBe(i18n.t('dialog.set_array_element'));
    });
  });
  describe('Test innerText', () => {
    it('when the data property isShowError is false', () => {
      const wrapper = factory();
      expect(wrapper.find('.content').text()).toMatch(i18n.t('dialog.need_show_array_subscript'));
      expect(wrapper.find('.content').text()).toMatch('*' + i18n.t('dialog.set_array_element_tips'));
      wrapper.destroy();
    });
    it('when the data property isShowError is true', () => {
      const wrapper = factory({
        data() {
          return {
            isShowError: true
          };
        }
      });
      expect(wrapper.find('.tips.error-message').isVisible()).toBe(true);
      expect(wrapper.find('.tips.error-message').text()).toMatch(i18n.t('dialog.please_input_correct_array_subscript'));
      wrapper.destroy();
    });
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
      expect(wrapper.vm.isShowError).toBe(false);
      expect(wrapper.vm.isShow).toBe(true);
      wrapper.destroy();
    });
    it('Test data', async() => {
      const wrapper = factory();
      await wrapper.setData({
        data: _data
      });
      expect(wrapper.vm.currentData).toEqual(_data);
      expect(wrapper.vm.subscript).toMatch(_data.indexs.join(','));
      expect(wrapper.find('textarea').element.value).toBe(_data.indexs.join(','));
      wrapper.destroy();
    });
  });

  describe('Test methods', () => {
    it('Test validate', async() => {
      const wrapper = factory();
      expect(wrapper.vm.validate()).toBe(false);
      await wrapper.setData({
        data: _data
      });
      expect(wrapper.vm.validate()).toBe(true);
      wrapper.destroy();
    });
    it('Test handleConfirm', async() => {
      const wrapper = factory();
      await wrapper.setData({
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
    it('Test reset', async() => {
      const wrapper = factory();
      wrapper.vm.reset();
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.errorMessage).toBe(wrapper.vm.message.incorrectSubscript);
      expect(wrapper.find('textarea').element.value).toBe('');
      wrapper.destroy();
    });
  });
});
