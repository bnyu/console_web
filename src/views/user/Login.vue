<template>
    <div>
        <el-checkbox-group v-model="checkedPermits">
            <el-checkbox v-for="item in permits" :label="item" :key="item">{{item}}</el-checkbox>
        </el-checkbox-group>
        <el-button @click="login">{{$t('app.login')}}</el-button>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                checkedPermits : ['view_bulletin', 'post_bulletin', 'send_email', 'config_version', 'config_function', 'config_address', 'view_server_list', 'ecology', 'manage'],
                permits : ['view_bulletin', 'post_bulletin', 'send_email', 'config_version', 'config_function', 'config_address', 'view_server_list', 'ecology', 'manage'],
            }
        },
        methods: {
            login() {
                this.$store.commit('user/setPermits', this.checkedPermits)
                this.$store.commit('user/setToken', 'test')
                this.$router.push('/dashboard')
            }
        }
    }
</script>

<style scoped>

</style>
