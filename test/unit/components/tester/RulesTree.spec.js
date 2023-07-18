import { RulesTree } from '../../../../src/views/components';
import RTree from '../../../../src/components/RTree/src/tree';
import { mount } from '@vue/test-utils';
import Mock, { Random } from 'mockjs';
const mountItem = {
  stubs: {
    'r-tree': RTree
  }
};

describe('RulesTree', () => {
  it('1. default render', () => {
    const wrapper = mount(RulesTree, mountItem);
    expect(wrapper.find('.rules-tree').exists()).toBeTruthy();
    wrapper.destroy();
  });
  describe('2. test props', () => {
    it('1) maxHeight', async() => {
      const wrapper = mount(RulesTree, mountItem);
      await wrapper.setProps({
        maxHeight: 200
      });
      expect(wrapper.vm.currentMaxHeight).toBe(200);
      wrapper.destroy();
    });
    it('2) keywords & defaultCheckedKeys & languages', async() => {
      const wrapper = mount(RulesTree, mountItem);
      const keywords = Random.word();
      const defaultCheckedKeys = Mock.mock({
        'array|1-10': [Random.word()]
      }).array;
      const languages = Mock.mock({
        'array|0-2': [Random.word()]
      }).array;
      await wrapper.setProps({
        defaultCheckedKeys: defaultCheckedKeys,
        languages: languages
      });
      expect(wrapper.vm.params.languages).toBe(languages);
      expect(wrapper.vm.currentDefaultCheckedKeys).toEqual(defaultCheckedKeys);

      await wrapper.setProps({
        keywords: keywords
      });
      expect(wrapper.vm.params.keywords).toBe(keywords);
      expect(wrapper.vm.currentDefaultCheckedKeys).toEqual([]);

      await wrapper.setProps({
        keywords: ''
      });
      expect(wrapper.vm.params.keywords).toBe('');
      expect(wrapper.vm.currentDefaultCheckedKeys).toEqual(defaultCheckedKeys);
      wrapper.destroy();
    });
  });
  describe('3. test methods', () => {
    it('1) renderContent', async() => {
      const wrapper = mount(RulesTree, mountItem);
      const cellId = Random.word();
      const defaultExpandedKeys = Mock.mock({
        'array|1-10': [Random.word()]
      }).array;
      await wrapper.setProps({
        cellId: cellId,
        defaultExpandedKeys: defaultExpandedKeys
      });

      let renderNode = null;
      let renderProps = null;
      const testFn = (nodeP, propsP) => {
        renderNode = nodeP;
        renderProps = propsP;
      };

      const node = {};
      const dataIdIdx = Random.integer(0, defaultExpandedKeys.length - 1);
      const data = {
        id: defaultExpandedKeys[dataIdIdx],
        icon: Random.word(),
        name: Random.word()
      };
      const store = {};
      await wrapper.vm.renderContent(testFn, {
        node,
        data,
        store
      });
      expect(renderNode).toBe('span');
      expect(renderProps.attrs.id).toBe(cellId + data.id);
      expect(renderProps.domProps.innerHTML).toContain(data.icon);
      expect(renderProps.domProps.innerHTML).toContain(data.name);
      if (dataIdIdx === defaultExpandedKeys.length - 1) {
        expect(node.isCurrent).toBeTruthy();
        expect(store.currentNode).toEqual(node);
        expect(store.currentNodeKey).toBe(data.id);
      }
      wrapper.destroy();
    });
    it('2) handleCheckChange', async() => {
      const wrapper = mount(RulesTree, mountItem);
      await wrapper.vm.handleCheckChange();
      expect(wrapper.emitted('selectedRulesData')).toBeTruthy();
      wrapper.destroy();
    });
    it('2) handleNodeClick', async() => {
      const wrapper = mount(RulesTree, mountItem);
      await wrapper.vm.handleNodeClick();
      expect(wrapper.emitted('node-click')).toBeTruthy();
      wrapper.destroy();
    });
  });
});
