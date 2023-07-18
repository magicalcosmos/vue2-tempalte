/* eslint-disable no-undef */
import Percentage from '../../../../src/components/Percentage';
import { shallowMount } from '@vue/test-utils';

describe('Percentage', () => {

  it('1231', () => {
    const wrapper = shallowMount(Percentage);
    expect(wrapper.find('span.percentage').isVisible()).toBe(true);
    expect(wrapper.find('span.percentage .minus').isVisible()).toBe(true);
    expect(wrapper.find('span.percentage .minus svg').isVisible()).toBe(true);
    expect(wrapper.find('span.percentage .minus svg').html()).toMatch(/icon-minus1/);
    expect(wrapper.find('span.percentage .rate').isVisible()).toBe(true);
    expect(wrapper.find('span.percentage .plus').isVisible()).toBe(true);
    expect(wrapper.find('span.percentage .plus svg').isVisible()).toBe(true);
    expect(wrapper.find('span.percentage .plus svg').html()).toMatch(/icon-plus/);
  });

  it('test percentage props', () => {
    const wrapper = shallowMount(Percentage, {
      propsData: {
        percent: '50'
      }
    });
    expect(wrapper.vm.currentPercent).toBe(wrapper.props('percent'));
    expect(wrapper.find('.rate').text()).toBe(wrapper.props('percent'));
    wrapper.destroy();
  });
  it('test percentage events', async() => {
    const wrapper = shallowMount(Percentage);
    await wrapper.find('.minus').trigger('click', 'in');
    await wrapper.find('.plus').trigger('click', 'out');
    expect(wrapper.emitted().click).toBeTruthy();
    expect(wrapper.emitted().click.length).toBe(2);
    wrapper.destroy();
  });
});
