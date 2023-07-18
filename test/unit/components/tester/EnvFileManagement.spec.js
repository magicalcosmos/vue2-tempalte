import EnvFileManagement from '../../../../src/views/components/tester/EnvFileManagement';
import i18n from '../../../../src/i18n';
import Mock, { Random } from 'mockjs';
import { shallowMount } from '@vue/test-utils';

const mountItem = {
  mocks: {
    $t: (key) => i18n.t(key)
  }
};

const includes = Mock.mock({
  'array|1-10': [Random.word()]
}).array;

describe('EnvFileManagement', () => {
  it('1. default render', () => {
    const wrapper = shallowMount(EnvFileManagement, mountItem);
    expect(wrapper.find('.env-file-management').exists()).toBeTruthy();
    expect(wrapper.find('.env-file-management .includes-body').exists()).toBeTruthy();
    expect(wrapper.find('.env-file-management .includes-body .include-dir-overflow').exists()).toBeTruthy();
    expect(wrapper.find('.env-file-management .includes-body .include-dir-overflow r-input').exists()).toBeTruthy();
    expect(wrapper.find('.env-file-management .includes-body .include-dir-overflow r-tree').exists()).toBeTruthy();
    expect(wrapper.find('.env-file-management .includes-body .df-col-ac').exists()).toBeTruthy();
    expect(wrapper.findAll('.env-file-management .includes-body .df-col-ac r-button').length).toBe(4);
    wrapper.destroy();
  });
  describe('2. test props', () => {
    it('1) includes', async() => {
      const wrapper = shallowMount(EnvFileManagement, mountItem);
      await wrapper.setProps({
        includes: includes
      });
      expect(wrapper.vm.dirs).toEqual(includes);
      expect(wrapper.vm.defaultDir).toBeFalsy();
      wrapper.destroy();
    });
  });
  describe('3. test methods', () => {
    it('1) handleCheck', async() => {
      const wrapper = shallowMount(EnvFileManagement, mountItem);
      const node = {
        kind: Random.integer(1, 2)
      };
      await wrapper.vm.handleCheck(node);
      expect(wrapper.vm.nodePath).toEqual(node);
      if (node.kind === 2) {
        expect(wrapper.vm.selectfile).toBeFalsy();
      } else {
        expect(wrapper.vm.selectfile).toBeTruthy();
      }
      wrapper.destroy();
    });
    it('2) showEditDirDialog & handleEditDir', async() => {
      const wrapper = shallowMount(EnvFileManagement, mountItem);
      await wrapper.setProps({
        includes: includes
      });
      const dirIdx = Random.integer(0, includes.length - 1);
      await wrapper.vm.showEditDirDialog(dirIdx);
      expect(wrapper.vm.current).toEqual(includes[dirIdx]);
      expect(wrapper.vm.editDialogVisible).toBeTruthy();

      await wrapper.setData({
        currentIndex: dirIdx
      });
      await wrapper.vm.handleEditDir();
      expect(wrapper.vm.dirs[dirIdx]).toBe(includes[dirIdx]);
      expect(wrapper.vm.editDialogVisible).toBeFalsy();
      wrapper.destroy();
    });
    it('3) showAddDirDialog', async() => {
      const wrapper = shallowMount(EnvFileManagement, mountItem);
      await wrapper.setData({
        nodePath: Random.word()
      });
      await wrapper.vm.showAddDirDialog();
      expect(wrapper.vm.addDialogVisible).toBeTruthy();
      wrapper.destroy();
    });
  });
});
