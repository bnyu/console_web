<template>
    <el-dropdown @command="to">
      <span class="el-dropdown-link">
          <slot></slot>
      </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="/user/change-password">{{$t('app.user.changePassword')}}</el-dropdown-item>
            <el-dropdown-item command="/user/logout">{{$t('app.user.logout')}}</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>
<script>
    export default {
        name: "UserOption",
        props: {
            manager: Boolean,
        },
        methods: {
            to(path) {
                if (path !== this.$route.path) {
                    this.$router.push(path).then()
                }
            }
        }
    }
</script>

<style scoped>

</style>
