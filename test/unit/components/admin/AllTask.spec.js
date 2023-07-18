/* eslint-disable no-undef */
import AllTask from '../../../../src/views/components/tester/AllTask.vue';
import { createLocalVue, mount, shallowMount } from '@vue/test-utils';
import i18n from '../../../../src/i18n';
import store from '../../../../src/store';

const localVue = createLocalVue();
const mountItem = {
  store,
  mocks: {
    $t: key => i18n.t(key)
  }
};

describe('AllTask', () => {
  beforeEach(function() {
    window['vm'].$i18n = i18n;
  });

  it('AllTask wrapper', async() => {
    const wrapper = shallowMount(AllTask, mountItem);
    expect(wrapper.find('div.task').isVisible()).toBe(true);
    await wrapper.vm.$nextTick();
  });

  it('test AllTask props', async() => {
    const wrapper = shallowMount(AllTask, mountItem);
    expect(wrapper.props('q')).toBe('');
    expect(wrapper.props('status')).toBe(undefined);
    expect(wrapper.props('type')).toBe('');
    await wrapper.setProps({
      q: '张三',
      status: 1,
      type: 'personal'
    });
    expect(wrapper.props('q')).toBe('张三');
    expect(wrapper.props('status')).toBe(1);
    expect(wrapper.props('type')).toBe('personal');
  });

  it('test AllTask Table Events', async() => {
    const wrapper = shallowMount(AllTask, mountItem);
    const tableWrapper = wrapper.find({ ref: 'mpTable' });
  });
});

