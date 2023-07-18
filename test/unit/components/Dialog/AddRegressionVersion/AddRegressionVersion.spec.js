/* eslint-disable no-undef */
import AddRegressionVersion from '../../../../../src/views/components/Dialog/AddRegressionVersion.vue';
import BaseDialog from '../../../../../src/views/components/Dialog/BaseDialog.vue';
import RForm from '../../../../../src/components/RForm/src/form.vue';
import RFormItem from '../../../../../src/components/RForm/src/form-item.vue';
import RSelect from '../../../../../src/components/RSelect/src/select.vue';
import ROption from '../../../../../src/components/RSelect/src/option.vue';
import RInput from '../../../../../src/components/RInput/src/input.vue';
import UploadForm from '../../../../../src/views/components/tester/UploadSourceFile.vue';
import { mount } from '@vue/test-utils';
import i18n from '../../../../../src/i18n';
import Mock, { Random } from 'mockjs';

const mountItem = {
  mocks: {
    $t: key => i18n.t(key)
  },
  stubs: {
    'base-dialog': BaseDialog,
    'r-form': RForm,
    'r-form-item': RFormItem,
    'r-select': RSelect,
    'r-option': ROption,
    'r-input': RInput,
    UploadForm: true
  }
};
const factoryMount = options => {
  return mount(AddRegressionVersion, {
    ...mountItem,
    ...options
  });
};
const versions = Mock.mock({
  'array|2-10': [
    {
      'versionName': '@name',
      'versionId|+1': 1
    }
  ]
}).array;

describe('AddRegressionVersion', () => {
  it('Test AddRegressionVersion render', () => {
    const wrapper = factoryMount();
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.contains(BaseDialog)).toBeTruthy();
    expect(wrapper.contains(RForm)).toBeTruthy();
    expect(wrapper.contains(RFormItem)).toBeTruthy();
    expect(wrapper.contains(RSelect)).toBeTruthy();
    expect(wrapper.contains(ROption)).toBeFalsy();
    expect(wrapper.contains(RInput)).toBeTruthy();
    expect(wrapper.contains(UploadForm)).toBeTruthy();
    expect(wrapper.findComponent(BaseDialog).isVisible()).toBe(false);
    expect(wrapper.findComponent(RForm).isVisible()).toBe(false);
    expect(wrapper.findComponent(RFormItem).isVisible()).toBe(false);
    expect(wrapper.findComponent(RSelect).isVisible()).toBe(false);
    expect(wrapper.findComponent(ROption).exists()).toBe(false);
    expect(wrapper.findComponent(RInput).isVisible()).toBe(false);
    expect(wrapper.findComponent(UploadForm).isVisible()).toBe(false);
    wrapper.destroy();
  });

  describe('Test attributes', () => {
    it('Test BaseDialog title', () => {
      const wrapper = factoryMount({
        propsData: {
          visible: true
        }
      });
      expect(wrapper.text()).toContain(i18n.t('version.add_regression'));
      expect(wrapper.text()).toContain(wrapper.vm.currentTitle);
      wrapper.destroy();
    });
    it('Test RForm label', () => {
      const wrapper = factoryMount({
        propsData: {
          visible: true
        }
      });
      expect(wrapper.text()).toContain(i18n.t('version.relative_version'));
      expect(wrapper.text()).toContain(i18n.t('project.version_number'));
      wrapper.destroy();
    });
    it('Test UploadForm submitText', () => {
      const wrapper = factoryMount({
        propsData: {
          visible: true
        }
      });
      expect(wrapper.text()).toContain(i18n.t('button.sure'));
      wrapper.destroy();
    });
  });

  describe('Test props', () => {
    it('Test visible', () => {
      const wrapper = factoryMount({
        propsData: {
          visible: true
        }
      });
      expect(wrapper.props('visible')).toBe(true);
      expect(wrapper.findComponent(BaseDialog).isVisible()).toBe(true);
      expect(wrapper.findComponent(RForm).isVisible()).toBe(true);
      expect(wrapper.findComponent(RFormItem).isVisible()).toBe(true);
      expect(wrapper.findComponent(RSelect).isVisible()).toBe(true);
      expect(wrapper.findComponent(RInput).isVisible()).toBe(true);
      expect(wrapper.findComponent(UploadForm).isVisible()).toBe(true);
      wrapper.destroy();
    });
  });
  describe('Mock data', () => {
    it('Test versionList', () => {
      const wrapper = factoryMount({
        propsData: {
          visible: true
        },
        data() {
          return {
            versionList: versions
          };
        }
      });
      expect(wrapper.vm.versionList).toEqual(versions);
      expect(wrapper.findComponent(ROption).exists()).toBe(true);
      expect(wrapper.contains(ROption)).toBeTruthy();
      wrapper.destroy();
    });
  });
  describe('Test methods', () => {
    it('Test beforeSubmit', async() => {
      const wrapper = factoryMount({
        propsData: {
          visible: true
        },
        data() {
          return {
            versionList: versions
          };
        }
      });
      wrapper.vm.beforeSubmit();
      await wrapper.vm.$nextTick();
      expect(wrapper.emitted().saveVersion).toBeTruthy();
      wrapper.destroy();
    });
    it('Test handleClose', async() => {
      const wrapper = factoryMount({
        propsData: {
          visible: true
        },
        data() {
          return {
            versionList: versions
          };
        }
      });
      wrapper.vm.handleClose();
      await wrapper.vm.$nextTick();
      expect(wrapper.emitted('update:visible')).toBeTruthy();
      expect(wrapper.emitted('update:visible')[0][0]).toBe(false);
      wrapper.destroy();
    });
  });
});
