import LangSwitch from '../../../../src/components/LangSwitch/index';
import { createLocalVue, mount } from '@vue/test-utils';
import Mock from 'mockjs';
import { Random } from 'mockjs';
// import moxios from 'moxios';
import i18n from '../../../../src/i18n';
import { setLang, getLang } from '../../../../src/utils/auth';
import store from '../../../../src/store';
const localVue = createLocalVue();
const mntItem = {
  localVue,
  store
};
describe( 'LangSwitch', () => {
  beforeEach(() => {
    window['vm'] = localVue;
    window['vm'].$i18n = i18n;
    // moxios.install();
  });
  afterEach(() => {
    // moxios.uninstall();
  });
  describe('create a switch tool', () => {
    it('create a select ele', () => {
      const wrapper = mount(LangSwitch, mntItem);
      expect(wrapper.find('.lang-switch-temp').isVisible()).toBeTruthy();
      expect(wrapper.find('.lang-switch-temp .lang-desc').isVisible()).toBeTruthy();
      expect(wrapper.find('.lang-switch-temp .select-options').isVisible()).toBeTruthy();
      expect(wrapper.find('.lang-switch-temp .select-options r-option').isVisible()).toBeTruthy();

      wrapper.destroy();
    });
  });

  describe('switch tool value set', () => {
    it('set temp class', async() => {
      const lsClass = Random.word();
      const wrapper = mount(LangSwitch, mntItem);
      expect(wrapper.props().lsClass).toBe('');
      expect(wrapper.find('.lang-switch-temp').classes()).not.toContain(lsClass);

      await wrapper.setProps({
        lsClass: lsClass
      });
      await wrapper.vm.$nextTick();
      expect(wrapper.props().lsClass).toBe(lsClass);
      expect(wrapper.find('.lang-switch-temp').classes()).toContain(lsClass);

      wrapper.destroy();
    });
    it('default private', ()=> {
      const wrapper = mount(LangSwitch, mntItem);
      const langKinds = Object.keys(i18n.messages);
      expect(wrapper.vm.langKeys).toEqual(langKinds);

      const currentLang = getLang() || i18n.fallbackLocale;
      expect(wrapper.vm.currentLang).toBe(currentLang);

      wrapper.destroy();
    });

    it('set currentLang', () => {
      const lang = (Mock.mock({
        'array|1': Object.keys(i18n.messages)
      })).array;
      setLang(lang);
      const wrapper = mount(LangSwitch, mntItem);
      expect(wrapper.vm.currentLang).toBe(lang);

      wrapper.destroy();
    });
  });

  describe('watch current lang switch', () => {
    it('switch currentLang and global lang', async() => {
      const wrapper = mount(LangSwitch, mntItem);
      const lang = (Mock.mock({
        'array|1': Object.keys(i18n.messages).filter(item => item !== wrapper.vm.currentLang)
      })).array;
      await wrapper.setData({
        currentLang: lang
      });
      await wrapper.vm.$nextTick();
      expect(getLang()).toBe(lang);
      expect(window['vm'].$i18n.locale).toBe(lang);

      wrapper.destroy();
    });
    it('switch lang describe', async() => {
      const wrapper = mount(LangSwitch, mntItem);
      const lang = (Mock.mock({
        'array|1': Object.keys(i18n.messages).filter(item => item !== wrapper.vm.currentLang)
      })).array;
      await wrapper.setData({
        currentLang: lang
      });
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.lang-desc').text()).toBe(`${window['vm'].$i18n.t('common.lang')}:`);
      expect(wrapper.vm.currentDesc).toBe(`${window['vm'].$i18n.t('common.lang')}`);

      wrapper.destroy();
    });
    it('option describe', () => {
      const wrapper = mount(LangSwitch, mntItem);
      const lang = (Mock.mock({
        'array|1': Object.keys(i18n.messages)
      })).array;
      expect(wrapper.vm.langOptionDesc(lang)).toBe(i18n.messages[lang].common.lang_desc);
    });
  });

  describe('test a ajax', () => {
    it('query projects', () => {
      // const wrapper = mount(LangSwitch, {
      //   localVue,
      //   store
      // });
      // moxios.stubRequest('/tester/projects.json', {
      //   status: 200,
      //   response: {
      //     data: [{
      //       name: Random.word(),
      //       url: Random.domain(),
      //       projectId: Random.string(),
      //       lastVersion: {
      //         coverages: Random.integer(1, 10),
      //         createAt: Random.integer(1),
      //         rootDirectory: {
      //           branchCoverage: 0.9893617021276596,
      //           defectsCount: {},
      //           failed: Random.boolean(),
      //           fileId: Random.string(),
      //           fileName: '.',
      //           id: Random.string(),
      //           kind: 2,
      //           mcdcCoverage: Random.float(0, 1),
      //           name: '.',
      //           path: '.',
      //           statementCoverage: Random.float(0, 1),
      //           status: 204
      //         },
      //         status: 1,
      //         versionId: '605da038bf18352839fc6b18',
      //         versionName: 'v1',
      //         visitAt: Random.integer()
      //       }
      //     }]
      //   }
      // });
      //
      // moxios.wait(() => {
      //   done();
      // });
      // wrapper.destroy();
    });
  });
});
