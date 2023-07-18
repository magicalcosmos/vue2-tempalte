/* eslint-disable no-undef */
import AddPointerTarget from '../../../../../src/views/components/Dialog/AddPointerTarget.vue';
import BaseDialog from '../../../../../src/views/components/Dialog/BaseDialog.vue';
import { shallowMount } from '@vue/test-utils';
import i18n from '../../../../../src/i18n';
import { Random } from 'mockjs';

const mountItem = {
  mocks: {
    $t: key => i18n.t(key)
  },
  propsData: {
    visible: true,
    data: {
      pointeeType: 'pointeeType'
    },
    customData: {
      types: {
        pointeeType: {
          '@unqualified': 'unqualified'
        },
        unqualified: {
          '@constructors': [{
            '@nameparams': '',
            '@mangled': ''
          }]
        }
      }
    }
  }
};

const factory = (options) => {
  return shallowMount(AddPointerTarget, {
    ...mountItem,
    ...options
  });
};

describe('AddPointerTarget', () => {
  it('Test AddPointerTarget render', () => {
    const wrapper = factory();
    expect(wrapper.contains(BaseDialog)).toBe(true);
    expect(wrapper.find(BaseDialog).isVisible()).toBe(true);
    wrapper.destroy();
  });
  describe('Test attributes', () => {
    it('Test title', () => {
      const wrapper = factory();
      expect(wrapper.attributes('title')).toBe(i18n.t('dialog.add_malloc'));
      wrapper.destroy();
    });
    it('Test confirm', () => {
      const wrapper = factory();
      expect(wrapper.attributes('confirm')).toBe(i18n.t('button.sure'));
      wrapper.destroy();
    });
  });
  it('Test innerText', () => {
    const wrapper = factory();
    expect(wrapper.text()).toContain(i18n.t('dialog.type'));
    expect(wrapper.text()).toContain(i18n.t('dialog.array'));
    expect(wrapper.text()).toContain(i18n.t('dialog.length'));
    expect(wrapper.text()).toContain(i18n.t('dialog.name'));
    wrapper.destroy();
  });
  it('Test handleConfirm', async() => {
    const wrapper = factory();
    const _variableName = Random.word();
    const _isArrayChecked = Random.boolean();
    wrapper.setData({
      variableName: _variableName,
      isArrayChecked: _isArrayChecked,
      length: 0
    });
    const validation = await wrapper.vm.validate();
    await wrapper.vm.handleConfirm();
    expect(wrapper.vm.variableName).toBe(_variableName);
    expect(wrapper.vm.isArrayChecked).toBe(_isArrayChecked);
    expect(wrapper.vm.isArrayChecked).toBe(_isArrayChecked);
    expect(wrapper.vm.length).toBe(0);
    if (validation) {
      expect(wrapper.emitted().save).toBeTruthy();
    }
    wrapper.destroy();
  });
  it('Test handleCancel', async() => {
    const wrapper = factory();
    await wrapper.vm.handleCancel();
    expect(wrapper.emitted('update:visible')).toBeTruthy();
    expect(wrapper.vm.variableName).toBeNull();
    expect(wrapper.vm.elementTypeName).toBeNull();
    expect(wrapper.vm.isArrayChecked).toBe(false);
    expect(wrapper.vm.message).toBe('');
    expect(wrapper.vm.length).toBe(1);
    expect(wrapper.vm.constructorFun).toBe('');
    expect(wrapper.vm.constructorOptions).toEqual([]);
  });
});

