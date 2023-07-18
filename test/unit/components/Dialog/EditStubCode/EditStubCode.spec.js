/* eslint-disable no-undef */
import EditStubCode from '../../../../../src/views/components/Dialog/EditStubCode.vue';
import BaseDialog from '../../../../../src/views/components/Dialog/BaseDialog.vue';
import RCodeEditor from '../../../../../src/components/RCodeEditor/index.vue';
import { mount, shallowMount } from '@vue/test-utils';
import i18n from '../../../../../src/i18n';
import Mock from 'mockjs';

const content = '// RUN: %check_clang_clite %s WK4604 %t\r\n\r\n#define IFO(x) if(0 == (x)) {\r\n// CHECK-MESSAGES: :[[@LINE-1]]:9: warning: Caution is used because the parentheses in the macro do not match [WK4604]\r\n#define a #(A)\r\n#define IF1() if(0))\r\n// CHECK-MESSAGES: :[[@LINE-1]]:9: warning: Caution is used because the parentheses in the macro do not match [WK4604]\r\nint main(void)\r\n{\r\n    int test = 0;\r\n    IFO(test)\r\n        test = test + 1;\r\n    }\r\n    return (0);\r\n}'
const _data = Mock.mock({
  type: '',
  stubName: '',
  body: content,
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
    'base-dialog': BaseDialog,
    'r-code-editor': RCodeEditor
  }
};
const factory = options => {
  return mount(EditStubCode, {
    ...mountItem,
    ...options
  });
};

describe('EditStubCode', () => {
  it('renders EditStubCode ', () => {
    const wrapper = factory({
      propsData: {
        data: _data
      }
    });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.isVisible()).toBe(false);
    expect(wrapper.contains(BaseDialog)).toBe(true);
    expect(wrapper.contains(RCodeEditor)).toBe(true);
    wrapper.destroy();
  });

  describe('Test text', () => {
    it('Test title', () => {
      const wrapper = factory({
        propsData: {
          data: _data
        }
      });
      expect(wrapper.find('.dialog-title span').text()).toBe(i18n.t('dialog.stub_code'));
      wrapper.destroy();
    });
    it('Test confirm', () => {
      const wrapper = factory({
        propsData: {
          data: _data
        }
      });
      expect(wrapper.find('.confirm').text()).toBe(i18n.t('button.save'));
      wrapper.destroy();
    });
    it('Test content', () => {
      const wrapper = factory({
        propsData: {
          data: _data
        }
      });
      expect(wrapper.text()).toMatch(i18n.t('dialog.function_'));
      expect(wrapper.text()).toMatch(i18n.t('dialog.stub_code_tip'));
      expect(wrapper.text()).toMatch(wrapper.vm.getParams(_data.params));
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
          visible: true
        }
      });
      expect(wrapper.isVisible()).toBe(true);
      wrapper.destroy();
    });
  });
  describe('Test events', () => {
    it('Test handleConfirm', async() => {
      const wrapper = factory();
      await wrapper.find('.confirm').trigger('click');
      expect(wrapper.emitted('save')).toBeTruthy();
      wrapper.destroy();
    });
    it('Test handleCancel', async() => {
      const wrapper = factory();
      await wrapper.find('.cancel').trigger('click');
      expect(wrapper.emitted('update:visible')).toBeTruthy();
      expect(wrapper.emitted('update:visible')[0][0]).toBe(false);
      wrapper.destroy();
    });
    it('Test handleClose', async() => {
      const wrapper = factory();
      await wrapper.find('.icon-close').trigger('click');
      expect(wrapper.emitted('update:visible')).toBeTruthy();
      expect(wrapper.emitted('update:visible')[0][0]).toBe(false);
      wrapper.destroy();
    });
  });
  describe('Test methods', () => {
    it('Test show', async() => {
      const wrapper = factory();
      wrapper.vm.show();
      await wrapper.vm.$nextTick();
      expect(wrapper.emitted('update:visible')).toBeTruthy();
      expect(wrapper.emitted('update:visible')[0][0]).toBe(true);
      wrapper.destroy();
    });
    it('Test hide', async() => {
      const wrapper = factory();
      wrapper.vm.hide();
      await wrapper.vm.$nextTick();
      expect(wrapper.emitted('update:visible')).toBeTruthy();
      expect(wrapper.emitted('update:visible')[0][0]).toBe(false);
      wrapper.destroy();
    });
  });
});
