import { mount } from '@vue/test-utils';
import Mock, { Random } from 'mockjs';
import i18n from '../../../../src/i18n';
import SortFilesTree from '../../../../src/views/components/tester/SortFilesTree';
import { versionData } from './version.data';

const treeData = [
  {
    'id': '6170db923a07112e791088b7',
    'fileId': '6170db923a07112e791088b7',
    'fileName': '.',
    'name': '全部',
    'path': '.',
    'status': 201,
    'kind': 2,
    'defectsCount': {},
    'fileCount': {
      '_': 1,
      '_c': 7,
      '_h': 1
    },
    'blockFilesCount': {},
    'repository': {
      'type': 1,
      'url': 'cache/upload/0d29eaa3ce6b8d93d4fcdfa91df949ad',
      'branch': null,
      'username': null
    },
    'children': [
      {
        'id': '6170db923a07112e791088b9',
        'fileId': '6170db923a07112e791088b9',
        'parentId': '6170db923a07112e791088b7',
        'fileName': 'createfunc.c',
        'name': 'createfunc.c',
        'path': './createfunc.c',
        'status': 201,
        'kind': 1,
        'defectsCount': {},
        'fileCount': {
          '_c': 1
        },
        'blockFilesCount': {},
        'hasChildren': true,
        'checked': false,
        'isAllChildrenChecked': false,
        'indeterminate': false,
        'functionStatus': 201,
        'children': []
      },
      {
        'id': '6170db923a07112e791088ba',
        'fileId': '6170db923a07112e791088ba',
        'parentId': '6170db923a07112e791088b7',
        'fileName': 'func.h',
        'name': 'func.h',
        'path': './func.h',
        'status': 201,
        'kind': 1,
        'defectsCount': {},
        'fileCount': {
          '_h': 1
        },
        'blockFilesCount': {},
        'hasChildren': true,
        'checked': false,
        'isAllChildrenChecked': false,
        'indeterminate': false,
        'functionStatus': 201,
        'children': []
      },
      {
        'id': '6170db923a07112e791088bb',
        'fileId': '6170db923a07112e791088bb',
        'parentId': '6170db923a07112e791088b7',
        'fileName': 'main.c',
        'name': 'main.c',
        'path': './main.c',
        'status': 201,
        'kind': 1,
        'defectsCount': {},
        'fileCount': {
          '_c': 1
        },
        'blockFilesCount': {},
        'hasChildren': true,
        'checked': false,
        'isAllChildrenChecked': false,
        'indeterminate': false,
        'functionStatus': 201,
        'children': []
      },
      {
        'id': '6170db923a07112e791088bc',
        'fileId': '6170db923a07112e791088bc',
        'parentId': '6170db923a07112e791088b7',
        'fileName': 'mcdc.c',
        'name': 'mcdc.c',
        'path': './mcdc.c',
        'status': 201,
        'kind': 1,
        'defectsCount': {},
        'fileCount': {
          '_c': 1
        },
        'blockFilesCount': {},
        'hasChildren': true,
        'checked': false,
        'isAllChildrenChecked': false,
        'indeterminate': false,
        'functionStatus': 201,
        'children': []
      },
      {
        'id': '6170db923a07112e791088be',
        'fileId': '6170db923a07112e791088be',
        'parentId': '6170db923a07112e791088b7',
        'fileName': 'static.c',
        'name': 'static.c',
        'path': './static.c',
        'status': 201,
        'kind': 1,
        'defectsCount': {},
        'fileCount': {
          '_c': 1
        },
        'blockFilesCount': {},
        'hasChildren': true,
        'checked': false,
        'isAllChildrenChecked': false,
        'indeterminate': false,
        'functionStatus': 201,
        'children': []
      },
      {
        'id': '6170db923a07112e791088bf',
        'fileId': '6170db923a07112e791088bf',
        'parentId': '6170db923a07112e791088b7',
        'fileName': 'struct.c',
        'name': 'struct.c',
        'path': './struct.c',
        'status': 201,
        'kind': 1,
        'defectsCount': {},
        'fileCount': {
          '_c': 1
        },
        'blockFilesCount': {},
        'hasChildren': true,
        'checked': false,
        'isAllChildrenChecked': false,
        'indeterminate': false,
        'functionStatus': 201,
        'children': []
      },
      {
        'id': '6170db923a07112e791088c0',
        'fileId': '6170db923a07112e791088c0',
        'parentId': '6170db923a07112e791088b7',
        'fileName': 'stub.c',
        'name': 'stub.c',
        'path': './stub.c',
        'status': 201,
        'kind': 1,
        'defectsCount': {},
        'fileCount': {
          '_c': 1
        },
        'blockFilesCount': {},
        'hasChildren': true,
        'checked': false,
        'isAllChildrenChecked': false,
        'indeterminate': false,
        'functionStatus': 201,
        'children': []
      },
      {
        blockFilesCount: { _c: 1 },
        defectsCount: {},
        fileCount: { _c: 1 },
        fileId: '616911dbc877313e1f0b73bc',
        fileName: 'pointer.c',
        id: '616911dbc877313e1f0b73bc',
        kind: 1,
        name: 'pointer.c',
        parentId: '616911dbc877313e1f0b73b6',
        path: './pointer.c',
        status: 201
      }
    ],
    'checked': false,
    'isAllChildrenChecked': false,
    'indeterminate': false,
    'functionStatus': 201,
    'hasChildren': false
  }
];
const mountItem = {
  mocks: {
    $t: (key) => i18n.t(key)
  }
};

describe('SortFilesTree', () => {
  it('1. default render', async() => {
    const wrapper = mount(SortFilesTree, {
      ...mountItem
    });
    expect(wrapper.find('.test-case-file-tree.sort-files-tree').exists()).toBeTruthy();
    expect(wrapper.find('.test-case-file-tree.sort-files-tree li.file-trees').exists()).toBeTruthy();
    expect(wrapper.find('.test-case-file-tree.sort-files-tree li.file-trees r-table').exists()).toBeTruthy();
    expect(wrapper.find('.r-right-menu').exists()).toBeTruthy();
    wrapper.destroy();
  });
  describe('2. test data', () => {
    it('1) treeData', async() => {
      const wrapper = mount(SortFilesTree, {
        ...mountItem
      });
      await wrapper.setData({
        treeData
      });
      expect(wrapper.find('.test-case-file-tree.sort-files-tree').exists()).toBeTruthy();
      expect(wrapper.find('.test-case-file-tree.sort-files-tree li.file-trees').exists()).toBeTruthy();
      expect(wrapper.find('.test-case-file-tree.sort-files-tree li.file-trees r-table').exists()).toBeTruthy();
      expect(wrapper.find('.r-right-menu').exists()).toBeTruthy();
      wrapper.destroy();
    });
  });
  describe('3. test props', () => {
    it('1) level', async() => {
      const wrapper = mount(SortFilesTree, {
        ...mountItem
      });
      const level = Random.int(1, 3);
      await wrapper.setProps({
        level
      });
      await wrapper.setData({
        treeData
      });
      expect(wrapper.vm.filters.level).toBe(level);
      wrapper.destroy();
    });
    it('2) version', async() => {
      const wrapper = mount(SortFilesTree, {
        ...mountItem
      });
      await wrapper.setProps({
        version: versionData
      });
      expect(wrapper.vm.currentVersion).toEqual(versionData);
      wrapper.destroy();
    });
  });
  describe('4. test methods', () => {
    it('1) getRowClass', async() => {
      const wrapper = mount(SortFilesTree, {
        ...mountItem
      });
      await wrapper.setData({
        treeData
      });
      const idx1 = Random.int(0, 6);
      const result1 = wrapper.vm.getRowClass({
        row: treeData[0].children[idx1]
      }, idx1);
      expect(result1).toBe('');

      const result2 = wrapper.vm.getRowClass({
        row: treeData[0].children[7]
      }, 7);
      expect(result2).toBe('hide-expand-icon');
      wrapper.destroy();
    });
    it('2) handleNodeClick', async() => {
      const wrapper = mount(SortFilesTree, {
        ...mountItem
      });
      await wrapper.setData({
        treeData
      });
      const idx = Random.int(0, 7);
      await wrapper.vm.handleNodeClick(treeData[0].children[idx]);
      if (idx < 7) {
        expect(wrapper.emitted('click')).toBeTruthy();
      } else {
        expect(wrapper.emitted('click')).toBeFalsy();
      }
      wrapper.destroy();
    });
    it('3) handleRightClick', async() => {
      const wrapper = mount(SortFilesTree, {
        ...mountItem
      });
      await wrapper.setData({
        treeData
      });
      expect(wrapper.vm.fileId).toBe('');
      expect(wrapper.vm.currentDefectCount).toEqual({
        advisory: 0,
        mandatory: 0,
        required: 0
      });
      const idx = Random.int(0, 7);
      const data = treeData[0].children[idx];
      await wrapper.vm.handleRightClick(data, {}, { preventDefault: () => {} });
      expect(wrapper.vm.fileId).toBe(data.fileId);
      expect(wrapper.vm.currentDefectCount).toEqual(data.defectsCount);
      expect(wrapper.vm.rightMenuTitle).toEqual(i18n.t('testcase.right_menu_file_title'));
      wrapper.destroy();
    });
    it('4) getIconClass', async() => {
      const wrapper = mount(SortFilesTree, {
        ...mountItem
      });
      await wrapper.setData({
        treeData
      });
      const idx = Random.int(0, 7);
      const data = treeData[0].children[idx];
      const className = wrapper.vm.getIconClass(data);
      expect(className).toBe('icon-file');
      wrapper.destroy();
    });
    it('5) getClassObject', async() => {
      const wrapper = mount(SortFilesTree, {
        ...mountItem
      });
      await wrapper.setData({
        treeData
      });
      const idx = Random.int(0, 7);
      const data = treeData[0].children[idx];
      const className = wrapper.vm.getClassObject(data);
      if (idx < 7) {
        expect(className).toBe('');
      } else {
        expect(className).toBe('file-block');
      }
      wrapper.destroy();
    });
  });
});
