<template>
    <div>
        <el-dropdown @command="to">
            <span>
                <slot></slot>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="manager">
                    <span>{{$t('app.user.manage')}}</span>
                </el-dropdown-item>
                <el-dropdown-item command="user">
                    <span>{{$t('app.user.info')}}</span>
                </el-dropdown-item>
                <el-dropdown-item command="logout">
                    <span>{{$t('app.user.logout')}}</span>
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <el-dialog
                v-loading="loading"
                :title="$t('app.user.logout')"
                :visible.sync="logoutVisible"
                width="30%"
                :append-to-body="true"
        >
            <span>{{$t('app.user.logout')}}</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="logoutVisible = false">{{$t('app.act.cancel')}}</el-button>
                <el-button type="primary" @click="handleLogout">{{$t('app.act.confirm')}}</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import api from '@/api/modules/user'

    export default {
        name: "UserOption",
        data() {
            return {
                loading: false,
                logoutVisible: false,
            }
        },
        methods: {
            to(command) {
                if (command === 'logout') {
                    this.logoutVisible = true
                } else {
                    this.$router.push('/' + command).then()
                }
            },
            handleLogout() {
                this.loading = true
                api.logout().then(() => {
                        this.$store.commit('user/logout')
                        this.$router.push('/').then()
                    }
                ).catch(() => {
                    this.$store.commit('user/logout')
                    this.$router.push('/').then()
                })
            }
        }
    }
</script>
