/* eslint-disable no-undef */
import DownloadTestCase from '../../../../../src/views/components/Dialog/DownloadTestCase.vue';
import { shallowMount } from '@vue/test-utils';
import { BaseDialog } from '@/views/components';
import Mock, { Random } from 'mockjs';
import { LICENSEFUNC } from '@/utils/dict';

import store from '../../../../../src/store';
import { common } from '@/utils';

common.getModules = () => {
  const modules = {
    integrationTest: {
      status: 0,
      allowedExportFormat: [
        'srt'
      ]
    },
    unitTest: {
      status: 0,
      allowedExportFormat: [
        'srt',
        'yml',
        'tcf'
      ]
    }
  };
  return modules || {};
};
const factory = options => {
  return shallowMount(DownloadTestCase, {
    ...options
  });
};


describe('DownloadTestCase.vue', () => {
  it('Renders DownloadTestCase', () => {
    const wrapper = factory();
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.contains(BaseDialog)).toBe(true);
    wrapper.destroy();
  });
  describe('Test Props', () => {
    it('Test the visible of Props', async() => {
      const wrapper = factory();
      await wrapper.setProps({
        visible: true
      });
      expect(wrapper.props('visible')).toBe(true);
      wrapper.destroy();
    });
    it('Test the data of Props', async() => {
      const _data = Mock.mock({
        'id|+1': 1, // Number，自增1，初识值为1
        'name|1-3': 'tcc', // String，随机生成1-3个重复'tcc'
        'phone|11': 1, // String，生成11个1
        'age|1-120': 20, // Nmuber，随机生成1-120之间的数字
        'salary|6000-10000.1-3': 1, // Number，随机生成6000-10000的1-3位小数的数字
        'status|1': true, // Boolean，生成true或false的概率都是1/2。
        'open|2-4': true // Boolean，生成true的概率是2/(2+4)，生成false的概率是4/(2+4)
      });
      const wrapper = factory();
      await wrapper.setProps({
        data: _data
      });
      expect(wrapper.props('data')).toEqual(_data);
      wrapper.destroy();
    });
    it('Test the path of Props', async() => {
      const _path = Mock.mock('@word()');
      const wrapper = factory();
      await wrapper.setProps({
        path: _path
      });
      expect(wrapper.props('path')).toBe(_path);
      wrapper.destroy();
    });
    it('Test the version of Props', async() => {
      const _version = Mock.mock({
        'id|+1': 1, // Number，自增1，初识值为1
        'name|1-3': 'tcc', // String，随机生成1-3个重复'tcc'
        'phone|11': 1, // String，生成11个1
        'age|1-120': 20, // Nmuber，随机生成1-120之间的数字
        'salary|6000-10000.1-3': 1, // Number，随机生成6000-10000的1-3位小数的数字
        'status|1': true, // Boolean，生成true或false的概率都是1/2。
        'open|2-4': true // Boolean，生成true的概率是2/(2+4)，生成false的概率是4/(2+4)
      });
      const wrapper = factory();
      await wrapper.setProps({
        version: _version
      });
      expect(wrapper.props('version')).toEqual(_version);
      expect(wrapper.vm.currentVersion).toEqual(_version);
      wrapper.destroy();
    });
    it('Test the multiple of Props', async() => {
      const _multiple = Mock.mock('@boolean()');
      const wrapper = factory();
      await wrapper.setProps({
        multiple: _multiple
      });
      expect(wrapper.props('multiple')).toBe(_multiple);
      wrapper.destroy();
    });
    it('Test the licenseType of Props', async() => {
      const _licenseType = Random.pick([LICENSEFUNC.UNITTEST, LICENSEFUNC.INTEGRATION_TEST]);
      const wrapper = factory({
        propsData: {
          licenseType: _licenseType
        }
      });
      expect(wrapper.props('licenseType')).toBe(_licenseType);
      expect(wrapper.vm.allowedExportFormat.length).toBeGreaterThan(0);
      expect(wrapper.vm.accept).toBe(wrapper.vm.allowedExportFormat[0]);
      expect(wrapper.vm.fileType).toBe(wrapper.vm.allowedExportFormat[0]);
      wrapper.destroy();
    });
  });
  describe('Test Methods', () => {
    it('Test handleConfirm', async() => {
      const wrapper = factory();
      await wrapper.vm.handleConfirm();
      expect(wrapper.emitted('download')).toBeTruthy();
      expect(wrapper.emitted('download')[0]).toEqual([wrapper.vm.fileType]);
      wrapper.destroy();
    });
    it('Test handleCancel', async() => {
      const wrapper = factory();
      await wrapper.vm.handleCancel();
      expect(wrapper.emitted('update:visible')).toBeTruthy();
      expect(wrapper.emitted('update:visible')[0]).toEqual([false]);
      wrapper.destroy();
    });
    it('Test handleClose', async() => {
      const wrapper = factory();
      await wrapper.vm.handleClose();
      expect(wrapper.emitted('update:visible')).toBeTruthy();
      expect(wrapper.emitted('update:visible')[0]).toEqual([false]);
      wrapper.destroy();
    });
    it('Test handleShow', async() => {
      const wrapper = factory();
      await wrapper.vm.handleShow();
      expect(wrapper.emitted('update:visible')).toBeTruthy();
      expect(wrapper.emitted('update:visible')[0]).toEqual([true]);
      wrapper.destroy();
    });
    it('Test showButtons', async() => {
      const wrapper = factory();
      await wrapper.vm.showButtons(false);
      expect(wrapper.vm.isShowCancelButton).toBe(false);
      expect(wrapper.vm.isShowConfirmButton).toBe(false);
      await wrapper.vm.showButtons(true);
      expect(wrapper.vm.isShowCancelButton).toBe(true);
      expect(wrapper.vm.isShowConfirmButton).toBe(true);
      wrapper.destroy();
    });
    it('Test reset', async() => {
      const wrapper = factory();
      await wrapper.vm.reset();
      expect(wrapper.vm.fileType).toBe('srt');
      expect(wrapper.vm.isShowCancelButton).toBe(true);
      expect(wrapper.vm.isShowConfirmButton).toBe(true);
      wrapper.destroy();
    });
  });
});
