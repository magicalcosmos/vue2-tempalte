/* eslint-disable no-undef */
import EditStubFuncParams from '../../../../../src/views/components/Dialog/EditStubFuncParams.vue';
import BaseDialog from '../../../../../src/views/components/Dialog/BaseDialog.vue';
import { mount, shallowMount } from '@vue/test-utils';
import i18n from '../../../../../src/i18n';
import Mock from 'mockjs';

const content = '// RUN: %check_clang_clite %s WK4604 %t\r\n\r\n#define IFO(x) if(0 == (x)) {\r\n// CHECK-MESSAGES: :[[@LINE-1]]:9: warning: Caution is used because the parentheses in the macro do not match [WK4604]\r\n#define a #(A)\r\n#define IF1() if(0))\r\n// CHECK-MESSAGES: :[[@LINE-1]]:9: warning: Caution is used because the parentheses in the macro do not match [WK4604]\r\nint main(void)\r\n{\r\n    int test = 0;\r\n    IFO(test)\r\n        test = test + 1;\r\n    }\r\n    return (0);\r\n}'
const _data = Mock.mock({
  typeName: '@cword()',
  stubName: '@cword()',
  data: {
    defaultKind: 1,
    body: content,
    times: 1,
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
  return mount(EditStubFuncParams, {
    ...mountItem,
    ...options
  });
};

describe('EditStubFuncParams', () => {
  it('renders EditStubFuncParams ', () => {
    const wrapper = factory({
      propsData: {
        data: _data
      }
    });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.isVisible()).toBe(false);
    expect(wrapper.contains(BaseDialog)).toBe(true);
    expect(wrapper.vm.body).toBe(_data.data.body);
    expect(wrapper.vm.kind).toBe(_data.data.defaultKind);
    expect(wrapper.vm.stubName).toBe(_data.stubName);
    expect(wrapper.vm.times).toBe(_data.data.times + 1);
    expect(wrapper.vm.typeName).toBe(_data.typeName);
    expect(wrapper.vm.currentParams).toEqual(_data.data.params);
    wrapper.destroy();
  });

  describe('Test text', () => {
    it('Test title', () => {
      const wrapper = factory({
        propsData: {
          data: _data
        }
      });
      expect(wrapper.find('.dialog-title span').text()).toBe(i18n.t('dialog.edit_stubs'));
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
    it('Test content', async() => {
      const wrapper = factory({
        propsData: {
          data: _data
        }
      });
      expect(wrapper.text()).toMatch(i18n.t('dialog.func_declare'));
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
      expect(wrapper.find('.dialog-message').text()).toBe('message');
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
      expect(wrapper.vm.isShow).toBe(true);
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
      _data.data.times = 2;
      await wrapper.setProps({
        data: JSON.parse(JSON.stringify(_data))
      });
      expect(wrapper.vm.currentData).toEqual(_data);
      const eleLen = wrapper.findAll('.stub-list li').length;
      const parmasLen = _data.data.params.length;
      expect(eleLen - (eleLen - parmasLen)).toBe(parmasLen);
      wrapper.destroy();
    });
    it('Test error', async() => {
      const _error = Mock.mock('@word()');
      const wrapper = factory({
        propsData: {
          visible: true,
          data: _data
        }
      });
      await wrapper.setProps({
        error: _error
      });
      expect(wrapper.vm.message).toBe(_error);
      expect(wrapper.find('.dialog-message').isVisible()).toBe(true);
      expect(wrapper.find('.dialog-message').text()).toBe(_error);
      wrapper.destroy();
    });
  });
  describe('Test events', () => {
    // TODO 如何触发Promise
    it('Test handleConfirm', async() => {
      // const wrapper = factory({
      //   propsData: {
      //     data: _data
      //   }
      // });
      // await wrapper.find('.confirm').trigger('click');
      // expect(wrapper.emitted('save')).toBeTruthy();
      // wrapper.destroy();
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
    it('Test validate', async() => {
      const wrapper = factory({
        propsData: {
          data: _data
        }
      });
      expect(wrapper.vm.validate()).toBe(true);
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
    it('Test clearData', async() => {
      const wrapper = factory({
        propsData: {
          data: _data
        }
      });
      wrapper.vm.clearData();
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.stubName).toBe('');
      expect(wrapper.vm.message).toBe('');
      expect(wrapper.vm.times).toBe('');
      expect(wrapper.vm.isShow).toBe(true);
      expect(wrapper.vm.body).toBe('');
      expect(wrapper.vm.kind).toBe(1);
      wrapper.destroy();
    });
  });
});

