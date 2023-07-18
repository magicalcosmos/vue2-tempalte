/* eslint-disable no-undef */
import FloatingBall from '../../../../src/components/FloatingBall/index.vue';
import { shallowMount } from '@vue/test-utils';

const factory = (options) => {
  return shallowMount(FloatingBall, {
    ...options
  });
};
describe('FloatingBall', () => {
  it('Test FloatingBall render', () => {
    const wrapper = factory();
    expect(wrapper.find('#progress_srt_2020798').isVisible()).toBeFalsy();
    expect(wrapper.find('#progress_srt_2020798 .progress_srt_2020798_wave').isVisible()).toBeFalsy();
    expect(wrapper.find('#progress_srt_2020798_percent').isVisible()).toBeFalsy();
    wrapper.destroy();
  });
  describe('Test props', () => {
    it('Test default props', () => {
      const wrapper = factory();
      expect(wrapper.props('visible')).toBe(false);
      expect(wrapper.props('percentage')).toBe('0%');
      expect(wrapper.props('width')).toBe('50px');
      expect(wrapper.props('height')).toBe('50px');
      wrapper.destroy();
    });
    it('set the visible', () => {
      const wrapper = factory({
        propsData: {
          visible: true
        }
      });
      expect(wrapper.props('visible')).toBe(true);
      expect(wrapper.find('#progress_srt_2020798').isVisible()).toBeTruthy();
      expect(wrapper.find('#progress_srt_2020798 .progress_srt_2020798_wave').isVisible()).toBeTruthy();
      expect(wrapper.find('#progress_srt_2020798_percent').isVisible()).toBeTruthy();
      wrapper.destroy();
    });
    it('set the percentage', () => {
      const wrapper = factory({
        propsData: {
          percentage: '72.58'
        }
      });
      expect(wrapper.props('percentage')).toBe('72.58');
      expect(wrapper.find('#progress_srt_2020798_percent').text()).toBe('72.58');
      wrapper.destroy();
    });
    it('set the width and height', () => {
      const wrapper = factory({
        propsData: {
          width: '70px',
          height: '70px'
        }
      });
      expect(wrapper.props('width')).toBe('70px');
      expect(wrapper.props('height')).toBe('70px');
      expect(wrapper.attributes('style')).toContain('70px');
      expect(wrapper.find('#progress_srt_2020798_percent').attributes('style')).toContain('70px');
      wrapper.destroy();
    });
  });
});
