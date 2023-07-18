import Cascader from '../../../../src/components/Cascader/index';
import CascaderOptions from '../../../../src/components/Cascader/CascaderOptions';
import { mount } from '@vue/test-utils';
import Mock, { Random } from 'mockjs';
const mountItem = {
  stubs: {
    CascaderOptions
  }
};

describe('Cascader', () => {
  it('1. Cascader Render', () => {
    const wrapper = mount(Cascader, {
      ...mountItem
    });
    expect(wrapper.find('.cascader-main').isVisible()).toBeTruthy();
    expect(wrapper.find('.cascader-main .cascader-input').isVisible()).toBeTruthy();
    expect(wrapper.find('.cascader-main .cascader-input span').isVisible()).toBeTruthy();
    expect(wrapper.find('.cascader-main .cascader-input input').exists()).toBeFalsy();
    expect(wrapper.find('.cascader-main .cascader-input i').exists()).toBeFalsy();
    expect(wrapper.find('.cascader-main .cascader-options').isVisible()).toBeFalsy();
    wrapper.destroy();
  });
  describe('2. Cascader Props', () => {
    it('1） width', async() => {
      const wrapper = mount(Cascader, {
        ...mountItem
      });
      expect(wrapper.find('.cascader-main').attributes('style')).toBe('width: 200px;');

      await wrapper.setProps({
        width: '300px'
      });
      expect(wrapper.vm.width).toBe('300px');
      expect(wrapper.find('.cascader-main').attributes('style')).toBe('width: 300px;');
      wrapper.destroy();
    });
    it('2） displayValue', async() => {
      const wrapper = mount(Cascader, {
        ...mountItem
      });
      expect(wrapper.vm.displayValue).toBe('');

      const displayValue = Random.word();
      await wrapper.setProps({
        displayValue: displayValue
      });
      expect(wrapper.vm.displayValue).toBe(displayValue);
      expect(wrapper.vm.currentDisplayValue).toBe(displayValue);
      expect(wrapper.find('.cascader-main .cascader-input span').text()).toBe(displayValue);
      wrapper.destroy();
    });
  });
  describe('3.Cascader events', () => {
    it('1） handleMouseEnter & handleMouseLeave', (done) => {
      const wrapper = mount(Cascader, {
        ...mountItem
      });
      expect(wrapper.vm.isShowEdit).toBeFalsy();
      expect(wrapper.find('.cascader-main .cascader-input').classes()).not.toContain('edit');
      expect(wrapper.find('.cascader-main .cascader-input input').exists()).toBeFalsy();
      expect(wrapper.find('.cascader-main .cascader-input i').exists()).toBeFalsy();

      wrapper.trigger('mouseenter');
      wrapper.vm.$nextTick();
      done();
      expect(wrapper.vm.isShowEdit).toBeTruthy();
      expect(wrapper.find('.cascader-main .cascader-input').classes()).toContain('edit');
      expect(wrapper.find('.cascader-main .cascader-input input').exists()).toBeTruthy();
      expect(wrapper.find('.cascader-main .cascader-input i').exists()).toBeTruthy();

      wrapper.trigger('mouseleave');
      wrapper.vm.$nextTick();
      done();
      expect(wrapper.vm.isShowEdit).toBeFalsy();
      expect(wrapper.find('.cascader-main .cascader-input').classes()).not.toContain('edit');
      expect(wrapper.find('.cascader-main .cascader-input input').exists()).toBeFalsy();
      expect(wrapper.find('.cascader-main .cascader-input i').exists()).toBeFalsy();
      wrapper.destroy();
    });

    it('2) input events', async(done) => {
      const wrapper = mount(Cascader, {
        ...mountItem
      });
      wrapper.trigger('mouseenter');
      wrapper.vm.$nextTick();
      done();
      const value = Random.word();
      const input = wrapper.find('.cascader-main .cascader-input input');
      await input.setValue(value);
      expect(wrapper.vm.currentValue).toBe(value);

      input.trigger('focus');
      expect(wrapper.vm.isClose).toBeTruthy();
      expect(wrapper.vm.isShowEdit).toBeFalsy();
      expect(wrapper.vm.isEditing).toBeTruthy();
      expect(wrapper.emitted('focus')).toBeTruthy();
      expect(wrapper.find('.cascader-main .cascader-options').isVisible()).toBeFalsy();

      input.trigger('blur');
      expect(wrapper.vm.isEditing).toBeFalsy();
      if (wrapper.vm.currentValue !== wrapper.vm.originValue) {
        expect(wrapper.emitted('blur')).toBeTruthy();
      }
    });
    it('3) i events', async(done) => {
      const wrapper = mount(Cascader, {
        ...mountItem
      });
      wrapper.trigger('mouseenter');
      wrapper.vm.$nextTick();
      done();

      const i = wrapper.find('.cascader-main .cascader-input i');
      expect(i.classes()).toContain('r-icon-arrow-up');

      const isClose = Random.boolean();
      await wrapper.setData({
        isClose
      });
      i.trigger('click');
      if (isClose) {
        expect(wrapper.vm.isEditing).toBeTruthy();
        expect(wrapper.vm.isClose).toBeFalsy();
        expect(wrapper.find('.cascader-main .cascader-options').isVisible()).toBeTruthy();
        expect(wrapper.emitted('click')).toBeTruthy();
      } else {
        expect(wrapper.find('.cascader-main .cascader-options').isVisible()).toBeFalsy();
        expect(wrapper.vm.isClose).toBeTruthy();
        expect(wrapper.vm.isEditing).toBeFalsy();
        expect(wrapper.vm.isShowEdit).toBeFalsy();
      }
    });
    it('4) options select', async(done) => {
      const wrapper = mount(Cascader, {
        ...mountItem
      });
      wrapper.trigger('mouseenter');
      wrapper.vm.$nextTick();
      done();

      await wrapper.setProps({
        options: [{
          label: Random.word()
        }]
      });
      const i = wrapper.find('.cascader-main .cascader-input i');
      i.trigger('click');
      const options = wrapper.find('.cascader-main .cascader-options');
      expect(options.isVisible()).toBeTruthy();
      expect(options.findAll('#firstScrollId li').length).toBe(1);
      options.findAll('#firstScrollId li').at(0).trigger('click');
      expect(wrapper.find('.cascader-main .cascader-options').isVisible()).toBeFalsy();
      expect(wrapper.vm.isClose).toBeTruthy();
      expect(wrapper.vm.isEditing).toBeFalsy();
      expect(wrapper.vm.isShowEdit).toBeFalsy();
      expect(wrapper.emitted('selected')).toBeTruthy();
    });
  });
});
