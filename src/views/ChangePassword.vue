<template>
  <div class="w-100 change-password">
    <div class="change-password-header">
      <div class="title big-banner">
        {{ $t('user.change_password') }}
      </div>
    </div>
    <div class="bg-main change-password-content">
      <div class="container bg-white my-4 change-password-container">
        <div class="text-center" style="width: 500px; min-height: 500px; margin-left: auto; margin-right: auto">
          <r-form ref="ruleForm" class="change-password-form" :model="userForm" :rules="userRule" label-width="120px">
            <r-form-item :label="$t('profile.username')" prop="username">
              <div class="username">{{ username }}</div>
            </r-form-item>
            <template v-if="true">
              <r-form-item :label="$t('profile.old_password')" prop="password">
                <r-input
                  height="40"
                  type="password"
                  v-model="userForm.password"
                  class="form-input"
                  :placeholder="$t('profile.please_enter_a_old_password')"
                ></r-input>
              </r-form-item>
              <r-form-item :label="$t('profile.new_password')" prop="newPassword">
                <r-input
                  height="40"
                  type="password"
                  v-model="userForm.newPassword"
                  class="form-input"
                  :placeholder="$t('profile.please_enter_a_new_password')"
                  @input="handleInput"
                ></r-input>
              </r-form-item>
              <r-form-item :label="$t('profile.confirm_password')" prop="againPassword">
                <r-input
                  height="40"
                  type="password"
                  v-model="userForm.againPassword"
                  class="form-input"
                  :placeholder="$t('profile.please_enter_your_new_password_again')"
                ></r-input>
              </r-form-item>
            </template>
          </r-form>
          <div class="mt-4">
            <r-button class="locked-size" width="120" height="32" @click="onClickCancel()">
              {{ $t('profile.cancel') }}
            </r-button>
            <r-button
              :loading="loading"
              class="locked-size save-button"
              type="primary"
              width="120"
              height="32"
              @click="onClickSave()"
            >
              {{ $t('profile.determine') }}
            </r-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import API from '@/api/api';
import { setUsername } from '@/utils/auth';
import common from '@/utils/common';
import userInformation from '@/api/userInformation';
@Component
class ChangePassword extends Vue {
  private username: string = this.$store.getters.user.username;
  private userForm: any = {
    password: '',
    newPassword: '',
    againPassword: ''
  };
  private userRule: Object = {};
  private loading: boolean = false;
  private btnName: string = common.i18n('user.change_password');
  handleInput(data: any) {
    this.userForm.newPassword = data.trimAll();
    this.$forceUpdate();
  }

  /**
   * 验证密码
   */
  validate() {
    if (!this.userForm.password) {
      this.$message.error(this.$t('profile.old_password_not_empty').toString());
      return false;
    }

    if (this.userForm.password.length < 6) {
      this.$message.error(this.$t('user.password_rule_message').toString());
      return false;
    }

    if (!this.userForm.newPassword) {
      this.$message.error(this.$t('profile.new_password_not_empty').toString());
      return false;
    }

    if (this.userForm.newPassword.length < 6) {
      this.$message.error(this.$t('user.password_rule_message').toString());
      return false;
    }

    if (this.userForm.newPassword !== this.userForm.againPassword) {
      this.$message.error(this.$t('profile.not_match_password').toString());
      return false;
    }
    return true;
  }

  onClickSave() {
    if (!this.validate()) {
      return;
    }
    this.loading = true;
    userInformation.changePassword(this.userForm.password, this.userForm.newPassword, (error, data) => {
      this.loading = false;
      if (error) {
        let errorMessage = '';
        switch (error.response.status) {
          case 400:
            errorMessage = 'old_password_incorrect';
            break;
          case 416:
            errorMessage = 'oldnew_password_notsame';
            break;
        }
        this['$message'].error(common.i18n(`profile.${errorMessage}`));
      } else {
        this['$message'].success(common.i18n('profile.change_succeed'));
        this.onClickCancel();
      }
    });
  }

  onClickCancel() {
    this.$router.go(-1);
  }

  mounted() {}
}
export default ChangePassword;
</script>
<style lang="sass" scoped>
.change-password-header {
  background-color: #fff;
  border-bottom: 1px solid #dee2e6 !important;
}
</style>
