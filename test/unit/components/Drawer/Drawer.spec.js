/* eslint-disable no-undef */
import Drawer from '../../../../src/components/Drawer/index.vue';
import { shallowMount } from '@vue/test-utils';

const factory = (options) => {
  return shallowMount(Drawer, {
    ...options
  });
};
describe('Drawer', () => {
  it('Test Drawer default class', async() => {
    const wrapper = factory();
    expect(wrapper.classes()).toContain('init-position');
    wrapper.destroy();
  });
  describe('test props', () => {
    it('test the visible', async() => {
      const wrapper = factory();
      await wrapper.setProps({
        visible: true
      });
      expect(wrapper.classes()).toContain('animated');
      expect(wrapper.classes()).toContain('drawer');
      expect(wrapper.classes()).toContain('in');
      wrapper.destroy();
    });
  });
  describe('test slots', () => {
    it('test slots', async() => {
      const wrapper = factory({
        slots: {
          default: '<div id="drawer">Drawer</div>'
        }
      });
      expect(wrapper.find('#drawer').exists()).toBe(true);
      expect(wrapper.text()).toMatch('Drawer');
      wrapper.destroy();
    });
  });
});
