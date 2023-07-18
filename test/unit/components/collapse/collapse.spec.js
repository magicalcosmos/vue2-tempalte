/* eslint-disable no-undef */
import collapse from '../../../../src/components/collapse/src/collapse.vue';
import { shallowMount } from '@vue/test-utils';
import { Random } from 'mockjs';
const factory = options => {
  return shallowMount(collapse, {
    ...options
  });
};

describe('collapse', () => {
  it('render collapse', () => {
    const wrapper = factory();
    expect(wrapper.find('.r-collapse').exists()).toBe(true);
    wrapper.destroy();
  });
  describe('Test props', () => {
    it('Test accordion', async() => {
      const _accordion = Random.boolean();
      const wrapper = factory();
      await wrapper.setProps({
        accordion: _accordion
      });
      expect(wrapper.props('accordion')).toBe(_accordion);
      wrapper.destroy();
    });
    it('Test value', async() => {
      const str = Random.word();
      const arr = Random.range(10);
      const num = Random.integer(1, 10);
      const wrapper = factory();
      await wrapper.setProps({
        value: str
      });
      expect(wrapper.props('value')).toBe(str);
      await wrapper.setProps({
        value: arr
      });
      expect(wrapper.props('value')).toEqual(arr);
      await wrapper.setProps({
        value: num
      });
      expect(wrapper.props('value')).toBe(num);
      wrapper.destroy();
    });
  });
  it('Test collapse solt', () => {
    const wrapper = factory({
      slots: {
        default: '<section class="content">What an awesome section</section>'
      }
    });
    expect(wrapper.find('.content').exists()).toBe(true);
    expect(wrapper.find('.content').text()).toBe('What an awesome section');
    wrapper.destroy();
  });
  describe('Test events', () => {
    it('test item-click', async() => {
      const wrapper = factory();
      await wrapper.vm.$emit('item-click', '1');
      expect(wrapper.emitted('item-click')).toBeTruthy();
      expect(wrapper.emitted('input')).toBeTruthy();
      expect(wrapper.emitted('change')).toBeTruthy();
      wrapper.destroy();
    });
  });
});
