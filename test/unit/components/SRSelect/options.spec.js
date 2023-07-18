import Options from '../../../../src/components/SRSelect/src/Options';
import { mount } from '@vue/test-utils';
import { Random } from 'mockjs';
import i18n from '../../../../src/i18n';

const mountItem = {
  mocks: {
    $t: (key) => i18n.t(key)
  }
};

describe('test Options', () => {
  it('1. default render', () => {
    const wrapper = mount(Options, mountItem);
    expect(wrapper.find('.sr-options').isVisible()).toBeFalsy();
    expect(wrapper.find('.sr-options .sr-options-list').exists()).toBeTruthy();
    wrapper.destroy();
  });
  describe('2. test props & events', () => {
    it('1) isShow & hide', async() => {
      const wrapper = mount(Options, mountItem);
      expect(wrapper.props().visible).toBeFalsy();
      expect(wrapper.vm.isShow).toBeFalsy();

      await wrapper.setProps({
        visible: true
      });
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.isShow).toBeTruthy();
      expect(wrapper.find('.sr-options').isVisible()).toBeTruthy();

      await wrapper.vm.hide();
      expect(wrapper.vm.isShow).toBeFalsy();
      expect(wrapper.find('.sr-options').isVisible()).toBeFalsy();

      wrapper.destroy();
    });
    it('2) options & value & handleClick', async() => {
      const wrapper = mount(Options, mountItem);
      expect(wrapper.props().options.length).toBe(0);
      expect(wrapper.vm.currentOptions.length).toBe(0);

      const optionList = [{
        value: 'value1',
        label: 'lable1'
      }, {
        value: 'value2',
        label: 'lable2'
      }];
      await wrapper.setProps({
        options: optionList
      });
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.currentOptions).toEqual(optionList);
      expect(wrapper.vm.currentOptions).toEqual(wrapper.props().options);
      expect(wrapper.findAll('.sr-options .sr-options-list .sr-options-item').length).toBe(optionList.length);
      expect(wrapper.find('.sr-options .sr-options-list .sr-options-item span.option-label').exists()).toBeTruthy();

      const option = wrapper.findAll('.sr-options .sr-options-list .sr-options-item').at(0);
      expect(option.find('span.option-label').attributes('title')).toBe(optionList[0].label);
      expect(option.find('span.option-label').text()).toBe(optionList[0].label);

      await option.trigger('click');
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.currentOptions[0].selected).toBeTruthy();
      expect(wrapper.emitted('selected')).toBeTruthy();

      await wrapper.setProps({
        value: optionList[0].value
      });
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.currentValue).toBe(wrapper.props().value);
      expect(option.find('.sr-options-item').classes()).toContain('selected');

      wrapper.destroy();
    });
  });
});
