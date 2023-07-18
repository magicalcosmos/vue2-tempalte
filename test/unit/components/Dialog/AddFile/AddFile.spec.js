/* eslint-disable no-undef */
import AddFile from '../../../../../src/views/components/Dialog/AddFile.vue';
import BaseDialog from '../../../../../src/views/components/Dialog/BaseDialog';
import { mount } from '@vue/test-utils';
import i18n from '../../../../../src/i18n';
import Mock, { Random } from 'mockjs';

const mountItem = {
  mocks: {
    $t: key => i18n.t(key)
  }
};
describe('AddFile', () => {
  it('test BaseDialog mount', () => {
    const wrapper = mount(AddFile, mountItem);
    expect(wrapper.find(BaseDialog).exists()).toBeTruthy();
    wrapper.destroy();
  });
  it('test AddFile hidden', () => {
    const wrapper = mount(AddFile, mountItem);
    expect(wrapper.find('.add-file-dialog').isVisible()).toBeFalsy();
    wrapper.destroy();
  });

  describe('test AddFile Props', () => {
    describe('test visible', () => {
      it('test default visible', () => {
        const wrapper = mount(AddFile, mountItem);
        expect(wrapper.props('visible')).toBeFalsy();
        wrapper.destroy();
      });
      it('test set visible', () => {
        const variable = Random.boolean();
        const wrapper = mount(AddFile, {
          ...mountItem,
          propsData: {
            visible: variable
          }
        });
        expect(wrapper.props('visible')).toBe(variable);
        expect(wrapper.find('.add-file-dialog').isVisible()).toBe(variable);
        wrapper.destroy();
      });
    });


    describe('test data', () => {
      it('test defaule data', () => {
        const wrapper = mount(AddFile, mountItem);
        expect(wrapper.props('data')).toEqual({});
        wrapper.destroy();
      });
      it('test set data', () => {
        const data = Mock.mock({
          'id|+1': 1, // Number，自增1，初识值为1
          'name|1-3': 'tcc', // String，随机生成1-3个重复'tcc'
          'phone|11': 1, // String，生成11个1
          'age|1-120': 20, // Nmuber，随机生成1-120之间的数字
          'salary|6000-10000.1-3': 1, // Number，随机生成6000-10000的1-3位小数的数字
          'status|1': true, // Boolean，生成true或false的概率都是1/2。
          'open|2-4': true // Boolean，生成true的概率是2/(2+4)，生成false的概率是4/(2+4)
        });
        const wrapper = mount(AddFile, {
          ...mountItem,
          propsData: {
            data: data
          }
        });
        expect(wrapper.props('data')).toEqual(data);
        wrapper.destroy();
      });
    });

    describe('test path', () => {
      it('test defaule path', () => {
        const wrapper = mount(AddFile, mountItem);
        expect(wrapper.props('path')).toBe('');
        wrapper.destroy();
      });
      it('test set path', () => {
        const filepath = 'C:/Users/ticp/Desktop/tools.jpg';
        const wrapper = mount(AddFile, {
          ...mountItem,
          propsData: {
            path: filepath
          }
        });
        expect(wrapper.props('path')).toBe(filepath);
        expect(wrapper.vm.currentPath).toBe(filepath);
        wrapper.destroy();
      });
    });
  });
});
