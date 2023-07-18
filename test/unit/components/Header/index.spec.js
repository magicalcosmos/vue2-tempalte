import Header from '../../../../src/views/components/Header/index';
import FloatingBall from '../../../../src/components/FloatingBall/index';
import RMenu from '../../../../src/components/RMenu/src/menu';
import RSubmenu from '../../../../src/components/RMenu/src/submenu';
import RMenuItemGroup from '../../../../src/components/RMenu/src/menu-item-group';
import RMenuItem from '../../../../src/components/RMenu/src/menu-item';
import { createLocalVue, mount, shallowMount } from '@vue/test-utils';
import i18n from '../../../../src/i18n';
import { Random } from 'mockjs';
import * as Paths from '../../../../src/router/paths';
import store from '../../../../src/store';
import RWebSocket from '../../../../src/utils/websocket';
import Auth from '../../../../src/directives';
import common from '../../../../src/utils/common';
const localVue = createLocalVue();
const setMountItem = (mocksOps, otherOps) => {
  return {
    mocks: {
      $ws: RWebSocket,
      $t: (key) => i18n.t(key),
      $paths: Paths,
      $store: store,
      $router: {
        push: param => {}
      },
      $route: {
        path: '/'
      },
      directives: {
        Auth
      },
      ...mocksOps
    },
    stubs: {
      'floating-ball': FloatingBall,
      'r-menu': RMenu,
      'r-submenu': RSubmenu,
      'r-menu-item-group': RMenuItemGroup,
      'r-menu-item': RMenuItem
    },
    ...otherOps
  };
};
describe('test Header', () => {
  it('1. test HTML', () => {
    const wrapper = mount(Header, setMountItem());
    expect(wrapper.find('.header').exists()).toBeTruthy();
    expect(wrapper.find('.header .header-list').exists()).toBeTruthy();
    expect(wrapper.find('.header .header-list.header_title').exists()).toBeFalsy();
    expect(wrapper.find('.header .header-list .header-item.product-name').exists()).toBeTruthy();
    expect(wrapper.find('.header .header-list .header-item.product-name .icon-logo').exists()).toBeTruthy();
    expect(wrapper.find('.header .header-list .header-item.left-items').exists()).toBeTruthy();
    expect(wrapper.find('.header .header-list .header-item.left-items .r-menu-rocket').exists()).toBeTruthy();
    expect(wrapper.find('.header .header-list .header-item .user-info').exists()).toBeTruthy();
    wrapper.destroy();
  });
  describe('2. test Mounted', () => {
    it('1) default isMenu', () => {
      const wrapper = shallowMount(Header, setMountItem());
      expect(wrapper.vm.isMenu).toBeTruthy();
      expect(wrapper.find('.header .header-list').exists()).toBeTruthy();
      expect(wrapper.find('.header .header-list.header_title').exists()).toBeFalsy();
      wrapper.destroy();
    });
    it('2) set route to test isMenu', async() => {
      const idx = Random.integer(0, 3);
      const typeList = ['source', 'header', 'func', 'testcase'];
      const wrapper = mount(Header, setMountItem({
        $route: {
          path: '/overview_info',
          params: {
            type: typeList[idx]
          }
        }
      }));
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.isMenu).toBeFalsy();
      expect(wrapper.find('.header .header-list').classes()).toContain('header_title');
      expect(wrapper.find('.header .header-list .header_title').text()).toContain(i18n.t('version.project_version_overview'));
      expect(wrapper.findAll('.header .header-list span').at(1).text()).toBe(wrapper.vm.subTitle);

      wrapper.destroy();
    });
  });
  describe('3. test FloatingBall', () => {
    it('1) render FloatingBall', async() => {
      const wrapper = mount(Header, setMountItem());
      await wrapper.vm.$store.dispatch('setFloatingBallPercentage', Random.integer(0, 100) + '%');
      await wrapper.vm.$store.dispatch('setFloatingBallVisible', true);
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.isFloatingBallVisible).toBeTruthy();
      expect(wrapper.find('.progress_srt_2020798_circle').isVisible()).toBeTruthy();
      expect(wrapper.find('.progress_srt_2020798_circle span').text()).toBe(wrapper.vm.floatingBallPercentage);
      wrapper.destroy();
    });
  });
});
