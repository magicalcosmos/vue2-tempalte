/* eslint-disable no-undef */
import CompiledError from '../../../../../src/views/components/Dialog/CompiledError.vue';
import BaseDialog from '../../../../../src/views/components/Dialog/BaseDialog.vue';
import { mount } from '@vue/test-utils';
import i18n from '../../../../../src/i18n';
import Mock from 'mockjs';
const _data = Mock.mock({
  name: 'codeDefect',
  result: {
    kind: '@pick([101, 102, 111, 112, 113])',
    location: {
      file: 'ben.c',
      line: 10,
      column: 2
    },
    log: '@word()'
  }
});

const mountItem = {
  mocks: {
    $t: key => i18n.t(key)
  },
  stubs: {
    'base-dialog': BaseDialog
  }
};
const factory = options => {
  return mount(CompiledError, {
    ...mountItem,
    ...options
  });
};

describe('CompiledError', () => {
  it('renders CompiledError ', () => {
    const wrapper = factory({
      propsData: {
        data: _data
      }
    });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.isVisible()).toBe(false);
    expect(wrapper.find('.error-overview').isVisible()).toBe(false);
    expect(wrapper.find('.error-details').isVisible()).toBe(false);
    expect(wrapper.contains(BaseDialog)).toBe(true);
    wrapper.destroy();
  });

  describe('Test props', () => {
    it('Test visible', async() => {
      const wrapper = factory({
        propsData: {
          data: _data,
          visible: true
        }
      });
      expect(wrapper.isVisible()).toBe(true);
      expect(wrapper.find('.error-overview').isVisible()).toBe(true);
      wrapper.destroy();
    });
    it('Test data', async() => {
      const wrapper = factory({
        propsData: {
          data: _data,
          visible: true
        }
      });
      const cData = JSON.parse(JSON.stringify(_data));
      await wrapper.setProps({
        data: cData
      });
      expect(wrapper.vm.currentData).toEqual(cData);
      expect(wrapper.vm.advice).toEqual(wrapper.vm.setErrorAdvice(cData.result.kind));
      expect(wrapper.vm.location).toEqual(cData.result.location);
      expect(wrapper.vm.errorType).toEqual(wrapper.vm.setErrorType(cData.result.kind));
      expect(wrapper.vm.logDetails).toEqual(cData.result.log);
      expect(wrapper.vm.title).toEqual(wrapper.vm.getTitle());
      wrapper.destroy();
    });
  });

  describe('Test isShowLog', () => {
    it('when isShowLog is false', () => {
      const wrapper = factory({
        propsData: {
          data: _data,
          visible: true
        }
      });
      expect(wrapper.find('.error-overview').isVisible()).toBe(true);
      expect(wrapper.find('.error-details').isVisible()).toBe(false);
      expect(wrapper.find('.error_type').text()).toBe(i18n.t('dialog.error_type') + ':  ' + wrapper.vm.errorType);
      expect(wrapper.find('.error_advice').text()).toBe(i18n.t('dialog.advice') + ':');
      expect(wrapper.find('.confirm').find('r-button').text()).toBe(i18n.t('dialog.scan_log'));
      expect(wrapper.find('.error_location').text()).toMatch(i18n.t('dialog.error_location') + ':  ' + _data.result.location.file + '  ' + _data.result.location.line + ' ' + i18n.t('file.line') + ' ' + _data.result.location.column + ' ' + i18n.t('file.column'));
      wrapper.destroy();
    });
    it('when isShowLog is true', async() => {
      const wrapper = factory({
        propsData: {
          data: _data,
          visible: true
        }
      });
      await wrapper.setData({
        isShowLog: true
      });
      expect(wrapper.find('.error-overview').isVisible()).toBe(false);
      expect(wrapper.find('.error-details').isVisible()).toBe(true);
      expect(wrapper.find('.log-title').text()).toBe(i18n.t('dialog.logDetail') + ':');
      expect(wrapper.find('.confirm').find('r-button').text()).toBe(i18n.t('button.back'));
      wrapper.destroy();
    });
  });

  describe('Test events', () => {
    it('Test handleMaximize', async() => {
      const wrapper = factory({
        propsData: {
          data: _data,
          visible: true
        }
      });
      await wrapper.find('.icon-fullscreen').trigger('click');
      expect(wrapper.vm.isMax).toBe(true);
      expect(wrapper.find('.compile-error-dialog-max').exists()).toBe(true);
      wrapper.destroy();
    });
    it('Test goToLine', async() => {
      const wrapper = factory({
        propsData: {
          data: _data,
          visible: true
        }
      });
      await wrapper.find('.error_location').find('r-button').trigger('click');
      expect(wrapper.emitted('save')).toBeTruthy();
      expect(wrapper.emitted('save')[0]).toEqual([_data.result.location]);
      wrapper.destroy();
    });
  });
});
