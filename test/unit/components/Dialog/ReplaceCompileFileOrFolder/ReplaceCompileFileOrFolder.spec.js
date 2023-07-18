/* eslint-disable no-undef */
import ReplaceCompileFileOrFolder from '../../../../../src/views/components/Dialog/ReplaceCompileFileOrFolder.vue';
import BaseDialog from '../../../../../src/views/components/Dialog/BaseDialog.vue';
import RForm from '../../../../../src/components/RForm/src/form.vue';
import UploadFiles from '../../../../../src/components/UploadFiles/index';
import { mount } from '@vue/test-utils';
import Mock from 'mockjs';
import i18n from '../../../../../src/i18n';

const mountItem = {
  mocks: {
    $t: key => i18n.t(key)
  },
  stubs: {
    'base-dialog': BaseDialog,
    'r-form': RForm,
    UploadFiles: true
  }
};
const factory = options => {
  return mount(ReplaceCompileFileOrFolder, {
    ...mountItem,
    ...options
  });
};

describe('ReplaceCompileFileOrFolder', () => {
  beforeEach(() => {
    window['vm'].$i18n = i18n;
  });
  it('renders ReplaceCompileFileOrFolder ', () => {
    const wrapper = factory();
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.fileDialog').isVisible()).toBe(false);
    expect(wrapper.find('.error-tips').exists()).toBe(true);
    expect(wrapper.find('.error-tips').isVisible()).toBe(false);
    expect(wrapper.find('.file-list').exists()).toBe(false);
    expect(wrapper.find('.upload-loading').exists()).toBe(true);
    expect(wrapper.find('.upload-loading').isVisible()).toBe(false);
    expect(wrapper.contains(RForm)).toBe(true);
    expect(wrapper.contains(UploadFiles)).toBe(true);
    wrapper.destroy();
  });
  describe('Test props', () => {
    it('Test visible', async() => {
      const wrapper = factory({
        propsData: {
          visible: true
        }
      });
      expect(wrapper.isVisible()).toBe(true);
      expect(wrapper.vm.isShow).toBe(true);
      wrapper.destroy();
    });
    it('Test operateType', () => {
      const wrapper = factory({
        propsData: {
          operateType: 'replace'
        }
      });
      expect(wrapper.props('operateType')).toBe('replace');
      wrapper.destroy();
    });
    it('Test path', () => {
      const _path = './';
      const wrapper = factory({
        propsData: {
          path: _path
        }
      });
      expect(wrapper.props('path')).toBe(_path);
      expect(wrapper.vm.currentPath).toBe(_path);
      expect(wrapper.find('.to-be-replaced span').text()).toBe(_path);
      wrapper.destroy();
    });
    it('Test rightMenuEventType', async() => {
      const wrapper = factory();
      await wrapper.setProps({
        rightMenuEventType: 1
      });
      expect(wrapper.vm.currentRightMenuEventType).toBe(1);
      expect(wrapper.vm.currentTitle).toBe(i18n.t('button.import_file'));
      expect(wrapper.vm.currentDirectoryName).toBe(i18n.t('upload.path'));
      expect(wrapper.vm.currentConfirmName).toBe(i18n.t('button.confirm_upload'));
      expect(wrapper.find('.dialog-title span').text()).toMatch(i18n.t('button.import_file'));
      expect(wrapper.find('.to-be-replaced').text()).toMatch(i18n.t('upload.path'));
      expect(wrapper.find('.confirm').text()).toMatch(i18n.t('button.confirm_upload'));
      await wrapper.setProps({
        rightMenuEventType: 2
      });
      expect(wrapper.vm.currentRightMenuEventType).toBe(2);
      expect(wrapper.vm.currentTitle).toBe(i18n.t('button.replace_file'));
      expect(wrapper.vm.currentDirectoryName).toBe(i18n.t('upload.to_be_replaced'));
      expect(wrapper.vm.currentConfirmName).toBe(i18n.t('button.confirm_replace'));
      expect(wrapper.find('.dialog-title span').text()).toMatch(i18n.t('button.replace_file'));
      expect(wrapper.find('.to-be-replaced').text()).toMatch(i18n.t('upload.to_be_replaced'));
      expect(wrapper.find('.confirm').text()).toMatch(i18n.t('button.confirm_replace'));
      await wrapper.setProps({
        rightMenuEventType: 3
      });
      expect(wrapper.vm.currentRightMenuEventType).toBe(3);
      expect(wrapper.vm.currentTitle).toBe(i18n.t('button.replace_folder'));
      expect(wrapper.vm.currentDirectoryName).toBe(i18n.t('upload.to_be_replaced'));
      expect(wrapper.vm.currentConfirmName).toBe(i18n.t('button.confirm_replace'));
      expect(wrapper.find('.dialog-title span').text()).toMatch(i18n.t('button.replace_folder'));
      expect(wrapper.find('.to-be-replaced').text()).toMatch(i18n.t('upload.to_be_replaced'));
      expect(wrapper.find('.confirm').text()).toMatch(i18n.t('button.confirm_replace'));
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
      await wrapper.setData({
        files: [{}]
      });
      await wrapper.find('.confirm').trigger('click');
      expect(wrapper.find('.content').classes()).toContain('v-hide');
      expect(wrapper.find('.content.upload-loading').isVisible()).toBe(true);
      expect(wrapper.find('.upload-loading .new-loading').isVisible()).toBe(true);
      expect(wrapper.find('.cancel').isVisible()).toBe(false);
      expect(wrapper.find('.confirm').isVisible()).toBe(false);
      expect(wrapper.emitted('upload')).toBeTruthy();
      wrapper.destroy();

    });
    it('Test handleClose', async() => {
      const wrapper = factory();
      await wrapper.find('.icon-close').trigger('click');
      expect(wrapper.emitted('update:visible')).toBeTruthy();
      expect(wrapper.emitted('update:visible')[0][0]).toBe(false);
      wrapper.destroy();
    });
    it('Test handleCancel', async() => {
      const wrapper = factory();
      await wrapper.find('.cancel').trigger('click');
      expect(wrapper.emitted('update:visible')).toBeTruthy();
      expect(wrapper.emitted('update:visible')[0][0]).toBe(false);
      wrapper.destroy();
    });
  });
});
