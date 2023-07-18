import { shallowMount } from '@vue/test-utils';
import Mock, { Random } from 'mockjs';
import i18n from '../../../../src/i18n';
import MyProject from '../../../../src/views/components/tester/MyProject';
import store from '../../../../src/store';

const mountItem = {
  mocks: {
    $t: (key) => i18n.t(key),
    $store: store
  }
};

describe('MyProject', () => {
  it('1. default render', () => {
    const wrapper = shallowMount(MyProject, mountItem);
    expect(wrapper.find('.my-project').exists()).toBeTruthy();
    expect(wrapper.find('.my-project r-table').exists()).toBeTruthy();
    expect(wrapper.find('.my-project r-pagination').exists()).toBeTruthy();
    wrapper.destroy();
  });
  describe('2. test props', () => {
    it('1) q', async() => {
      const wrapper = shallowMount(MyProject, mountItem);
      const q = Random.word();
      await wrapper.setProps({
        q
      });
      expect(wrapper.vm.filters.q).toBe(q);
      expect(wrapper.vm.filters.page).toBe(1);
      wrapper.destroy();
    });
  });
});

