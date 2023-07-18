/* eslint-disable no-undef */
import InitCode from '../../../../../src/views/components/Dialog/InitCode.vue';
import BaseDialog from '../../../../../src/views/components/Dialog/BaseDialog.vue';
import RCodeEditor from '../../../../../src/components/RCodeEditor/index.vue';
import { mount, shallowMount } from '@vue/test-utils';
import i18n from '../../../../../src/i18n';

const content = '// RUN: %check_clang_clite %s WK4604 %t\r\n\r\n#define IFO(x) if(0 == (x)) {\r\n// CHECK-MESSAGES: :[[@LINE-1]]:9: warning: Caution is used because the parentheses in the macro do not match [WK4604]\r\n#define a #(A)\r\n#define IF1() if(0))\r\n// CHECK-MESSAGES: :[[@LINE-1]]:9: warning: Caution is used because the parentheses in the macro do not match [WK4604]\r\nint main(void)\r\n{\r\n    int test = 0;\r\n    IFO(test)\r\n        test = test + 1;\r\n    }\r\n    return (0);\r\n}'
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
  return mount(InitCode, {
    ...mountItem,
    ...options
  });
};

describe('InitCode', () => {
  it('renders InitCode ', () => {
    const wrapper = factory({
      propsData: {
        data: {
          body: content
        }
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
          data: {
            body: content
          }
        }
      });
      expect(wrapper.find('.dialog-title span').text()).toBe(i18n.t('button.init_code'));
      wrapper.destroy();
    });
    it('Test confirm', () => {
      const wrapper = factory({
        propsData: {
          data: {
            body: content
          }
        }
      });
      expect(wrapper.find('.confirm').text()).toBe(i18n.t('button.save'));
      wrapper.destroy();
    });
    it('Test message', () => {
      const wrapper = factory({
        propsData: {
          data: {
            body: content
          }
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
    it('Test data', () => {
      const _data = {
        body: content
      };
      const wrapper = factory({
        propsData: {
          data: _data
        }
      });
      expect(wrapper.vm.currentData).toBe(_data);
      wrapper.destroy();
    });
  });
  describe('Test events', () => {
    it('Test handleCancel', async() => {
      const wrapper = factory({
        propsData: {
          visible: true
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
          visible: true
        }
      });
      await wrapper.find('.icon-close').trigger('click');
      expect(wrapper.emitted('update:visible')).toBeTruthy();
      expect(wrapper.emitted('update:visible')[0][0]).toBe(false);
      wrapper.destroy();
    });
  });
  describe('Test methods', () => {
    it('Test show', async() => {
      const wrapper = factory({
        propsData: {
          visible: true,
          data: {
            body: content
          }
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
          visible: true,
          data: {
            body: content
          }
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
