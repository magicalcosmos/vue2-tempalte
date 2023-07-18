import { shallowMount } from '@vue/test-utils';
import Mock, { Random } from 'mockjs';
import Macros from '../../../../src/views/components/tester/Macros';
import i18n from '../../../../src/i18n';

const mountItem = {
  mocks: {
    $t: (key) => i18n.t(key)
  }
};

const macros = Mock.mock({
  'array|1-10': [{
    key: Random.word(),
    value: Random.word()
  }]
}).array;

describe('Macros', () => {
  it('1. default render', () => {
    const wrapper = shallowMount(Macros, mountItem);
    expect(wrapper.find('.macros .flex-border .border').exists()).toBeTruthy();
    expect(wrapper.find('.macros .flex-border .border r-table').exists()).toBeTruthy();
    expect(wrapper.find('.macros .flex-border .macros-buttons').exists()).toBeTruthy();
    expect(wrapper.findAll('.macros .flex-border .macros-buttons r-button').length).toBe(3);
    expect(wrapper.find('.macros .text-button').exists()).toBeTruthy();
    expect(wrapper.findAll('.macros .text-button r-button').length).toBe(2);
    wrapper.destroy();
  });
  describe('2. test props', () => {
    it('1) macros', async() => {
      const wrapper = shallowMount(Macros, mountItem);
      await wrapper.setProps({
        macros
      });
      expect(wrapper.vm.currentMacros).toEqual(macros);
      wrapper.destroy();
    });
  });
  describe('3. test methods', () => {
    it('1) setCurrentRow & handleEditCurrentDir & handleEditDir & handleCurrentRowChange & showAddDirDialog', async() => {
      const wrapper = shallowMount(Macros, mountItem);
      await wrapper.setProps({
        macros
      });
      const idx = Random.integer(0, macros.length - 1);
      await wrapper.vm.setCurrentRow(macros[idx]);
      expect(wrapper.vm.current).toEqual(macros[idx]);
      expect(wrapper.vm.newItem).toBe(macros[idx].key);
      expect(wrapper.vm.newItemInfo).toBe(macros[idx].value);

      await wrapper.vm.handleEditCurrentDir();
      expect(wrapper.vm.addDialogVisiblefix).toBeTruthy();

      const newItem = Random.word();
      const newItemInfo = Random.word();
      await wrapper.setData({
        newItem,
        newItemInfo
      });
      await wrapper.vm.handleEditDir();
      expect(wrapper.vm.current.key).toEqual(newItem);
      expect(wrapper.vm.current.value).toEqual(newItemInfo);
      expect(wrapper.vm.addDialogVisiblefix).toBeFalsy();
      //
      await wrapper.vm.handleCurrentRowChange(macros[idx]);
      expect(wrapper.vm.addDialogVisiblefix).toBeTruthy();

      await wrapper.vm.showAddDirDialog();
      expect(wrapper.vm.newItem).toBe('');
      expect(wrapper.vm.newItemInfo).toBe('');
      expect(wrapper.vm.addDialogVisible).toBeTruthy();

      wrapper.destroy();
    });
    it('2) handleCopyDir', async() => {
      const wrapper = shallowMount(Macros, mountItem);
      const selectedRowKey = Random.word();
      await wrapper.setData({
        selectedRowKey
      });
      expect(wrapper.vm.currentMacros.length).toBe(0);
      await wrapper.vm.handleCopyDir();
      expect(wrapper.vm.currentMacros.length).toBe(1);
      wrapper.destroy();
    });
    it('3) handleAddDir', async() => {
      const wrapper = shallowMount(Macros, mountItem);
      await wrapper.setProps({
        macros
      });
      await wrapper.vm.handleAddDir();
      expect(wrapper.vm.newItem).toBe('');
      expect(wrapper.vm.newItemInfo).toBe('');
      expect(wrapper.vm.addDialogVisible).toBeFalsy();
      expect(wrapper.vm.addDialogVisiblefix).toBeFalsy();

      const idx = Random.integer(0, macros.length - 1);
      const newItem = Random.word();
      const newItemInfo = Random.word();
      await wrapper.setData({
        deleteKey: idx,
        newItem,
        newItemInfo
      });
      await wrapper.vm.handleAddDir();
      expect(wrapper.vm.currentMacros[0].key).toBe(newItem);
      expect(wrapper.vm.currentMacros[0].value).toBe(newItemInfo);
      wrapper.destroy();
    });
    it('4) handleDeleteCurrentDir', async() => {
      const wrapper = shallowMount(Macros, mountItem);
      const idx = Random.integer(0, macros.length - 1);
      await wrapper.setProps({
        macros
      });
      await wrapper.setData({
        current: macros[idx],
        addDialogVisiblefix: true
      });
      await wrapper.vm.handleDeleteCurrentDir();
      expect(wrapper.vm.current).toEqual({});
      expect(wrapper.vm.addDialogVisiblefix).toBeFalsy();
      wrapper.destroy();
    });
  });
});


