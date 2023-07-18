import { mount } from '@vue/test-utils';
import Mock, { Random } from 'mockjs';
import RTable from '../../../../src/components/RTable/src/table';
import RTableColumn from '../../../../src/components/RTable/src/table-column';
import RPagination from '../../../../src/components/RPagination/src/pagination';
import RButton from '../../../../src/components/RButton/src/button';
import DetectionTemplate from '../../../../src/views/components/tester/DetectionTemplate';
import i18n from '../../../../src/i18n';

const mountItem = {
  mocks: {
    $t: (key) => i18n.t(key),
    $router: {
      push: key => key
    }
  },
  stubs: {
    'r-table': RTable,
    'r-table-column': RTableColumn,
    'r-pagination': RPagination,
    'r-button': RButton
  }
};

describe('DetectionTemplate', () => {
  it('1. default render', () => {
    const wrapper = mount(DetectionTemplate, mountItem);
    expect(wrapper.find('.detection-template').exists()).toBeTruthy();
    expect(wrapper.find('.detection-template .r-table').exists()).toBeTruthy();
    expect(wrapper.find('.detection-template .r-pagination').exists()).toBeTruthy();
    wrapper.destroy();
  });
  describe('2. test props', () => {
    it('1) q', async() => {
      const wrapper = mount(DetectionTemplate, mountItem);
      const q = Random.word();
      await wrapper.setProps({
        q: q
      });
      expect(wrapper.vm.filters.name).toBe(q);
      wrapper.destroy();
    });
  });
});

