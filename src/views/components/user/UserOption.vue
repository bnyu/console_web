<template>
    <div>
        <el-dropdown @command="to">
            <span>
                <el-badge is-dot type="warning" :hidden="secure" class="badge">
                    <slot></slot>
                </el-badge>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="change-password">
                    <span v-bind:class="{ insecure: !secure }">{{$t('app.user.changePassword')}}</span>
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
        >
            <span>{{$t('app.user.logout')}}</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="logoutVisible = false">{{$t('app.act.cancel')}}</el-button>
                <el-button type="primary" @click="handleLogout">{{$t('app.act.confirm')}}</el-button>
            </span>
        </el-dialog>

        <el-dialog
                v-loading="loading"
                :title="$t('app.user.changePassword')"
                :visible.sync="changePasswordVisible"
                width="30%"
        >
            <el-form :model="form" ref="form" :rules="rules" label-width="150px">
                <el-form-item :label="$t('app.user.password')" prop="password">
                    <el-input v-model="form.password" autocomplete="off" type="password" show-password></el-input>
                </el-form-item>
                <el-form-item :label="$t('app.user.newPassword')" prop="newPassword">
                    <el-input v-model="form.newPassword" autocomplete="off" type="password" show-password></el-input>
                </el-form-item>
                <el-form-item :label="$t('app.user.newPassword')" prop="repeatNewPassword">
                    <el-input v-model="form.repeatNewPassword" autocomplete="off" type="password"
                              show-password></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelChangePassword">{{$t('app.act.cancel')}}</el-button>
                <el-button type="primary" @click="handleChangePassword">{{$t('app.act.confirm')}}</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import api from '@/api/modules/user'

    export default {
        name: "UserOption",
        data() {
            const validatePass1 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(this.$t('app.notice.inputNewPassword')))
                } else if (value === this.form.password) {
                    callback(new Error(this.$t('app.notice.passwordNotChange')))
                } else if (value.length < 6 || value.length > 64) {
                    callback(new Error(this.$t('app.notice.passwordIllegal')))
                } else {
                    callback()
                }
            }
            const validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(this.$t('app.notice.repeatNewPassword')))
                } else if (value !== this.form.newPassword) {
                    callback(new Error(this.$t('app.notice.newPasswordNotSame')))
                } else {
                    callback()
                }
            }
            return {
                secure: this.$store.getters['user/secure'],
                loading: false,
                logoutVisible: false,
                changePasswordVisible: false,
                form: {
                    password: '',
                    newPassword: '',
                    repeatNewPassword: '',
                },
                rules: {
                    password: [
                        {required: true, message: this.$t('app.notice.inputOldPassword'), trigger: 'blur'},
                    ],
                    newPassword: [
                        {required: true, validator: validatePass1, trigger: 'blur'}
                    ],
                    repeatNewPassword: [
                        {required: true, validator: validatePass2, trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            to(command) {
                if (command === 'change-password') {
                    this.changePasswordVisible = true
                } else if (command === 'logout') {
                    this.logoutVisible = true
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
            },
            handleChangePassword() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.changePassword(this.form.password, this.form.newPassword)
                    }
                })
            },
            changePassword(password, newPassword) {
                this.loading = true
                api.changePassword(password, newPassword).then(() => {
                        this.secure = true
                        this.$store.commit('user/setSecure', true)
                        this.loading = false
                        this.changePasswordVisible = false
                        this.form.password = ''
                        this.form.newPassword = ''
                        this.form.repeatNewPassword = ''
                        this.$message({
                            message: this.$t('app.notice.changePasswordSuccess'),
                            type: 'success',
                            duration: 1000,
                        })
                    }
                ).catch(() => {
                    this.loading = false
                    this.form.password = ''
                    this.form.newPassword = ''
                    this.form.repeatNewPassword = ''
                    this.$message({
                        message: this.$t('app.notice.someError'),
                        type: 'error',
                        duration: 1000,
                    })
                })
            },
            cancelChangePassword() {
                this.changePasswordVisible = false
                this.form.password = '123456'
                this.form.newPassword = 'qwerty'
                this.form.repeatNewPassword = 'qwerty'
                this.$refs.form.validate(() => {
                    this.form.password = ''
                    this.form.newPassword = ''
                    this.form.repeatNewPassword = ''
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .badge {
        padding-top: 1px;
        padding-right: 2px;
    }

    .insecure {
        color: $warning;
    }
</style>
