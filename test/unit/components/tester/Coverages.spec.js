import Coverages from '../../../../src/views/components/tester/Coverages';
import RProgress from '../../../../src/components/RProgress';
import { mount, shallowMount } from '@vue/test-utils';
import Mock, { Random } from 'mockjs';
import i18n from '../../../../src/i18n';
import { COVERAGES } from '../../../../src/utils/dict';

const mountItem = {
  mocks: {
    $t: (key) => i18n.t(key)
  },
  stubs: {
    'r-progress': RProgress
  }
};

const coverages = [Object.values(COVERAGES), COVERAGES.STATEMENTCOVERAGE + COVERAGES.BRANCHCOVERAGE, COVERAGES.STATEMENTCOVERAGE + COVERAGES.MCDCCOVERAGE, Coverages.BRANCHCOVERAGE + COVERAGES.MCDCCOVERAGE];

describe('Coverages', () => {
  it('1. default render', () => {
    const wrapper = mount(Coverages, mountItem);
    expect(wrapper.find('.coverages').exists()).toBeTruthy();
    expect(wrapper.findAll('.coverages .align-item').length).toBe(0);
    wrapper.destroy();
  });
  it('2. test data & coverages', async() => {
    const wrapper = mount(Coverages, mountItem);
    await wrapper.setProps({
      data: {
        invokeCoverage: Random.integer(0, 100),
        statementCoverage: Random.integer(0, 100),
        mcdcCoverage: Random.integer(0, 100),
        branchCoverage: Random.integer(0, 100)
      },
      coverages: coverages[Random.integer(0, coverages.length - 1)]
    });
    expect(wrapper.vm.currentData).toEqual(wrapper.props().data);
    expect(wrapper.vm.currentCoverages).toEqual(wrapper.props().coverages);
    if ((wrapper.props().coverages & COVERAGES.CALLCOVERAGE) > 0) {
      expect(wrapper.findAll('.coverages .align-item').at(0).find('.r-progress').text()).toContain(wrapper.props().data.invokeCoverage);
    }
    wrapper.destroy();
  });
});

