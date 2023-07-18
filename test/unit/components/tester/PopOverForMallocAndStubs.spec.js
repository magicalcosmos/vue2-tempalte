/* eslint-disable no-undef */
import { PopOverForMallocAndStubs } from '../../../../src/views/components';
import RTable from '../../../../src/components/RTable/src/table';
import RTableColumn from '../../../../src/components/RTable/src/table-column';
import RPopover from '../../../../src/components/RPopover/src/main';
import RButton from '../../../../src/components/RButton/index';
import { mount } from '@vue/test-utils';
import Mock, { Random } from 'mockjs';
import i18n from '../../../../src/i18n';
const mountItem = {
  mocks: {
    $t: (key) => i18n.t(key)
  },
  stubs: {
    'r-table': RTable,
    'r-table-column': RTableColumn,
    'r-popover': RPopover,
    'r-button': RButton
  }
};
const data = [{
  title: '桩函数',
  listData: [
    {
      name: 'prvCheckDelayedList()',
      typeName: 'void',
      stubName: 'prvCheckDelayedList',
      kind: 10,
      data: {
        '@attributes': [
          'isStatic'
        ],
        '@fullname': 'prvCheckDelayedList()',
        '@mangled': '_ZL19prvCheckDelayedList',
        '@name': 'prvCheckDelayedList',
        '@nameargs': 'prvCheckDelayedList()',
        '@nameparams': 'prvCheckDelayedList()',
        params: [],
        stubsTriggerKind: 1
      },
      children: [],
      fieldPath: 'prvCheckDelayedList'
    }
  ],
  path: 'name',
  field: 'name',
  showEditIcon: true,
  showDeleteIcon: true
}];

describe('PopOverForMallocAndStubs', () => {
  it('1. default render', () => {
    const wrapper = mount(PopOverForMallocAndStubs, mountItem);
    expect(wrapper.find('.r-popover').isVisible()).toBeFalsy();
    wrapper.destroy();
  });
  describe('2. test props', () => {
    it('1) test currentData', async() => {
      const wrapper = mount(PopOverForMallocAndStubs, mountItem);
      await wrapper.setProps({
        data: data
      });
      expect(wrapper.vm.currentData).toEqual(data);
      expect(wrapper.find('.pop-over-malloc-content .title').text()).toBe(data[0].title);
      wrapper.destroy();
    });
  });
  describe('3. test events', () => {
    it('1) test handleEdit', async() => {
      const wrapper = mount(PopOverForMallocAndStubs, mountItem);
      await wrapper.vm.handleEdit(data[0].listData[0], data[0].title);
      expect(wrapper.emitted('edit')).toBeTruthy();
      wrapper.destroy();
    });
    it('2) test handleDelete', async() => {
      const wrapper = mount(PopOverForMallocAndStubs, mountItem);
      await wrapper.vm.handleDelete(data[0].listData[0], data[0].title);
      expect(wrapper.emitted('delete')).toBeTruthy();
      wrapper.destroy();
    });
    it('2) test handleTrigger', async() => {
      const wrapper = mount(PopOverForMallocAndStubs, mountItem);
      const trigger = wrapper.vm.handleTrigger();
      expect(trigger).toBe('manual');
      wrapper.destroy();
    });
  });
});
