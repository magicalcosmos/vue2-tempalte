import { CompileConfigForm } from '../../../../src/views/components';
import RForm from '../../../../src/components/RForm/src/form';
import RFormItem from '../../../../src/components/RForm/src/form-item';
import RInput from '../../../../src/components/RInput';
import RButton from '../../../../src/components/RButton';
import { mount, shallowMount } from '@vue/test-utils';
import { Random } from 'mockjs';
import i18n from '../../../../src/i18n';
import { versionData } from './version.data';
import RDialog from '../../../../src/components/RDialog/src/component';

const mountItem = {
  mocks: {
    $t: (key) => i18n.t(key)
  },
  stubs: {
    'r-form': RForm,
    'r-form-item': RFormItem,
    'r-input': RInput,
    'r-dialog': RDialog,
    'r-button': RButton
  }
};

describe('CompileConfigForm', () => {
  it('1. default render', async() => {
    const wrapper = mount(CompileConfigForm, mountItem);
    await wrapper.setProps({
      version: versionData
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.config-form').exists()).toBeTruthy();
    expect(wrapper.find('.config-form.compile-config-form .config-form-content').exists()).toBeTruthy();
    expect(wrapper.find('.config-form.compile-config-form .config-form-content .r-form').exists()).toBeTruthy();
    expect(wrapper.findAll('.config-form.compile-config-form .config-form-content .r-form .r-form-item').length).toBe(3);
    expect(wrapper.findAll('.config-form.compile-config-form .config-form-content .r-form .r-form-item').at(0).find('label').text()).toBe(i18n.t('project.include_directory'));
    expect(wrapper.findAll('.config-form.compile-config-form .config-form-content .r-form .r-form-item').at(1).find('label').text()).toBe(i18n.t('project.macro_definition'));
    expect(wrapper.findAll('.config-form.compile-config-form .config-form-content .r-form .r-form-item').at(2).find('label').text()).toBe(i18n.t('version.other_assign'));
    expect(wrapper.find('.config-form.compile-config-form .footer-action').exists()).toBeTruthy();
    expect(wrapper.findAll('.config-form.compile-config-form .footer-action .r-button').length).toBe(2);
    expect(wrapper.findAll('.config-form.compile-config-form .footer-action .r-button').at(0).text()).toContain(i18n.t('project.cancel'));
    expect(wrapper.findAll('.config-form.compile-config-form .footer-action .r-button').at(1).text()).toContain(i18n.t('button.sure'));
    wrapper.destroy();
  });
  it('2. test config update & handleSaveConfig & handleCancel', async() => {
    const wrapper = mount(CompileConfigForm, mountItem);
    await wrapper.setProps({
      version: versionData
    });
    const includesString = Random.word();
    await wrapper.findAll('.config-form.compile-config-form .config-form-content .r-form .r-form-item').at(0).find('input').setValue(includesString);
    const marcosString = Random.word();
    await wrapper.findAll('.config-form.compile-config-form .config-form-content .r-form .r-form-item').at(1).find('input').setValue(marcosString);
    const argument = Random.word();
    await wrapper.findAll('.config-form.compile-config-form .config-form-content .r-form .r-form-item').at(2).find('input').setValue(argument);
    expect(wrapper.vm.includesString).toBe(includesString);
    expect(wrapper.vm.marcosString).toBe(marcosString);
    expect(wrapper.vm.domain.arguments).toBe(argument);

    expect(wrapper.vm.isSaving).toBeFalsy();
    await wrapper.findAll('.config-form.compile-config-form .footer-action .r-button').at(1).trigger('click');
    expect(wrapper.vm.isSaving).toBeTruthy();
    expect(wrapper.emitted('handleSaveConfig')).toBeTruthy();

    await wrapper.findAll('.config-form.compile-config-form .footer-action .r-button').at(0).trigger('click');
    expect(wrapper.emitted('cancel')).toBeTruthy();
    wrapper.destroy();
  });
  describe('3. test methods', () => {
    it('1) isShowDialog', async() => {
      const wrapper = mount(CompileConfigForm, mountItem);
      await wrapper.setProps({
        version: versionData
      });
      await wrapper.findAll('.config-form.compile-config-form .config-form-content .r-form .r-form-item').at(0).find('.r-button').trigger('click');
      expect(wrapper.vm.includeDirDialogVisible).toBeTruthy();
      expect(wrapper.find('.dialog-includes').isVisible()).toBeTruthy();

      await wrapper.findAll('.config-form.compile-config-form .config-form-content .r-form .r-form-item').at(1).find('.r-button').trigger('click');
      expect(wrapper.vm.macroDialogVisible).toBeTruthy();
      expect(wrapper.find('.dialog-macros').isVisible()).toBeTruthy();
      wrapper.destroy();
    });
  });
});
