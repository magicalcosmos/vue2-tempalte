require('jsdom-global')( // solved => SecurityError: localStorage is not available for opaque origins
  undefined,
  {
    url: 'https://dev.wue-theme.test'
  });
require('@babel/polyfill');
global.expect = require('expect');

global.document.createRange = () => ({
  setStart: () => {},
  setEnd: () => {},
  commonAncestorContainer: {
    nodeName: 'BODY',
    ownerDocument: document
  },
  getBoundingClientRect: () => {},
  getClientRects: () => 0
});

const Vue = require('vue');
const VueI18n = require('vue-i18n');
const zhEl = require('../src/i18n/lib/locale/lang/zh-CN.js');
const enEl = require('../src/i18n/lib/locale/lang/en.js');
const jaEl = require('../src/i18n/lib/locale/lang/ja.js');
const messages = {
  'zh-CN': {
    ...zhEl
  },
  'en-US': {
    ...enEl
  },
  'ja-JP': {
    ...jaEl
  }
};
Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: 'zh-CN',
  fallbackLocale: 'zh-CN',
  messages
});
window['vm'] = {};
window['vm'].$i18n = i18n;
