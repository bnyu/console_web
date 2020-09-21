<template>
  <ContentLayout v-bind:title="'app.menu.changePassword'">
    <el-form
      label-position="right"
      label-width="80px"
      :model="form"
      ref="form"
      :rules="rules"
    >
      <el-form-item
        :label="$t('app.user.password')"
        prop="password"
        class="pw-input"
      >
        <el-input
          size="small"
          v-model="form.password"
          autocomplete="off"
          type="password"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item
        :label="$t('app.user.newPassword')"
        prop="newPassword"
        class="pw-input"
      >
        <el-input
          size="small"
          v-model="form.newPassword"
          autocomplete="off"
          type="password"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item
        :label="$t('app.user.newPassword')"
        prop="repeatNewPassword"
        class="pw-input"
      >
        <el-input
          size="small"
          v-model="form.repeatNewPassword"
          autocomplete="off"
          type="password"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" @click="handleChangePassword">{{
          $t("app.act.confirm")
        }}</el-button>
      </el-form-item>
    </el-form>
  </ContentLayout>
</template>

<script>
import api from "@/api/modules/user";
import ContentLayout from "@/views/layouts/ContentLayout";

export default {
  name: "ChangePassword",
  components: { ContentLayout },
  data() {
    const validatePass1 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("app.notice.inputNewPassword")));
      } else if (value === this.form.password) {
        callback(new Error(this.$t("app.notice.passwordNotChange")));
      } else if (value.length < 6 || value.length > 64) {
        callback(new Error(this.$t("app.notice.passwordIllegal")));
      } else {
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("app.notice.repeatNewPassword")));
      } else if (value !== this.form.newPassword) {
        callback(new Error(this.$t("app.notice.newPasswordNotSame")));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      form: {
        password: "",
        newPassword: "",
        repeatNewPassword: "",
      },
      rules: {
        password: [
          {
            required: true,
            message: this.$t("app.notice.inputOldPassword"),
            trigger: "blur",
          },
        ],
        newPassword: [
          { required: true, validator: validatePass1, trigger: "blur" },
        ],
        repeatNewPassword: [
          { required: true, validator: validatePass2, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    handleLogout() {
      this.loading = true;
      api
        .logout()
        .then(() => {
          this.$store.commit("user/logout");
          this.$router.push("/").then();
        })
        .catch(() => {
          this.$store.commit("user/logout");
          this.$router.push("/").then();
        });
    },
    handleChangePassword() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.changePassword(this.form.password, this.form.newPassword);
        }
      });
    },
    changePassword(password, newPassword) {
      this.loading = true;
      api
        .changePassword(password, newPassword)
        .then(() => {
          this.$store.commit("user/setSecure", true);
          this.loading = false;
          this.form.password = "";
          this.form.newPassword = "";
          this.form.repeatNewPassword = "";
          this.$message({
            message: this.$t("app.notice.changePasswordSuccess"),
            type: "success",
            duration: 1000,
          });
        })
        .catch(() => {
          this.loading = false;
          this.form.password = "";
          this.form.newPassword = "";
          this.form.repeatNewPassword = "";
          this.$message({
            message: this.$t("app.notice.someError"),
            type: "error",
            duration: 1000,
          });
        });
    },
  },
};
</script>

<style scoped lang="scss">
.pw-input {
  padding-top: 4px;
  max-width: 500px;
}
</style>
