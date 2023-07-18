/* eslint-disable no-undef */
import DownloadReportDialog from '../../../../../src/views/components/Dialog/DownloadReportDialog.vue';
import { shallowMount } from '@vue/test-utils';
import i18n from '../../../../../src/i18n';

const mountItem = {
  i18n,
  mocks: {
    $t: key => i18n.t(key)
  }
};
const factory = options => {
  return shallowMount(DownloadReportDialog, {
    ...mountItem,
    ...options
  });
};

describe('DownloadReportDialog', () => {
  it('renders DownloadReportDialog ', () => {
    const wrapper = factory();
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.download-report-dialog').isVisible()).toBe(false);
    wrapper.destroy();
  });

  describe('Test props', () => {
    it('Test visible', async() => {
      const wrapper = factory();
      await wrapper.setProps({
        visible: true
      });
      expect(wrapper.find('.download-report-dialog').isVisible()).toBe(true);
      wrapper.destroy();
    });
  });

  describe('Test attributes', () => {
    it('Test title', () => {
      const wrapper = factory();
      expect(wrapper.find('.download-report-dialog').attributes('title')).toBe(i18n.t('download_re.please_choose_format'));
      wrapper.destroy();
    });
  });
  describe('Test methods', () => {
    it('Test handleConfirm', async() => {
      const wrapper = factory();
      wrapper.vm.handleConfirm();
      await wrapper.vm.$nextTick();
      expect(wrapper.emitted('handleDownloaded')).toBeTruthy();
      expect(wrapper.emitted('handleDownloaded')[0][0]).toBe(true);
      wrapper.destroy();
    });
    it('Test handleCancel', async() => {
      const wrapper = factory();
      wrapper.vm.handleCancel();
      await wrapper.vm.$nextTick();
      expect(wrapper.emitted('update:visible')).toBeTruthy();
      expect(wrapper.emitted('update:visible')[0][0]).toBe(false);
      wrapper.destroy();
    });
    it('Test handleClose', async() => {
      const wrapper = factory();
      wrapper.vm.handleClose();
      await wrapper.vm.$nextTick();
      expect(wrapper.emitted('update:visible')).toBeTruthy();
      expect(wrapper.emitted('update:visible')[0][0]).toBe(false);
      wrapper.destroy();
    });
    it('Test show', async() => {
      const wrapper = factory();
      wrapper.vm.show(true);
      await wrapper.vm.$nextTick();
      expect(wrapper.emitted('update:visible')).toBeTruthy();
      expect(wrapper.emitted('update:visible')[0][0]).toBe(true);
      wrapper.destroy();
    });
  });
});
