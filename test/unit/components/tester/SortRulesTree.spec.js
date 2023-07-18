import SortRulesTree from '../../../../src/views/components/tester/SortRulesTree/index';
import { mount } from '@vue/test-utils';
import Mock, { Random } from 'mockjs';
import i18n from '../../../../src/i18n';
import { versionData } from './version.data';
import SortFilesTree from '../../../../src/views/components/tester/SortFilesTree/index';
import { RULESLEVEL } from '../../../../src/utils/dict';

const mountItem = {
  mocks: {
    $t: (key) => i18n.t(key)
  }
};

const treeData = [
  {
    'id': 1,
    'name': '全部',
    'hasChildren': false,
    'children': [
      {
        'ruleSetId': '60af4dc369b18a7a72076eae',
        'ruleSetName': 'GJB 8114-2013',
        'total': 4,
        'levels': [
          {
            'level': 1,
            'total': 1,
            'rules': [
              {
                'ruleId': '60af4dc369b18a7a72076ed6',
                'name': '函数指针的使用必须加以&明确说明。',
                'total': 1,
                'ruleCode': 'R-1-3-2'
              }
            ]
          },
          {
            'level': 3,
            'total': 3,
            'rules': [
              {
                'ruleId': '60af4dc369b18a7a72076edf',
                'name': '谨慎使用函数指针。',
                'total': 1,
                'ruleCode': 'A-1-3-1'
              },
              {
                'ruleId': '60af4dc369b18a7a72076f52',
                'name': '推荐使用带类型前缀的变量命名。',
                'total': 1,
                'ruleCode': 'A-1-13-1'
              },
              {
                'ruleId': '60af4dc369b18a7a72076f6e',
                'name': '函数中的指针或引用参数如果不是修改项建议使用const说明。',
                'total': 1,
                'ruleCode': 'A-2-7-2'
              }
            ]
          }
        ],
        'id': '60af4dc369b18a7a72076eae',
        'name': 'GJB 8114-2013',
        'hasChildren': false,
        'children': [
          {
            'level': 1,
            'total': 1,
            'id': '60af4dc369b18a7a72076eae1',
            'name': '强制',
            'hasChildren': false,
            'children': [
              {
                'ruleId': '60af4dc369b18a7a72076ed6',
                'name': 'R-1-3-2 函数指针的使用必须加以&明确说明。',
                'total': 1,
                'ruleCode': 'R-1-3-2',
                'id': '60af4dc369b18a7a72076ed6',
                'icon': 'icon-sa-item',
                'className': 'constraint'
              }
            ],
            'icon': 'icon-sa-constraint',
            'className': 'constraint'
          },
          {
            'level': 3,
            'total': 3,
            'id': '60af4dc369b18a7a72076eae3',
            'name': '建议',
            'hasChildren': false,
            'children': [
              {
                'ruleId': '60af4dc369b18a7a72076edf',
                'name': 'A-1-3-1 谨慎使用函数指针。',
                'total': 1,
                'ruleCode': 'A-1-3-1',
                'id': '60af4dc369b18a7a72076edf',
                'icon': 'icon-sa-item',
                'className': 'suggestion'
              },
              {
                'ruleId': '60af4dc369b18a7a72076f52',
                'name': 'A-1-13-1 推荐使用带类型前缀的变量命名。',
                'total': 1,
                'ruleCode': 'A-1-13-1',
                'id': '60af4dc369b18a7a72076f52',
                'icon': 'icon-sa-item',
                'className': 'suggestion'
              },
              {
                'ruleId': '60af4dc369b18a7a72076f6e',
                'name': 'A-2-7-2 函数中的指针或引用参数如果不是修改项建议使用const说明。',
                'total': 1,
                'ruleCode': 'A-2-7-2',
                'id': '60af4dc369b18a7a72076f6e',
                'icon': 'icon-sa-item',
                'className': 'suggestion'
              }
            ],
            'className': 'suggestion',
            'icon': 'icon-sa-advisory'
          }
        ],
        'icon': 'icon-fold'
      }
    ],
    'icon': 'icon-fold',
    'total': 4
  }
];

describe('SortRulesTree', () => {
  it('1. default render', async() => {
    const wrapper = mount(SortRulesTree, {
      ...mountItem
    });
    expect(wrapper.find('.test-case-file-tree.sort-rules-tree').exists()).toBeTruthy();
    expect(wrapper.find('.test-case-file-tree.sort-rules-tree li.file-trees').exists()).toBeTruthy();
    expect(wrapper.find('.test-case-file-tree.sort-rules-tree li.file-trees r-table').exists()).toBeTruthy();
    wrapper.destroy();
  });
  describe('2. test props', () => {
    it('1) level', async() => {
      const wrapper = mount(SortRulesTree, {
        ...mountItem
      });
      const level = Random.int(1, 3);
      await wrapper.setProps({
        level
      });
      expect(wrapper.vm.filterLevel).toBe(level);
      wrapper.destroy();
    });
    it('2) version', async() => {
      const wrapper = mount(SortRulesTree, {
        ...mountItem
      });
      await wrapper.setProps({
        version: versionData
      });
      expect(wrapper.vm.currentVersion).toEqual(versionData);
      wrapper.destroy();
    });
  });
  describe('3. test methods', () => {
    it('1) reloadData', async() => {
      const wrapper = mount(SortRulesTree, {
        ...mountItem
      });
      const level = Random.int(1, 3);
      await wrapper.setProps({
        level
      });
      await wrapper.setData({
        treeData
      });
      expect(wrapper.vm.filterLevel).toBe(level);
      expect(wrapper.vm.treeData).toEqual(treeData);

      const level1 = Random.int(1, 3);
      await wrapper.vm.reloadData(level1);
      expect(wrapper.vm.filterLevel).toBe(level1);
      expect(wrapper.vm.treeData.length).toEqual(0);
      wrapper.destroy();
    });
    it('2) handleNodeClick', async() => {
      const wrapper = mount(SortRulesTree, {
        ...mountItem
      });
      await wrapper.vm.handleNodeClick({});
      expect(wrapper.emitted('click')).toBeTruthy();
      wrapper.destroy();
    });
    it('3) _dispathCount', async() => {
      const wrapper = mount(SortRulesTree, {
        ...mountItem
      });
      const level = Random.int(1, 3);
      const count = Random.int(0, 100);
      const wsData = {
        level,
        count
      };
      const keyMap = {
        '1': 'mandatory',
        '2': 'required',
        '3': 'advisory'
      };
      expect(wrapper.vm.summary[keyMap[level]]).toBe(0);
      await wrapper.vm._dispathCount({}, wsData);
      expect(wrapper.vm.summary[keyMap[level]]).toBe(count);
      wrapper.destroy();
    });
  });
});
