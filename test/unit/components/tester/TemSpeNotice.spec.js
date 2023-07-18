import { shallowMount } from '@vue/test-utils';
import Mock, { Random } from 'mockjs';
import i18n from '../../../../src/i18n';
import TemSpeNotice from '../../../../src/views/components/tester/TemSpeNotice';

const mountItem = {
  mocks: {
    $t: (key) => i18n.t(key)
  }
};

describe('TemSpeNotice', () => {
  it('1. default render', async() => {
    const functionName = Random.word();
    const parentFunctionName = Random.word();
    const wrapper = shallowMount(TemSpeNotice, {
      ...mountItem,
      propsData: {
        data: {
          functionName: functionName,
          parentFunctionName: parentFunctionName
        }
      }
    });
    expect(wrapper.find('.no-tem-spe-test.tem-spe-notice').exists()).toBeTruthy();
    expect(wrapper.findAll('.no-tem-spe-test.tem-spe-notice>div').length).toBe(2);
    expect(wrapper.find('.tem-spe-notice img.ml-4').exists()).toBeTruthy();
    expect(wrapper.find('.tem-spe-notice .notice-text').exists()).toBeTruthy();
    expect(wrapper.find('.tem-spe-notice svg.common-icon-size').exists()).toBeTruthy();
    wrapper.destroy();
  });
});
