import Mock, { Random } from 'mockjs';
import { shallowMount } from '@vue/test-utils';
import History from '../../../../src/views/components/tester/History';

describe('History', () => {
  it('1. default render', () => {
    const wrapper = shallowMount(History);
    expect(wrapper.find('.operation-history .operation-history-title').isVisible()).toBeTruthy();
    expect(wrapper.find('.operation-history .operation-history-list').isVisible()).toBeTruthy();
    wrapper.destroy();
  });
  describe('2. test props', async() => {
    it('1) title', async() => {
      const wrapper = shallowMount(History);
      expect(wrapper.find('.operation-history .operation-history-title').text()).toBe('');

      const title = Random.word();
      await wrapper.setProps({
        title
      });
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.operation-history .operation-history-title').text()).toBe(title);
      wrapper.destroy();
    });
    it('2) history', async() => {
      const wrapper = shallowMount(History);

      const history = Mock.mock({
        'array|1-10': [{
          time: Random.word(),
          content: Random.word()
        }]
      }).array;
      await wrapper.setProps({
        history
      });
      expect(wrapper.findAll('.operation-history .operation-history-list .operation-history-detail').length).toBe(history.length);
      const hisIdx = Random.integer(0, history.length - 1);
      expect(wrapper.findAll('.operation-history .operation-history-list .operation-history-detail').at(hisIdx).find('.version-timeline-item-tail').exists()).toBeTruthy();
      expect(wrapper.findAll('.operation-history .operation-history-list .operation-history-detail').at(hisIdx).find('.version-timeline-item-node').exists()).toBeTruthy();
      expect(wrapper.findAll('.operation-history .operation-history-list .operation-history-detail').at(hisIdx).find('.version-timeline-item-wrapper').exists()).toBeTruthy();
      expect(wrapper.findAll('.operation-history .operation-history-list .operation-history-detail').at(hisIdx).find('.version-timeline-item-wrapper').text()).toContain(history[hisIdx].time);
      expect(wrapper.findAll('.operation-history .operation-history-list .operation-history-detail').at(hisIdx).find('.version-timeline-item-wrapper').text()).toContain(history[hisIdx].content);
      wrapper.destroy();
    });
  });
});

