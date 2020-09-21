<template>
  <el-pagination
    v-if="total > 0"
    v-show="total > pageSize"
    class="m-pager"
    small
    layout="prev, pager, next"
    :page-size="pageSize"
    :pager-count="5"
    @size-change="handlePageChange"
    @current-change="handlePageChange"
    :current-page="currentPage"
    :total="total"
  >
  </el-pagination>
</template>

<script>
export default {
  name: "Pager",
  props: {
    total: {
      type: Number,
      default: 0,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
  },
  methods: {
    handlePageChange(page) {
      this.$router
        .push({ query: { page: page } })
        .then(this.$emit("turn-page", page));
    },
  },
  created() {
    const p = this.$route.query.page;
    let page = 1;
    if (p && p.length > 0) {
      page = parseInt(p, 10);
    }
    this.$emit("turn-page", page);
  },
};
</script>

<style lang="scss">
.m-pager {
  .el-pager li {
    background-color: transparent;
  }

  .btn-prev,
  .btn-next,
  .button,
  button:disabled {
    background-color: transparent;
  }
}
</style>

<style scoped lang="scss">
.m-pager {
  align-self: flex-end;
  padding-top: 25px;
  min-width: 210px;
}
</style>
