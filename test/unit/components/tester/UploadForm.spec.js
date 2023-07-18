import { shallowMount } from '@vue/test-utils';
import i18n from '../../../../src/i18n';
import Mock, { Random } from 'mockjs';
import UploadForm from '../../../../src/views/components/tester/UploadForm';

const mountItem = {
  mocks: {
    $t: (key) => i18n.t(key)
  }
};

describe('UploadForm', () => {
  it('1. default render', () => {
    const wrapper = shallowMount(UploadForm, mountItem);
    expect(wrapper.find('.upload-form').exists()).toBeTruthy();
    expect(wrapper.find('.upload-form .upload-form-content').exists()).toBeTruthy();
    expect(wrapper.find('.upload-form .upload-form-content r-form').exists()).toBeTruthy();
    expect(wrapper.find('.upload-form .text-center').exists()).toBeTruthy();
    expect(wrapper.findAll('.upload-form .text-center r-button').length).toBe(2);
    wrapper.destroy();
  });
});
