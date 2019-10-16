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
        name: "Landing",
        data() {
            return {
                permits: ['view_bulletin', 'post_bulletin', 'send_email', 'config_version', 'config_function', 'config_address', 'view_server_list'],
                checkedPermits: []
            }
        },
        methods: {
            login() {
                this.$store.commit('user/setPermits', this.checkedPermits)
                this.$router.push('/all/dashboard')
            }
        }
    }
</script>

<style scoped>

</style>
