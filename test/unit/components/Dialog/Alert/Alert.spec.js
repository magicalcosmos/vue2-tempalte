/* eslint-disable no-undef */
import Alert from '../../../../../src/views/components/Dialog/Alert.vue';
import BaseDialog from '../../../../../src/views/components/Dialog/BaseDialog.vue';
import { mount } from '@vue/test-utils';
import { Random } from 'mockjs';

describe('test Alert', () => {
  it('1.Alert html', () => {
    const wrapper = mount(Alert);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.contains(BaseDialog)).toBe(true);
    expect(wrapper.find(BaseDialog).exists()).toBeTruthy();
    expect(wrapper.find('div.base-dialog').isVisible()).toBeFalsy();
    expect(wrapper.find('div.base-dialog .content').exists()).toBeTruthy();
    expect(wrapper.find(BaseDialog).exists()).toBeTruthy();
    expect(wrapper.find('div.base-dialog .confirm').isVisible()).toBeFalsy();
  });
  describe('2.Alert Variables', () => {
    it('1) visible', async() => {
      const wrapper = mount(Alert);
      expect(wrapper.props().visible).toBeFalsy();
      expect(wrapper.find('div.base-dialog').isVisible()).toBeFalsy();

      const variable = Random.boolean();
      await wrapper.setProps({
        visible: variable
      });
      await wrapper.vm.$nextTick();
      expect(wrapper.props().visible).toBe(variable);
      expect(wrapper.find('div.base-dialog').isVisible()).toBe(variable);
    });
    describe('2) title', () => {
      it('a. default title', () => {
        const wrapper = mount(Alert, {
          propsData: {
            visible: true
          }
        });
        expect(wrapper.props('title')).toBe('');
        expect(wrapper.vm.currentTitle).toBe('');
      });
      it('b. set title', async() => {
        const variable = Random.word();
        const wrapper = mount(Alert, {
          propsData: {
            visible: true,
            title: variable
          }
        });
        await wrapper.vm.$nextTick();
        expect(wrapper.props().title).toBe(variable);
        expect(wrapper.vm.currentTitle === wrapper.props().title).toBeTruthy();
        expect(wrapper.find('.dialog-title').text()).toBe(variable);
      });
    });
    describe('3) cancel', () => {
      it('a. default cancel', () => {
        const wrapper = mount(Alert, {
          propsData: {
            visible: true
          }
        });
        expect(wrapper.props('cancel')).toBe('');
        expect(wrapper.vm.currentCancel).toBe('');
      });
      it('b. set cancel', () => {
        const variable = Random.word();
        const wrapper = mount(Alert, {
          propsData: {
            visible: true,
            cancel: variable
          }
        });
        expect(wrapper.props('cancel')).toBe(variable);
        expect(wrapper.vm.currentCancel).toBe(wrapper.props('cancel'));
        expect(wrapper.find('.cancel').text()).toBe(variable);
      });
    });
    describe('4) content', () => {
      it('a. default content', () => {
        const wrapper = mount(Alert, {
          propsData: {
            visible: true
          }
        });
        expect(wrapper.props('content')).toBe('');
        expect(wrapper.vm.currentContent).toBe('');
      });
      it('b. set content', () => {
        const variable = Random.word();
        const wrapper = mount(Alert, {
          propsData: {
            visible: true,
            content: variable
          }
        });
        expect(wrapper.props('content')).toBe(variable);
        expect(wrapper.vm.currentContent).toBe(wrapper.props('content'));
        expect(wrapper.find('.dialog-content').text()).toBe(variable);
      });
    });
  });
  it('3.Alert Slots', () => {
    const variable = Random.word();
    const wrapper = mount(Alert, {
      visible: true,
      slots: {
        default: variable
      }
    });
    expect(wrapper.find('.content').text()).toBe(variable);
  });
  describe('4.Alert watch', () => {
    it('1) title', async() => {
      const wrapper = mount(Alert, {
        visible: true
      });
      expect(wrapper.props('title')).toBe('');
      expect(wrapper.vm.currentTitle).toBe('');

      const variable = Random.word();
      await wrapper.setProps({
        title: variable
      });
      expect(wrapper.props('title')).toBe(variable);
      expect(wrapper.vm.currentTitle).toBe(wrapper.props('title'));
      expect(wrapper.find('.dialog-title').text()).toBe(variable);
    });
    it('2) cancel', async() => {
      const wrapper = mount(Alert, {
        visible: true
      });
      expect(wrapper.props('cancel')).toBe('');
      expect(wrapper.vm.currentCancel).toBe('');

      const variable = Random.word();
      await wrapper.setProps({
        cancel: variable
      });
      expect(wrapper.props('cancel')).toBe(variable);
      expect(wrapper.vm.currentCancel).toBe(wrapper.props('cancel'));
      expect(wrapper.find('.cancel').text()).toMatch(variable);
    });
    it('3) content', async() => {
      const wrapper = mount(Alert, {
        visible: true
      });
      expect(wrapper.props().content).toBe('');
      expect(wrapper.vm.currentContent).toBe('');

      const variable = Random.word();
      await wrapper.setProps({
        content: variable
      });
      expect(wrapper.props('content')).toBe(variable);
      expect(wrapper.vm.currentContent).toBe(wrapper.props('content'));
      expect(wrapper.find('.dialog-content').text()).toBe(variable);
    });
  });
  describe('5.Alert event', () => {
    it('1) show', async() => {
      const wrapper = mount(Alert, {
        visible: true
      });

      await wrapper.vm.show.call();
      await wrapper.vm.$nextTick();
      expect(wrapper.emitted('update:visible')).toBeTruthy();
    });
    it('2) hide', async() => {
      const wrapper = mount(Alert, {
        visible: true
      });

      await wrapper.vm.hide.call();
      await wrapper.vm.$nextTick();
      expect(wrapper.emitted('update:visible')).toBeTruthy();
    });
    it('3) handleCancel', async() => {
      const wrapper = mount(Alert, {
        visible: true
      });

      await wrapper.find('.cancel').trigger('click');
      await wrapper.vm.$nextTick();
      expect(wrapper.emitted('cancel')).toBeTruthy();
      expect(wrapper.emitted('update:visible')).toBeTruthy();
    });
    it('4) handleClose', async() => {
      const wrapper = mount(Alert, {
        visible: true
      });

      await wrapper.find('.icon-close').trigger('click');
      await wrapper.vm.$nextTick();
      expect(wrapper.emitted('cancel')).toBeTruthy();
      expect(wrapper.emitted('update:visible')).toBeTruthy();
    });
  });
});
