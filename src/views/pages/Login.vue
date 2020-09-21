<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      label-position="left"
    >
      <el-form-item prop="username" class="form-line">
        <el-input
          class="login-input"
          ref="username"
          v-model="loginForm.username"
          :placeholder="$t('app.username')"
          :disabled="loading"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        ></el-input>
      </el-form-item>

      <el-form-item prop="password" class="form-line">
        <el-input
          class="login-input"
          ref="password"
          v-model="loginForm.password"
          :placeholder="$t('app.password')"
          :disabled="loading"
          name="password"
          type="password"
          tabindex="2"
          show-password
          @keyup.enter.native="handleLogin"
        ></el-input>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        class="login-button"
        @click.native.prevent="handleLogin"
      >
        {{ $t("app.user.login") }}
      </el-button>
    </el-form>
  </div>
</template>

<script>
import api from "@/api/modules/user";

export default {
  name: "Login",
  data() {
    return {
      from: this.$route.query.from,
      loginForm: {
        username: "",
        password: "",
      },
      loginRules: {
        username: [
          {
            required: true,
            trigger: "blur",
            message: this.$t("app.notice.inputUsername"),
          },
        ],
        password: [
          {
            required: true,
            trigger: "blur",
            message: this.$t("app.notice.inputPassword"),
          },
        ],
      },
      loading: false,
    };
  },
  methods: {
    login() {
      this.loading = true;
      const username = this.loginForm.username;
      const password = this.loginForm.password;
      api
        .login(username, password)
        .then((data) => {
          const uid = data.uid;
          const token = data.token;
          // const secure = data.secure
          const permitList = data.permits;
          this.$store.commit("user/login", {
            uid,
            username,
            token,
            permitList,
          });
          if (this.from) {
            this.$router.replace(this.from).then();
          } else {
            this.$router.replace("/").then();
          }
        })
        .catch(({ code, err }) => {
          if (code) {
            this.$message({
              message: this.$t("app.notice.wrongPassword"),
              type: "error",
              duration: 2000,
            });
          } else if (err) {
            this.$message({
              message: this.$t("app.notice.networkError"),
              type: "error",
              duration: 2000,
            });
          }
          this.loading = false;
        });
    },
    handleLogin() {
      this.$refs.loginForm.validate((v) => {
        if (v) {
          this.login();
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  position: fixed;
  display: flex;
  flex-direction: column;
  align-self: center;
  width: 100%;
  background-color: $second;
  overflow: hidden;
  top: 0;
  bottom: 0;

  .login-form {
    position: relative;
  }

  .login {
    &-input {
      display: inline-block;
      width: 100%;
    }

    &-form {
      position: relative;
      width: 500px;
      padding-top: 160px;
      margin: 0 auto;
      overflow: hidden;
    }

    &-button {
      width: 100%;
      margin-top: 10px;
    }
  }
}
</style>

<style lang="scss">
.login-container {
  .el-input__inner {
    background-color: #e4e7ed;
  }
}
</style>
