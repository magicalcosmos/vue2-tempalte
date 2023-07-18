import { shallowMount } from '@vue/test-utils';
import i18n from '../../../../src/i18n';
import ProjectDetail from '../../../../src/views/components/tester/ProjectDetail';

const mountItem = {
  mocks: {
    $t: (key) => i18n.t(key)
  }
};

describe('ProjectDetail', () => {
  it('1. default', () => {
    const wrapper = shallowMount(ProjectDetail, mountItem);
    expect(wrapper.find('.project-detail drawer-stub').exists()).toBeTruthy();
    expect(wrapper.find('.project-detail drawer-stub .project-detail-content').exists()).toBeTruthy();
    expect(wrapper.find('.project-detail drawer-stub .project-detail-content .title').exists()).toBeTruthy();
    expect(wrapper.find('.project-detail drawer-stub .project-detail-content .project-detail-list').exists()).toBeTruthy();
    expect(wrapper.findAll('.project-detail drawer-stub .project-detail-content .project-detail-list .project-detail-item').length).toBe(4);
    expect(wrapper.find('.project-detail drawer-stub .project-detail-content history-stub').exists()).toBeTruthy();
    expect(wrapper.find('.project-detail drawer-stub .delete-project').exists()).toBeTruthy();
    expect(wrapper.find('.project-detail drawer-stub .delete-project r-button').exists()).toBeFalsy();
    wrapper.destroy();
  });
  it('2. isShowDeleteButton', async() => {
    const wrapper = shallowMount(ProjectDetail, mountItem);
    expect(wrapper.vm.isShow).toBeFalsy();
    await wrapper.setProps({
      visible: true
    });
    expect(wrapper.vm.isShow).toBeTruthy();
    wrapper.destroy();
  });
});
