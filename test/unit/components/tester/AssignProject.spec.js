import { mount } from '@vue/test-utils';
import Mock, { Random } from 'mockjs';
import RTable from '../../../../src/components/RTable/src/table';
import RTableColumn from '../../../../src/components/RTable/src/table-column';
import RPagination from '../../../../src/components/RPagination/src/pagination';
import AssignProject from '../../../../src/views/components/tester/AssignProject';
import RTag from '../../../../src/components/RTag/src/tag';
import RButton from '../../../../src/components/RButton/index';
import RDialog from '../../../../src/components/RDialog/src/component';
import i18n from '../../../../src/i18n';
import store from '../../../../src/store';
import { versionData } from './version.data';

const mountItem = {
  mocks: {
    $t: (key) => i18n.t(key),
    $store: store,
    $route: {
      query: {
        versionId: versionData.versionId
      }
    },
    $message: {
      waring: {}
    },
    common: {
      renderProcess: () => {}
    }
  },
  stubs: {
    'r-table': RTable,
    'r-table-column': RTableColumn,
    'r-pagination': RPagination,
    'r-button': RButton,
    'r-tag': RTag,
    'r-dialog': RDialog
  }
};

describe('AssignProject', () => {
  it('1. default render', () => {
    const wrapper = mount(AssignProject, mountItem);
    expect(wrapper.find('.w-100 .row .col-12').exists()).toBeTruthy();
    expect(wrapper.find('.w-100 .row .col-12 .r-button').exists()).toBeTruthy();
    expect(wrapper.find('.w-100 .row .col-12 .r-button').text()).toBe(i18n.t('assign_project.submit'));
    expect(wrapper.find('.w-100 .r-table').exists()).toBeTruthy();
    expect(wrapper.find('.w-100 .r-pagination').exists()).toBeTruthy();
    wrapper.destroy();
  });
  describe('2. test props', () => {
    it('1) q', async() => {
      const wrapper = mount(AssignProject, mountItem);
      const q = Random.word();
      await wrapper.setProps({
        q: q
      });
      expect(wrapper.vm.filters.q).toBe(q);
      wrapper.destroy();
    });
  });
  describe('3. test methods', () => {
    it('1) handleBatchSbumit', async() => {
      const wrapper = mount(AssignProject, mountItem);
      await wrapper.setData({
        apSelection: Mock.mock({
          'array|1-10': [{
            auditStatus: 1,
            project: {
              name: Random.word()
            }
          }]
        }).array
      });
      expect(wrapper.vm.batchSubmitDialogVisible).toBeFalsy();
      expect(wrapper.find('.w-100 .row .col-12 .r-dialog').isVisible()).toBeFalsy();
      await wrapper.find('.w-100 .row .col-12 .r-button').trigger('click');
      expect(wrapper.vm.batchSubmitDialogVisible).toBeTruthy();
      expect(wrapper.find('.w-100 .row .col-12 .r-dialog').isVisible()).toBeTruthy();
      wrapper.destroy();
    });
  });
});

