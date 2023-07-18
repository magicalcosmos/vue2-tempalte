/* eslint-disable no-undef */
import VersionDetail from '../../../../src/views/components/tester/VersionDetail.vue';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import i18n from '../../../../src/i18n';
import store from '../../../../src/store/index';
import router from '../../../../src/router';
import VueRouter from 'vue-router';
import * as Paths from '../../../../src/router/paths';

const localVue = createLocalVue();
localVue.use(VueRouter);

const _version = {
  versionId: '592fb565550fe37a3b88bc97',
  versionName: 'v1.0.0',
  status: 1,
  createAt: 1506350501853,
  visitAt: 1506360501853,
  finishAt: 1506360501853,
  coverages: 7,
  rootDirectory: {
    fileId: '59bf3d18dcd2ae8a61d3bcc5',
    fileName: '.',
    path: '.',
    status: 0,
    kind: 2,
    statementCoverage: 0,
    branchCoverage: 0,
    mcdcCoverage: 0,
    failed: false
  }
};
const mountItem = {
  mocks: {
    $t: key => i18n.t(key),
    $paths: Paths
  },
  localVue,
  store,
  router
};
const factory = options => {
  return shallowMount(VersionDetail, {
    ...mountItem,
    ...options
  });
};
describe('VersionDetail', () => {
  it('renders VersionDetail', () => {
    const wrapper = factory();
    expect(wrapper.find('div').exists()).toBe(false);
    wrapper.destroy();
  });
  it('Test VersionDetail text', () => {
    const wrapper = factory({
      propsData: {
        visible: true,
        version: _version
      }
    });
    expect(wrapper.find('.project-detail .title').text()).toBe(i18n.t('version.detail'));
    expect(wrapper.find('.project-detail .label').text()).toBe(i18n.t('version.name'));
    expect(wrapper.findAll('.project-detail-item.mt-3').at(0).text()).toBe(i18n.t('project.create_time'));
    expect(wrapper.findAll('.project-detail-item.create-time').at(0).text()).toBe(_version.createAt + '');
    expect(wrapper.findAll('.project-detail-item.mt-3').at(1).text()).toBe(i18n.t('version.source_code'));
    expect(wrapper.find('.r-icon-download.pointer').attributes('title')).toBe(i18n.t('version.download_source_code'));
    expect(wrapper.find('.r-icon-refresh-right.pointer').attributes('title')).toBe(i18n.t('version.reupload_source_code'));
    expect(wrapper.find('history-stub').attributes('title')).toBe(i18n.t('project.operation_history'));
    wrapper.destroy();
  });
  describe('Test props', () => {
    it('Test visible', async() => {
      const wrapper = factory({
        propsData: {
          version: _version
        }
      });
      await wrapper.setProps({
        visible: true
      });
      expect(wrapper.props('visible')).toBe(true);
      expect(wrapper.vm.isShow).toBe(true);
      expect(wrapper.find('div').exists()).toBe(true);
      wrapper.destroy();
    });
    it('Test version', async() => {
      const wrapper = factory();
      await wrapper.setProps({
        version: _version
      });
      expect(wrapper.props('version')).toEqual(_version);
      expect(wrapper.vm.currentVersion).toEqual(_version);
      wrapper.destroy();
    });
    it('Test projectId', async() => {
      const _projectId = '592fb5a8550fe37a3b88bcb4';
      const wrapper = factory();
      await wrapper.setProps({
        projectId: _projectId
      });
      expect(wrapper.props('projectId')).toBe(_projectId);
      expect(wrapper.vm.currentProjectId).toBe(_projectId);
      wrapper.destroy();
    });
  });
  describe('Test events', () => {
    it('Test handleReUploadSourceFile', async() => {
      const wrapper = factory({
        propsData: {
          visible: true,
          version: _version
        }
      });
      await wrapper.find('.r-icon-refresh-right.pointer').trigger('click');
      wrapper.destroy();
    });
  });
  describe('Test methods', () => {
    it('Test handleSaveVersion', async() => {
      const wrapper = factory();
      wrapper.vm.handleSaveVersion({ value: '123' });
      await wrapper.vm.$nextTick();
      expect(wrapper.emitted('handleSaveVersion')).toBeTruthy();
      wrapper.destroy();
    });
  });
});
