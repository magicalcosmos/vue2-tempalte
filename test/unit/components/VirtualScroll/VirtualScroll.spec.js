import { shallowMount } from '@vue/test-utils';
import Mock, { Random } from 'mockjs';
import i18n from '../../../../src/i18n';
import VirtualScroll from '../../../../src/components/VirtualScroll';

const mountItem = {
  mocks: {
    $t: (key) => i18n.t(key)
  }
};
window.requestAnimationFrame = (cb) => { cb && cb(); };

const data = Mock.mock({
  'array|1-10': [{
    id: Random.word()
  }]
}).array;
const size = Random.int(20, 30);

describe('VirtualScroll', () => {
  it('1. default render', () => {
    const wrapper = shallowMount(VirtualScroll, mountItem);
    expect(wrapper.find('.virtual-scroll-container').exists()).toBeTruthy();
    expect(wrapper.find('.virtual-scroll-container ul.virtual-scroll-list').exists()).toBeTruthy();
    expect(wrapper.find('.virtual-scroll-container ul.virtual-scroll-list li.virtual-scroll-li').exists()).toBeFalsy();
    wrapper.destroy();
  });
  describe('2. test props', async() => {
    it('1) data', async() => {
      const wrapper = shallowMount(VirtualScroll, mountItem);
      await wrapper.setProps({
        data,
        size
      });
      const endIdx = (~~(100 / size) + 2) * 2;
      let visibleLen;
      if (data.length > endIdx) {
        visibleLen = endIdx + 1;
      } else {
        visibleLen = data.length;
      }
      expect(wrapper.findAll('.virtual-scroll-container ul.virtual-scroll-list li.virtual-scroll-li').length).toBe(visibleLen);
      wrapper.destroy();
    });
    it('2) ulClass & liClass', async() => {
      const wrapper = shallowMount(VirtualScroll, mountItem);
      const ulClass = Random.word();
      const liClass = Random.word();
      await wrapper.setProps({
        data,
        ulClass,
        liClass
      });
      expect(wrapper.find('ul.virtual-scroll-list').classes()).toContain(ulClass);
      expect(wrapper.find('ul.virtual-scroll-list li').classes()).toContain(liClass);
      wrapper.destroy();
    });
  });
  describe('3. test methods', async() => {
    it('1) handleScroll', async() => {
      const wrapper = shallowMount(VirtualScroll, mountItem);
      await wrapper.setProps({
        data,
        size
      });
      await wrapper.trigger('scroll');
      expect(wrapper.vm.scrollDirty).toBeFalsy();
      wrapper.destroy();
    });
  });
});
