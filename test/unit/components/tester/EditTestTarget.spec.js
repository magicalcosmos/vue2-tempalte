import EditTestTarget from '../../../../src/views/components/tester/EditTestTarget.vue';
import BaseDialog from '../../../../src/views/components/Dialog/BaseDialog.vue';
import RCheckboxGroup from '../../../../src/components/RCheckbox/src/checkbox-group';
import RCheckbox from '../../../../src/components/RCheckbox/src/checkbox';
import i18n from '../../../../src/i18n';
import Mock, { Random } from 'mockjs';
import { mount } from '@vue/test-utils';
import { COVERAGES } from '../../../../src/utils/dict';

const mountItem = {
  mocks: {
    $t: (key) => i18n.t(key)
  },
  stubs: {
    BaseDialog,
    'r-checkbox-group': RCheckboxGroup,
    'r-checkbox': RCheckbox
  }
};
const coverages = [Object.values(COVERAGES)];

describe('EditTestTarget', () => {
  it('1. default render', () => {
    const wrapper = mount(EditTestTarget, mountItem);
    expect(wrapper.find('.edit-test').exists()).toBeTruthy();
    expect(wrapper.find('.edit-test').isVisible()).toBeFalsy();
    expect(wrapper.find('.edit-test .edit-test-target').exists()).toBeTruthy();
    expect(wrapper.find('.edit-test .edit-test-target .r-checkbox-group').exists()).toBeTruthy();
    expect(wrapper.findAll('.edit-test .edit-test-target .r-checkbox-group .r-checkbox').length).toBe(3);
    expect(wrapper.findAll('.edit-test .edit-test-target .r-checkbox-group .r-checkbox').at(0).text()).toContain(i18n.t('project.statement_coverage'));
    expect(wrapper.findAll('.edit-test .edit-test-target .r-checkbox-group .r-checkbox').at(1).text()).toContain(i18n.t('project.branch_coverage'));
    expect(wrapper.findAll('.edit-test .edit-test-target .r-checkbox-group .r-checkbox').at(2).text()).toContain(i18n.t('project.mcdc_coverage'));
    expect(wrapper.find('.edit-test .error-tips').isVisible()).toBeFalsy();
    expect(wrapper.find('.edit-test .error-tips').text()).toBe(i18n.t('project.coverage_message'));
    wrapper.destroy();
  });
  describe('2. test props', () => {
    it('1) visible', async() => {
      const wrapper = mount(EditTestTarget, mountItem);
      await wrapper.setProps({
        visible: true
      });
      expect(wrapper.vm.showDialog).toBeTruthy();
      expect(wrapper.find('.edit-test').isVisible()).toBeTruthy();
      wrapper.destroy();
    });
    it('2) coverages', async() => {
      const wrapper = mount(EditTestTarget, mountItem);
      await wrapper.setProps({
        coverages: coverages
      });
      expect(wrapper.vm.currentCoverages).toEqual(coverages);
      wrapper.destroy();
    });
  });
  describe('3. test methods', () => {
    it('1) handleChange', async() => {
      const wrapper = mount(EditTestTarget, mountItem);
      await wrapper.setProps({
        visible: true
      });

      await wrapper.vm.handleChange();
      expect(wrapper.vm.showError).toBeTruthy();
      expect(wrapper.find('.edit-test .error-tips').isVisible()).toBeTruthy();

      await wrapper.setProps({
        coverages: coverages
      });
      await wrapper.vm.handleChange();
      expect(wrapper.vm.showError).toBeFalsy();
      wrapper.destroy();
    });
    it('2) handleConfirm', async() => {
      const wrapper = mount(EditTestTarget, mountItem);
      await wrapper.setProps({
        visible: true
      });

      await wrapper.vm.handleConfirm();
      expect(wrapper.vm.showError).toBeTruthy();
      expect(wrapper.find('.edit-test .error-tips').isVisible()).toBeTruthy();

      await wrapper.setProps({
        coverages: coverages
      });
      await wrapper.vm.handleConfirm();
      expect(wrapper.emitted('save')).toBeTruthy();
      wrapper.destroy();
    });
  });
});
