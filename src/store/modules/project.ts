import common from '@/utils/common';
import { ProjectManagement } from '@/api';
import { TesterPath } from '@/router/paths';
const config = {
  state: {
    recentProjects: [],
    mainPage: '',
    configState: false
  },
  mutations: {
    GET_RECENT_PROJECT: (state, _this) => {
      ProjectManagement.list(
        {
          page: 1,
          perPage: 4,
          sortBy: 'visitAt',
          order: 'desc'
        },
        (error, data) => {
          if (error) {
            let message = '';
            if (error.response) {
              switch (error.response.status) {
                case 403:
                  message = 'message.not_tester';
                  break;
                case 404:
                  message = 'message.not_exits_or_not_owner';
                  break;
                case 409:
                  message = 'message.file_exist';
                  break;
                default:
                  message = 'message.500';
              }
            }
            _this.$message.error(message ? common.i18n(message) : error.message);
          } else {
            state.recentProjects = [];
            const tempData = data.data;
            if (tempData) {
              const projectList = tempData.projects;
              for (let i = 0; i < projectList.length; ++i) {
                state.recentProjects.push({
                  name: projectList[i].projectName,
                  url: TesterPath.VersionList.replace(':projectId', projectList[i].projectId),
                  projectId: projectList[i].projectId,
                  lastVersion: projectList[i].lastVersion || {}
                });
              }
            }
          }
        }
      );
    }
  },
  actions: {
    GET_RECENT_PROJECT: ({ commit }, _this) => {
      commit('GET_RECENT_PROJECT', _this);
    },
    SET_CONFIG_COM_STATUS: (state, licenseStatus) => {
      state.state.configState = licenseStatus;
    }
  }
};

export default config;
