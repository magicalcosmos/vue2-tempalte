import { shallowMount } from '@vue/test-utils';
import i18n from '../../../../src/i18n';
import Mock, { Random } from 'mockjs';
import UploadCompileForm from '../../../../src/views/components/tester/UploadCompileForm';

const mountItem = {
  mocks: {
    $t: (key) => i18n.t(key)
  }
};

describe('UploadCompileForm', () => {
  it('1. default render', () => {
    const wrapper = shallowMount(UploadCompileForm, mountItem);
    expect(wrapper.find('.upload-compile-form').exists()).toBeTruthy();
    expect(wrapper.find('.upload-compile-form .upload-form-content').exists()).toBeTruthy();
    expect(wrapper.find('.upload-compile-form .upload-form-content r-form').exists()).toBeTruthy();
    expect(wrapper.find('.upload-compile-form .text-center').exists()).toBeTruthy();
    expect(wrapper.findAll('.upload-compile-form .text-center r-button').length).toBe(2);
    wrapper.destroy();
  });
  it('2. fileId', async() => {
    const wrapper = shallowMount(UploadCompileForm, mountItem);
    const fileId = Random.word();
    await wrapper.setProps({
      fileId
    });
    expect(wrapper.vm.currentFileId).toBe(fileId);
    wrapper.destroy();
  });
});
