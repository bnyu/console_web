<template>
    <el-dropdown @command="to">
      <span class="el-dropdown-link">
          <slot></slot>
      </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-if="permits&&permits.manage" command="/manage/user">{{$t('app.manageUser')}}</el-dropdown-item>
            <el-dropdown-item command="logout">{{$t('app.logout')}}</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>
<script>
    export default {
        name: "UserOption",
        data() {
            return {
                permits: this.$store.getters['user/permits']
            }
        },
        methods: {
            to(path) {
                if (path === 'logout') {
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
