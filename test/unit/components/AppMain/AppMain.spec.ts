import AppMain from '@/views/components/AppMain/index.vue';
import { mount } from '@vue/test-utils';
import store from '@/store';
import i18n from '@/i18n';

const mountItem = {
  store,
  mocks: {
    $t: k => i18n.t(k)
  },
  stubs: ['transition', 'keep-alive', 'router-view']
};
let wrapper;
beforeEach(() => {
  wrapper = mount(AppMain, mountItem);
});
afterEach(() => {
  wrapper.destroy();
});
const componentName = 'AppMian.vue';
describe(componentName, () => {
  it(`[${componentName}] should be rendered`, () => {
    expect(wrapper.exists()).toBe(true);
  });

  it(`[${componentName}] loading should be hide by default`, () => {
    expect(wrapper.vm.loading).toBe(false);
    expect(wrapper.find('.loading.bg').isVisible()).toBe(false);
  });
  it(`[${componentName}] loading should be show when set the store`, async() => {
    store.dispatch('LOADING', true);
    expect(wrapper.vm.loading).toBe(true);
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.loading.bg').isVisible()).toBe(true);
  });

  it(`[${componentName}] componentNames should be empty by default`, () => {
    expect(wrapper.vm.componentNames.length).toBe(0);
  });

  it(`[${componentName}] componentNames should contains value when set the store`, () => {
    store.state.catchComponents.componentNames.push('TestDashboard');
    expect(wrapper.vm.componentNames).toContain('TestDashboard');
  });
});
