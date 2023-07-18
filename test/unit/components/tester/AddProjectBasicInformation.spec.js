import RForm from '../../../../src/components/RForm/src/form';
import RFormItem from '../../../../src/components/RForm/src/form-item';
import RInput from '../../../../src/components/RInput/src/input';
import RButton from '../../../../src/components/RButton/src/button';
import RSelect from '../../../../src/components/RSelect/src/select';
import ROption from '../../../../src/components/RSelect/src/option';
import { mount } from '@vue/test-utils';
import { Random } from 'mockjs';
import i18n from '../../../../src/i18n';
import { versionData } from './version.data';
import AddProjectBasicInformation from '../../../../src/views/components/tester/AddProjectBasicInformation';

const setMountItem = (mocksOps, otherOps) => {
  return {
    mocks: {
      $t: (key) => i18n.t(key),
      $store: {
        state: {
          routes: {
            licenseStatus: {
              license: {
                language: ['c/c++']
              }
            }
          }
        }
      },
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
      'r-input': RInput,
      'r-button': RButton,
      'r-select': RSelect,
      'r-option': ROption
    },
    ...otherOps
  };
};

describe('AddProjectBasicInformation', () => {
  it('1. default render', async() => {
    const wrapper = mount(AddProjectBasicInformation, setMountItem());
    await wrapper.setProps({
      version: versionData
    });
    expect(wrapper.find('.add-project-basic-info').exists()).toBeTruthy();
    expect(wrapper.find('.add-project-basic-info .r-form').exists()).toBeTruthy();
    expect(wrapper.findAll('.add-project-basic-info .r-form .r-form-item').length).toBe(5);
    expect(wrapper.findAll('.add-project-basic-info .r-form .r-form-item').at(0).find('label').text()).toBe(i18n.t('project.project_name'));
    expect(wrapper.findAll('.add-project-basic-info .r-form .r-form-item').at(0).classes()).toContain('is-required');
    expect(wrapper.findAll('.add-project-basic-info .r-form .r-form-item').at(1).find('label').text()).toBe(i18n.t('project.version_number'));
    expect(wrapper.findAll('.add-project-basic-info .r-form .r-form-item').at(1).classes()).toContain('is-required');
    expect(wrapper.findAll('.add-project-basic-info .r-form .r-form-item').at(2).find('label').text()).toBe(i18n.t('version.project_type'));
    expect(wrapper.findAll('.add-project-basic-info .r-form .r-form-item').at(2).classes()).toContain('is-required');
    expect(wrapper.findAll('.add-project-basic-info .r-form .r-form-item').at(3).find('label').text()).toBe(i18n.t('version.compiler'));
    expect(wrapper.findAll('.add-project-basic-info .r-form .r-form-item').at(3).classes()).toContain('is-required');
    expect(wrapper.findAll('.add-project-basic-info .r-form .r-form-item').at(4).find('label').text()).toBe(i18n.t('project.description'));
    expect(wrapper.find('.add-project-basic-info .add-project-basic-information-buttons').exists()).toBeTruthy();
    expect(wrapper.findAll('.add-project-basic-info .add-project-basic-information-buttons .r-button').length).toBe(2);
    wrapper.destroy();
  });
  describe('2. test props', () => {
    it('1）from', async() => {
      const wrapper = mount(AddProjectBasicInformation, setMountItem());
      expect(wrapper.vm.currentFrom).toBe('project');

      const fromProp = Random.word();
      await wrapper.setProps({
        from: fromProp
      });
      expect(wrapper.vm.currentFrom).toEqual(fromProp);
      expect(wrapper.findAll('.add-project-basic-info .r-form .r-form-item').length).toBe(4);
      expect(wrapper.findAll('.add-project-basic-info .r-form .r-form-item').at(0).find('.r-form-item__content input').attributes().readonly).toBeTruthy();
      wrapper.destroy();
    });
    it('2) test form item', async() => {
      const wrapper = mount(AddProjectBasicInformation, setMountItem());
      await wrapper.setProps({
        version: versionData
      });
      const projectName = Random.word();
      await wrapper.findAll('.add-project-basic-info .r-form .r-form-item').at(0).find('.r-form-item__content input').setValue(projectName);
      expect(wrapper.props().version.projectName).toBe(projectName);
      wrapper.destroy();
    });
  });
  describe('3. test methods', () => {
    it('1) handleCancel', async() => {
      const wrapper = mount(AddProjectBasicInformation, setMountItem());
      await wrapper.findAll('.add-project-basic-info .add-project-basic-information-buttons .r-button').at(0).trigger('click');
      expect(wrapper.emitted().cancel).toBeTruthy();
      wrapper.destroy();
    });
    it('2) handleSaveProjectBasicInfo', async() => {
      const wrapper = mount(AddProjectBasicInformation, setMountItem());
      await wrapper.setProps({
        version: {
          projectName: Random.word(),
          initVersion: Random.word(),
          description: Random.word(),
          projectType: Random.word(),
          language: Random.word()
        }
      });
      await wrapper.findAll('.add-project-basic-info .add-project-basic-information-buttons .r-button').at(1).trigger('click');
      expect(wrapper.emitted().handleSaveProjectBasicInformation).toBeTruthy();

      wrapper.destroy();
    });
  });
});



