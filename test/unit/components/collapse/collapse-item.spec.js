/* eslint-disable no-undef */
import CollapseItem from '../../../../src/components/collapse/src/collapse-item.vue';
import { shallowMount } from '@vue/test-utils';
import { Random } from 'mockjs';

const _name = Random.cname();
const mountItem = {
  provide: {
    collapse: {
      activeNames: [_name]
    }
  }
};
const factory = options => {
  return shallowMount(CollapseItem, {
    ...mountItem,
    ...options
  });
};

describe('CollapseItem', () => {
  it('render CollapseItem', () => {
    const wrapper = factory();
    expect(wrapper.find('.r-collapse-item').exists()).toBe(true);
    wrapper.destroy();
  });
  describe('Test props', () => {
    it('Test title', async() => {
      const _title = Random.ctitle();
      const wrapper = factory();
      await wrapper.setProps({
        title: _title
      });
      expect(wrapper.props('title')).toBe(_title);
      wrapper.destroy();
    });
    it('Test name', async() => {
      const wrapper = factory();
      await wrapper.setProps({
        name: _name
      });
      expect(wrapper.props('name')).toBe(_name);
      expect(wrapper.classes()).toContain('is-active');
      expect(wrapper.find('div[role="tab"]').attributes('aria-expanded')).toBe('true');
      expect(wrapper.find('.r-collapse-item__header').classes()).toContain('is-active');
      expect(wrapper.find('.r-collapse-item__arrow').classes()).toContain('is-active');
      expect(wrapper.find('.r-collapse-item__wrap').isVisible()).toBe(true);
      wrapper.destroy();
    });
    it('Test disabled', async() => {
      const wrapper = factory();
      await wrapper.setProps({
        disabled: true
      });
      expect(wrapper.classes()).toContain('is-disabled');
      wrapper.destroy();
    });
  });
  describe('Test Data', () => {
    it('Test id', async() => {
      const _id = Random.natural(10, 100);
      const wrapper = factory();
      await wrapper.setData({
        id: _id
      });
      expect(wrapper.find('div[role="tab"]').attributes('aria-controls')).toBe(`r-collapse-content-${_id}`);
      expect(wrapper.find('div[role="tab"]').attributes('aria-describedby')).toBe(`r-collapse-content-${_id}`);
      expect(wrapper.find('.r-collapse-item__header').attributes('id')).toBe(`r-collapse-head-${_id}`);
      expect(wrapper.find('.r-collapse-item__wrap').attributes('aria-labelledby')).toBe(`r-collapse-head-${_id}`);
      expect(wrapper.find('.r-collapse-item__wrap').attributes('id')).toBe(`r-collapse-content-${_id}`);
      wrapper.destroy();
    });
  });
  it('Test collapse-item solt', () => {
    const wrapper = factory({
      slots: {
        default: '<section class="content">What an awesome section</section>',
        title: '<h1 class="title">title</h1>'
      }
    });
    expect(wrapper.find('.content').exists()).toBe(true);
    expect(wrapper.find('.content').text()).toBe('What an awesome section');
    expect(wrapper.find('.title').exists()).toBe(true);
    expect(wrapper.find('.title').text()).toBe('title');
    wrapper.destroy();
  });
  describe('Test events', () => {
    it('Test handleFocus', async() => {
      const wrapper = factory();
      await wrapper.find('.r-collapse-item__header').trigger('focus');
      wrapper.destroy();
    });
    it('Test handleHeaderClick', async() => {
      const wrapper = factory();
      await wrapper.find('.r-collapse-item__header').trigger('click');
      wrapper.destroy();
    });
    it('Test handleEnterClick', async() => {
      const wrapper = factory();
      await wrapper.find('.r-collapse-item__header').trigger('keyup.space.enter.stop');
      wrapper.destroy();
    });
  });
});
