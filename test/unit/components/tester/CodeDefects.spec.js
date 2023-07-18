import { mount } from '@vue/test-utils';
import Mock, { Random } from 'mockjs';
import RTable from '../../../../src/components/RTable/src/table';
import RTableColumn from '../../../../src/components/RTable/src/table-column';
import CodeDefects from '../../../../src/views/components/tester/CodeDefects';
import i18n from '../../../../src/i18n';
import NButton from '../../../../src/components/NButton';
import store from '../../../../src/store';

const mountItem = {
  mocks: {
    $t: (key) => i18n.t(key),
    $store: store,
    common: {
      i18n: key => i18n.t(key)
    }
  },
  stubs: {
    'r-table': RTable,
    'r-table-column': RTableColumn,
    'n-button': NButton
  }
};

const defects = Mock.mock({
  'array|1-10': [{
    unread: Random.boolean(),
    manual: Random.boolean(),
    description: Random.word(),
    defectId: Random.word(),
    locations: Mock.mock({
      'array|1-10': [{
        auditStatus: 1,
        project: {
          type: Random.boolean() ? 'single' : 'range',
          begin: {
            line: Random.integer(0, 10),
            column: Random.integer(0, 10)
          },
          end: {
            line: Random.integer(0, 10),
            column: Random.integer(0, 10)
          }
        }
      }]
    }).array
  }]
}).array;

describe('CodeDefects', () => {
  it('1. default render', () => {
    const wrapper = mount(CodeDefects, mountItem);
    expect(wrapper.find('.code-defects-table .r-table').exists()).toBeTruthy();
    expect(wrapper.find('.code-defects-table report-defect').exists()).toBeFalsy();
    wrapper.destroy();
  });
  describe('2. test props', () => {
    it('1) functionId', async() => {
      const wrapper = mount(CodeDefects, mountItem);
      const functionId = Random.word();
      await wrapper.setProps({
        functionId: functionId
      });
      expect(wrapper.vm.currentFunctionId).toBe(functionId);
      wrapper.destroy();
    });
    it('2) unreadTotal', async() => {
      const wrapper = mount(CodeDefects, mountItem);
      expect(wrapper.vm.unreadTotal).toBe(0);
      const unreadTotal = Random.integer(1, 10);
      await wrapper.setData({
        unreadTotal: unreadTotal
      });
      expect(wrapper.vm.unreadTotal).toBe(unreadTotal);
      expect(wrapper.emitted('updateData')).toBeTruthy();
      wrapper.destroy();
    });
    it('3) total', async() => {
      const wrapper = mount(CodeDefects, mountItem);
      expect(wrapper.vm.total).toBe(0);
      const total = Random.integer(1, 10);
      await wrapper.setData({
        total: total
      });
      expect(wrapper.vm.total).toBe(total);
      expect(wrapper.emitted('updateData')).toBeTruthy();
      wrapper.destroy();
    });
  });
  describe('3. test methods', () => {
    it('1) handleHighlight', async() => {
      const wrapper = mount(CodeDefects, mountItem);
      const defectIdx = Random.integer(0, defects.length - 1);
      const handleHighlightResult = wrapper.vm.handleHighlight({ row: defects[defectIdx], rowIndex: defectIdx });
      if (defects[defectIdx].unread) {
        expect(handleHighlightResult).toBe(`pointer highlight`);
      } else {
        expect(handleHighlightResult).toBe('');
      }
      wrapper.destroy();
    });
    it('2) handleToEdit', async() => {
      const wrapper = mount(CodeDefects, mountItem);
      const defectIdx = Random.integer(0, defects.length - 1);
      await wrapper.vm.handleToEdit({
        ...defects[defectIdx],
        manual: true
      });
      expect(wrapper.vm.updateDefectDialogShow).toBeTruthy();
      wrapper.destroy();
    });
  });
});



