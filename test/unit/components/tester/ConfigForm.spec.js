import { ConfigForm } from '../../../../src/views/components';
import RForm from '../../../../src/components/RForm/src/form';
import RFormItem from '../../../../src/components/RForm/src/form-item';
import SRInput from '../../../../src/components/SRInput';
import RCollapse from '../../../../src/components/collapse/src/collapse';
import RCollapseItem from '../../../../src/components/collapse/src/collapse-item';
import RCheckbox from '../../../../src/components/RCheckbox/src/checkbox';
import { mount, shallowMount } from '@vue/test-utils';
import { Random } from 'mockjs';
import i18n from '../../../../src/i18n';
import { versionData } from './version.data';
import store from '../../../../src/store';

const setMountItem = (mocksOps, otherOps) => {
  return {
    mocks: {
      $t: (key) => i18n.t(key),
      $store: store,
      $route: {
        query: {
          versionId: versionData.versionId
        }
      },
      ...mocksOps
    },
    stubs: {
      'r-form': RForm,
      'r-form-item': RFormItem,
      'r-collapse': RCollapse,
      'r-collapse-item': RCollapseItem,
      'sr-input': SRInput,
      'r-checkbox': RCheckbox
    },
    ...otherOps
  };
};

describe('ConfigForm', () => {
  it('1. default render', async() => {
    const wrapper = mount(ConfigForm, setMountItem());
    await wrapper.setProps({
      visible: true,
      version: versionData
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.config-form').exists()).toBeTruthy();
    expect(wrapper.find('.config-form .config-form-content').exists()).toBeTruthy();
    expect(wrapper.find('.config-form .config-form-content span.import-export').exists()).toBeTruthy();
    expect(wrapper.findAll('.config-form .config-form-content span.import-export .locked-size').length).toBe(2);
    expect(wrapper.find('.config-form .config-form-content .r-form').exists()).toBeTruthy();
    expect(wrapper.find('.config-form .config-form-content .title-1').exists()).toBeTruthy();
    expect(wrapper.find('.config-form .config-form-content .title-1').text()).toContain(i18n.t('project.choose_config_assign'));
    expect(wrapper.vm.isShowUniTtest).toBeFalsy();
    expect(wrapper.find('.config-form .config-form-content .title-2').exists()).toBeTruthy();
    expect(wrapper.find('.config-form .config-form-content .title-2').text()).toContain(i18n.t('project.fill_in_the_configuration_information'));
    expect(wrapper.find('.config-form .config-form-content .config-info').exists()).toBeTruthy();
    expect(wrapper.findAll('.config-form .config-form-content .r-form .config-info .r-form-item').at(0).find('label').text()).toBe(wrapper.vm.domain.language === 'c++' ? i18n.t('version.c_cadd_headfile') : i18n.t('version.c_headfile'));
    expect(wrapper.findAll('.config-form .config-form-content .r-form .config-info .r-form-item').at(1).find('label').text()).toBe(i18n.t('version.c_soucefile'));
    wrapper.destroy();
  });
  describe('2. test props & events', () => {
    it('1) update config', async() => {
      const showUnit = Random.boolean();
      const showStatic = Random.boolean();
      const wrapper = shallowMount(ConfigForm, setMountItem({
        $store: {
          state: {
            routes: {
              licenseStatus: {
                license: {
                  modules: {
                    unitTest: showUnit,
                    staticAnalyze: showStatic
                  }
                }
              }
            }
          }
        }
      }));
      await wrapper.setProps({
        visible: true,
        version: versionData
      });
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.show).toBeTruthy();
      const collapseList = wrapper.findAll('.config-form .config-form-content .r-form .assign-card .r-collapse-item');
      if (showUnit) {
        expect(wrapper.vm.isShowUnitTest).toBeTruthy();
        expect(wrapper.find('.config-form .config-form-content .r-form .assign-card').exists()).toBeTruthy();
        if (showStatic) {
          expect(collapseList.length).toBe(2);
        }
      }
      if (showStatic) {
        expect(wrapper.vm.isShowStatic).toBeTruthy();
      }
      wrapper.destroy();
    });
  });
});
