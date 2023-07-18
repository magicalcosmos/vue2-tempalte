/* eslint-disable no-undef */
import DeleteConfirm from '../../../../../src/views/components/Dialog/DeleteConfirm.vue';
import BaseDialog from '../../../../../src/views/components/Dialog/BaseDialog.vue';
import { mount, shallowMount } from '@vue/test-utils';
import Mock from 'mockjs';
import i18n from '../../../../../src/i18n';

const factory = options => {
  return mount(DeleteConfirm, {
    stubs: {
      'base-dialog': BaseDialog
    },
    ...options
  });
};

describe('DeleteConfirm', () => {
  it('renders DeleteConfirm ', () => {
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
      wrapper.destroy();
    });
    it('Test title', () => {
      const _title = Mock.mock('@ctitle(2, 5)');
      const wrapper = factory({
        propsData: {
          title: _title
        }
      });
      expect(wrapper.text()).toMatch(_title);
      expect(wrapper.vm.currentTitle).toBe(_title);
      wrapper.destroy();
    });
    it('Test confirm', () => {
      const _confirm = i18n.t('button.sure');
      const wrapper = factory({
        propsData: {
          confirm: _confirm
        }
      });
      expect(wrapper.find('.confirm').text()).toBe(_confirm);
      expect(wrapper.vm.currentConfirm).toBe(_confirm);
      wrapper.destroy();
    });
    it('Test tip', () => {
      const _tip = Mock.mock('@cword(2, 5)');
      const wrapper = factory({
        propsData: {
          tip: _tip
        }
      });
      expect(wrapper.find('.delete-confirm .tip').text()).toBe(_tip);
      expect(wrapper.vm.currentTip).toBe(_tip);
      wrapper.destroy();
    });
    it('Test content', () => {
      const _content = Mock.mock('@cParagraph(2, 5)');
      const wrapper = factory({
        propsData: {
          content: _content
        }
      });
      expect(wrapper.find('.delete-confirm .content span').text()).toBe(_content);
      expect(wrapper.vm.content).toBe(_content);
      wrapper.destroy();
    });
    it('Test icon', () => {
      const _icon = Mock.mock('@word(2, 5)');
      const wrapper = factory({
        propsData: {
          icon: _icon
        }
      });
      expect(wrapper.find('.delete-confirm .content .iconfont use').attributes('href')).toMatch(_icon);
      expect(wrapper.vm.currentIcon).toBe(_icon);
      wrapper.destroy();
    });
    it('Test data', () => {
      const _data = Mock.mock({
        'id|+1': 1
      });
      const wrapper = factory({
        propsData: {
          data: _data
        }
      });
      expect(wrapper.vm.currentData).toEqual(_data);
      wrapper.destroy();
    });
    it('Test customData', () => {
      const _customData = Mock.mock({
        'id|+1': 1,
        title: Mock.mock('@ctitle(2, 5)'),
        tip: Mock.mock('@ctitle(2, 5)'),
        content: Mock.mock('@cParagraph(2, 5)'),
        confirm: i18n.t('button.sure'),
        icon: Mock.mock('@word(2, 5)')
      });
      const wrapper = factory({
        propsData: {
          customData: _customData
        }
      });
      expect(wrapper.vm.currentTitle).toBe(_customData.title);
      expect(wrapper.vm.currentContent).toBe(_customData.content);
      expect(wrapper.vm.currentTip).toBe(_customData.tip);
      expect(wrapper.vm.currentConfirm).toBe(_customData.confirm);
      expect(wrapper.vm.currentIcon).toBe(_customData.icon);
      expect(wrapper.vm.currentCustomData).toEqual(_customData);
      wrapper.destroy();
    });
  });

  describe('Test events', () => {
    it('Test handleConfirm', async() => {
      const wrapper = factory({
        propsData: {
          visible: true
        }
      });
      await wrapper.find('.confirm').trigger('click');
      expect(wrapper.emitted('save')).toBeTruthy();
      wrapper.destroy();
    });
    it('Test handleCancel', async() => {
      const wrapper = factory({
        propsData: {
          visible: true
        }
      });
      await wrapper.find('.cancel').trigger('click');
      expect(wrapper.emitted('update:visible')).toBeTruthy();
      expect(wrapper.emitted('update:visible')[0][0]).toBe(false);
      wrapper.destroy();
    });
    it('Test handleClose', async() => {
      const wrapper = factory({
        propsData: {
          visible: true
        }
      });
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
