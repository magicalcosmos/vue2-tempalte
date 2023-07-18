import { shallowMount } from '@vue/test-utils';
import CFG from '../../../../src/views/components/tester/CFG';
import Mock, { Random } from 'mockjs';
import i18n from '../../../../src/i18n';

const mountItem = {
  mocks: {
    $t: (key) => i18n.t(key)
  }
};

const codeLocation = {
  line: Random.integer(0, 10),
  column: Random.integer(0, 10)
};

const codeSelectedLocation = {
  line: Random.integer(0, 10),
  column: Random.integer(0, 10)
};

const nodes = Mock.mock({
  'array|1-10': [{
    id: Random.boolean() ? '' : Random.word(),
    state: Random.boolean() ? 'success' : 'no-status',
    begin: {
      line: Random.integer(0, 10),
      column: Random.integer(0, 10)
    },
    end: {
      line: Random.integer(0, 10),
      column: Random.integer(0, 10)
    }
  }]
}).array;

const edges = Mock.mock({
  'array|1-10': [{
    testIds: Random.word(),
    startNodeId: Random.word(),
    endNodeId: Random.word()
  }]
}).array;

const CFGData = {
  nodes,
  edges
};
const sourceCode = Random.word();
const testCaseData = Mock.mock({
  'array|1-10': [{
    testId: Random.word(),
    name: Random.word()
  }]
}).array;

describe('CFG', () => {
  it('1. default render', () => {
    const wrapper = shallowMount(CFG, mountItem);
    expect(wrapper.findAll('r-split-panes r-pane').length).toBe(2);
    wrapper.destroy();
  });
});

