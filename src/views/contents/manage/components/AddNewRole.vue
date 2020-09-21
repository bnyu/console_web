<template>
  <el-form
    label-position="left"
    label-width="120px"
    :model="form"
    ref="form"
    :rules="rules"
  >
    <el-form-item prop="name" class="m-add-input">
      <template slot="label">
        <span
          v-loading="searching"
          :element-loading-spinner="'el-icon-loading'"
        >
          {{ $t("app.user.roleName") }}
        </span>
      </template>
      <el-input
        size="small"
        v-model="form.name"
        autocomplete="off"
        :placeholder="$t('app.notice.inputRoleName')"
        :disabled="searching || loading"
      >
      </el-input>
    </el-form-item>
    <el-form-item
      prop="permits"
      :label="$t('app.user.permitList')"
      class="m-add-input"
    >
      <el-checkbox-group
        v-model="form.permits"
        size="small"
        class="permit-list"
      >
        <el-checkbox
          v-for="item in permitList"
          :key="item"
          :label="item"
          border
          class="permit-key"
        >
          {{ $t("permit." + item) }}
        </el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item>
      <el-button
        size="small"
        type="primary"
        @click="handleAddNewRole"
        :disabled="searching"
        v-loading="loading"
      >
        {{ $t("app.act.confirm") }}
      </el-button>
      <el-button
        size="small"
        @click="handleBack"
        :disabled="searching || loading"
        >{{ $t("app.act.back") }}
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import permitList from "@/router/permit_list/index";
import api from "@/api/modules/manager";

export default {
  name: "AddNewRole",
  data() {
    const validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("app.notice.inputRoleName")));
      } else {
        this.searchRole(value, callback);
      }
    };
    const validatePermitList = (rule, value, callback) => {
      if (value.length === 0) {
        callback(new Error(this.$t("app.notice.selectPermits")));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      searching: false,
      form: {
        name: "",
        permits: [],
      },
      permitList: permitList,
      rules: {
        name: [{ required: true, validator: validateName, trigger: "blur" }],
        permits: [{ required: true, validator: validatePermitList }],
      },
    };
  },
  methods: {
    handleBack() {
      this.$router.go(-1);
    },
    searchRole(name, callback) {
      if (!this.loading) {
        this.searching = true;
      }
      api
        .searchRole(name)
        .then((data) => {
          if (data.length > 0) {
            callback(new Error(this.$t("app.notice.roleAlreadyExist")));
          } else {
            callback();
          }
          this.searching = false;
        })
        .catch(({ error }) => {
          if (error) {
            callback(new Error(this.$t("app.notice.someError")));
          } else {
            callback();
          }
          this.searching = false;
        });
    },
    handleAddNewRole() {
      this.loading = true;
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.addNewRole(this.form.name, this.form.permits);
        } else {
          this.loading = false;
        }
      });
    },
    addNewRole(name, permits) {
      api
        .addRole(name)
        .then((data) => {
          api
            .updateRolePermits(data.role_id, permits)
            .then(() => {
              this.loading = false;
              this.$message({
                message: this.$t("app.notice.addNewRoleSuccess"),
                type: "success",
                duration: 1000,
              });
            })
            .catch(() => {
              this.loading = false;
              this.$message({
                message: this.$t("app.notice.someError"),
                type: "error",
                duration: 1000,
              });
            });
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
  },
};
</script>

<style scoped lang="scss">
.el-form-item__label {
  width: 600px;
}
.el-checkbox {
  margin-right: 3px;
}
</style>
