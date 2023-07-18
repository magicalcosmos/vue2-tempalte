import { shallowMount } from '@vue/test-utils';
import Mock, { Random } from 'mockjs';
import i18n from '../../../../src/i18n';
import NoCaseTest from '../../../../src/views/components/tester/NoCaseTest';

const mountItem = {
  mocks: {
    $t: (key) => i18n.t(key)
  }
};

describe('NoCaseTest', () => {
  it('1. default render', () => {
    const wrapper = shallowMount(NoCaseTest, mountItem);
    expect(wrapper.find('.no-case-test').exists()).toBeTruthy();
    expect(wrapper.find('.no-case-test img').exists()).toBeTruthy();
    expect(wrapper.find('.no-case-test .notice-text').exists()).toBeTruthy();
    wrapper.destroy();
  });
  describe('2. test props', () => {
    it('1) isCSourceCode & enable', async() => {
      const wrapper = shallowMount(NoCaseTest, mountItem);
      await wrapper.setProps({
        isCSourceCode: true,
        enable: true
      });
      expect(wrapper.vm.currentEnable).toBeTruthy();
      expect(wrapper.findAll('.no-case-test r-button').length).toBe(1);

      await wrapper.setData({
        isUnitTest: true
      });
      expect(wrapper.findAll('.no-case-test r-button').length).toBe(3);
      wrapper.destroy();
    });
  });
  it('3. test operateButtons', async() => {
    const wrapper = shallowMount(NoCaseTest, mountItem);
    await wrapper.vm.operateButtons('add');
    expect(wrapper.emitted('buttonOperate')).toBeTruthy();
  });
});
