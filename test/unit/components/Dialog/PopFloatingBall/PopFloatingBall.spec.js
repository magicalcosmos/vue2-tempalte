/* eslint-disable no-undef */
import PopFloatingBall from '../../../../../src/views/components/Dialog/PopFloatingBall.vue';
import BaseDialog from '../../../../../src/views/components/Dialog/BaseDialog.vue';
import FloatingBall from '../../../../../src/components/FloatingBall/index.vue';
import { mount, shallowMount } from '@vue/test-utils';
import Mock from 'mockjs';
import i18n from '../../../../../src/i18n';

const _data = Mock.mock({
  percentage: '@integer(1, 100)' + '%',
  visible: true,
  message: '@word()'
});
const factory = options => {
  return mount(PopFloatingBall, {
    stubs: {
      'base-dialog': BaseDialog,
      'floating-ball': FloatingBall
    },
    ...options
  });
};

describe('PopFloatingBall', () => {
  it('renders PopFloatingBall ', () => {
    const wrapper = factory({
      propsData: {
        data: {}
      }
    });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.isVisible()).toBe(true);
    expect(wrapper.contains(BaseDialog)).toBe(true);
    expect(wrapper.contains(FloatingBall)).toBe(true);
    wrapper.destroy();
  });

  describe('Test props', () => {
    it('Test visible', async() => {
      const wrapper = factory({
        propsData: {
          visible: false,
          data: {}
        }
      });
      expect(wrapper.find('pop-floating-ball').exists()).toBe(false);
      wrapper.destroy();
    });
    it('Test title', () => {
      const _title = Mock.mock('@ctitle(2, 5)');
      const wrapper = factory({
        propsData: {
          title: _title,
          data: {}
        }
      });
      expect(wrapper.text()).toMatch(_title);
      expect(wrapper.vm.currentTitle).toBe(_title);
      wrapper.destroy();
    });
    it('Test data', () => {
      const wrapper = factory({
        propsData: {
          data: _data
        }
      });
      expect(wrapper.vm.percentage).toBe(_data.percentage);
      expect(wrapper.text()).toMatch(_data.percentage);
      expect(wrapper.vm.isShow).toBe(_data.visible);
      expect(wrapper.vm.message).toBe(_data.message);
      expect(wrapper.text()).toMatch(_data.message);
      wrapper.destroy();
    });
  });

  describe('Test events', () => {
    it('Test handleConfirm', async() => {
      const wrapper = factory({
        propsData: {
          visible: true,
          data: {}
        }
      });
      await wrapper.find('.confirm').trigger('click');
      expect(wrapper.emitted('confirm')).toBeTruthy();
      wrapper.destroy();
    });
    it('Test handleCancel', async() => {
      const wrapper = factory({
        propsData: {
          visible: true,
          data: {}
        }
      });
      await wrapper.find('.cancel').trigger('click');
      expect(wrapper.emitted('save')).toBeTruthy();
      expect(wrapper.emitted('save')[0]).toEqual([wrapper.vm]);
      expect(wrapper.emitted('update:visible')).toBeTruthy();
      expect(wrapper.emitted('update:visible')[0][0]).toBe(false);
      wrapper.destroy();
    });
    it('Test handleClose', async() => {
      const wrapper = factory({
        propsData: {
          visible: true,
          data: {}
        }
      });
      await wrapper.find('.icon-close').trigger('click');
      expect(wrapper.emitted('save')).toBeTruthy();
      expect(wrapper.emitted('save')[0]).toEqual([wrapper.vm]);
      expect(wrapper.emitted('update:visible')).toBeTruthy();
      expect(wrapper.emitted('update:visible')[0][0]).toBe(false);
      wrapper.destroy();
    });
  });
  describe('Test methods', () => {
    it('Test show', async() => {
      const wrapper = factory({
        propsData: {
          visible: true,
          data: {}
        }
      });
      wrapper.vm.show();
      await wrapper.vm.$nextTick();
      expect(wrapper.emitted('update:visible')).toBeTruthy();
      expect(wrapper.emitted('update:visible')[0][0]).toBe(true);
      wrapper.destroy();
    });
    it('Test hide', async() => {
      const wrapper = factory({
        propsData: {
          visible: true,
          data: {}
        }
      });
      wrapper.vm.hide();
      await wrapper.vm.$nextTick();
      expect(wrapper.emitted('update:visible')).toBeTruthy();
      expect(wrapper.emitted('update:visible')[0][0]).toBe(false);
      wrapper.destroy();
    });
  });
});
