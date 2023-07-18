/* eslint-disable no-undef */
import AddStubFunc from '../../../../../src/views/components/Dialog/AddStubFunc.vue';
import BaseDialog from '../../../../../src/views/components/Dialog/BaseDialog.vue';
import { mount, shallowMount } from '@vue/test-utils';
import i18n from '../../../../../src/i18n';
import Mock from 'mockjs';

const _data = Mock.mock({
  functionId: '5f0687f72376c73ddade413d',
  window: 'edit',
  details: {
    defaultKind: 1,
    times: 7,
    body: 'return 0;',
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
  },
  functionType: {
    '%': { '@type': 'int' },
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
  },
  stubName: 'wordwordword',
  pointerTargets: {
    _0x11ff460: {
      '@elementType': 'int',
      '@length': 5
    }
  },
  modifiable: true
});

const mountItem = {
  mocks: {
    $t: key => i18n.t(key)
  },
  stubs: {
    'base-dialog': BaseDialog
  },
  propsData: {
    data: _data
  }
};
const factoryMonut = options => {
  return mount(AddStubFunc, {
    ...mountItem,
    ...options
  });
};

describe('AddStubFunc', () => {
  describe('renders AddStubFunc ', () => {
    it('when the props visible is the default value and window is edit', () => {
      const wrapper = factoryMonut();
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.contains(BaseDialog)).toBe(true);
      expect(wrapper.find('.add-stub-func').isVisible()).toBe(false);
      expect(wrapper.find('.r-radio-group').exists()).toBe(false);
      wrapper.destroy();
    });
    it('when the props visible is the true and window is not edit', () => {
      _data.window = 'add';
      const wrapper = factoryMonut({
        propsData: {
          visible: true,
          data: _data
        }
      });
      expect(wrapper.find('.add-stub-func').isVisible()).toBe(true);
      expect(wrapper.find('r-radio-group').exists()).toBe(true);
      expect(wrapper.findAll('ul li').at(4).exists()).toBe(true);
      wrapper.destroy();
    });
  });
  describe('Test dom text', () => {
    it('Test innerText ', () => {
      _data.window = 'add';
      const _error = Mock.mock('@cword(2, 6)');
      const wrapper = factoryMonut({
        propsData: {
          visible: true,
          data: _data,
          error: _error
        }
      });
      expect(wrapper.find('.confirm').text()).toBe(i18n.t('dialog.save'));
      expect(wrapper.findAll('ul li').at(0).find('span').text()).toBe(i18n.t('dialog.func_declare'));
      expect(wrapper.find('r-radio-group').find('r-radio[label="1"]').text()).toBe(i18n.t('dialog.assign_stub'));
      expect(wrapper.find('r-radio-group').find('r-radio[label="2"]').text()).toBe(i18n.t('dialog.code_stub'));
      expect(wrapper.find('.dialog-message').text()).toBe(_error);
      wrapper.destroy();
    });
  });
  describe('Test events', () => {
    it('Test handleConfirm', async() => {
      _data.window = 'edit';
      const wrapper = factoryMonut({
        propsData: {
          visible: true,
          data: _data
        }
      });
      await wrapper.find('.confirm').trigger('click');
      expect(wrapper.emitted('save')).toBeTruthy();
      wrapper.destroy();
    });
    it('Test handleCancel', async() => {
      const wrapper = factoryMonut({
        propsData: {
          visible: true,
          data: _data
        }
      });
      await wrapper.find('.cancel').trigger('click');
      expect(wrapper.vm.message).toBe('');
      expect(wrapper.vm.isShow).toBe(false);
      expect(wrapper.emitted('update:visible')).toBeTruthy();
      expect(wrapper.emitted('update:visible')[0][0]).toBe(false);
      wrapper.destroy();
    });
    it('Test handleClose', async() => {
      const wrapper = factoryMonut({
        propsData: {
          visible: true,
          data: _data
        }
      });
      await wrapper.find('.icon-close').trigger('click');
      expect(wrapper.vm.message).toBe('');
      expect(wrapper.vm.isShow).toBe(false);
      expect(wrapper.emitted('update:visible')).toBeTruthy();
      expect(wrapper.emitted('update:visible')[0][0]).toBe(false);
      wrapper.destroy();
    });
  });
});
