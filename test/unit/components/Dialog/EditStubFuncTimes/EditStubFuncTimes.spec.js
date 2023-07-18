/* eslint-disable no-undef */
import EditStubFuncTimes from '../../../../../src/views/components/Dialog/EditStubFuncTimes.vue';
import BaseDialog from '../../../../../src/views/components/Dialog/BaseDialog.vue';
import { mount, shallowMount } from '@vue/test-utils';
import i18n from '../../../../../src/i18n';
import Mock from 'mockjs';

const _data = Mock.mock({
  typeName: '@cword()',
  name: '@cword()',
  stubName: '@cword()',
  times: '1',
  callTimes: '',
  params: [
    {
      '@name': 'arr',
      '@type': 'int *'
    },
    {
      '@name': 'n',
      '@type': 'int'
    }
  ]
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
  return mount(EditStubFuncTimes, {
    ...mountItem,
    ...options
  });
};

describe('EditStubFuncTimes', () => {
  it('renders EditStubFuncTimes ', () => {
    const wrapper = factory({
      propsData: {
        data: _data
      }
    });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.isVisible()).toBe(false);
    expect(wrapper.contains(BaseDialog)).toBe(true);
    expect(wrapper.find('.times').isVisible()).toBe(false);
    expect(wrapper.find('.dialog-message').isVisible()).toBe(false);
    wrapper.destroy();
  });

  describe('Test text', () => {
    it('Test title', () => {
      const wrapper = factory({
        propsData: {
          data: _data
        }
      });
      expect(wrapper.find('.dialog-title span').text()).toBe(i18n.t('dialog.edit_stubs_times'));
      wrapper.destroy();
    });
    it('Test confirm', () => {
      const wrapper = factory({
        propsData: {
          data: _data
        }
      });
      expect(wrapper.find('.confirm').text()).toBe(i18n.t('dialog.save'));
      wrapper.destroy();
    });
    it('Test content', () => {
      const wrapper = factory({
        propsData: {
          data: _data
        }
      });
      expect(wrapper.find('.stub-item.ha.times label').text()).toBe(i18n.t('dialog.times'));
      wrapper.destroy();
    });
    it('Test message', () => {
      const wrapper = factory({
        propsData: {
          data: _data
        },
        data() {
          return {
            message: 'message'
          };
        }
      });
      expect(wrapper.find('.dialog-message').text()).toBe(wrapper.vm.message);
      wrapper.destroy();
    });
  });
  describe('Test props', () => {
    it('Test visible', async() => {
      const wrapper = factory({
        propsData: {
          visible: true,
          data: _data
        }
      });
      expect(wrapper.isVisible()).toBe(true);
      wrapper.destroy();
    });
    it('Test data', async() => {
      const wrapper = factory({
        propsData: {
          visible: true,
          data: _data
        }
      });
      await wrapper.setProps({
        data: JSON.parse(JSON.stringify(_data))
      });
      expect(wrapper.vm.currentData).toEqual(_data);
      expect(wrapper.find('.stub-detail.special').text()).toBe(_data.typeName + ' ' + _data.name);
      wrapper.destroy();
    });
    it('Test error', () => {
      const _error = Mock.mock('@word()');
      const wrapper = factory({
        propsData: {
          visible: true,
          data: _data,
          error: _error
        }
      });
      expect(wrapper.vm.message).toBe(_error);
      expect(wrapper.find('.dialog-message').isVisible()).toBe(true);
      expect(wrapper.find('.dialog-message').text()).toBe(_error);
      wrapper.destroy();
    });
  });
  describe('Test events', () => {
    it('Test handleConfirm', async() => {
      const wrapper = factory({
        propsData: {
          data: _data
        }
      });
      await wrapper.find('.confirm').trigger('click');
      expect(wrapper.emitted('save')).toBeTruthy();
      wrapper.destroy();
    });
    it('Test handleCancel', async() => {
      const wrapper = factory({
        propsData: {
          data: _data
        }
      });
      await wrapper.find('.cancel').trigger('click');
      expect(wrapper.emitted('update:visible')).toBeTruthy();
      expect(wrapper.emitted('update:visible')[0][0]).toBe(false);
      wrapper.destroy();
    });
    it('Test handleClose', async() => {
      const wrapper = factory({
        propsData: {
          data: _data
        }
      });
      await wrapper.find('.icon-close').trigger('click');
      expect(wrapper.emitted('update:visible')).toBeTruthy();
      expect(wrapper.emitted('update:visible')[0][0]).toBe(false);
      wrapper.destroy();
    });
  });
  describe('Test methods', () => {
    it('Test validate', () => {
      const wrapper = factory({
        propsData: {
          data: _data
        }
      });
      expect(wrapper.vm.validate()).toBe(true);
      expect(wrapper.vm.message).toBe('');
      wrapper.vm.times = '';
      expect(wrapper.vm.validate()).toBe(false);
      wrapper.destroy();
    });
    it('Test show', async() => {
      const wrapper = factory({
        propsData: {
          data: _data
        }
      });
      wrapper.vm.show();
      await wrapper.vm.$nextTick();
      expect(wrapper.emitted('update:visible')).toBeTruthy();
      expect(wrapper.emitted('update:visible')[0][0]).toBe(true);
      wrapper.destroy();
    });
    it('Test hide', async() => {
      const wrapper = factory({
        propsData: {
          data: _data
        }
      });
      wrapper.vm.hide();
      await wrapper.vm.$nextTick();
      expect(wrapper.emitted('update:visible')).toBeTruthy();
      expect(wrapper.emitted('update:visible')[0][0]).toBe(false);
      wrapper.destroy();
    });
  });
});

