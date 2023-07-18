import { ConfigDetail } from '../../../../src/views/components';
import SRInput from '../../../../src/components/SRInput';
import { createLocalVue, mount, shallowMount } from '@vue/test-utils';
import { Random } from 'mockjs';
import i18n from '../../../../src/i18n';
import { versionData } from './version.data';
import common from '../../../../src/utils/common';

const localVue = createLocalVue();
const route = Random.boolean();
const mountItem = {
  mocks: {
    $t: (key) => i18n.t(key),
    $route: {
      name: route ? 'ProjectMain' : 'AnalysisHome'
    }
  },
  stubs: {
    'sr-input': SRInput
  }
};

describe('ConfigDetail', () => {
  it('1. default render', () => {
    const wrapper = mount(ConfigDetail, mountItem);
    expect(wrapper.find('.project-detail').exists()).toBeFalsy();
    wrapper.destroy();
  });
  describe('2. test props & events', () => {
    it('1) isShow & version', async() => {
      const wrapper = shallowMount(ConfigDetail, mountItem);
      await wrapper.setProps({
        visible: true,
        version: versionData
      });
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.isShow).toBeTruthy();
      if (route) {
        expect(wrapper.vm.isShowUnitTest).toBeTruthy();
      } else {
        expect(wrapper.vm.isShowStatic).toBeTruthy();
      }
      expect(wrapper.vm.currentVersion).toEqual(versionData);
      expect(wrapper.vm.unitCoverages).toEqual(common.coveragesNumberToArray(versionData.unitTest.coverages));
      expect(wrapper.vm.integrationCoverages).toEqual(common.coveragesNumberToArray(versionData.integrationTest.coverages));
      expect(wrapper.vm.includesString).toEqual((versionData.includes || []).join(';'));
      expect(wrapper.vm.headersString).toEqual(versionData.headers.suffixes.join(';'));
      expect(wrapper.vm.projectName).toEqual(versionData.language === 'c' ? `C${common.i18n('project.project')}` : `C/C++${common.i18n('project.project')}`);
      expect(wrapper.vm.exitsString).toEqual((versionData.exits || []).join(';'));

      expect(wrapper.find('.project-detail').isVisible()).toBeTruthy();
      expect(wrapper.find('.project-detail .title').exists()).toBeTruthy();
      expect(wrapper.find('.project-detail .title').text()).toContain(i18n.t('version.configure'));
      expect(wrapper.find('.project-detail .title .import-export').exists()).toBeTruthy();
      expect(wrapper.find('.project-detail .title .import-export .icon-import').exists()).toBeTruthy();
      expect(wrapper.find('.project-detail .title .import-export .icon-export').exists()).toBeTruthy();

      expect(wrapper.find('.project-detail .project-detail-list').exists()).toBeTruthy();
      expect(wrapper.findAll('.project-detail .project-detail-list .project-detail-item').at(0).find('.label').text()).toBe(i18n.t('version.project_type'));
      expect(wrapper.findAll('.project-detail .project-detail-list .project-detail-item').at(1).find('.label').text()).toBe(i18n.t('version.compiler'));
      expect(wrapper.findAll('.project-detail .project-detail-list .project-detail-item').at(1).find('r-edit-select-obj-stub').attributes('value')).toBe(wrapper.vm.currentVersion.projectType);

      expect(wrapper.findAll('.project-detail .project-detail-list li.unit-title.d-flex.pointer').at(0).isVisible()).toBeTruthy();
      if (route) {
        expect(wrapper.findAll('.project-detail .project-detail-list li.unit-title.d-flex.pointer').at(0).text()).toContain(i18n.t('project.module_test'));
      } else {
        expect(wrapper.findAll('.project-detail .project-detail-list li.unit-title.d-flex.pointer').at(0).text()).toContain(i18n.t('project.static_analysis'));
      }
      expect(wrapper.find('.project-detail .project-detail-list li.unit-title.d-flex.pointer i').classes()).toContain('r-icon-arrow-up');

      expect(wrapper.findAll('.project-detail .project-detail-list li.unit-title.d-flex.pointer').at(1).text()).toContain(i18n.t('project.common_config'));

      wrapper.destroy();
    });
    it('2) test module expand switch', async() => {
      const wrapper = shallowMount(ConfigDetail, mountItem);
      await wrapper.setProps({
        visible: true,
        version: versionData
      });
      await wrapper.vm.$nextTick();
      const singleModule = wrapper.findAll('.project-detail .project-detail-list li.unit-title.d-flex.pointer').at(0);
      await singleModule.trigger('click');
      if (route) {
        expect(wrapper.vm.isShowUnitTestModule).toBeFalsy();
      } else {
        expect(wrapper.vm.isShowStaticModule).toBeFalsy();
      }
      expect(singleModule.find('i').classes()).toContain('r-icon-arrow-down');
      expect(singleModule.find('i').classes()).not.toContain('r-icon-arrow-up');

      const commonModule = wrapper.findAll('.project-detail .project-detail-list li.unit-title.d-flex.pointer').at(1);
      await commonModule.trigger('click');
      expect(wrapper.vm.isShowCommonConfigModule).toBeFalsy();
      expect(commonModule.find('i').classes()).toContain('r-icon-arrow-down');
      expect(commonModule.find('i').classes()).not.toContain('r-icon-arrow-up');
      wrapper.destroy();
    });
    it('3）show macros dialog', async() => {
      const wrapper = shallowMount(ConfigDetail, mountItem);
      await wrapper.setProps({
        visible: true,
        version: versionData
      });
      await wrapper.vm.$nextTick();
      const commonModuleLis = wrapper.findAll('.project-detail .project-detail-list>div').at(2).findAll('li');
      const commonModuleLiNum = commonModuleLis.length;
      const includes = commonModuleLis.at(commonModuleLiNum - 3 - 1).find('span.more');
      await includes.trigger('click');
      await wrapper.vm.$nextTick();
      expect(wrapper.emitted().isShowDialog).toBeTruthy();

      wrapper.destroy();
    });
  });
});
