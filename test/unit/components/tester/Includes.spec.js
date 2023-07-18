import i18n from '../../../../src/i18n';
import Mock, { Random } from 'mockjs';
import { shallowMount } from '@vue/test-utils';
import Includes from '../../../../src/views/components/tester/Includes';

const mountItem = {
  mocks: {
    $t: (key) => i18n.t(key)
  }
};

const includes = Mock.mock({
  'array|1-10': [Random.word()]
}).array;

describe('Includes', () => {
  it('1. default render', async() => {
    const wrapper = shallowMount(Includes, mountItem);
    expect(wrapper.find('.includes').exists()).toBeTruthy();
    expect(wrapper.find('.includes .includes-body').exists()).toBeTruthy();
    expect(wrapper.findAll('.includes .includes-body .include-dir-overflow').length).toBe(2);
    expect(wrapper.findAll('.includes .includes-body .include-dir-overflow').at(0).findAll('r-button').length).toBe(2);
    expect(wrapper.findAll('.includes .includes-body .include-dir-overflow').at(0).find('r-input').exists()).toBeTruthy();
    expect(wrapper.findAll('.includes .includes-body .include-dir-overflow').at(0).find('r-tree').exists()).toBeTruthy();
    expect(wrapper.findAll('.includes .includes-body .include-dir-overflow').at(1).find('.table-border').exists()).toBeTruthy();
    expect(wrapper.findAll('.includes .includes-body .df-col-ac r-button').length).toBe(6);
    expect(wrapper.find('.includes .r-dialog-footer-in-body').exists()).toBeTruthy();
    expect(wrapper.findAll('.includes .r-dialog-footer-in-body r-button').length).toBe(2);
    wrapper.destroy();
  });
  describe('2. test props', () => {
    it('1) includes', async() => {
      const wrapper = shallowMount(Includes, mountItem);
      await wrapper.setProps({
        includes: includes
      });
      expect(wrapper.vm.dirs).toEqual(includes);
      expect(wrapper.vm.defaultDir).toBeFalsy();
      wrapper.destroy();
    });
  });
  describe('3. test methods', () => {
    it('1) setCurrentDir', async() => {
      const wrapper = shallowMount(Includes, mountItem);
      await wrapper.setProps({
        includes: includes
      });
      const dirIdx = Random.integer(0, includes.length - 1);
      await wrapper.vm.setCurrentDir(dirIdx);
      expect(wrapper.vm.dirChecked).toBeTruthy();
      expect(wrapper.vm.currentIndex).toBe(dirIdx);
      expect(wrapper.vm.current).toEqual(includes[dirIdx]);
      wrapper.destroy();
    });
    it('2) showEditDirDialog & handleEditDir', async() => {
      const wrapper = shallowMount(Includes, mountItem);
      await wrapper.setProps({
        includes: includes
      });
      const dirIdx = Random.integer(0, includes.length - 1);
      await wrapper.vm.showEditDirDialog(dirIdx);
      expect(wrapper.vm.editDialogVisible).toBeTruthy();
      expect(wrapper.vm.current).toEqual(includes[dirIdx]);

      await wrapper.vm.handleEditDir(dirIdx);
      expect(wrapper.vm.editDialogVisible).toBeFalsy();
      wrapper.destroy();
    });
    it('3) showAddDirDialog & handleAddDir', async() => {
      const wrapper = shallowMount(Includes, mountItem);
      await wrapper.setProps({
        includes: includes
      });
      await wrapper.vm.showAddDirDialog();
      expect(wrapper.vm.addDialogVisible).toBeTruthy();

      await wrapper.vm.handleAddDir();
      expect(wrapper.vm.dirChecked).toBeTruthy();
      expect(wrapper.vm.currentIndex).toBe(0);
      expect(wrapper.vm.current).toEqual(includes[0]);
      expect(wrapper.vm.addDialogVisible).toBeFalsy();
      wrapper.destroy();
    });
    it('4) handleMoveDownCurrentDir', async() => {
      const wrapper = shallowMount(Includes, mountItem);
      await wrapper.setProps({
        includes: includes
      });
      const includeIdx = Random.integer(0, includes.length - 1);
      await wrapper.setData({
        currentIndex: includeIdx
      });
      await wrapper.vm.handleMoveDownCurrentDir();
      if (includeIdx < includes.length - 1) {
        expect(wrapper.vm.currentIndex).toBe(includeIdx + 1);
      }
      wrapper.destroy();
    });
    it('5) handleSubmit', async() => {
      const wrapper = shallowMount(Includes, mountItem);
      await wrapper.vm.handleSubmit();
      expect(wrapper.emitted('submit')).toBeTruthy();
      wrapper.destroy();
    });
    it('6) handleCancel', async() => {
      const wrapper = shallowMount(Includes, mountItem);
      await wrapper.vm.handleCancel();
      expect(wrapper.emitted('cancel')).toBeTruthy();
      wrapper.destroy();
    });
  });
});

