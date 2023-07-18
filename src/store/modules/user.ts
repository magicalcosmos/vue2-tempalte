import Privilege from '@/service/privilege';
import { ROLES } from '@/utils/dict';
const users = {
  state: {
    userId: '',
    username: '',
    nickname: '',
    role: '',
    lang: '',
    privilege: {
      admin: false,
      tester: false,
      testerManager: false
    }
  },
  mutations: {
    SET_USER_INFO: (state, data) => {
      state.userId = data.userId;
      state.username = data.username;
      state.nickname = data.nickname;
      state.role = data.role;
      state.privilege.admin = Privilege.hasPrivilege([ROLES.SUPERADMIN, ROLES.ADMIN], data.role);
      state.privilege.tester = Privilege.hasPrivilege(ROLES.TESTER, data.role);
      state.privilege.testerManager = Privilege.hasPrivilege(ROLES.TESTERMANAGER, data.role);
      state.lang = data.lang && data.lang.replace('_', '-');
    },
    GET_USER_INFO: state => {
      return {
        userId: state.userId,
        username: state.username,
        nickname: state.nickname,
        role: state.role,
        lang: state.lang && state.lang.replace('_', '-')
      };
    }
  },
  actions: {
    /**
     * 设置用户信息
     * @param param0
     */
    setUserInfo({ commit }, data) {
      commit('SET_USER_INFO', data);
    },
    /**
     * 获取用户信息
     * @param param0
     */
    getUserInfo({ commit }) {
      new Promise((resolve, reject) => {
        resolve(commit('GET_USER_INFO'));
      });
    }
  }
};

export default users;
