/* eslint-disable no-undef */
import AddExternalVariables from '../../../../../src/views/components/Dialog/AddExternalVariables.vue';
import BaseDialog from '../../../../../src/views/components/Dialog/BaseDialog.vue';
import { shallowMount } from '@vue/test-utils';
import i18n from '../../../../../src/i18n';
import Mock from 'mockjs';
const mountIitem = {
  mocks: {
    $t: key => i18n.t(key)
  }
};

const factory = options => {
  return shallowMount(AddExternalVariables, {
    ...mountIitem,
    ...options
  });
};

describe('AddExternalVariables.vue', () => {
  it('Render AddExternalVariables', () => {
    const wrapper = factory();
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.contains(BaseDialog)).toBe(true);
    wrapper.destroy();
  });
  it('Test attributes', () => {
    const wrapper = factory();
    expect(wrapper.attributes('title')).toMatch(i18n.t('dialog.add_external_variable'));
    expect(wrapper.attributes('confirm')).toMatch(i18n.t('button.confirm'));
    expect(wrapper.attributes('class')).toMatch(i18n.t('add-external-variables'));
    wrapper.destroy();
  });
  describe('Test props', () => {
    it('Test the visible of props', async() => {
      const wrapper = factory();
      await wrapper.setProps({
        visible: true
      });
      expect(wrapper.props('visible')).toBe(true);
      expect(wrapper.attributes('visible')).toBe('true');
      wrapper.destroy();
    });
    it('Test the functionId of props', async() => {
      const _functionId = Mock.mock('@integer()');
      const wrapper = factory();
      await wrapper.setProps({
        functionId: _functionId
      });
      expect(wrapper.props('functionId')).toBe(_functionId);
      wrapper.destroy();
    });
  });
  describe('Test data', () => {
    it('Test tableData', async() => {
      const _tableData = Mock.mock({
        'data|1-10': [{
          fileId: '@integer()',
          filePath: './freeRTOS/croutine.c',
          name: '@name',
          fullname: '@name',
          mangled: '_Z18pxCurrentCoRoutine',
          type: 'CRCB_t *',
          value: '0',
          attributes: [
            'isExtern',
            'isDefined'
          ],
          selected: '@boolean()'
        }]
      }).data;
      const wrapper = factory();
      await wrapper.setData({
        tableData: _tableData
      });
      expect(wrapper.vm.tableData).toEqual(_tableData);
      wrapper.destroy();
    });
  });

  describe('Test methods', () => {
    it('Test toggleVisible', async() => {
      const bool = Mock.mock('@boolean()');
      const wrapper = factory();
      wrapper.vm.toggleVisible(bool);
      await wrapper.vm.$nextTick();
      expect(wrapper.emitted('update:visible')).toBeTruthy();
      expect(wrapper.emitted('update:visible')[0]).toEqual([bool]);
      wrapper.destroy();
    });
  });
});


