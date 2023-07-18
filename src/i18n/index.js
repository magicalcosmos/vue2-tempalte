import Vue from 'vue';
import VueI18n from 'vue-i18n';
import zhLocale from './zh-CN.ts';
import enLocale from './en-US.ts';
import jaLocale from './ja-JP.ts';
import zhEl from './lib/locale/lang/zh-CN'; // element-ui lang
import enEl from './lib/locale/lang/en';
import jaEl from './lib/locale/lang/ja';
import { getLang } from '../utils/auth';
import { getTimezoneName } from '../utils/time';

const messages = {
  'zh-CN': {
    ...zhLocale,
    ...zhEl
  },
  'en-US': {
    ...enLocale,
    ...enEl
  },
  'ja-JP': {
    ...jaLocale,
    ...jaEl
  }
};
Vue.use(VueI18n);

const lang = getLang() ? getLang() : getTimezoneName();
const i18n = new VueI18n({
  locale: getLang() || 'zh-CN',
  fallbackLocale: 'zh-CN',
  messages
});
export default i18n;

