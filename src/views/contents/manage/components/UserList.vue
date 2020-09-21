<template>
  <el-table :data="userList" v-loading="loading" class="m-content">
    <el-table-column
      :label="$t('app.user.username')"
      prop="username"
      width="160"
    >
      <template v-slot="s">
        <div class="username">
          {{ s.row.username }}
        </div>
      </template>
    </el-table-column>
    <el-table-column :label="$t('app.user.roleList')">
      <template v-slot="s">
        <span v-loading="s.row.loading">
          <el-tag
            v-for="item in s.row.role_list"
            :key="item.role_id"
            class="role-tag"
            disable-transitions
          >
            {{ item.role_name }}
          </el-tag>
        </span>
      </template>
    </el-table-column>
    <el-table-column :label="$t('app.act.operation')" width="220">
      <template v-slot="s">
        <span>
          <el-button
            @click="() => handleEdit(s.row)"
            :disabled="s.row.loading"
            type="text"
            icon="el-icon-edit-outline"
            size="small"
          >
            {{ $t("app.act.edit") }} </el-button
          >&nbsp;
          <el-button
            v-if="uid !== s.row.user_id"
            @click="() => handleDelete(s.row)"
            :disabled="s.row.loading"
            type="text"
            icon="el-icon-delete"
            size="small"
          >
            {{ $t("app.act.delete") }}
          </el-button>
        </span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import api from "@/api/modules/manager";

export default {
  name: "UserList",
  props: {
    pageSize: {
      type: Number,
      default: 10,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      uid: this.$store.getters["user/uid"],
      loading: false,
      userList: [],
      dataVer: 0,
    };
  },
  methods: {
    getUserList() {
      this.loading = true;
      api
        .getUserList((this.currentPage - 1) * this.pageSize, this.pageSize)
        .then((data) => {
          const size = data.length;
          if (size > 0) {
            const id0 = data[size - 1].user_id - 1;
            const id1 = data[0].user_id;
            for (let i = 0; i < data.length; i++) {
              data[i].loading = true;
              data[i].role_list = [];
            }
            this.userList = data;
            this.loading = false;
            this.getUsers(id0, id1);
          } else {
            this.userList = [];
          }
          this.loading = false;
        })
        .catch(() => {
          this.$message({
            message: this.$t("app.notice.someError"),
            type: "error",
            duration: 1000,
          });
          this.loading = false;
        });
    },

    getUsers(id0, id1) {
      const dataVer = ++this.dataVer;
      api
        .getUserInfos(id0, id1)
        .then((data) => {
          if (dataVer === this.dataVer) {
            for (let i = 0; i < data.length; i++) {
              data[i].loading = false;
            }
            this.userList = data;
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

    handleEdit(row) {
      this.$router
        .push({ name: "user-edit", params: { id: row.user_id } })
        .then();
    },

    handleDelete(row) {
      this.$confirm(
        this.$t("app.notice.actCanNotUndo"),
        this.$t("app.act.delete") + " " + row.username,
        {
          confirmButtonText: this.$t("app.act.confirm"),
          cancelButtonText: this.$t("app.act.cancel"),
          type: "warning",
        }
      )
        .then(() => {
          this.deleteUser(row);
        })
        .catch(() => {});
    },

    deleteUser(row) {
      row.loading = true;
      api
        .deleteUser(row.user_id)
        .then(() => {
          let index = -1;
          for (let i = 0; i < this.userList.length; i++) {
            if (this.userList[i].user_id === row.user_id) {
              index = i;
              break;
            }
          }
          if (index >= 0) {
            this.userList.splice(index, 1);
          }
          this.$emit("del-one");
          this.$message({
            message: this.$t("app.notice.deleteUserSuccess"),
            type: "success",
            duration: 1000,
          });
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
  watch: {
    currentPage: function () {
      this.getUserList();
    },
    pageSize: function () {
      this.getUserList();
    },
  },
};
</script>

<style scoped lang="scss">
.m-content {
  .role-tag {
    margin-left: 4px;
    margin-bottom: 2px;
  }

  .username {
    padding-top: 5px;
  }
}
</style>

<style lang="scss">
.m-content {
  .el-table__row td {
    vertical-align: top !important;
  }

  .el-button > span {
    margin-left: 0 !important;
  }
}
</style>
