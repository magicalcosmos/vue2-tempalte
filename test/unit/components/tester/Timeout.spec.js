import { shallowMount } from '@vue/test-utils';
import i18n from '../../../../src/i18n';
import Mock, { Random } from 'mockjs';
import Timeout from '../../../../src/views/components/tester/Timeout';

const mountItem = {
  mocks: {
    $t: (key) => i18n.t(key)
  }
};

describe('Timeout', () => {
  it('1. default render', () => {
    const wrapper = shallowMount(Timeout, mountItem);
    expect(wrapper.find('.timeout').exists()).toBeTruthy();
    expect(wrapper.find('.timeout .ttb').exists()).toBeTruthy();
    expect(wrapper.find('.timeout .ttb label').exists()).toBeTruthy();
    expect(wrapper.find('.timeout .ttb label .unit').exists()).toBeTruthy();
    expect(wrapper.find('.timeout .ttb .content').exists()).toBeTruthy();
    expect(wrapper.findAll('.timeout .ttb .content .generate').length).toBe(2);
    expect(wrapper.find('.timeout .ttb .content .generate .label-name').exists()).toBeTruthy();
    expect(wrapper.find('.timeout .ttb .content .generate sr-input-number').exists()).toBeTruthy();
    wrapper.destroy();
  });
  describe('2. test props', () => {
    it('1) generatedSecond', async() => {
      const wrapper = shallowMount(Timeout, mountItem);
      const generatedSecond = Random.integer(0, 100);
      await wrapper.setProps({
        generatedSecond
      });
      expect(wrapper.vm.genSec).toBe(generatedSecond);
      wrapper.destroy();
    });
    it('2) executedSecond', async() => {
      const wrapper = shallowMount(Timeout, mountItem);
      const executedSecond = Random.integer(0, 100);
      await wrapper.setProps({
        executedSecond
      });
      expect(wrapper.vm.execSec).toBe(executedSecond);
      wrapper.destroy();
    });
    it('3) direction', async() => {
      const wrapper = shallowMount(Timeout, mountItem);
      const direction = Random.boolean();
      await wrapper.setProps({
        direction: direction ? 'ltr' : Random.word()
      });
      if (direction) {
        expect(wrapper.find('.timeout .ttb').classes()).toContain('ltr');
      } else {
        expect(wrapper.find('.timeout .ttb').classes()).not.toContain('ltr');
      }
      wrapper.destroy();
    });
  });
  describe('3. test methods', () => {
    describe('1) handleGenerateSecondBlur', () => {
      it('1. equal generatedSecond', async() => {
        const wrapper = shallowMount(Timeout, mountItem);
        const generatedSecond = Random.integer(1, 60);
        await wrapper.setProps({
          generatedSecond
        });
        await wrapper.vm.handleGenerateSecondBlur(generatedSecond);
        expect(wrapper.emitted('change')).toBeFalsy();
        wrapper.destroy();
      });
      it('2. test 0', async() => {
        const wrapper = shallowMount(Timeout, mountItem);
        await wrapper.vm.handleGenerateSecondBlur(0);
        expect(wrapper.emitted('change')).toBeTruthy();
        expect(wrapper.emitted('change')[0][0].value).toBe(1);
        wrapper.destroy();
      });
      it('3. test > 60', async() => {
        const wrapper = shallowMount(Timeout, mountItem);
        await wrapper.vm.handleGenerateSecondBlur(61);
        expect(wrapper.emitted('change')).toBeTruthy();
        expect(wrapper.emitted('change')[0][0].value).toBe(60);
        wrapper.destroy();
      });
    });
    describe('2) handleExecuteSecondBlur', () => {
      it('1. equal executedSecond', async() => {
        const wrapper = shallowMount(Timeout, mountItem);
        const executedSecond = Random.integer(1, 100);
        await wrapper.setProps({
          executedSecond
        });
        await wrapper.vm.handleExecuteSecondBlur(executedSecond);
        expect(wrapper.emitted('change')).toBeFalsy();
        wrapper.destroy();
      });
      it('2. test 0', async() => {
        const wrapper = shallowMount(Timeout, mountItem);
        await wrapper.vm.handleExecuteSecondBlur(0);
        expect(wrapper.emitted('change')).toBeTruthy();
        expect(wrapper.emitted('change')[0][0].value).toBe(1);
        wrapper.destroy();
      });
    });
  });
});

