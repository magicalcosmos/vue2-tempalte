import AbsoluteAddress from '../../../../../src/views/components/Dialog/AbsoluteAddress';
import Form from '../../../../../src/components/RForm/src/form';
import Select from '../../../../../src/components/RSelect/src/select';
import Option from '../../../../../src/components/RSelect/src/option';
import BaseDialog from '../../../../../src/views/components/Dialog/BaseDialog';
import { createLocalVue, mount } from '@vue/test-utils';
import i18n from '../../../../../src/i18n';
import Mock, { Random } from 'mockjs';
const localVue = createLocalVue();
const isResolve = Random.boolean();
const $confirm = () => {
  return new Promise((resolve, reject) => {
    if (isResolve) {
      resolve();
    } else {
      reject();
    }
  });
};
const mountItem = {
  mocks: {
    $t: (key) => i18n.t(key),
    $confirm: $confirm
  },
  stubs: {
    'r-form': Form,
    'r-select': Select,
    'r-option': Option,
    'base-dialog': BaseDialog
  }
};

describe('test AbsoluteAddress', () => {
  beforeEach(() => {
    window['vm'] = localVue;
    window['vm'].$i18n = i18n;
  });
  it('1. AbsoluteAddress html', () => {
    const wrapper = mount(AbsoluteAddress, mountItem);
    expect(wrapper.find('div.base-dialog.absolut-address-dialog').isVisible()).toBeFalsy();
    expect(wrapper.find('div.base-dialog .r-form ul li.stub-item').exists()).toBeTruthy();
    expect(wrapper.find('div.base-dialog .r-form ul li.border-dec').exists()).toBeTruthy();
    expect(wrapper.find('div.base-dialog .dialog-message').exists()).toBeTruthy();
    wrapper.destroy();
  });
  describe('2. AbsoluteAddress variables', () => {
    describe('1) visible', () => {
      it('a. default visible', () => {
        const wrapper = mount(AbsoluteAddress, mountItem);
        expect(wrapper.props().visible).toBeFalsy();
        expect(wrapper.find('div.base-dialog').isVisible()).toBeFalsy();
        wrapper.destroy();
      });
      it('b. set visible', () => {
        const variable = Random.boolean();
        const wrapper = mount(AbsoluteAddress, {
          ...mountItem,
          propsData: {
            visible: variable
          }
        });
        expect(wrapper.props().visible).toBe(variable);
        expect(wrapper.find('div.base-dialog').isVisible()).toBe(variable);

        wrapper.destroy();
      });
    });

    const pointerTargetsCount = Mock.mock({
      'number|0-4': 4
    }).number;
    const pointerTargets = {};
    for (let i = 0; i < pointerTargetsCount + 1; i++) {
      pointerTargets[i] = {
        '@elementType': Random.word(),
        '@length': Mock.mock({
          'number|0-4': 4
        }).number.toString(),
        '@type': Random.word()
      };
    }
    const customData = {
      types: {
        'int': {},
        'int 2': {}
      }
    };
    const dataParam = {
      window: Random.word(),
      name: Random.word(),
      editable: Random.boolean(),
      pointerTargets: pointerTargets
    };
    describe('2) props', () => {
      it('a. default data', () => {
        const wrapper = mount(AbsoluteAddress, mountItem);
        expect(wrapper.props().data).toEqual({});
        wrapper.destroy();
      });
      it('b. set data', async() => {
        const wrapper = mount(AbsoluteAddress, {
          ...mountItem,
          propsData: {
            visible: true,
            data: dataParam,
            customData: customData
          }
        });
        await wrapper.vm.$nextTick();
        expect(wrapper.find('div.base-dialog.absolut-address-dialog').isVisible()).toBeTruthy();
        expect(wrapper.props().data).toEqual(dataParam);
        expect(wrapper.vm.currentData).toEqual(dataParam);
        expect(wrapper.vm.isEdit).toBe(dataParam.editable);
        expect(wrapper.vm.typeSystemData).toEqual(customData.types);
        expect(wrapper.vm.options.length).toBe(Object.keys(customData.types).length);
        if (wrapper.vm.isEdit) {
          expect(wrapper.vm.ADtitle).toBe(i18n.t('dialog.edit_absolute_address'));
          expect(wrapper.vm.ADparams.fixedAddressName).toBe(dataParam.name);
          expect(wrapper.vm.ADparams.newName).toBe('');
          expect(wrapper.vm.ADparams.TemPointerTargets.length).toBe(pointerTargetsCount + 1);
        } else {
          expect(wrapper.vm.ADtitle).toBe(i18n.t('dialog.add_absolute_address'));
          expect(wrapper.vm.ADparams.TemPointerTargets.length).toBe(1);
        }
        wrapper.destroy();
      });
    });
    describe('3) events', () => {
      it('a. addPointerTargets', async() => {
        const wrapper = mount(AbsoluteAddress, {
          ...mountItem,
          propsData: {
            visible: true,
            data: dataParam,
            customData: customData
          }
        });
        await wrapper.vm.$nextTick();

        const originTemPointerTargetsLength = wrapper.vm.ADparams.TemPointerTargets.length;
        const offset = wrapper.vm.ADparams.TemPointerTargets.length ? parseInt(wrapper.vm.ADparams.TemPointerTargets[wrapper.vm.ADparams.TemPointerTargets.length - 1].offset) + 1 : 1;
        await wrapper.find('.r-form .stub-list .stub-item r-button').trigger('click');

        expect(wrapper.vm.ADparams.TemPointerTargets.length).toBe(originTemPointerTargetsLength + 1);
        expect(wrapper.vm.ADparams.TemPointerTargets[wrapper.vm.ADparams.TemPointerTargets.length - 1].offset).toBe(offset);
        expect(wrapper.findAll('.r-form .stub-list .border-dec r-form-item').length).toBe(originTemPointerTargetsLength + 1);
        wrapper.destroy();
      });
      it('a. handleSelectType', async() => {
        const wrapper = mount(AbsoluteAddress, {
          ...mountItem,
          propsData: {
            visible: true,
            data: dataParam,
            customData: customData
          }
        });
        await wrapper.vm.$nextTick();

        const triggerPointerTargetIndex = Random.integer(0, wrapper.vm.ADparams.TemPointerTargets.length - 1);
        const selectOptionIndex = Random.integer(0, wrapper.vm.options.length - 1);
        const option = wrapper.findAll('.r-form .stub-list .border-dec r-form-item').at(triggerPointerTargetIndex).findAll('.offset-select .r-select-dropdown__item').at(selectOptionIndex);
        await option.trigger('click');
        await wrapper.vm.$nextTick();

        expect(wrapper.vm.ADparams.TemPointerTargets[triggerPointerTargetIndex].types).toBe(wrapper.vm.options[selectOptionIndex].value);
        expect(wrapper.vm.elementTypeName).toBe(wrapper.vm.ADparams.TemPointerTargets[triggerPointerTargetIndex].types);
        wrapper.destroy();
      });
      it('a. handleDel', async() => {
        const wrapper = mount(AbsoluteAddress, {
          ...mountItem,
          propsData: {
            visible: true,
            data: dataParam,
            customData: customData
          }
        });
        await wrapper.vm.$nextTick();

        const originTemPointerTargetsLength = wrapper.vm.ADparams.TemPointerTargets.length;
        const triggerPointerTargetIndex = Random.integer(0, wrapper.vm.ADparams.TemPointerTargets.length - 1);
        const formItem = wrapper.findAll('.r-form .stub-list .border-dec r-form-item').at(triggerPointerTargetIndex);
        if (wrapper.vm.ADparams.TemPointerTargets.length === 1) {
          expect(formItem.find('.button-position').exists()).toBeFalsy();
        } else {
          const delBtn = formItem.find('.button-position');
          await delBtn.trigger('click');
          await wrapper.vm.$nextTick();

          expect(wrapper.vm.ADparams.TemPointerTargets.length).toBe(originTemPointerTargetsLength - 1);
        }
        wrapper.destroy();
      });
      it('a. handleConfirm', async() => {
        const wrapper = mount(AbsoluteAddress, {
          ...mountItem,
          propsData: {
            visible: true,
            data: dataParam,
            customData: customData
          }
        });
        await wrapper.vm.$nextTick();

        const confirmBtn = wrapper.find('.absolut-address-dialog .confirm');
        await confirmBtn.trigger('click');
        await wrapper.vm.$nextTick();
        if (isResolve) {
          if (wrapper.vm.isEdit) {
            expect(wrapper.vm.ADparams.newName).toBe(wrapper.vm.ADparams.name);
          } else {
            expect(wrapper.vm.ADparams.fixedAddressName).toBe(wrapper.vm.ADparams.name);
          }
          expect(wrapper.emitted('save')).toBeTruthy();
        }

        wrapper.destroy();
      });
    });
  });
});
