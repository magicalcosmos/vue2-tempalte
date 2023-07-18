<template>
  <header class="header">
    <ul class="header-list clearfix" v-if="isMenu">
      <li class="header-item product-name">
        <router-link to="/">
          <i class="iconfont icon-logo" style="color:white;"></i>
        </router-link>
      </li>
      <li class="header-item left-items">
        {{ void (project = recentProjects[0]) }}
        <r-menu router :default-active="$route.path" class="r-menu-rocket" mode="horizontal" @select="handleSelect">
          <!-- project management -->
          <r-submenu index="0" :showIconArrow='false' popper-class="header-popper-menu" v-auth="'admin&tester'">
           <template slot="title" ><span>{{ $t('project.project_management') }}</span></template>
            <!-- current project -->
           <r-menu-item-group class='border-bottom' v-if="project" :title="$t('profile.current_project')">
              <r-menu-item :index="recentProjects[0].url" :title="recentProjects[0].name"><i class='iconfont icon-item'></i><span>{{project.name}}</span></r-menu-item>
            </r-menu-item-group>
            <!-- recent project list -->
           <r-menu-item-group class='border-bottom' v-if="recentProjects.length > 1" :title="$t('profile.recent_project')">
              <r-menu-item v-for="(item, index) in recentProjects.slice(1)" :key="index"  :index="item.url" :title="recentProjects[index + 1].name"><i class='iconfont icon-item'></i><span>{{item.name}}</span></r-menu-item>
            </r-menu-item-group>
            <!-- project list -->
           <r-menu-item-group class='border-bottom' v-auth="'tester'" >
              <r-menu-item :index="$paths.TesterPath.ProjectList"><span>{{ $t('project.project_list') }}</span></r-menu-item>
            </r-menu-item-group>
            <!-- task monitor -->
            <r-menu-item-group :title="$t('profile.task_monitoring')" class="no-margin">
              <r-menu-item v-auth="'tester'" :index="$paths.TesterPath.MyTaskMonitorList"><span>{{$t('profile.my_task_monitoring')}}</span></r-menu-item>
              <r-menu-item v-auth="'admin'" :index="$paths.AdminPath.AllTaskMonitorList"><span>{{$t('profile.all_task_monitoring')}}</span></r-menu-item>
            </r-menu-item-group>
          </r-submenu>

          <!-- static analysis -->
          <r-submenu :showIconArrow='false' popper-class="header-popper-menu" v-auth="`tester_${VERSIONTYPE.STATIC_ANALYSIS}`" index="1">
            <template slot="title" ><span>{{ $t('static_analysis.name') }}</span></template>
            <r-menu-item v-if="isEmptyObject(project)" v-auth="'tester'" :index="$paths.TesterPath.AnalysisHome.replace(':projectId', project.projectId).replace(':versionId', project.lastVersion.versionId)"><span>{{ $t('static_analysis.home') }}</span></r-menu-item>
            <r-menu-item :index="$paths.TesterPath.DetectionTemplateList"><span>{{ $t('static_analysis.detection_template') }}</span></r-menu-item>
          </r-submenu>

          <!-- unit test -->
          <r-submenu :showIconArrow='false' popper-class="header-popper-menu" v-auth="`tester_admin_${VERSIONTYPE.UNIT_TEST}`" index="2">
            <template slot="title"> <span>{{ $t('profile.unit_test') }}</span></template>
            <r-menu-item v-if="isEmptyObject(project)" v-auth="'tester'" :index="$paths.TesterPath.ProjectMain.replace(':projectId', project.projectId).replace(':versionId', project.lastVersion.versionId)"><span>{{ $t('static_analysis.home') }}</span></r-menu-item>
            <r-menu-item v-else-if="isShow(project)" class="popper-menu-empty"><span>{{ $t('project.no_data') }}</span></r-menu-item>
            <r-menu-item v-auth="'admin'" :index="$paths.AdminPath.UserDefinedFieldsUnitTest.replace(':domain', VERSIONTYPE.UNIT_TEST)"><span>{{ $t('button.user_defined_fields') }}</span></r-menu-item>
          </r-submenu>

          <!-- integration test -->
          <r-submenu :showIconArrow='false' popper-class="header-popper-menu" v-auth="`tester_admin_${VERSIONTYPE.INTEGRATION_TEST}`" index="3">
<!--          <r-submenu :showIconArrow='false' popper-class="header-popper-menu" v-auth="`tester_${VERSIONTYPE.INTEGRATION_TEST}`" index="3">-->
            <template slot="title"> <span>{{ $t('project.hyper_test') }}</span></template>
            <r-menu-item v-if="isEmptyObject(project)" v-auth="`tester_${VERSIONTYPE.INTEGRATION_TEST}`" :index="$paths.TesterPath.IntegrationHome.replace(':projectId', project.projectId).replace(':versionId', project.lastVersion.versionId)"><span>{{ $t('static_analysis.home') }}</span></r-menu-item>
            <r-menu-item v-else-if="isShow(project)" class="popper-menu-empty"><span>{{ $t('project.no_data') }}</span></r-menu-item>
            <r-menu-item v-auth="'admin'" :index="$paths.AdminPath.UserDefinedFieldsIntegrationTest.replace(':domain', VERSIONTYPE.INTEGRATION_TEST)"><span>{{ $t('button.user_defined_fields') }}</span></r-menu-item>
          </r-submenu>

          <!-- system management -->
          <r-submenu :showIconArrow='false' popper-class="header-popper-menu" v-auth="'admin&testerManager'" index="4">
            <template slot="title"><span>{{ $t('profile.system_management') }}</span></template>
            <r-menu-item v-auth="'admin'" :index="$paths.AdminPath.UserList"><span>{{ $t('profile.user_management') }}</span></r-menu-item>
            <r-menu-item v-auth="'admin'" :index="$paths.AdminPath.License"><span>{{ $t('profile.license_management') }}</span></r-menu-item>
            <r-menu-item v-auth="'testerManager'" :index="$paths.TESTMANAGERPATH.TestDashboard"><span>{{ $t('profile.test_dashboard') }}</span></r-menu-item>
            <r-menu-item v-show='logGoOn' :index="$paths.AdminPath.LogView"><span>{{ $t('profile.system_log_view') }}</span></r-menu-item>
            <r-menu-item v-auth="'admin'" :index="$paths.AdminPath.CompileEnvList"><span>{{ $t('button.compiler_env') }}</span></r-menu-item>
            <r-menu-item v-auth="'admin'" :index="$paths.AdminPath.TestReportTemplate"><span>{{ $t('profile.report_template') }}</span></r-menu-item>
          </r-submenu>
        </r-menu>
      </li>
      <li class="header-item">
        <div class="license-expires-container" v-if="licenseExpireStauts && !closeTips">
          <svg class="icon icon-warning" aria-hidden="true">
            <use xlink:href="#icon-warning-tip"></use>
          </svg>
          <span class="license-expires-tips">{{ $t('license.license_expires_tips') }}</span>
          <i class="iconfont icon-icon-nopass icon-close-circle" @click="handleCloseTips"></i>
        </div>
        <div class="user-info">
          <r-menu :default-active="$route.path" class="r-menu-rocket" mode="horizontal" @select="handleSelect">
            <r-submenu class="help" index="/help">
              <template slot="title">
                <span class="name">{{ $t('help.name') }}</span>
                <span class="spacer"></span>
              </template>
              <r-menu-item class="help" :index="$paths.CommonPath.FAQ">
                <span>{{$t('help.faq')}}</span>
              </r-menu-item>
              <r-menu-item :index="$paths.CommonPath.Manual">
                <span>{{$t('help.manual')}}</span>
              </r-menu-item>
            </r-submenu>
            <r-submenu index="/users">
              <template slot="title">
                <i class="iconfont icon-user"/>
                {{ $store.getters.user.username }}
              </template>
              <r-menu-item :index="$paths.CommonPath.ChangePassword">
                  <i class="header-icon iconfont icon-alter" />{{ $t('user.modify_personal_information') }}
              </r-menu-item>
              <r-menu-item index="1">
                <i class="header-icon iconfont icon-quit" />{{ $t('login.logout') }}
              </r-menu-item>
              <r-menu-item @click="handleToVersion">
                <i class="header-icon iconfont icon-about" />{{ $t('profile.system_about') }}
              </r-menu-item>
            </r-submenu>
          </r-menu>
        </div>
      </li>
    </ul>

    <ul class="header-list clearfix header-padding" v-else>
      <span class="title-item" :class="subTitle.length ? 'header_title' : ''">{{ $t(`version.project_version_overview`) }}</span>
      <span v-if="subTitle.length">
        <span class="title-item" :class="i < subTitle.length - 1 ? 'header_title' : ''" v-for="(title, i) in subTitle">{{ title }}</span>
      </span>
    </ul>
    <alert :visible="isAlertVisible" :title="$t('dialog.tip')" :cancel="$t('button.sure')" @cancel="signOut">{{ $t('login.login_other_place') }}</alert>
    <floating-ball
      :visible="isFloatingBallVisible"
      :percentage="floatingBallPercentage"
      @click="goToTaskMonitorList"
    ></floating-ball>
  </header>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import LocalStorage from '@/utils/localStorage';
import API from '@/api/api';
import { ROLES, LOGIN, CMD, DOMAIN, VERSIONTYPE, LICENSEFUNC } from '@/utils/dict';
import common from '@/utils/common';
import { getTimezoneName } from '@/utils/time';
import language_list from '@/i18n/language_list';
import { UserInformation } from '@/api';
import { IKV, IFilter } from '@/interface';
import { ProjectManagement, ProjectVersionManagement } from '@/api';
import { FloatingBall } from '@/components';
import { Alert } from '@/views/components';
import { log } from 'console';
import { Log } from '@/utils';

@Component({
  components: {
    Alert,
    FloatingBall
  }
})
class Header extends Vue {
  private lang: string = '';
  private subTitle: string[] = [];
  private isMenu: boolean = true;
  private options: Object = language_list;
  private isAlertVisible: boolean = false;
  private ROLES: Object = ROLES;
  private VERSIONTYPE: Object = VERSIONTYPE;

  /**
   * 菜单导航页
   */
  private menuNavPages = {
    [common.i18n('project.project_management')]: ['VersionList', 'ProjectList', 'MyTaskMonitorList', 'AllTaskMonitorList'],
    [common.i18n('static_analysis.name')]: ['AnalysisHome', 'DetectionTemplateList'],
    [common.i18n('profile.unit_test')]: ['ProjectMain', 'UserDefinedFieldsUnitTest'],
    [common.i18n('project.hyper_test')]: ['IntegrationHome', 'UserDefinedFieldsIntegrationTest'],
    [common.i18n('profile.system_management')]: ['UserList', 'License', 'TestDashboard', 'TestReportTemplate', 'CompileEnvList']
  };

  get licenseExpireStauts() {
    const licenseStatus = this.$store.getters.licenseStatus;
    const license = licenseStatus.license;
    const modules = license && license.modules;
    const staticAnalyze = modules && modules[LICENSEFUNC.STATICANALYZE];
    const unitTest = modules && modules[LICENSEFUNC.UNITTEST];
    const integrationTest = modules && modules[LICENSEFUNC.INTEGRATION_TEST];
    return staticAnalyze && staticAnalyze.status === 5 || unitTest && unitTest.status === 5 || integrationTest && integrationTest.status === 5;
  }
  get closeTips() {
    return this.$store.getters.closeTips;
  }
  get recentProjects() {
    // 返回最近使用项目并监听
    return this.$store.state.project.recentProjects;
  }
  get floatingBallPercentage() {
    return this.$store.state.progress.percentage;
  }
  get isFloatingBallVisible() {
    return this.$store.state.progress.visible;
  }
  get activeComponentName() {
    return this.$store.state.catchComponents.activeComponentName;
  }
  get logGoOn() {
    return Log.getLogLevel();
  }
  @Watch('activeComponentName')
  getActiveComponentName(newValue, oldValue) {
    this.switchStyle(newValue);
  }
  @Watch('$route')
  handleRoute(to) {
    this.$store.commit('SET_ACTIVE_COMPONENT_NAME', to.name);
  }
  @Watch('lang')
  getLang(value: string): void {
    this.handleLang(value);
  }
  // 监听页面路由的变化
  @Watch('$route.path')
  getRouter(data) {
    this.observeRouter(data);
  }
  observeRouter(data) {
    this.isMenu = true;
    if (data.indexOf('overview_info') !== -1) {
      const type = this.$route.params.type;
      this.isMenu = false;
      if (type) {
        const types = type.split('_');
        this.subTitle = [];
        for (let i = 0; i < types.length; i++) {
          this.subTitle.push(common.i18n(`version.${types[i]}_file_list`));
        }
      }
    } else if (data.indexOf('static_analysis_overview') !== -1) {
      this.isMenu = false;
    }
  }
  handleSelect(path: string) {
    if (!path) {
      return;
    }
    switch (path) {
      case this.$paths.CommonPath.FAQ:
      case this.$paths.CommonPath.Manual:
        window.open(`${path}`);
        break;
      default:
        if (path.indexOf('/') > -1) {
          this.$router.push({
            path: path
          });
        } else {
          this.signOut();
        }
    }
  }
  /**
   * 顶部导航栏活动状态时的样式
   * @date 2021-09-24
   * @param {String} name 组件名
   */
  switchStyle(name) {
    const submenuEles = document.querySelectorAll('.header-item.left-items .r-menu-rocket .r-submenu');
    if (submenuEles) {
      for (let i = 0; i < submenuEles.length; i++) {
        const submenuEle: any = submenuEles[i];
        const innerText = submenuEle.innerText;
        submenuEle.style.fontWeight = '';
        if (this.menuNavPages[innerText] && this.menuNavPages[innerText].includes(name)) {
          submenuEle.style.fontWeight = 900;
        }
      }
    }
  }
  handleUnit() {
    this.$router.push({
      path: this.$paths.TesterPath.ProjectList
    });
  }

  handleLang(customLang?: string): void {
    // this.lang = customLang || LocalStorage.getLang() || getTimezoneName() || 'zh-CN';
    // const formateLang = this.lang.replace('-', '_');
    // this.$i18n.locale = formateLang;
    // const langObject: IKV = {
    //   key: LOGIN.LANG,
    //   value: formateLang
    // };
    // LocalStorage.set(langObject);
    // UserInformation.edit(formateLang);
  }
  get webSocketMessage(): any {
    return this.$store.getters.rWebSocket.webSocketMessage;
  }
  @Watch('webSocketMessage')
  getWebSocketMessage(data) {
    if (data.code === CMD.CLOSE) {
      this.$alert(common.i18n('login.login_other_place'), common.i18n('dialog.tip')).then(() => {
        this.signOut();
      });
    }
    switch (data.cmd) {
      case CMD.UPDATE:
        if (data.domain === DOMAIN.USER) {
          if (data.data.username === this.$store.getters.user.username) {
            window.location.reload();
          }
        }
        break;
      default:
    }
  }
  handleToVersion() {
    const { href } = this.$router.resolve({
      //path: '/version_info'
      path: this.$paths.CommonPath.VersionInfo
    });
    window.open(href);
  }
  created() {
    this.handleLang();
  }
  /**
   * 退出登录
   */
  signOut() {
    common.signOut();
  }
  beforeDestroy() {
    const that: any = this;
    that.$ws.unsubscribe(`tester/${this.$store.state.user.userId}`);
  }
  goToTaskMonitorList() {
    this.$router.push({ path: this.$paths.TesterPath.MyTaskMonitorList });
  }
  /**
   * 测试人员+管理员，没有项目，下拉列表显示“编译环境，函数/用例信息，测试报告模版”，
   * 有项目，下拉列表有显示“测试主页，编译环境，函数/用例信息，测试报告模版”
   * @date 2021-09-13
   * @param {any} project
   * @returns {Boolean}
   */
  isShow(project) {
    const state = this.$store.state;
    const admin = state.user.privilege['admin'];
    const tester = state.user.privilege['tester'];
    return !project && (tester && !admin);
  }
  /**
   * 判断当前项目是否是一个空项目
   * @date 2021-11-09
   * @param {any} obj
   * @return {any}
   */
  isEmptyObject(obj) {
    return obj && obj.lastVersion && obj.lastVersion.versionId;
  }

  /**
   * 关闭许可证到期提示
   * @date 2021-12-28
   */
  handleCloseTips() {
    this.$store.commit('setCloseTips', 1);
  }

  mounted() {
    this.observeRouter(this.$route.path);
    this.switchStyle(this.$route.name);
    if (this.$store.state && this.$store.state.user && (this.$store.state.user.role & ROLES.TESTER) > 0) {
      // reload header item again
      this.$store.dispatch('GET_RECENT_PROJECT', this);
    }
    const that: any = this;
    that.$ws.connect({
      callback: () => {
        // that.$ws.subscribe(`tester/${this.$store.state.user.userId}`);
        // if (this.$store.state && this.$store.state.user) {
        //   that.$ws.subscribe(`tester/${this.$store.state.user.userId}`);
        // } else {
        //   console.trace('can not find user');
        // }
      }
    });
  }
}
export default Header;
</script>
