import CompiledInfo from '../../../../src/views/components/tester/CompiledInfo';
import { mount, shallowMount } from '@vue/test-utils';
import Mock, { Random } from 'mockjs';
import i18n from '../../../../src/i18n';
import { COMPILEDINFO, FILESTATUS } from '../../../../src/utils/dict';
const mountItem = {
  mocks: {
    $t: (key) => i18n.t(key)
  }
};
const types = Object.values(COMPILEDINFO);
const status = Object.values(FILESTATUS);
const diags = {
  diag: Mock.mock({
    'array|1-10': [{
      'column': Random.integer(0, 10),
      'commit': Random.word(),
      'file': Random.word(),
      'line': Random.integer(0, 10),
      'message': Random.word(),
      'type': types[Random.integer(0, types.length - 1)],
      'url': Random.word()
    }]
  }).array,
  fileId: Random.word()
};
const file = {
  status: status[Random.integer(0, status.length - 1)]
};

describe('CompiledInfo', () => {
  it('1. default render', () => {
    const wrapper = mount(CompiledInfo, mountItem);
    expect(wrapper.find('.compiled-info-list').exists()).toBeFalsy();
    wrapper.destroy();
  });
  describe('2. props', () => {
    it('1) diags', async() => {
      const wrapper = mount(CompiledInfo, mountItem);
      await wrapper.vm.$nextTick();
      await wrapper.setProps({
        file: file
      });
      await wrapper.setData({
        diags: diags
      });
      expect(wrapper.findAll('.compiled-info-list li.compiled-info-item').length).toBe(diags.diag.length);
      const diagIdx = Random.integer(0, diags.diag.length - 1);
      if (diags.diag[diagIdx].type === COMPILEDINFO.WARNING) {
        expect(wrapper.findAll('.compiled-info-list li.compiled-info-item').at(diagIdx).classes()).toContain('diag-warning');
      } else {
        if (diags.diag[diagIdx].type === COMPILEDINFO.WARNING || diags.diag[diagIdx].type === COMPILEDINFO.FATAL_ERROR) {
          expect(wrapper.findAll('.compiled-info-list li.compiled-info-item').at(diagIdx).classes()).toContain('diag-error');
        }
        expect(wrapper.findAll('.compiled-info-list li.compiled-info-item').at(diagIdx).text()).toContain(diags.diag[diagIdx].message);
      }

      wrapper.destroy();
    });
  });
});

