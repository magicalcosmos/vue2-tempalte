/* eslint-disable no-undef */
import NInput from '../../../../src/components/NInput/src/input.vue';
import { shallowMount } from '@vue/test-utils';
import { Random } from 'mockjs';

const factory = options => {
  return shallowMount(NInput, {
    ...options
  });
};
describe('NInput', () => {
  it('render a NInput ', () => {
    const wrapper = factory();
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.n-input').isVisible()).toBe(true);
    expect(wrapper.find('.n-input .action').isVisible()).toBe(true);
    expect(wrapper.find('.n-input .hover-bg').isVisible()).toBe(true);
    expect(wrapper.find('.n-input input').isVisible()).toBe(true);
    expect(wrapper.find('.n-input .more').exists()).toBe(false);
    wrapper.destroy();
  });
  describe('Test props', () => {
    it('Test the value', () => {
      const text = Random.word();
      const wrapper = factory({
        propsData: {
          value: text
        }
      });
      expect(wrapper.props('value')).toBe(text);
      expect(wrapper.vm.defaultValue).toBe(text);
      wrapper.destroy();
    });
    it('Test the dark', async() => {
      const wrapper = factory();
      expect(wrapper.props('dark')).toBe(false);
      expect(wrapper.classes('is-dark')).toBe(false);
      await wrapper.setProps({
        dark: true
      });
      expect(wrapper.props('dark')).toBe(true);
      expect(wrapper.classes('is-dark')).toBe(true);
      wrapper.destroy();
    });
    it('Test the round', async() => {
      const wrapper = factory();
      expect(wrapper.props('round')).toBe(false);
      expect(wrapper.find('.n-input .n-input__inner.d-inline-block').classes('is-round')).toBe(false);
      await wrapper.setProps({
        round: true
      });
      expect(wrapper.props('round')).toBe(true);
      expect(wrapper.find('.n-input .n-input__inner.d-inline-block').classes('is-round')).toBe(true);
      wrapper.destroy();
    });
    it('Test the disabled', async() => {
      const wrapper = factory();
      expect(wrapper.props('disabled')).toBe(false);
      expect(wrapper.classes('is-disabled')).toBe(false);
      await wrapper.setProps({
        disabled: true
      });
      expect(wrapper.props('disabled')).toBe(true);
      expect(wrapper.classes('is-disabled')).toBe(true);
      wrapper.destroy();
    });
    it('Test the readonly', async() => {
      const wrapper = factory();
      expect(wrapper.props('readonly')).toBe(false);
      expect(wrapper.find('.n-input .n-input__inner.d-inline-block').attributes('readonly')).toBe(undefined);
      await wrapper.setProps({
        readonly: true
      });
      expect(wrapper.props('readonly')).toBe(true);
      expect(wrapper.find('.n-input .n-input__inner.d-inline-block').attributes('readonly')).toBe('readonly');
      wrapper.destroy();
    });
    it('Test the title', async() => {
      const _title = Random.word();
      const wrapper = factory();
      expect(wrapper.props('title')).toBe(undefined);
      expect(wrapper.find('.n-input .n-input__inner.d-inline-block').element.title).toBe('');
      await wrapper.setProps({
        title: _title
      });
      expect(wrapper.props('title')).toBe(_title);
      expect(wrapper.find('.n-input .n-input__inner.d-inline-block').element.title).toBe(_title);
      wrapper.destroy();
    });
    it('Test the textBorder', async() => {
      const wrapper = factory();
      expect(wrapper.props('textBorder')).toBe(true);
      expect(wrapper.classes('has-text-border')).toBe(true);
      await wrapper.setProps({
        textBorder: false
      });
      expect(wrapper.props('textBorder')).toBe(false);
      expect(wrapper.classes('has-text-border')).toBe(false);
      wrapper.destroy();
    });
    it('Test the textBG', async() => {
      const wrapper = factory();
      expect(wrapper.props('textBG')).toBe(true);
      expect(wrapper.classes('has-text-bg')).toBe(true);
      await wrapper.setProps({
        textBG: false
      });
      expect(wrapper.props('textBG')).toBe(false);
      expect(wrapper.classes('has-text-bg')).toBe(false);
      wrapper.destroy();
    });
    it('Test the hoverBG', async() => {
      const wrapper = factory();
      expect(wrapper.props('hoverBG')).toBe(true);
      expect(wrapper.classes('has-hover-bg')).toBe(true);
      await wrapper.setProps({
        hoverBG: false
      });
      expect(wrapper.props('hoverBG')).toBe(false);
      expect(wrapper.classes('has-hover-bg')).toBe(false);
      wrapper.destroy();
    });
    describe('Test the popup', () => {
      it('Test the default of popup', async() => {
        const wrapper = factory();
        expect(wrapper.props('popup')).toBe(false);
        expect(wrapper.vm.currentPopup).toBe(false);
        expect(wrapper.find('.hover-bg').exists()).toBe(true);
        expect(wrapper.find('.more.ml5.pointer').exists()).toBe(false);
        expect(wrapper.classes('is-current-popup')).toBe(false);
        wrapper.destroy();
      });
      it('Test set the value of popup', async() => {
        const wrapper = factory({
          propsData: {
            popup: true
          }
        });
        expect(wrapper.props('popup')).toBe(true);
        expect(wrapper.vm.currentPopup).toBe(true);
        expect(wrapper.find('.hover-bg').exists()).toBe(false);
        expect(wrapper.find('.more.ml5.pointer').exists()).toBe(true);
        expect(wrapper.classes('is-current-popup')).toBe(true);
        wrapper.destroy();
      });
    });
    it('Test the type', async() => {
      const wrapper = factory();
      expect(wrapper.props('type')).toBe('text');
      expect(wrapper.classes('n-input-type-text')).toBe(true);
      await wrapper.setProps({
        type: 'number'
      });
      expect(wrapper.props('type')).toBe('number');
      expect(wrapper.classes('n-input-type-number')).toBe(true);
      wrapper.destroy();
    });
    it('Test the size', async() => {
      const wrapper = factory();
      expect(wrapper.props('size')).toBe('medium');
      expect(wrapper.classes('n-input-size-medium')).toBe(true);
      await wrapper.setProps({
        size: 'big'
      });
      expect(wrapper.props('size')).toBe('big');
      expect(wrapper.classes('n-input-size-big')).toBe(true);
      wrapper.destroy();
    });
    it('Test the autocomplete', async() => {
      const wrapper = factory();
      expect(wrapper.props('autocomplete')).toBe('off');
      expect(wrapper.find('.n-input .n-input__inner.d-inline-block').attributes('autocomplete')).toBe('off');
      await wrapper.setProps({
        autocomplete: 'on'
      });
      expect(wrapper.props('autocomplete')).toBe('on');
      expect(wrapper.find('.n-input .n-input__inner.d-inline-block').attributes('autocomplete')).toBe('on');
      wrapper.destroy();
    });
    it('Test the showPassword', async() => {
      const wrapper = factory();
      expect(wrapper.props('showPassword')).toBe(false);
      expect(wrapper.find('.n-input .n-input__inner.d-inline-block').attributes('type')).toBe(wrapper.props('type'));
      await wrapper.setProps({
        showPassword: true
      });
      expect(wrapper.props('showPassword')).toBe(true);
      expect(wrapper.find('.n-input .n-input__inner.d-inline-block').attributes('type')).toBe('password');
      await wrapper.setData({
        passwordVisible: true
      });
      expect(wrapper.find('.n-input .n-input__inner.d-inline-block').attributes('type')).toBe('text');
      wrapper.destroy();
    });
  });
  describe('Test events', () => {
    it('Test the handleSave of events', async() => {
      const wrapper = factory();
      wrapper.find('.n-input .action .r-icon-check.pointer.n-input-save').trigger('click.stop');
      expect(wrapper.vm.focused).toBe(false);
      expect(wrapper.emitted().save).toBeTruthy();
      expect(wrapper.emitted().save[0][0]).toEqual({ dataName: '', value: '', defaultValue: undefined });
      wrapper.destroy();
    });
    it('Test the handleClose of events', async() => {
      const wrapper = factory();
      wrapper.find('.n-input .action .r-icon-close').trigger('click.stop');
      expect(wrapper.vm.focused).toBe(false);
      expect(wrapper.find('.n-input .n-input__inner.d-inline-block').element.value).toBe(wrapper.vm.nativeInputValue);
      wrapper.destroy();
    });
    it('Test the handleFocus of events by click', async() => {
      const wrapper = factory();
      wrapper.find('.n-input .hover-bg').trigger('click.stop');
      expect(wrapper.vm.focused).toBe(true);
      expect(wrapper.emitted().focus).toBeTruthy();
      wrapper.destroy();
    });
    it('Test the handleFocus of events by focus', async() => {
      const wrapper = factory();
      wrapper.find('.n-input .n-input__inner.d-inline-block').trigger('focus');
      expect(wrapper.vm.focused).toBe(true);
      expect(wrapper.emitted().focus).toBeTruthy();
      wrapper.destroy();
    });

    it('Test the handleCompositionStart of events', async() => {
      const wrapper = factory();
      wrapper.find('.n-input .n-input__inner.d-inline-block').trigger('compositionstart');
      expect(wrapper.vm.isComposing).toBe(true);
      wrapper.destroy();
    });
    it('Test the handleCompositionUpdate of events', async() => {
      const wrapper = factory();
      wrapper.find('.n-input .n-input__inner.d-inline-block').trigger('compositionupdate');
      expect(wrapper.vm.isComposing).toBe(true);
      wrapper.destroy();
    });
    it('Test the handleCompositionEnd of events', async() => {
      const wrapper = factory();
      wrapper.find('.n-input .n-input__inner.d-inline-block').trigger('compositionend');
      expect(wrapper.vm.isComposing).toBe(false);
      wrapper.destroy();
    });
    it('Test the handleMore of events', async() => {
      const _value = Random.word();
      const wrapper = factory({
        propsData: {
          popup: true,
          value: _value
        }
      });
      wrapper.find('.more.ml5.pointer').trigger('click');
      expect(wrapper.emitted().handleMore).toBeTruthy();
      expect(wrapper.emitted().handleMore[0][0]).toEqual({ value: _value });
      wrapper.destroy();
    });
  });
});
