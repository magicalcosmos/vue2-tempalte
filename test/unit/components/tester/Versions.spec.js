/* eslint-disable no-undef */
import Versions from '../../../../src/views/components/tester/Versions.vue';
import { shallowMount } from '@vue/test-utils';
import i18n from '../../../../src/i18n';
import store from '../../../../src/store/index';

const _versions = [
  {
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
  },
  {
    projectId: '592fb5a8550fe37a3b88bcb4',
    versionName: 'v1.1.0',
    status: 1,
    createAt: 1506350501853,
    visitAt: 1506360501853,
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
  }
];
const mountItem = {
  mocks: {
    $t: key => i18n.t(key)
  },
  store
};
const factory = options => {
  return shallowMount(Versions, {
    ...mountItem,
    ...options
  });
};
describe('Versions', () => {
  it('renders Versions', () => {
    const wrapper = factory();
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('r-table').exists()).toBe(true);
    expect(wrapper.find('r-table-column').exists()).toBe(true);
    expect(wrapper.find('r-pagination').exists()).toBe(true);
    wrapper.destroy();
  });
  it('Test label of the r-table-column ', () => {
    const wrapper = factory();
    const eles = wrapper.findAll('r-table-column');
    expect(eles.at(0).attributes('label')).toBe(i18n.t('project.version'));
    expect(eles.at(1).attributes('label')).toBe(i18n.t('project.create_time'));
    wrapper.destroy();
  });
  describe('Test props', () => {
    it('Test q to query', async() => {
      const wrapper = factory();
      await wrapper.setProps({
        q: '123'
      });
      expect(wrapper.vm.filters.q).toBe('123');
      expect(wrapper.vm.filters.page).toBe(1);
      wrapper.destroy();
    });
  });
  describe('Test data', () => {
    it('Test versions', async() => {
      const wrapper = factory();
      await wrapper.setData({
        versions: _versions
      });
      expect(wrapper.find('r-table').attributes('data')).not.toBeNull();
      wrapper.destroy();
    });
  });
});
