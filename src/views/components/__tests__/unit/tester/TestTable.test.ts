import { shallowMount, mount, createLocalVue, config } from '@vue/test-utils';
import TestTable from '@/views/components/tester/TestTable';
import store from '@/store';
import RocketUI from '@/components/rocket-ui';

describe('[src/views/components/tester] TestTable component', () => {
  test('does a wrapper exist', () => {
    const localVue = createLocalVue()
    localVue.use(RocketUI);
    const wrapper = mount(TestTable, {
      localVue,
      propsData: {
      },
      mocks: {
        '$t': () => {},
        '$store': store,
        '$paths': {
          TesterPath: {
            McdcDetails: ''
          }
        }
      }
  });
    });
});
