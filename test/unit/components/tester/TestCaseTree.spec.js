/* eslint-disable no-undef */
import TestCaseTree from '@/views/components/tester/TestCaseTree/index.vue';
import { shallowMount } from '@vue/test-utils';
import { data, defaultExpandKeys } from './TestCaseTreeData.js';
import store from '../../../../src/store';
import Mock from 'mockjs';

const mountItem = {
  store
};

const factory = options => {
  return shallowMount(TestCaseTree, {
    ...options,
    ...mountItem
  });
};



describe('TestCaseTree.vue', () => {
  it('Renders TestCaseTree', async() => {
    const wrapper = factory();
    await wrapper.setProps({
      data: data,
      defaultExpandKeys: defaultExpandKeys,
      fileRelation: true
    });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('section.test-case-tree').isVisible()).toBe(true);
    expect(wrapper.find('div.test-case-tree-list').isVisible()).toBe(true);
    expect(wrapper.find('div.test-case-tree-list .test-case-tree-content').isVisible()).toBe(true);
    expect(wrapper.findAll('div.test-case-tree-list ul.test-case-tree-content li.test-case-tree-item').length).toBeGreaterThan(0);
    expect(wrapper.find('div.test-case-tree-list-fixed').isVisible()).toBe(true);
    expect(wrapper.find('div.fixed-content.d-flex').isVisible()).toBe(true);
    expect(wrapper.findAll('div.fixed-content.d-flex ul.test-case-tree-content').at(0).isVisible()).toBe(true);
    expect(wrapper.findAll('div.fixed-content.d-flex ul.test-case-tree-content').at(1).isVisible()).toBe(true);
    expect(wrapper.findAll('div.fixed-content.d-flex ul.test-case-tree-content li.test-case-tree-item.fixed-item').length).toBeGreaterThan(0);
    expect(wrapper.findAll('div.fixed-content.d-flex ul.test-case-tree-content li.test-case-tree-item.li-border-left.fixed-item').length).toBeGreaterThan(0);
    wrapper.destroy();
  });
  describe('Test props', () => {
    it('Test the data of props', async() => {
      const wrapper = factory();
      await wrapper.setProps({
        data: data
      });
      expect(wrapper.props('data')).toEqual(data);
      expect(wrapper.findAll('div.test-case-tree-list ul.test-case-tree-content li.test-case-tree-item').length).toEqual(wrapper.vm.visibleData.length);
      expect(wrapper.findAll('div.fixed-content.d-flex ul.test-case-tree-content li.test-case-tree-item.fixed-item').length).toEqual(wrapper.vm.visibleData.length);
      wrapper.destroy();
    });
    it('Test the keyField of props', async() => {
      const wrapper = factory();
      expect(wrapper.props('keyField')).toEqual('fieldPath');
      const _keyField = Mock.mock('@word');
      await wrapper.setProps({
        keyField: _keyField
      });
      expect(wrapper.props('keyField')).toEqual(_keyField);
      wrapper.destroy();
    });
    it('Test the size of props', async() => {
      const wrapper = factory();
      const _size = Mock.mock('@natural');
      await wrapper.setProps({
        size: _size
      });
      expect(wrapper.props('size')).toEqual(_size);
      wrapper.destroy();
    });
    it('Test the fixedStyle of props', async() => {
      const wrapper = factory();
      const _fixedStyle = Mock.mock('@word');
      await wrapper.setProps({
        fixedStyle: _fixedStyle
      });
      expect(wrapper.props('fixedStyle')).toEqual(_fixedStyle);
      expect(wrapper.vm.currentFixedStyle).toEqual(_fixedStyle);
      wrapper.destroy();
    });
    it('Test the scrollWidth of props', async() => {
      const wrapper = factory();
      expect(wrapper.props('scrollWidth')).toEqual(10);
      const _scrollWidth = Mock.mock('@natural');
      await wrapper.setProps({
        scrollWidth: _scrollWidth
      });
      expect(wrapper.props('scrollWidth')).toEqual(_scrollWidth);
      wrapper.destroy();
    });
    it('Test the fixedWidth of props', async() => {
      const wrapper = factory();
      expect(wrapper.props('fixedWidth')).toEqual(250);
      const _fixedWidth = Mock.mock('@natural');
      await wrapper.setProps({
        fixedWidth: _fixedWidth
      });
      expect(wrapper.props('fixedWidth')).toEqual(_fixedWidth);
      wrapper.destroy();
    });
    it('Test the fileRelation of props', async() => {
      const wrapper = factory();
      expect(wrapper.props('fileRelation')).toEqual(false);
      const _fileRelation = true;
      await wrapper.setProps({
        data: data,
        fileRelation: _fileRelation
      });
      expect(wrapper.props('fileRelation')).toEqual(_fileRelation);
      expect(wrapper.findAll('div.fixed-content.d-flex ul.test-case-tree-content').at(1).exists()).toBe(true);
      expect(wrapper.findAll('div.fixed-content.d-flex ul.test-case-tree-content').at(1).isVisible()).toBe(true);
      expect(wrapper.findAll('div.fixed-content.d-flex ul.test-case-tree-content li.test-case-tree-item.li-border-left.fixed-item').length).toEqual(wrapper.vm.visibleData.length);
      wrapper.destroy();
    });
    it('Test the defaultExpandKeys of props', async() => {
      const wrapper = factory();
      await wrapper.setProps({
        defaultExpandKeys: defaultExpandKeys
      });
      expect(wrapper.props('defaultExpandKeys')).toEqual(defaultExpandKeys);
      expect(wrapper.vm.expandMap).toEqual(defaultExpandKeys);
      wrapper.destroy();
    });
  });
  describe('Test computed', () => {
    it('Test newFixedStyle', async() => {
      const wrapper = factory();
      const _size = Mock.mock('@natural');
      await wrapper.setProps({
        data: data,
        defaultExpandKeys: defaultExpandKeys,
        fileRelation: true,
        size: _size
      });
      expect(wrapper.find('div.test-case-tree-list-fixed').attributes('style')).toEqual('right: 10px; width: 380px;');
      wrapper.destroy();
    });
    it('Test contentHeight', async() => {
      const wrapper = factory();
      const _size = Mock.mock('@natural(1, 100)');
      await wrapper.setProps({
        data: data,
        defaultExpandKeys: defaultExpandKeys,
        fileRelation: true,
        size: _size
      });
      expect(wrapper.vm.contentHeight).toEqual(wrapper.vm.testCaseTreeData.length * wrapper.vm.size + 'px');
      wrapper.destroy();
    });
    it('Test endIndex', async() => {
      const wrapper = factory();
      await wrapper.setProps({
        data: data,
        defaultExpandKeys: defaultExpandKeys,
        fileRelation: true
      });
      expect(wrapper.vm.endIndex).toBe(wrapper.vm.testCaseTreeData.length);
      wrapper.destroy();
    });
    it('Test visibleData', async() => {
      const wrapper = factory();
      await wrapper.setProps({
        data: data,
        defaultExpandKeys: defaultExpandKeys,
        fileRelation: true
      });
      expect(wrapper.vm.visibleData).toEqual(wrapper.vm.testCaseTreeData);
      wrapper.destroy();
    });
  });
  describe('Test events', () => {
    it('Test handleScroll', async() => {
      const wrapper = factory();
      const _size = Mock.mock('@natural');
      await wrapper.setProps({
        data: data,
        defaultExpandKeys: defaultExpandKeys,
        fileRelation: true,
        size: _size
      });
      await wrapper.trigger('scroll');
      expect(wrapper.vm.scrollDirty).toBeFalsy();
      wrapper.destroy();
    });
    it('Test the handleScrollMouseOver of mouseover', async() => {
      const wrapper = factory();
      const _size = Mock.mock('@natural');
      await wrapper.setProps({
        data: data,
        defaultExpandKeys: defaultExpandKeys,
        fileRelation: true,
        size: _size
      });
      await wrapper.find('div.test-case-tree-list').trigger('mouseover');
      expect(wrapper.vm.isScrolling).toBe(true);
      wrapper.destroy();
    });
    it('Test the handleScrollMouseOver of mouseout', async() => {
      const wrapper = factory();
      const _size = Mock.mock('@natural');
      await wrapper.setProps({
        data: data,
        defaultExpandKeys: defaultExpandKeys,
        fileRelation: true,
        size: _size
      });
      await wrapper.find('div.test-case-tree-list').trigger('mouseout');
      expect(wrapper.vm.isScrolling).toBe(false);
      wrapper.destroy();
    });
    it('Test the handleMouseEnter of mouseenter', async() => {
      const wrapper = factory();
      const _size = Mock.mock('@natural');
      await wrapper.setProps({
        data: data,
        defaultExpandKeys: defaultExpandKeys,
        fileRelation: true,
        size: _size
      });
      const liWrapper = wrapper.findAll('div.test-case-tree-list ul.test-case-tree-content li.test-case-tree-item');
      const i = Mock.mock(`@natural(0, ${liWrapper.length - 1})`);
      await liWrapper.at(i).trigger('mouseenter');
      expect(wrapper.emitted('cell-mouse-enter')).toBeTruthy();
      expect(wrapper.emitted('cell-mouse-enter')[0].length).toBe(3);
      wrapper.destroy();
    });
    it('Test the handleMouseLeave of mouseleave', async() => {
      const wrapper = factory();
      const _size = Mock.mock('@natural');
      await wrapper.setProps({
        data: data,
        defaultExpandKeys: defaultExpandKeys,
        fileRelation: true,
        size: _size
      });
      const liWrapper = wrapper.findAll('div.test-case-tree-list ul.test-case-tree-content li.test-case-tree-item');
      const i = Mock.mock(`@natural(0, ${liWrapper.length - 1})`);
      await liWrapper.at(i).trigger('mouseleave');
      expect(wrapper.emitted('cell-mouse-leave')).toBeTruthy();
      expect(wrapper.emitted('cell-mouse-leave')[0].length).toBe(3);
      wrapper.destroy();
    });
  });
  describe('Test slots', () => {
    it('Test the slot named item', async() => {
      const wrapper = factory({
        slots: {
          item: '<h1 class="item">item</h1>'
        }
      });
      await wrapper.setProps({
        data: data,
        defaultExpandKeys: defaultExpandKeys,
        fileRelation: true
      });
      expect(wrapper.find('.item').exists()).toBe(true);
      expect(wrapper.find('.item').text()).toBe('item');
      wrapper.destroy();
    });
    it('Test the slot named fixedItem', async() => {
      const wrapper = factory({
        slots: {
          item: '<h1 class="fixedItem">fixedItem</h1>'
        }
      });
      await wrapper.setProps({
        data: data,
        defaultExpandKeys: defaultExpandKeys,
        fileRelation: true
      });
      expect(wrapper.find('.fixedItem').exists()).toBe(true);
      expect(wrapper.find('.fixedItem').text()).toBe('fixedItem');
      wrapper.destroy();
    });
    it('Test the slot named fileFixedItem', async() => {
      const wrapper = factory({
        slots: {
          item: '<h1 class="fileFixedItem">fileFixedItem</h1>'
        }
      });
      await wrapper.setProps({
        data: data,
        defaultExpandKeys: defaultExpandKeys,
        fileRelation: true
      });
      expect(wrapper.find('.fileFixedItem').exists()).toBe(true);
      expect(wrapper.find('.fileFixedItem').text()).toBe('fileFixedItem');
      wrapper.destroy();
    });
  });
});


