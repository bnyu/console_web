<template>
  <content-layout :title="'app.menu.userList'">
    <template #title>
      <el-button type="text" class="add-button" @click="toAddPage">
        {{ $t("app.act.addNew") }}
      </el-button>
    </template>
    <UserList :page-size="pageSize" :current-page="currentPage"></UserList>
    <Pager
      :page-size="pageSize"
      :current-page="currentPage"
      :total="total"
      @turn-page="turnPage"
    ></Pager>
  </content-layout>
</template>

<script>
import api from "@/api/modules/manager";
import UserList from "./components/UserList";
import Pager from "./components/Pager";

export default {
  name: "UserManage",
  components: { Pager, UserList },
  data() {
    return {
      pageSize: 10,
      total: 0,
      currentPage: 0,
    };
  },
  methods: {
    toAddPage() {
      this.$router.push({ name: "user-add" }).then();
    },
    turnPage(page) {
      this.currentPage = page;
    },
    getTotalNum() {
      api
        .getUserCount()
        .then((data) => {
          if (data > 0) {
            this.total = data;
          }
        })
        .catch(() => {
          this.$message({
            message: this.$t("app.notice.someError"),
            type: "error",
            duration: 1000,
          });
        });
    },
  },
  created() {
    this.getTotalNum();
  },
};
</script>

<style scoped lang="scss">
.add-button {
  padding: 4px 0 0;
}
</style>
