/* eslint-disable no-undef */
import SRInputNumber from '../../../../src/components/SRInputNumber/src/index.vue';
import { shallowMount } from '@vue/test-utils';
import { Random } from 'mockjs';
import i18n from '../../../../src/i18n';

const mountItem = {
  mocks: {
    $t: key => i18n.t(key)
  }
};

const factory = (options) => {
  return shallowMount(SRInputNumber, {
    ...mountItem,
    ...options
  });
};
const text = Random.word();
const num = Random.natural(1, 9999999999);
describe('SRInputNumber', () => {
  it('Test SRInputNumber ', () => {
    const wrapper = factory();
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.isVisible()).toBe(true);
    expect(wrapper.find('.reset').exists()).toBe(false);
    wrapper.destroy();
  });
  it('Test classes', async() => {
    const wrapper = factory();
    expect(wrapper.find('.input-number').classes('focus')).toBe(false);
    await wrapper.setData({
      isFocus: true
    });
    expect(wrapper.find('.input-number').classes('focus')).toBe(true);
    wrapper.destroy();
  });
  describe('Test props', () => {
    it('Test value', async() => {
      const wrapper = factory({
        propsData: {
          value: num
        }
      });
      expect(parseInt(wrapper.find('input[type="number"]').element.value)).toBe(num);
      await wrapper.setProps({
        value: text
      });
      expect(wrapper.find('input[type="number"]').element.value).not.toBe(text);
      wrapper.destroy();
    });
    it('Test min and max', async() => {
      const wrapper = factory();
      expect(wrapper.find('input[type="number"]').attributes('min')).toBe('1');
      expect(wrapper.find('input[type="number"]').attributes('max')).toBe('9999999999');
      await wrapper.setProps({
        min: 2,
        max: 200
      });
      expect(wrapper.find('input[type="number"]').attributes('min')).toBe('2');
      expect(wrapper.find('input[type="number"]').attributes('max')).toBe('200');
      wrapper.destroy();
    });
    it('Test reset', async() => {
      const wrapper = factory({
        propsData: {
          reset: true
        }
      });
      expect(wrapper.find('.reset').exists()).toBe(true);
      expect(wrapper.find('.reset i').element.title).toMatch(i18n.t('common.set_default'));
      wrapper.destroy();
    });
  });

  describe('Test events', () => {
    it('Test handleMouseLeave', async() => {
      const wrapper = factory({
        propsData: {
          value: num
        }
      });
      await wrapper.find('.input-number').trigger('mouseleave');
      expect(wrapper.emitted('change')).toBeTruthy();
      expect(wrapper.emitted('change')[0][0]).toBe(num);
      wrapper.destroy();
    });
    it('Test handleInput', async() => {
      const wrapper = factory({
        propsData: {
          value: num
        }
      });
      await wrapper.find('input[type="number"]').trigger('input');
      expect(wrapper.emitted('input')).toBeTruthy();
      expect(parseInt(wrapper.emitted('input')[0][0])).toBe(num);
      wrapper.destroy();
    });
    it('Test handleFocus', async() => {
      const wrapper = factory();
      await wrapper.find('input[type="number"]').trigger('focus');
      expect(wrapper.vm.isFocus).toBe(true);
      expect(wrapper.find('.input-number').classes('focus')).toBe(true);
      wrapper.destroy();
    });
    it('Test handleBlur', async() => {
      const wrapper = factory({
        propsData: {
          value: 0
        }
      });
      await wrapper.find('input[type="number"]').trigger('blur');
      expect(wrapper.vm.isFocus).toBe(false);
      expect(wrapper.emitted('input')).toBeTruthy();
      expect(wrapper.emitted('blur')).toBeTruthy();
      expect(parseInt(wrapper.emitted('input')[0][0])).toBe(wrapper.props('min'));
      expect(parseInt(wrapper.emitted('input')[0][0])).toBe(wrapper.props('min'));
      wrapper.destroy();
    });
    it('Test handleIncrease', async() => {
      const wrapper = factory({
        propsData: {
          value: 1
        }
      });
      await wrapper.find('.up i').trigger('click');
      expect(wrapper.emitted('input')).toBeTruthy();
      expect(parseInt(wrapper.emitted('input')[0][0])).toBe(2);
      wrapper.destroy();
    });
    it('Test handleDecrease', async() => {
      const wrapper = factory({
        propsData: {
          value: 100
        }
      });
      await wrapper.find('.down i').trigger('click');
      expect(wrapper.emitted('input')).toBeTruthy();
      expect(parseInt(wrapper.emitted('input')[0][0])).toBe(99);
      wrapper.destroy();
    });
    it('Test handleReset', async() => {
      const wrapper = factory({
        propsData: {
          reset: true
        }
      });
      await wrapper.find('.reset i').trigger('click');
      expect(wrapper.emitted('reset')).toBeTruthy();
      wrapper.destroy();
    });
  });
});
