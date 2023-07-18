/* eslint-disable no-undef */
import TestCaseFileTree from '@/views/components/tester/TestCaseFileTree/index.vue';
import { shallowMount } from '@vue/test-utils';
import store from '../../../../src/store';
import Mock from 'mockjs';
import i18n from '@/i18n';
import common from '@/utils/common';
import { ProjectVersionManagement, TestCaseManagement } from '@/api';
import { versionData, statisticsData, wsMessageData } from './TestCaseFileTreeData.js';
import {
  AddFile,
  AddFolder,
  DownloadTestCase,
  Coverages,
  EditTestTarget,
  ReplaceFileOrFolder,
  AsyncLoadingTree
} from '@/views/components';

common.i18n = key => i18n.t(key);
common.currentTestType = () => 'integrationTest';

ProjectVersionManagement.getStatistics = (versionId, callback) => {
  return new Promise((resolve, reject) => {
    if (versionId) {
      resolve(statisticsData);
      callback(null, statisticsData);
    } else {
      reject();
      callback({}, null);
    }
  });
};

const mountItem = {
  store,
  mocks: {
    $t: key => i18n.t(key),
    common: {
      isIntegrationTest: () => true,
      isUnitTest: () => false
    }
  }
};

const factory = options => {
  return shallowMount(TestCaseFileTree, {
    ...options,
    ...mountItem
  });
};

describe('TestCaseFileTree.vue', () => {
  it('Renders TestCaseFileTree', () => {
    const wrapper = factory();
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('div ul.test-case-file-tree').isVisible()).toBe(true);
    expect(wrapper.find('div ul.test-case-file-tree .total-coverate-rate').exists()).toBe(false);
    expect(wrapper.find('div ul.test-case-file-tree li.statistic').isVisible()).toBe(true);
    expect(wrapper.find('div ul.test-case-file-tree li.function-selection').isVisible()).toBe(true);
    expect(wrapper.find('div ul.test-case-file-tree li.file-trees').isVisible()).toBe(true);
    expect(wrapper.contains('r-cascader')).toBe(true);
    expect(wrapper.contains('r-button')).toBe(true);
    expect(wrapper.contains('r-menu')).toBe(true);
    expect(wrapper.contains('r-submenu')).toBe(true);
    expect(wrapper.contains('r-menu-item-group')).toBe(true);
    expect(wrapper.contains(AddFile)).toBe(true);
    expect(wrapper.contains(AddFolder)).toBe(true);
    expect(wrapper.contains(DownloadTestCase)).toBe(true);
    expect(wrapper.contains(Coverages)).toBe(false);
    expect(wrapper.contains(EditTestTarget)).toBe(true);
    expect(wrapper.contains(ReplaceFileOrFolder)).toBe(true);
    expect(wrapper.contains(AsyncLoadingTree)).toBe(true);
    wrapper.destroy();
  });

  describe('Test props', () => {
    it('Test the version of props', async() => {
      const wrapper = factory();
      await wrapper.setProps({
        version: versionData
      });
      expect(wrapper.props('version')).toEqual(versionData);
      expect(wrapper.vm.currentVersion).toEqual(versionData);
      expect(wrapper.find('div ul.test-case-file-tree .total-coverate-rate').exists()).toBe(true);
      expect(wrapper.find('.text-notice-regular').text()).toEqual(wrapper.vm.$t('file.total_coverage_rate'));
      expect(wrapper.find('.version-title span').text()).toBe(versionData.versionName);
      expect(wrapper.contains(Coverages)).toBe(true);
      wrapper.destroy();
    });
    it('Test the wsMessage of props', async() => {
      const wrapper = factory();
      await wrapper.setProps({
        wsMessage: wsMessageData
      });
      expect(wrapper.props('wsMessage')).toEqual(wsMessageData);
      wrapper.destroy();
    });
    it('Test the project of props', async() => {
      const projectData = {
        projectId: '613b057ebf132f2663ffb562',
        projectName: 'integrationTest2'
      };
      const wrapper = factory();
      await wrapper.setProps({
        project: projectData
      });
      expect(wrapper.props('project')).toEqual(projectData);
      expect(wrapper.find('.version-title a').text()).toBe(projectData.projectName);
      wrapper.destroy();
    });
    it('Test the nodeSelectedId of props', async() => {
      const nodeSelectedId = '613b057ebf132f2663ffb562';
      const wrapper = factory();
      await wrapper.setProps({
        nodeSelectedId: nodeSelectedId
      });
      expect(wrapper.props('nodeSelectedId')).toEqual(nodeSelectedId);
      wrapper.destroy();
    });
    it('Test the parentId of props', async() => {
      const parentId = '613b057ebf132f2663ffb562';
      const wrapper = factory();
      await wrapper.setProps({
        parentId: parentId
      });
      expect(wrapper.props('parentId')).toEqual(parentId);
      wrapper.destroy();
    });
  });
});
