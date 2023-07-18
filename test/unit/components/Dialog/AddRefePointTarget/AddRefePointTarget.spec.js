/* eslint-disable no-undef */
import AddRefePointTarget from '../../../../../src/views/components/Dialog/AddRefePointTarget.vue';
import BaseDialog from '../../../../../src/views/components/Dialog/BaseDialog.vue';
import { shallowMount } from '@vue/test-utils';
import i18n from '../../../../../src/i18n';

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
  return shallowMount(AddRefePointTarget, {
    ...mountItem,
    ...options
  });
};
describe('AddRefePointarget', () => {
  it('Test AddRefePointarget render', () => {
    const wrapper = factory();
    expect(wrapper.contains(BaseDialog)).toBe(true);
    expect(wrapper.find(BaseDialog).isVisible()).toBe(true);
    wrapper.destroy();
  });
  it('Test attributes', () => {
    const wrapper = factory();
    expect(wrapper.find(BaseDialog).attributes('title')).toBe(wrapper.vm.$t('dialog.creat_reference_example'));
    expect(wrapper.find(BaseDialog).attributes('confirm')).toBe(wrapper.vm.$t('button.sure'));
    wrapper.destroy();

  });
  it('Test innerText', () => {
    const wrapper = factory();
    expect(wrapper.text()).toContain(i18n.t('dialog.type'));
    expect(wrapper.text()).toContain(i18n.t('dialog.name'));
    wrapper.destroy();
  });
  it('Test handleConfirm', async() => {
    const wrapper = factory();
    wrapper.setData({
      variableName: 'mangled'
    });
    await wrapper.vm.handleConfirm();
    expect(wrapper.vm.variableName).toBe('mangled');
    expect(wrapper.emitted().save).toBeTruthy();
    wrapper.destroy();
  });
  it('Test handleCancel', async() => {
    const wrapper = factory();
    await wrapper.vm.handleCancel();
    expect(wrapper.emitted('update:visible')).toBeTruthy();
    expect(wrapper.vm.variableName).toBeNull();
    expect(wrapper.vm.elementTypeName).toBeNull();
    expect(wrapper.vm.message).toBe('');
    expect(wrapper.vm.constructorFun).toBe('');
    expect(wrapper.vm.constructorOptions).toEqual([]);
  });
});
