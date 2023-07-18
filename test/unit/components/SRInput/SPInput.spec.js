/* eslint-disable no-undef */
import SRInput from '../../../../src/components/SRInput/src/index.vue';
import { shallowMount } from '@vue/test-utils';
import { Random } from 'mockjs';
import Variable from '../../../../src/utils/variable';
const mountItem = {
  mocks: {
    $var: Variable
  }
};
const _value = Random.word();
const factory = (options) => {
  return shallowMount(SRInput, {
    ...mountItem,
    ...options
  });
};

describe('SRInput', () => {
  it('renders SRInput', () => {
    const wrapper = factory();
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.isVisible()).toBe(true);
    expect(wrapper.find('[class="sr-input-item over"]').exists()).toBe(false);
    expect(wrapper.find('[class="sr-input-item"]').exists()).toBe(true);
    wrapper.destroy();
  });
  describe('Test props', () => {
    it('Test type', async() => {
      const wrapper = factory();
      expect(wrapper.props('type')).toBe('');
      expect(wrapper.find('[class="sr-input-item over"]').exists()).toBe(false);
      expect(wrapper.find('[class="sr-input-item"]').exists()).toBe(true);
      await wrapper.setProps({
        type: 'over'
      });
      expect(wrapper.props('type')).toBe('over');
      expect(wrapper.find('[class="sr-input-item over"]').exists()).toBe(true);
      expect(wrapper.find('[class="sr-input-item over"]').find('span').exists()).toBe(true);
      expect(wrapper.find('[class="sr-input-item over"]').find('input').exists()).toBe(false);
      expect(wrapper.find('[class="sr-input-item"]').exists()).toBe(false);
      wrapper.destroy();
    });
    it('Test value', async() => {
      const wrapper = factory();
      await wrapper.setProps({
        value: _value
      });
      expect(wrapper.vm.currentValue).toBe(_value);
      expect(wrapper.find('[class="sr-input-item"]').find('input').element.value).toBe(_value);
      await wrapper.setProps({
        type: 'over'
      });
      await wrapper.setData({
        isShow: true
      });
      expect(wrapper.find('[class="sr-input-item over"]').find('input').element.value).toBe(_value);
      wrapper.destroy();
    });

    it('Test displayValue', async() => {
      const tag = `<div class="inner">${_value}</div>`;
      const wrapper = factory({
        propsData: {
          type: 'over',
          displayValue: tag
        }
      });
      expect(wrapper.find('[class="sr-input-item over"]').find('span').html()).toMatch(tag);
      wrapper.destroy();
    });
  });

  describe('Test events', () => {
    it('Test handleCellMouseEnter', async() => {
      const wrapper = factory({
        propsData: {
          type: 'over'
        }
      });
      await wrapper.find('[class="sr-input-item over"]').trigger('mouseenter');
      setTimeout(async() => {
        expect(wrapper.vm.isShow).toBe(true);
      }, Variable.SCROLLDELAY);
    });
    it('Test handleMenuMouseLeave', async() => {
      const wrapper = factory({
        propsData: {
          type: 'over'
        }
      });
      await wrapper.find('[class="sr-input-item over"]').trigger('mouseleave');
      expect(wrapper.vm.isShow).toBe(false);
      expect(wrapper.find('[class="sr-input-item over"]').find('span').exists()).toBe(true);
      wrapper.destroy();
    });
    it('Test handleFocus', async() => {
      const wrapper = factory();
      await wrapper.find('[class="sr-input-item"]').find('input').trigger('focus');
      expect(wrapper.vm.isEditing).toBe(true);
      wrapper.destroy();
    });
    it('Test handleBlur', async() => {
      const wrapper = factory({
        data() {
          return {
            currentValue: _value
          };
        }
      });
      await wrapper.find('[class="sr-input-item"]').find('input').trigger('blur');
      expect(wrapper.vm.isShow).toBe(false);
      expect(wrapper.vm.isEditing).toBe(false);
      expect(wrapper.emitted('save')).toBeTruthy();
      expect(wrapper.emitted('isEdit')).toBeTruthy();
      wrapper.destroy();
    });
  });

  describe('Test SRInput slots', () => {
    it('test SRInput slots', async() => {
      const wrapper = factory({
        slots: {
          default: '<button class="sr-button">提交</button>'
        }
      });
      expect(wrapper.find('.sr-button').exists()).toBe(true);
      expect(wrapper.text()).toMatch('提交');
      wrapper.destroy();
    });
  });
});
