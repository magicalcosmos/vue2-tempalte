/* eslint-disable no-undef */
import AddAbsoluteAddress from '../../../../../src/views/components/Dialog/AddAbsoluteAddress.vue';
import RCodeEditor from '../../../../../src/components/RCodeEditor';
import BaseDialog from '../../../../../src/views/components/Dialog/BaseDialog';
import { mount } from '@vue/test-utils';
import i18n from '../../../../../src/i18n';
import Mock, { Random } from 'mockjs';

const mountItem = {
  mocks: {
    $t: key => i18n.t(key),
    $message: {
      error: value => {}
    }
  },
  stubs: {
    'r-code-editor': RCodeEditor,
    'base-dialog': BaseDialog
  }
};

describe('AddAbsoluteAddress', () => {
  it('1. AddAbsoluteAddress html', () => {
    const wrapper = mount(AddAbsoluteAddress, mountItem);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find(BaseDialog).exists()).toBe(true);
    expect(wrapper.find('div.base-dialog').isVisible()).toBeFalsy();
    expect(wrapper.find('div.base-dialog .df-row-jc').exists()).toBeTruthy();
    expect(wrapper.findAll('div.base-dialog .add-abs-addr-body').length).toBe(2);
    const eles = wrapper.findAll('div.base-dialog .add-abs-addr-body');
    const body_0 = eles.at(0);
    const body_1 = eles.at(1);
    expect(body_0.find('.add-abs-addr-title').exists()).toBeTruthy();
    expect(body_0.find('.add-abs-addr-title').text()).toMatch(i18n.t('dialog.expression_title'));
    expect(body_0.find('r-scrollbar').exists()).toBeTruthy();
    expect(body_0.find('r-scrollbar .add-abs-addr-content').exists()).toBeTruthy();
    expect(body_1.find('.add-abs-addr-title').exists()).toBeTruthy();
    expect(body_1.find('.add-abs-addr-title').text()).toMatch(i18n.t('dialog.code'));
    expect(body_1.find('.add-abs-addr-content.border-content').exists()).toBeTruthy();
    wrapper.destroy();
  });

  describe('2. test AddAbsoluteAddress Props', () => {
    describe('test visible', () => {
      it('test default visible', () => {
        const wrapper = mount(AddAbsoluteAddress, mountItem);
        expect(wrapper.props('visible')).toBe(false);
        expect(wrapper.find('div.base-dialog').isVisible()).toBe(false);
        wrapper.destroy();
      });
      it('test set visible', () => {
        const variable = Random.boolean();
        const wrapper = mount(AddAbsoluteAddress, {
          ...mountItem,
          propsData: {
            visible: variable
          }
        });
        expect(wrapper.props('visible')).toBe(variable);
        expect(wrapper.find('div.base-dialog').isVisible()).toBe(variable);
        wrapper.destroy();
      });
    });

    describe('test code', () => {
      it('test default code', () => {
        const wrapper = mount(AddAbsoluteAddress, mountItem);
        expect(wrapper.props('code')).toBe('');
        wrapper.destroy();
      });
      it('test set code', () => {
        const codeStr = Random.word();
        const wrapper = mount(AddAbsoluteAddress, {
          ...mountItem,
          propsData: {
            visible: true,
            code: codeStr
          }
        });
        expect(wrapper.props('code')).toBe(codeStr);
        expect(wrapper.find('div.base-dialog .r-code-editor').text()).toBe(codeStr);
        wrapper.destroy();
      });
    });

    describe('test functionId', () => {
      it('test default functionId', () => {
        const wrapper = mount(AddAbsoluteAddress, mountItem);
        expect(wrapper.props('functionId')).toBe('');
        wrapper.destroy();
      });
      it('test set functionId', () => {
        const fidStr = Random.word();
        const wrapper = mount(AddAbsoluteAddress, {
          ...mountItem,
          propsData: {
            functionId: fidStr
          }
        });
        expect(wrapper.props('functionId')).toBe(fidStr);
        wrapper.destroy();
      });
    });
  });

  describe('3. test AddAbsoluteAddress data', () => {
    describe('test currentData', () => {
      it('a. default currentData', () => {
        const wrapper = mount(AddAbsoluteAddress, mountItem);
        expect(wrapper.vm.currentData).toEqual([]);
        const body_0 = wrapper.findAll('div.base-dialog .add-abs-addr-body').at(0);
        expect(body_0.find('.add-abs-addr-title').text()).toMatch(i18n.t('dialog.nothing'));
        wrapper.destroy();
      });

      it('b. set currentData', () => {
        const variable = Mock.mock({
          'array|1-10': [
            {
              'name|+1': Random.word()
            }
          ]
        }).array;
        const wrapper = mount(AddAbsoluteAddress, {
          ...mountItem,
          data() {
            return {
              currentData: variable
            };
          }
        });
        expect(wrapper.vm.currentData).toEqual(variable);
        const body_0 = wrapper.findAll('div.base-dialog .add-abs-addr-body').at(0);
        expect(body_0.find('.add-abs-addr-title').text()).toMatch(i18n.t('dialog.expression_title'));
        expect(body_0.findAll('.abs-addr-exp').length).toBe(variable.length);
        expect(body_0.find('.abs-addr-exp r-checkbox').exists()).toBe(true);
      });
    });

    describe('test ADtitle', () => {
      it('test ADtitle', () => {
        const wrapper = mount(AddAbsoluteAddress, mountItem);
        expect(wrapper.vm.ADtitle).toBe(i18n.t('dialog.add_absolute_addr'));
        expect(wrapper.find('.dialog-title').text()).toMatch(wrapper.vm.ADtitle);
        wrapper.destroy();
      });
    });

    describe('test highlightLine', () => {
      it('a. default highlightLine', () => {
        const wrapper = mount(AddAbsoluteAddress, mountItem);
        expect(wrapper.vm.highlightLine).toBe(null);
        wrapper.destroy();
      });
      it('b. set highlightLine', async() => {
        const variable = Mock.mock({
          'array|1-10': [
            {
              'name|+1': Random.word()
            }
          ]
        }).array;
        const wrapper = mount(AddAbsoluteAddress, {
          ...mountItem,
          data() {
            return {
              currentData: variable
            };
          }
        });
        await wrapper.setData({
          highlightLine: Random.integer(0, variable.length - 1)
        });
        await wrapper.vm.$nextTick();
        const body_0 = wrapper.findAll('div.base-dialog .add-abs-addr-body').at(0);
        expect(
          body_0
            .findAll('.abs-addr-exp')
            .at(wrapper.vm.highlightLine)
            .classes('highlight')
        ).toBe(true);
        wrapper.destroy();
      });
    });
  });

  describe('test AddAbsoluteAddress events', () => {
    describe('test BaseDialog events', () => {
      it('test BaseDialog handleConfirm', async() => {
        const variable = Mock.mock({
          'array|1-10': [
            {
              'name|+1': Random.word(),
              selected: true
            }
          ]
        }).array;
        const wrapper = mount(AddAbsoluteAddress, {
          ...mountItem,
          propsData: {
            visible: true
          },
          data() {
            return {
              currentData: variable
            };
          }
        });
        await wrapper.find('div.base-dialog .confirm').trigger('click');
        expect(wrapper.emitted().saveAbsoluteAddressExpression).toBeTruthy();
        const _exprsName = variable.map(item => item.name);
        expect(wrapper.emitted('saveAbsoluteAddressExpression')[0][0]).toEqual({
          exprsName: _exprsName
        });
        wrapper.destroy();
      });
      it('test BaseDialog handleCancel', async() => {
        const wrapper = mount(AddAbsoluteAddress, {
          ...mountItem,
          propsData: {
            visible: true
          }
        });
        await wrapper.find('div.base-dialog .cancel').trigger('click');
        expect(wrapper.emitted('update:visible')).toBeTruthy();
        expect(wrapper.emitted('update:visible')[0][0]).toBe(false);
        wrapper.destroy();
      });
    });
  });
});
