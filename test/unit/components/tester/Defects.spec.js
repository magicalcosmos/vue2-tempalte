import { Defects } from '../../../../src/views/components';
import RTable from '../../../../src/components/RTable/src/table';
import RTableColumn from '../../../../src/components/RTable/src/table-column';
import { createLocalVue, mount, shallowMount } from '@vue/test-utils';
import { Random } from 'mockjs';
import i18n from '../../../../src/i18n';
const defectsData = [
  {
    'projectId': '608a2b6e884c3c7fc8978d3e',
    'versionId': '608a2b6f884c3c7fc8978d3f',
    'fileId': '608a2b781563217fc5b81e0c',
    'filePath': './demox/all.c',
    'ruleId': '60af4dc369b18a7a72076ec5',
    'status': 0,
    'line': 6,
    'defectId': '60ebfa2b135de41cd3564a49',
    'number': 31,
    'ruleName': '函数参数表为空时，必须使用void明确说明。',
    'ruleCode': 'R-1-1-23',
    'ruleLevel': 1,
    'ruleSetId': '60af4dc369b18a7a72076eae',
    'ruleSetName': 'GJB 8114-2013',
    'fileName': 'all.c'
  }
];
const mountItem = {
  mocks: {
    $t: (key) => i18n.t(key)
  },
  stubs: {
    'r-table': RTable,
    'r-table-column': RTableColumn
  }
};
//
describe('Defects', () => {
  it('1. default render', () => {
    const wrapper = mount(Defects, mountItem);
    expect(wrapper.find('.defects').exists()).toBeTruthy();
    expect(wrapper.findAll('.defects .r-table').length).toBe(2);
    wrapper.destroy();
  });
  describe('2. test props', () => {
    it('1. tabName', async() => {
      const wrapper = mount(Defects, mountItem);
      await wrapper.setProps({
        tabName: 'rules'
      });
      expect(wrapper.findAll('.defects .r-table').at(0).classes()).not.toContain('hide');
      expect(wrapper.findAll('.defects .r-table').at(1).classes()).toContain('hide');
      wrapper.destroy();
    });
    it('2. defectData', async() => {
      const wrapper = mount(Defects, mountItem);
      await wrapper.setProps({
        tabName: 'files'
      });
      expect(wrapper.findAll('.defects .r-table').at(1).classes()).not.toContain('hide');
      expect(wrapper.findAll('.defects .r-table').at(0).classes()).toContain('hide');
      await wrapper.setData({
        defectData: defectsData
      });
      const tbody = wrapper.findAll('.defects .r-table').at(0).find('tbody');
      expect(tbody.findAll('tr').length).toBe(wrapper.vm.defectData.length);
      expect(tbody.findAll('tr').at(0).findAll('td').at(0).text()).toContain(wrapper.vm.defectData[0].number);
      expect(tbody.findAll('tr').at(0).findAll('td').at(0).find('span').attributes('id')).toBe(wrapper.vm.defectData[0].defectId);
      wrapper.destroy();
    });
    it('2. filterParams', async() => {
      const wrapper = mount(Defects, mountItem);
      await wrapper.setProps({
        tabName: 'files'
      });
      await wrapper.setData({
        filterParams: {
          status: 0
        }
      });
      expect(wrapper.vm.currentFilterParams).toEqual(wrapper.props().filterParams);

      wrapper.destroy();
    });
  });
  describe('3. test events', () => {
    it('1) handleRowClick', async() => {
      const wrapper = mount(Defects, mountItem);
      await wrapper.vm.handleRowClick(defectsData[0]);
      expect(wrapper.emitted('click')).toBeTruthy();
      wrapper.destroy();
    });
    it('2) handleCellMouseEnter & handleEdit & handleCellMouseLeave', async() => {
      const wrapper = mount(Defects, mountItem);
      await wrapper.setData({
        defectData: defectsData
      });
      await wrapper.vm.handleCellMouseEnter(wrapper.vm.defectData[0]);
      expect(wrapper.vm.defectData[0].isShowEdit).toBeTruthy();

      await wrapper.vm.handleEdit(wrapper.vm.defectData[0], true);
      expect(wrapper.vm.defectData[0].edit).toBeTruthy();

      await wrapper.vm.handleCellMouseLeave(wrapper.vm.defectData[0]);
      expect(wrapper.vm.defectData[0].isShowEdit).toBeFalsy();

      wrapper.destroy();
    });
  });
});
