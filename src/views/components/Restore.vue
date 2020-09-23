<template>
  <div class="cc">
    <span class="cc-t"> {{ $t("app.act.loading") }}... </span>
  </div>
</template>

<script>
import api from "@/api/modules/user";

export default {
  name: "Restore",
  data() {
    return {
      temp: "/temp",
      path: this.$route.path,
      fullPath: this.$route.fullPath,
      uid: this.$store.getters["user/uid"],
      username: this.$store.getters["user/username"],
      token: this.$store.getters["user/token"],
    };
  },
  methods: {
    toLoginPage() {
      let query = {};
      if (this.path && this.path !== "/" && this.path !== this.temp) {
        query.from = this.fullPath;
      }
      this.$router.replace({ path: "/login", query: query }).then();
    },
    backPage() {
      const temp = this.temp;
      const enterPath = this.fullPath;
      if (enterPath !== temp) {
        //same router path but different component
        //go temp then back for refresh
        this.$router.replace(temp).then(() => {
          this.$router.replace(enterPath).then();
        });
      } else {
        this.$router.replace("/").then();
      }
    },
    getInfo() {
      api
        .getInfo(this.token)
        .then((data) => {
          const permitList = data.permits;
          const uid = data.uid;
          this.$store.commit("user/login", {
            uid,
            permitList,
            username: this.username,
            token: this.token,
          });
          this.backPage();
        })
        .catch(() => {
          this.toLoginPage();
        });
    },
  },
  created() {
    if (
      this.path !== this.temp &&
      this.uid === 0 &&
      this.username &&
      this.username.length > 0 &&
      this.token &&
      this.token.length > 0
    ) {
      this.getInfo();
    } else {
      this.toLoginPage();
    }
  },
};
</script>

<style scoped lang="scss">
.cc {
  position: fixed;
  flex-direction: column;
  background-color: $second-0;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  &-t {
    height: 40px;
    padding-top: 20px;
  }
}
</style>

<style lang="scss">
.cc {
  .el-loading-mask {
    background-color: transparent;
  }
}
</style>
