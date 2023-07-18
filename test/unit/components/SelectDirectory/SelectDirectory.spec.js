import { shallowMount } from '@vue/test-utils';
import SelectDirectory from '../../../../src/components/SelectDirectory/SelectDirectory.vue';
import { data, expectValue1, expectValue2 } from './data';
describe('Test SelectDirectory.vue', () => {
  const wrapper = shallowMount(SelectDirectory);
  const vm = wrapper.vm;
  it('addData filter in SelectDirectory.vue', () => { // 过滤文件和函数
    vm.filter = true;
    vm.filterNoFuncs = false;
    var newData = vm.addData(data);
    expect(JSON.stringify(newData)).toBe(JSON.stringify(expectValue1));
  });
  it('addData filterNoFuncs in SelectDirectory.vue', () => { // 只过滤函数
    vm.filterNoFuncs = true;
    vm.filter = false;
    var newData = vm.addData(data);
    expect(JSON.stringify(newData)).toBe(JSON.stringify(expectValue2));
  });
})
;
