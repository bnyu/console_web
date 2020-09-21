<template>
  <ContentLayout :title="'app.menu.roleList'">
    <template #title>
      <el-button type="text" class="add-button" @click="toAddPage">
        {{ $t("app.act.addNew") }}
      </el-button>
    </template>
    <RoleList :page-size="pageSize" :current-page="currentPage"></RoleList>
    <Pager
      :page-size="pageSize"
      :current-page="currentPage"
      :total="total"
      @turn-page="turnPage"
    ></Pager>
  </ContentLayout>
</template>

<script>
import api from "@/api/modules/manager";
import ContentLayout from "@/views/layouts/ContentLayout";
import RoleList from "./components/RoleList";
import Pager from "./components/Pager";

export default {
  name: "roleManage",
  components: { Pager, RoleList, ContentLayout },
  data() {
    return {
      pageSize: 10,
      total: 0,
      currentPage: 0,
    };
  },
  methods: {
    toAddPage() {
      this.$router.push({ name: "role-add" }).then();
    },
    turnPage(page) {
      this.currentPage = page;
    },
    getTotalNum() {
      api
        .getRoleCount()
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
