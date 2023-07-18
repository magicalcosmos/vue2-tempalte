import { shallowMount } from '@vue/test-utils';
import i18n from '../../../../src/i18n';
import Mock, { Random } from 'mockjs';
import TemSpecialization from '../../../../src/views/components/tester/TemSpecialization';
import { FILESTATUS, KIND } from '../../../../src/utils/dict';

const mountItem = {
  mocks: {
    $t: (key) => i18n.t(key)
  }
};

const kinds = Object.values(KIND);

const data = {
  elementId: Random.word(),
  fileId: Random.word(),
  parentFunctionName: Random.word(),
  kind: 21,
  // kind: kinds[Random.integer(0, kinds.length - 1)],
  functionStatus: Random.boolean() ? FILESTATUS.WAITING_COMPILAION : 0
};

const warningMessage = Mock.mock({
  'array|1-10': [Random.word()]
}).array;

describe('TemSpecialization', () => {
  it('1. default render', () => {
    const wrapper = shallowMount(TemSpecialization, mountItem);
    expect(wrapper.find('.tem-specialization').exists()).toBeTruthy();
    wrapper.destroy();
  });
  describe('2. test props', () => {
    it('1) data', async() => {
      const wrapper = shallowMount(TemSpecialization, mountItem);
      await wrapper.setProps({
        data
      });
      if (wrapper.vm.IsTempSpeListType.indexOf(wrapper.vm.currentData.kind) > -1) {
        expect(wrapper.find('.tem-specialization .tem_spe_form').exists()).toBeTruthy();
        expect(wrapper.find('.tem-specialization .tem_spe_form .form_title').exists()).toBeTruthy();
        expect(wrapper.find('.tem-specialization .tem_spe_form .tips').exists()).toBeTruthy();
        expect(wrapper.find('.tem-specialization .tem_spe_form .mx-auto').exists()).toBeTruthy();
        expect(wrapper.find('.tem-specialization .tem_spe_form .mx-auto r-form').exists()).toBeTruthy();
      }
      if (wrapper.vm.NotTempSpeListType.indexOf(wrapper.vm.currentData.kind) > -1) {
        expect(wrapper.find('.tem-specialization tem-spe-notice-stub').exists()).toBeTruthy();
      }
      wrapper.destroy();
    });
    it('2) warningMessage', async() => {
      const wrapper = shallowMount(TemSpecialization, mountItem);
      await wrapper.setProps({
        data
      });
      await wrapper.setData({
        warningMessage
      });
      if (wrapper.vm.IsTempSpeListType.indexOf(wrapper.vm.currentData.kind) > -1) {
        expect(wrapper.find('.tem-specialization .tem_spe_form').text()).toContain(warningMessage[Random.integer(0, warningMessage.length - 1)]);
      }
      wrapper.destroy();
    });
  });
});
