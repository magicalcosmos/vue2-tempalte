import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import project from './modules/project';
import routes from './modules/routes';
import webSocketMessage from './modules/webSocketMessage';
import catchComponents from './modules/catchComponents';
import loading from './modules/loading';
import config from './modules/config';
import testcase from './modules/testcase';
import progress from './modules/progress';
import func from './modules/function';
import tree from './modules/tree';
import cascader from './modules/cascader';
import license from './modules/license';
import defect from './modules/defect';
import getters from './getters';
import dynamicComponent from './modules/dynamicComponent';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
  modules: {
    routes,
    user,
    project,
    webSocketMessage,
    catchComponents,
    config,
    loading,
    testcase,
    progress,
    func,
    tree,
    cascader,
    license,
    defect,
    dynamicComponent
  },
  getters
});

export default store;
