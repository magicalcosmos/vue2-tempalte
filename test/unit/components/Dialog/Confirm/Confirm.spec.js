/* eslint-disable no-undef */
import Confirm from '../../../../../src/views/components/Dialog/Confirm.vue';
import BaseDialog from '../../../../../src/views/components/Dialog/BaseDialog.vue';
import { shallowMount } from '@vue/test-utils';
import i18n from '../../../../../src/i18n';
import Mock from 'mockjs';
const factory = options => {
  return shallowMount(Confirm, {
    ...options
  });
};

describe('Confirm', () => {
  it('renders Confirm ', () => {
    const wrapper = factory();
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.isVisible()).toBe(false);
    expect(wrapper.contains(BaseDialog)).toBe(true);
    wrapper.destroy();
  });

  describe('Test props', () => {
    it('Test title', () => {
      const _title = Mock.mock('@ctitle(2,5)');
      const wrapper = factory({
        propsData: {
          title: _title
        }
      });
      expect(wrapper.attributes('title')).toBe(_title);
      expect(wrapper.vm.currentTitle).toBe(_title);
      wrapper.destroy();
    });
    it('Test content', () => {
      const _content = Mock.mock('@cParagraph(2,5)');
      const wrapper = factory({
        propsData: {
          visible: true,
          content: _content
        }
      });
      expect(wrapper.find('.content').text()).toBe(_content);
      expect(wrapper.vm.currentContent).toBe(_content);
      wrapper.destroy();
    });
    it('Test confirm', () => {
      const _confirm = i18n.t('button.sure');
      const wrapper = factory({
        propsData: {
          confirm: _confirm
        }
      });
      expect(wrapper.attributes('confirm')).toBe(_confirm);
      expect(wrapper.vm.currentConfirm).toBe(_confirm);
      wrapper.destroy();
    });
    it('Test visible', () => {
      const wrapper = factory({
        propsData: {
          visible: true
        }
      });
      expect(wrapper.isVisible()).toBe(true);
      expect(wrapper.vm.isShow).toBe(true);
      wrapper.destroy();
    });
  });

  describe('Test methods', () => {
    it('Test handleConfirm', async() => {
      const wrapper = factory();
      wrapper.vm.handleConfirm();
      await wrapper.vm.$nextTick();
      expect(wrapper.emitted('handleConfirm')).toBeTruthy();
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
