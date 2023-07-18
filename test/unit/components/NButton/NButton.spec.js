/* eslint-disable no-undef */
import NButton from '../../../../src/components/NButton';
import { shallowMount } from '@vue/test-utils';


describe('NButton', () => {
  it('test Nbutton', async() => {
    const wrapper = shallowMount(NButton, {
      propsData: {
        icon: 'success-icon'
      }
    });
    expect(wrapper.find('div.n-button').isVisible()).toBe(true);
    expect(wrapper.find('div.n-button .' + wrapper.props('icon')).isVisible()).toBe(true);
    wrapper.destroy();
  });

  it('test NButton class', async() => {
    const wrapper = shallowMount(NButton);
    await wrapper.setProps({
      type: 'success',
      size: 'small',
      disabled: true,
      round: true,
      gray: true,
      icon: 'success-icon'
    });
    expect(wrapper.classes(`n-button-type-${wrapper.props('type')}`)).toBe(true);
    expect(wrapper.classes(`n-button-size-${wrapper.props('size')}`)).toBe(true);
    expect(wrapper.classes('is-disabled')).toBe(true);
    expect(wrapper.classes('is-round')).toBe(true);
    expect(wrapper.classes('is-gray')).toBe(true);
    wrapper.destroy();
  });
  // 断言插槽内容
  describe('test button content', () => {
    it('content slot', () => {
      const wrapper = shallowMount(NButton, {
        slots: {
          default: '提交'
        }
      });
      expect(wrapper.find('span').text()).toBe('提交');
      wrapper.destroy();
    });
  });

  // 断言触发的事件
  describe('test button click', () => {
    it('button click trigger emit', async() => {
      const wrapper = shallowMount(NButton);
      await wrapper.trigger('click');
      expect(wrapper.emitted().click).toBeTruthy();
    });
  });
});
