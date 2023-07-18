<template>
  <div class="login">
    <div class="login-container m-auto d-flex align-items-center">
      <r-form
        class="login-form"
        autocomplete="on"
        :model="loginForm"
        :rules="loginRules"
        ref="loginForm"
        label-position="left"
      >
        <h3 class="title text-left">{{ $t('login.login') }} {{ config.productName }}</h3>
        <r-form-item prop="username">
          <r-input
            height="32"
            :placeholder="$t('login.username_placeholder')"
            v-model="loginForm.username"
          >
            <i class="icon iconfont icon-username" slot="prefix"></i>
          </r-input>
        </r-form-item>
        <r-form-item prop="password">
          <r-input
            height="32"
            id="pwdInput"
            name="password"
            :type="pwdType"
            v-model="loginForm.password"
            autocomplete="on"
            :placeholder="$t('login.password_placeholder')"
          >
            <i class="icon iconfont icon-password" slot="prefix"></i>
          </r-input>
          <span class="show-pwd" @click="showPwd">
            <i class="icon iconfont" v-if="pwdType == ''"></i>
            <i class="icon iconfont" v-if="pwdType != ''"></i>
          </span>
        </r-form-item>
        <r-form-item class="login-button">
          <r-button
            class="locked-size"
            id="submitBtn"
            height="32"
            width="100%"
            type="primary"
            :loading="loading"
            @click.native.prevent="handleLogin"
            >{{ $t('login.login') }}</r-button
          >
        </r-form-item>
      </r-form>
    </div>
  </div>
  <!-- <r-select class="lang-select" v-model="lang" :placeholder="$t('login.lang_placeholder')">
    <r-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </r-option>
  </r-select> -->
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Mixins } from 'vue-property-decorator';
import { ROLES, LOGIN } from '@/utils/dict';
import common from '@/utils/common';
import LocalStorage from '@/utils/localStorage';
import { Authorization, UserInformation } from '@/api';
import { getTimezoneName } from '@/utils/time';
import { IUserInfo, ILoginParamsValidate, IKV } from '@/interface';
import language_list from '@/i18n/language_list';
import config from '../../package.json';
import PreventBrowserBack from '@/views/components/mixins/preventBrowserBack';
import axios from 'axios';
@Component
class Login extends Mixins(PreventBrowserBack) {
  private lang: string = '';
  private loading: boolean = false;
  private pwdType: string = LOGIN.PASSWORD;
  private eyeType: string = 'eye';
  private userForm: Object = {};
  private options: Object = language_list;
  private loginForm: IUserInfo = {
    username: '',
    password: ''
  };

  private loginRules: ILoginParamsValidate = {
    username: [{ required: true, trigger: 'blur', validator: this.validate.bind(this, LOGIN.USERNAME) }],
    password: [{ required: true, trigger: 'blur', validator: this.validate.bind(this, LOGIN.PASSWORD) }]
  };
  private config: any = config;

  @Watch('lang')
  getLang(value: string): void {
    this.handleLang(value);
  }

  collectionPanGuInfo(url, uid) {
    if (url && uid) {
      axios.post(url, {
        data: uid
      });
    }
  }

  handleLang(customLang?: string): void {
    this.lang = customLang || LocalStorage.getLang() || getTimezoneName() || 'zh-CN';
    const formateLang = this.lang.replace('_', '-');
    this.$i18n.locale = formateLang;
    const langObject: IKV = {
      key: LOGIN.LANG,
      value: formateLang
    };
    LocalStorage.set(langObject);
  }
  // 查看用户状态
  checkUserStatus(): void {
    // if user had login ,then turn to index page
  }
  /**
   * 密码明文切换
   */
  showPwd(): void {
    let pwdType = LOGIN.PASSWORD;
    let eyeType = 'eye-open';
    if (this.pwdType === LOGIN.PASSWORD) {
      pwdType = '';
      eyeType = 'eye';
    }
    this.pwdType = pwdType;
    this.eyeType = eyeType;
  }

  validate(type: string, rule: object, value: string, callback: Function) {
    const message = 'login.' + (type === LOGIN.USERNAME ? 'account_rule' : 'password_rule');
    if ((type === LOGIN.USERNAME && value.length < 1) || (type === LOGIN.PASSWORD && value.length < 1)) {
      callback(new Error(common.i18n(message)));
    } else {
      callback();
    }
  }
  // 登录
  handleLogin(): void {
    const form: any = this.$refs.loginForm;
    form.validate(valid => {
      if (valid) {
        this.loading = true;
        Authorization.Login(this.loginForm, (error, data) => {
          this.loading = false;
          if (error) {
            let message = '';
            if (error.response) {
              switch (error.response.status) {
                case 401:
                  message = 'login.login_error';
                  break;
                default:
                  message = 'login.not_exits_user_error';
                  this.$message.warning(common.i18n('login.not_exits_user_error'));
              }
            }
            this.$message.warning(message ? common.i18n(message) : error.message);
          } else {
            this.$message.success(common.i18n('login.success'));
            const tokenObject: IKV = {
              key: LOGIN.TOKEN,
              value: data.data.accessToken
            };
            LocalStorage.set(tokenObject);
            // 登录时显示许可证到期提示 2021-12-28
            this.$store.commit('setCloseTips', 0);
            if (LocalStorage.get(LOGIN.LANG)) {
              UserInformation.edit(LocalStorage.get(LOGIN.LANG)).then(() => {
                this.getUserInformation();
              });
            } else {
              this.getUserInformation();
            }
            this.collectionPanGuInfo(data.data.url, data.data.uid);
          }
        });
      } else {
        this.loading = false;
        return false;
      }
    });
  }

  /** 获取用户信息 */
  getUserInformation() {
    common
      .getUserInformation()
      .then((data: any) => {
        this.goHomeRouter(data);
      })
      .catch(error => {
        this.$log.error(error);
        if (error.response.status === 404 || error.response.status === 500) {
          this.$router.push({ path: this.$paths.CommonPath.InvalidLicense });
        }
      });
  }

  goHomeRouter(data: any) {
    let path = this.$paths.AdminPath.UserList;
    const role = this.$store.getters.user.role;
    if ((role & ROLES.TESTER) > 0) {
      path = this.$paths.TesterPath.ProjectList;
    } else if ((role & ROLES.ADMIN) > 0) {
      path = this.$paths.AdminPath.UserList;
    } else if ((role & ROLES.TESTERMANAGER) > 0) {
      path = this.$paths.TESTMANAGERPATH.TestDashboard;
    }
    this.$router.push({
      path: path,
      query: {
        currentPath: path
      }
    });
  }

  // 绑定回车事件
  bindEnter(): void {
    document.onkeydown = function(e: KeyboardEvent) {
      // 兼容FF和IE和Opera
      var code = e.keyCode || e.which || e.charCode;
      if (code === 13) {
        var submitBtn = document.getElementById('submitBtn');
        submitBtn && submitBtn.click();
      }
    };
  }

  created() {
    this.handleLang();
  }

  mounted() {
    this.bindEnter();
    this.checkUserStatus();
    this.preventBack();
  }
}
export default Login;
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

.r-input {
  font-size: 12px;
  color: $font-color-important !important;
}
.login {
  /*background-image: url("/img/404.png");*/
}
.login-container {
  background-image: url('../../static/img/icon_background.svg');
  background-repeat: no-repeat;
  background-size: cover;
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-button button {
    width: 100%;
  }

  .login-form {
    background-color: rgba(255, 255, 255, 0.2);
    position: absolute;
    left: 0;
    right: 0;
    width: 390px;
    padding: 0 18px;
    margin: auto 180px;
    border-radius: 10px;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;

    &_login {
      font-size: 20px;
    }
  }

  .title {
    font-size: 20px;
    font-weight: bold;
    color: $font-color-important;
    margin: 22px 0;
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 3px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .icon-username,
  .icon-password {
    padding-left: 6px;
    position: relative;
    top: -1px;
  }
}
</style>
