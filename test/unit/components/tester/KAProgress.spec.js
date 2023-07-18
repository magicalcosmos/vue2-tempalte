import { shallowMount } from '@vue/test-utils';
import { Random } from 'mockjs';
import KAProgress from '../../../../src/views/components/tester/KAProgress';

describe('KAProgress', () => {
  it('1. default render', () => {
    const wrapper = shallowMount(KAProgress);
    expect(wrapper.find('.progress .progress-bar').exists()).toBeTruthy();
    expect(wrapper.vm.getWidth()).toBe('0%');
    wrapper.destroy();
  });
  describe('2. test props', () => {
    it('1) type', async() => {
      const wrapper = shallowMount(KAProgress);
      const type = Random.word();
      await wrapper.setProps({
        type
      });
      expect(wrapper.find('.progress .progress-bar').classes()).toContain(`progress-bar-${type}`);
      wrapper.destroy();
    });
    it('2) percentage', async() => {
      const wrapper = shallowMount(KAProgress);
      const percentage = Random.float(0, 1);
      await wrapper.setProps({
        percentage
      });
      expect(wrapper.vm.getWidth()).toBe(`${percentage * 100}%`);
      wrapper.destroy();
    });
  });
});


