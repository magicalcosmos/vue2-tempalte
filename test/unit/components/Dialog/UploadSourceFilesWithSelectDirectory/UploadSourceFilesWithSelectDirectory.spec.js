/* eslint-disable no-undef */
import UploadSourceFilesWithSelectDirectory from '../../../../../src/views/components/Dialog/UploadSourceFilesWithSelectDirectory.vue';
import BaseDialog from '../../../../../src/views/components/Dialog/BaseDialog.vue';
import UploadFiles from '../../../../../src/components/UploadFiles/index.vue';
import SelectDirectory from '../../../../../src/components/SelectDirectory/SelectDirectory.vue';
import RForm from '../../../../../src/components/RForm/src/form.vue';
import { mount, shallowMount } from '@vue/test-utils';
import Mock from 'mockjs';
import i18n from '../../../../../src/i18n';
const _directoryTree = Mock.mock({
  'data|1-3': [{
    'id|+1': 1,
    label: '一级 @increment(1)',
    'children|1-3': [{
      'id|+1': 10,
      label: '二级 @increment(1)-@increment(1)',
      'children|1-3': [{
        'id|+1': 100,
        label: '三级 @increment(1)-@increment(1)-@increment(1)'
      }]
    }]
  }]
}).data;
const mountItem = {
  mocks: {
    $t: key => i18n.t(key)
  },
  stubs: {
    'base-dialog': BaseDialog,
    'r-form': RForm,
    'select-directory': SelectDirectory,
    UploadFiles: true
  }
};
const factory = options => {
  return mount(UploadSourceFilesWithSelectDirectory, {
    ...mountItem,
    ...options
  });
};

describe('UploadSourceFilesWithSelectDirectory', () => {
  beforeEach(() => {
    window.vm['$i18n'] = i18n;
  });
  it('renders UploadSourceFilesWithSelectDirectory ', () => {
    const wrapper = factory();
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.isVisible()).toBe(false);
    expect(wrapper.find('.error-tips').isVisible()).toBe(false);
    expect(wrapper.find('.content.upload-loading').isVisible()).toBe(false);
    expect(wrapper.contains(BaseDialog)).toBe(true);
    expect(wrapper.contains(RForm)).toBe(true);
    expect(wrapper.contains(SelectDirectory)).toBe(true);
    expect(wrapper.contains(UploadFiles)).toBe(true);
    wrapper.destroy();
  });
  describe('Test text', () => {
    it('Test title', () => {
      const wrapper = factory();
      expect(wrapper.find('.dialog-title span').text()).toBe(i18n.t('upload.upload_file'));
      wrapper.destroy();
    });
    it('Test confirm', () => {
      const wrapper = factory();
      expect(wrapper.find('.confirm').text()).toBe(i18n.t('button.confirm_upload'));
      wrapper.destroy();
    });
  });
  describe('Test props', () => {
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
    it('Test accept', async() => {
      const wrapper = factory();
      await wrapper.setProps({
        accept: 'zip,rar,7z'
      });
      expect(wrapper.vm.tips).toMatch(i18n.t('upload.upload_only_support') + wrapper.props('accept'));
      expect(wrapper.vm.suffixObject['zip']).toBe(true);
      expect(wrapper.vm.suffixObject['rar']).toBe(true);
      expect(wrapper.vm.suffixObject['7z']).toBe(true);
      wrapper.destroy();
    });
  });

  describe('Test events', () => {
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
