<template>
    <el-form label-position="left" label-width="120px" :model="form" ref="form" :rules="rules" class="add-form">
        <el-form-item :label="$t('app.user.username')" prop="username">
            <template slot="label">
                <span v-loading="searching"
                      :element-loading-spinner="'el-icon-loading'">
                    {{$t('app.user.username')}}
                </span>
            </template>
            <el-input size="small" v-model="form.username" autocomplete="off" :placeholder="$t('app.notice.inputUsername')"
                      :disabled="searching||loading">
            </el-input>
        </el-form-item>
        <el-form-item :label="$t('app.user.password')" prop="password">
            <el-input size="small" v-model="form.password" autocomplete="off"
                      :placeholder="$t('app.notice.inputPassword')"
                      :disabled="loading"
            ></el-input>
        </el-form-item>
        <el-form-item>
            <el-button size="small" type="primary" @click="handleAddNewUser" :disabled="searching" v-loading="loading">
                {{$t('app.act.confirm')}}
            </el-button>
            <el-button size="small" @click="handleBack" :disabled="searching||loading">{{$t('app.act.back')}}</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import api from '@/api/modules/manager'
    import Err from '@/assets/error_code'

    export default {
        name: "AddNewUser",
        data() {
            const validateName = (rule, value, callback) => {
                if (value === undefined) {
                    callback()
                } else if (value === '') {
                    callback(new Error(this.$t('app.notice.inputUsername')))
                } else {
                    this.searchUser(value, callback)
                }
            }
            const validatePass = (rule, value, callback) => {
                if (value === undefined) {
                    callback()
                } else if (value === '') {
                    callback(new Error(this.$t('app.notice.inputPassword')))
                } else if (value.length < 6 || value.length > 64) {
                    callback(new Error(this.$t('app.notice.passwordIllegal')))
                } else {
                    callback()
                }
            }
            return {
                loading: false,
                searching: false,
                form: {
                    username: '',
                    password: '',
                },
                rules: {
                    username: [
                        {required: true, validator: validateName, trigger: 'blur'}
                    ],
                    password: [
                        {required: true, validator: validatePass, trigger: 'blur'},
                    ]
                }
            }
        },
        methods: {
            handleBack() {
                this.$router.go(-1)
            },
            handleReset() {
                this.form.username = undefined
                this.form.password = undefined
                this.$refs.form.validate(() => {
                    this.form.username = ''
                    this.form.password = ''
                })
            },
            searchUser(username, callback) {
                if (!this.loading) {
                    this.searching = true
                }
                api.searchUser(username).then(data => {
                    if (data.length > 0) {
                        callback(new Error(this.$t('app.notice.userAlreadyExist')))
                    } else {
                        callback()
                    }
                    this.searching = false
                }).catch(({error, code}) => {
                    if (error) {
                        callback(new Error(this.$t('app.notice.someError')))
                    } else if (code === Err.BaseErrorCode.UserDeleted) {
                        callback(new Error(this.$t('app.notice.userAlreadyDelete')))
                    } else {
                        callback()
                    }
                    this.searching = false
                })
            },
            handleAddNewUser() {
                this.loading = true
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.addNewUser(this.form.username, this.form.password)
                    }
                })
            },
            addNewUser(username, password) {
                api.addUser(username, password).then(data => {
                    this.handleReset()
                    this.loading = false
                    this.$message({
                        message: this.$t('app.notice.addNewUserSuccess'),
                        type: 'success',
                        duration: 1000,
                    })
                }).catch(() => {
                    this.loading = false
                    this.$message({
                        message: this.$t('app.notice.someError'),
                        type: 'error',
                        duration: 1000,
                    })
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .add-form {
        width: 600px;
    }
</style>
