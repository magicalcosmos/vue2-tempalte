/* eslint-disable no-undef */
import VersionConfigDetail from '../../../../src/views/components/tester/VersionConfigDetail.vue';
import { shallowMount } from '@vue/test-utils';
import i18n from '../../../../src/i18n';

const mountItem = {
  mocks: {
    $t: key => i18n.t(key)
  }
};
const factory = options => {
  return shallowMount(VersionConfigDetail, {
    ...mountItem,
    ...options
  });
};
// TODO 需要继续完善
describe('VersionConfigDetail', () => {
  it('renders  VersionConfigDetail', () => {
    const wrapper = factory();
    expect(wrapper.find('.containDir').exists()).toBe(true);
    expect(wrapper.find('.containDir').isVisible()).toBe(true);
    expect(wrapper.find('.drawer').exists()).toBe(true);
    expect(wrapper.find('.drawer').isVisible()).toBe(true);
    expect(wrapper.find('config-detail-stub').exists()).toBe(true);
    expect(wrapper.find('version-detail-stub').exists()).toBe(true);
    expect(wrapper.find('.dialog-macros').exists()).toBe(true);
    expect(wrapper.find('macros-stub').exists()).toBe(true);
    wrapper.destroy();
  });
  describe('Test props', () => {
    it('Test visible', async() => {
      const wrapper = factory();
      await wrapper.setProps({
        visible: true
      });
      expect(wrapper.vm.isShowDrawer).toBe(true);
      expect(wrapper.find('.drawer').attributes('visible')).toBe('true');
      wrapper.destroy();
    });
    it('Test showConfigDetail', async() => {
      const wrapper = factory();
      await wrapper.setProps({
        showConfigDetail: true
      });
      expect(wrapper.vm.isShowConfigDetail).toBe(true);
      expect(wrapper.find('config-detail-stub').attributes('visible')).toBe('true');
      wrapper.destroy();
    });
    it('Test showVersionDetail', async() => {
      const wrapper = factory();
      await wrapper.setProps({
        showConfigDetail: true
      });
      expect(wrapper.vm.isShowConfigDetail).toBe(true);
      expect(wrapper.find('config-detail-stub').attributes('visible')).toBe('true');
      wrapper.destroy();
    });
  });
});
