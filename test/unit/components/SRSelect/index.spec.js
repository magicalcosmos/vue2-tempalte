import SrSelect from '../../../../src/components/SRSelect/src/index';
import Options from '../../../../src/components/SRSelect/src/Options';
import { mount } from '@vue/test-utils';
import { Random } from 'mockjs';
import i18n from '../../../../src/i18n';

const mountItem = {
  mocks: {
    $t: (key) => i18n.t(key)
  },
  stubs: {
    Options
  }
};

describe('SrSelect', () => {
  it('1.test default render', () => {
    const wrapper = mount(SrSelect, mountItem);
    expect(wrapper.find('.sr-select').exists()).toBeTruthy();
    expect(wrapper.find('.sr-select-input').exists()).toBeTruthy();
    expect(wrapper.find('.sr-select-input').classes()).not.toContain('edit');
    expect(wrapper.find('.sr-select-input span span').exists()).toBeTruthy();
    expect(wrapper.find('.sr-select-input span span').text()).toBe(wrapper.vm.defaultValue);
    expect(wrapper.find('.sr-select-input input').exists()).toBeFalsy();
    expect(wrapper.find('.sr-select-input i').exists()).toBeFalsy();
    wrapper.destroy();
  });
  describe('2. test props & events', () => {
    describe('1) visible conditions', () => {
      it('a isShowEdit', async() => {
        const wrapper = mount(SrSelect, mountItem);
        await wrapper.setData({
          isShowEdit: true
        });
        await wrapper.vm.$nextTick();

        expect(wrapper.vm.isShowEdit).toBeTruthy();
        expect(wrapper.find('.sr-select-input').classes()).toContain('edit');
        expect(wrapper.find('.sr-select-input input').isVisible()).toBeTruthy();
        expect(wrapper.find('.sr-select-input i.r-icon-arrow-down').isVisible()).toBeTruthy();
        wrapper.destroy();
      });
      it('b isEditing', async() => {
        const wrapper = mount(SrSelect, mountItem);
        await wrapper.setData({
          isEditing: true
        });
        await wrapper.vm.$nextTick();

        expect(wrapper.vm.isEditing).toBeTruthy();
        expect(wrapper.find('.sr-select-input').classes()).toContain('edit');
        expect(wrapper.find('.sr-select-input input').isVisible()).toBeTruthy();
        expect(wrapper.find('.sr-select-input i.r-icon-arrow-down').isVisible()).toBeTruthy();

        wrapper.destroy();
      });
      it('c isEditing & isShowEdit', async() => {
        const wrapper = mount(SrSelect, mountItem);
        await wrapper.setData({
          isEditing: true,
          isShowEdit: true
        });
        await wrapper.vm.$nextTick();

        expect(wrapper.vm.isEditing).toBeTruthy();
        expect(wrapper.vm.isShowEdit).toBeTruthy();
        expect(wrapper.find('.sr-select-input').classes()).toContain('edit');
        expect(wrapper.find('.sr-select-input input').isVisible()).toBeTruthy();
        expect(wrapper.find('.sr-select-input i.r-icon-arrow-down').isVisible()).toBeTruthy();

        wrapper.destroy();
      });
    });
    it('2) width', () => {
      const wrapper = mount(SrSelect, mountItem);

      expect(wrapper.props().width).toBe('200px');
      wrapper.destroy();
    });
    it('2)" set width', async() => {
      const wrapper = mount(SrSelect, mountItem);
      await wrapper.setData({
        width: '100px'
      });
      await wrapper.vm.$nextTick();
      expect(wrapper.props().width).toBe('100px');
      wrapper.destroy();
    });
    it('3) currentValue', async() => {
      const wrapper = mount(SrSelect, mountItem);
      await wrapper.setProps({
        value: Random.word()
      });
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.currentValue).toBe(wrapper.props().value);
      expect(wrapper.find('.sr-select-input span span.user-input-value').text()).toBe(wrapper.vm.currentValue);
      wrapper.destroy();
    });
    it('4) currentComparedValue', async() => {
      const wrapper = mount(SrSelect, mountItem);
      await wrapper.setProps({
        value: '',
        comparedValue: Random.word()
      });
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.currentComparedValue).toBe(wrapper.props().comparedValue);
      expect(wrapper.find('.sr-select-input span span').text()).toBe(wrapper.vm.currentComparedValue);
      wrapper.destroy();
    });
    it('5) handleMouseEnter & handleMouseLeave', (done) => {
      const wrapper = mount(SrSelect, mountItem);

      wrapper.find('.sr-select-input').trigger('mouseenter');
      wrapper.vm.$nextTick();
      done();
      expect(wrapper.vm.isShowEdit).toBeTruthy();
      expect(wrapper.find('.sr-select-input input').isVisible()).toBeTruthy();

      wrapper.find('.sr-select-input').trigger('mouseleave');
      wrapper.vm.$nextTick();
      done();
      expect(wrapper.vm.isShowEdit).toBeFalsy();

      wrapper.destroy();
    });
    it('6) handleFocus & handleBlur', async() => {
      const wrapper = mount(SrSelect, mountItem);

      await wrapper.setData({
        isShowEdit: true
      });
      wrapper.find('.sr-select-input input').trigger('focus');
      wrapper.vm.$nextTick();
      expect(wrapper.vm.isEditing).toBeTruthy();

      expect(wrapper.vm.originValue).toBe('');
      expect(wrapper.vm.currentValue).toBe('');
      wrapper.find('.sr-select-input input').setValue(Random.word());
      expect(wrapper.vm.originValue === wrapper.vm.currentValue).toBeFalsy();

      wrapper.find('.sr-select-input input').trigger('blur');
      wrapper.vm.$nextTick();
      expect(wrapper.vm.isEditing).toBeFalsy();
      expect(wrapper.emitted('blur')).toBeTruthy();

      wrapper.destroy();
    });
    it('6) show options', async() => {
      const wrapper = mount(SrSelect, mountItem);

      await wrapper.setData({
        isShowEdit: true
      });
      wrapper.find('.sr-select-input i').trigger('click');
      wrapper.vm.$nextTick();
      expect(wrapper.emitted('click')).toBeTruthy();
      expect(wrapper.vm.isClose).toBeFalsy();

      wrapper.destroy();
    });
  });
});
