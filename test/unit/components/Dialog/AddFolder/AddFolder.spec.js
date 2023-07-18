/* eslint-disable no-undef */
import AddFolder from '../../../../../src/views/components/Dialog/AddFolder.vue';
import { shallowMount } from '@vue/test-utils';
import i18n from '../../../../../src/i18n';

const mountItem = {
  mocks: {
    $t: key => i18n.t(key)
  }
};
const factory = (options) => {
  return shallowMount(AddFolder, {
    ...mountItem,
    ...options
  });
};
describe('AddFloder', () => {
  describe('test props', () => {
    it('test prop visible', async() => {
      const wrapper = factory();
      expect(wrapper.props('visible')).toBe(false);
      expect(wrapper.find('.add-floder').isVisible()).toBeTruthy();
      await wrapper.setProps({
        visible: true
      });
      expect(wrapper.props('visible')).toBe(true);
      expect(wrapper.find('.add-floder').isVisible()).toBeTruthy();
      wrapper.destroy();
    });
    it('test prop path', async() => {
      const wrapper = factory();
      expect(wrapper.props('path')).toMatch('');
      const _path = './test/test.c';
      await wrapper.setProps({
        path: _path
      });
      expect(wrapper.props('path')).toBe(_path);
      expect(wrapper.vm.currentPath).toBe(_path);
      wrapper.destroy();
    });
  });
  describe('test event function', () => {
    it('test handleConfirm', async() => {
      const wrapper = factory();
      await wrapper.vm.handleConfirm();
      expect(wrapper.emitted('save')).toBeTruthy();
      wrapper.destroy();
    });
    it('test handleCancel', async() => {
      const wrapper = factory();
      await wrapper.vm.handleCancel();
      expect(wrapper.emitted('update:visible')).toBeTruthy();
      expect(wrapper.find('.error-tip').exists()).toBeFalsy();
      wrapper.destroy();
    });
    it('test handleClose', async() => {
      const wrapper = factory();
      await wrapper.vm.handleClose();
      expect(wrapper.emitted('update:visible')).toBeTruthy();
      expect(wrapper.find('.error-tip').exists()).toBeFalsy();
      wrapper.destroy();
    });
  });
});
