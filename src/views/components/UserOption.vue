<template>
    <el-dropdown @command="to">
      <span class="el-dropdown-link">
          <slot></slot>
      </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-if="manager" command="/manage/user">{{$t('app.menu.manageUser')}}</el-dropdown-item>
            <el-dropdown-item command="logout">{{$t('app.logout')}}</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>
<script>
    export default {
        name: "UserOption",
        props: {
            manager: Boolean
        },
        methods: {
            to(path) {
                if (path === 'logout') {
                    this.$store.commit('user/logout')
                    this.$router.push('/')
                } else if (path !== this.$route.path) {
                    this.$router.push(path)
                }
            }
        }
    }
</script>

<style scoped>

</style>
