<template>
  <el-form label-position="left" label-width="120px">
    <el-form-item :label="$t('app.user.username')">
      <el-input size="small" v-model="name" disabled> </el-input>
    </el-form-item>
    <el-form-item :label="$t('app.user.permitList')" class="m-add-input">
      <el-checkbox-group v-model="checkedList" v-loading="loading">
        <div v-for="item in roleList" :key="item.role_id">
          <el-checkbox :label="item.role_id" class="role-name">{{
            item.role_name
          }}</el-checkbox>
          <div class="permit-list">
            <el-tag
              class="permit-tag"
              v-for="permit in item.permit_list"
              :key="permit"
              >{{ $t("permit." + permit) }}</el-tag
            >
          </div>
        </div>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item>
      <el-button
        size="small"
        type="primary"
        @click="handleSave"
        :disabled="loading"
        v-loading="loading"
      >
        {{ $t("app.act.save") }}
      </el-button>
      <el-button size="small" @click="handleBack" :disabled="loading">{{
        $t("app.act.back")
      }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import api from "@/api/modules/manager";

export default {
  name: "SetUserRole",
  components: {},
  props: {
    id: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      loading: false,
      name: "",
      checkedList: [],
      roleList: [],
    };
  },
  methods: {
    getUserInfo() {
      this.loading = true;
      api
        .getUserInfos(this.id - 1, this.id)
        .then((data) => {
          if (data.length === 1) {
            this.checkedList = data[0].role_list.map((item) => {
              return item.role_id;
            });
            this.name = data[0].username;
          } else {
            this.$message({
              message: this.$t("app.notice.userNotExist"),
              type: "error",
              duration: 1000,
            });
          }
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
          this.$message({
            message: this.$t("app.notice.someError"),
            type: "error",
            duration: 1000,
          });
        });
    },

    handleSave() {
      this.loading = true;
      api
        .updateUserRoles(this.id, this.checkedList)
        .then(() => {
          this.loading = false;
          this.$message({
            message: this.$t("app.notice.saveSuccess"),
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

    handleBack() {
      this.$router.go(-1);
    },

    getTotalNum() {
      api
        .getRoleCount()
        .then((data) => {
          if (data > 0) {
            this.getRoleList(0, data);
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

    getRoleList(offset, size) {
      this.loading = true;
      api
        .getRoleList(offset, size)
        .then((data) => {
          const size = data.length;
          if (size > 0) {
            const id0 = data[size - 1].role_id - 1;
            const id1 = data[0].role_id;
            for (let i = 0; i < data.length; i++) {
              data[i].loading = true;
              data[i].permit_list = [];
            }
            this.roleList = data;
            this.getRoles(id0, id1);
          } else {
            this.roleList = [];
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

    getRoles(id0, id1) {
      api
        .getRoleInfos(id0, id1)
        .then((data) => {
          for (let i = 0; i < data.length; i++) {
            data[i].loading = false;
          }
          this.roleList = data;
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
    this.getUserInfo();
    this.getTotalNum();
  },
};
</script>

<style scoped lang="scss">
.permit-tag {
  height: 20px;
  line-height: 20px;
  padding: 0 4px;
  margin-left: 8px;
}
.permit-list {
  margin-top: -18px;
  margin-left: 14px;
  margin-bottom: -12px;
}
.role-name {
  width: 100px;
  margin-right: 10px;
  overflow-wrap: break-spaces;
}
</style>
