<template>
    <el-dropdown>
      <span class="el-dropdown-link">
          <slot></slot>
      </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>{{$t('app.logout')}}</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>
<script>
    export default {
        name: "UserOption"
    }
</script>

<style scoped>

</style>
