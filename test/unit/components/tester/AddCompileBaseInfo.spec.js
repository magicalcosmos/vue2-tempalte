import { mount } from '@vue/test-utils';
import { Random } from 'mockjs';
import AddCompileBaseInfo from '../../../../src/views/components/tester/AddCompileBaseInfo';
import { versionData } from './version.data';
import RForm from '../../../../src/components/RForm/src/form';
import RFormItem from '../../../../src/components/RForm/src/form-item';
import RInput from '../../../../src/components/RInput/src/input';
import RButton from '../../../../src/components/RButton/src/button';
import i18n from '../../../../src/i18n';
const mountItem = {
  mocks: {
    $t: (key) => i18n.t(key),
    $route: {
      query: {}
    }
  },
  stubs: {
    'r-form': RForm,
    'r-form-item': RFormItem,
    'r-input': RInput,
    'r-button': RButton
  }
};

describe('AddCompileBaseInfo', () => {
  it('1. default render', async() => {
    const wrapper = mount(AddCompileBaseInfo, mountItem);
    await wrapper.setProps({
      version: versionData
    });
    expect(wrapper.find('.add-compile-base-info .r-form').exists()).toBeTruthy();
    expect(wrapper.findAll('.add-compile-base-info .r-form .r-form-item').at(0).classes()).toContain('is-required');
    expect(wrapper.findAll('.add-compile-base-info .r-form .r-form-item').at(0).find('label').text()).toBe(i18n.t('project.env_name'));
    expect(wrapper.findAll('.add-compile-base-info .r-form .r-form-item').at(0).find('.r-form-item__content input').exists()).toBeTruthy();
    expect(wrapper.findAll('.add-compile-base-info .r-form .r-form-item').at(1).classes()).not.toContain('is-required');
    expect(wrapper.findAll('.add-compile-base-info .r-form .r-form-item').at(1).find('label').text()).toBe(i18n.t('project.env_desc'));
    expect(wrapper.findAll('.add-compile-base-info .r-form .r-form-item').at(1).find('.r-form-item__content textarea').exists()).toBeTruthy();
    expect(wrapper.find('.add-compile-base-info .add-project-basic-information-buttons').exists()).toBeTruthy();
    expect(wrapper.findAll('.add-compile-base-info .add-project-basic-information-buttons .r-button').length).toBe(2);
    expect(wrapper.findAll('.add-compile-base-info .add-project-basic-information-buttons .r-button').at(0).text()).toBe(i18n.t('project.cancel'));
    expect(wrapper.findAll('.add-compile-base-info .add-project-basic-information-buttons .r-button').at(1).text()).toBe(i18n.t('project.env_create'));
    wrapper.destroy();
  });
  describe('2. test props', () => {
    it('1） from', async() => {
      const wrapper = mount(AddCompileBaseInfo, mountItem);
      expect(wrapper.vm.currentFrom).toEqual('project');

      const from = Random.word();
      await wrapper.setProps({
        from: from
      });
      expect(wrapper.vm.currentFrom).toEqual(from);
      expect(wrapper.findAll('.add-compile-base-info .r-form .r-form-item').length).toBe(1);
      expect(wrapper.findAll('.add-compile-base-info .r-form .r-form-item').at(0).find('.r-form-item__content input').attributes().readonly).toBeTruthy();
      wrapper.destroy();
    });
    it('2） form input', async() => {
      const wrapper = mount(AddCompileBaseInfo, mountItem);
      await wrapper.setProps({
        version: versionData
      });
      const environmentName = Random.word();
      const description = Random.word();
      await wrapper.findAll('.add-compile-base-info .r-form .r-form-item').at(0).find('.r-form-item__content input').setValue(environmentName);
      expect(wrapper.props().version.environmentName).toBe(environmentName);
      await wrapper.findAll('.add-compile-base-info .r-form .r-form-item').at(1).find('.r-form-item__content textarea').setValue(description);
      expect(wrapper.props().version.description).toBe(description);
      wrapper.destroy();
    });
  });
  describe('3. test methods', () => {
    it('1) handleCancel', async() => {
      const wrapper = mount(AddCompileBaseInfo, mountItem);
      await wrapper.setProps({
        version: versionData
      });
      await wrapper.findAll('.add-compile-base-info .add-project-basic-information-buttons .r-button').at(0).trigger('click');
      expect(wrapper.emitted('cancel')).toBeTruthy();
      wrapper.destroy();
    });
    it('2) handleSaveCompileBasicInfo', async() => {
      const wrapper = mount(AddCompileBaseInfo, mountItem);
      await wrapper.setProps({
        version: versionData
      });
      await wrapper.findAll('.add-compile-base-info .add-project-basic-information-buttons .r-button').at(1).trigger('click');
      expect(wrapper.vm.isSaving).toBeTruthy();
      expect(wrapper.emitted('handleSaveCompileBasicInformation')).toBeTruthy();

      wrapper.destroy();
    });
  });
});

