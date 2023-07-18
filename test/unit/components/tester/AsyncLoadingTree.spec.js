import { shallowMount } from '@vue/test-utils';
import Mock, { Random } from 'mockjs';
import i18n from '../../../../src/i18n';
import AsyncLoadingTree from '../../../../src/views/components/tester/AsyncLoadingTree/index';

const mountItem = {
  mocks: {
    $t: (key) => i18n.t(key)
  }
};

const id = Random.word();
const data = Mock.mock({
  'array|20-30': [{
    id: Random.word()
  }]
}).array;
const idx = Random.int(0, 1);
data[idx].id = id;
const size = Random.int(20, 30);

describe('AsyncLoadingTree', () => {
  it('1. default render', () => {
    const wrapper = shallowMount(AsyncLoadingTree, mountItem);
    expect(wrapper.find('.async-loading-tree').exists()).toBeTruthy();
    expect(wrapper.find('.async-loading-tree .tree-left-temp').exists()).toBeTruthy();
    expect(wrapper.find('.async-loading-tree .tree-left-temp ul.left-content').exists()).toBeTruthy();
    expect(wrapper.find('.async-loading-tree .tree-left-temp ul.fixed-content').exists()).toBeTruthy();
    expect(wrapper.find('.async-loading-tree .tree-left-temp ul li').exists()).toBeFalsy();
    wrapper.destroy();
  });
  describe('2. test props', async() => {
    it('1) leftWidth & size', async() => {
      const wrapper = shallowMount(AsyncLoadingTree, mountItem);
      expect(wrapper.props().leftWidth).toBe(1800);
      expect(wrapper.props().size).toBe(30);
      const leftWidth = Random.int(100, 300);
      await wrapper.setProps({
        data,
        size,
        leftWidth
      });
      expect(wrapper.props().leftWidth).toBe(leftWidth);
      expect(wrapper.props().size).toBe(size);
      expect(wrapper.vm.getItemStyle({ level: Random.int(1, 10) }).width).toBe(leftWidth + 'px');
      wrapper.destroy();
    });
    it('2) selectItemId', async() => {
      const wrapper = shallowMount(AsyncLoadingTree, mountItem);
      await wrapper.setProps({
        data: data.slice(0, 2),
        selectItemId: id
      });
      expect(wrapper.findAll('ul.left-content li').at(idx).classes()).toContain('current-line');
      wrapper.destroy();
    });
    it('3) showFixed', async() => {
      const wrapper = shallowMount(AsyncLoadingTree, mountItem);
      expect(wrapper.findAll('ul').length).toBe(2);
      expect(wrapper.find('ul.fixed-content').exists()).toBeTruthy();
      const showFixed = Random.boolean();
      await wrapper.setProps({
        data,
        showFixed
      });
      expect(wrapper.find('ul.fixed-content').exists()).toBe(showFixed);
      expect(wrapper.findAll('ul').length).toBe(showFixed ? 2 : 1);
      wrapper.destroy();
    });
  });
  describe('3. test methods', async() => {
    it('1) handleExpand', async() => {
      const wrapper = shallowMount(AsyncLoadingTree, mountItem);
      await wrapper.setProps({
        data,
        size
      });
      const i = Random.int(0, wrapper.findAll('ul.left-content li').length - 1);
      const wrapperI = wrapper.findAll('ul.left-content li').at(i);
      await wrapperI.find('.r-table__expand-icon').trigger('click');
      expect(wrapper.emitted('re-define-data-set')).toBeTruthy();
      wrapper.destroy();
    });
    it('2) handleScroll', async() => {
      const wrapper = shallowMount(AsyncLoadingTree, mountItem);
      await wrapper.setProps({
        data,
        size
      });
      await wrapper.trigger('scroll');
      expect(wrapper.vm.scrollDirty).toBeFalsy();
      wrapper.destroy();
    });
    it('3) mouseover & mouseout', async() => {
      const wrapper = shallowMount(AsyncLoadingTree, mountItem);
      await wrapper.setProps({
        data,
        size
      });
      const i = Random.int(0, wrapper.findAll('ul.left-content li').length - 1);
      const wrapperI = wrapper.findAll('ul.left-content li').at(i);
      await wrapperI.trigger('mouseover');
      expect(wrapper.vm.hoverItemId).toBe(data[i].id);
      expect(wrapperI.classes()).toContain('hover-line');

      await wrapperI.trigger('mouseout');
      expect(wrapper.vm.hoverItemId).toBe(null);
      expect(wrapperI.classes()).not.toContain('hover-line');
      wrapper.destroy();
    });
    it('4) handleRightClick', async() => {
      const wrapper = shallowMount(AsyncLoadingTree, mountItem);
      await wrapper.setProps({
        data,
        size
      });
      const i = Random.int(0, wrapper.findAll('ul.left-content li').length - 1);
      const wrapperI = wrapper.findAll('ul.left-content li').at(i);
      await wrapperI.trigger('contextmenu');
      expect(wrapper.emitted('right-click')).toBeTruthy();
      wrapper.destroy();
    });
  });
});
