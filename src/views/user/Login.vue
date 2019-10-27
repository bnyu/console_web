<template>
    <div v-if="!logged" class="login-container">
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" label-position="left">
            <el-form-item prop="username" class="form-line">
                <el-input
                        class="login-input"
                        ref="username"
                        v-model="loginForm.username"
                        :placeholder="$t('app.username')"
                        :disabled="loading"
                        name="username"
                        type="text"
                        tabindex="1"
                        auto-complete="on"
                ></el-input>
            </el-form-item>

            <el-form-item prop="password" class="form-line">
                <el-input
                        class="login-input"
                        ref="password"
                        v-model="loginForm.password"
                        :placeholder="$t('app.password')"
                        :disabled="loading"
                        name="password"
                        type="password"
                        tabindex="2"
                        @keyup.enter.native="handleLogin"
                ></el-input>
            </el-form-item>

            <el-button :loading="loading" type="primary" class="login-button"
                       @click.native.prevent="handleLogin">
                {{$t('app.login')}}
            </el-button>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {
                loginForm: {
                    username: 'test',
                    password: 'test'
                },
                loginRules: {
                    username: [{required: true, trigger: 'blur'}],
                    password: [{required: true, trigger: 'blur'}]
                },
                logged: this.$store.getters['user/logged'],
                loading: false
            }
        },
        methods: {
            login() {
                let token = 'test'
                let permits = ['view_bulletin', 'post_bulletin', 'send_email', 'config_version', 'config_function', 'config_address', 'view_server_list', 'ecology', 'manage']
                this.$store.commit('user/setPermits', permits)
                this.$store.commit('user/setToken', token)
                this.$router.push('/dashboard')
            },
            handleLogin() {
                this.$refs.loginForm.validate(v => {
                    if (v) {
                        this.loading = true
                        this.login()
                    }
                })
            }
        },
        created() {
            if (this.logged) {
                this.$router.replace('/dashboard')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .login-container {
        position: fixed;
        width: 100%;
        background-color: #354459;
        overflow: hidden;
        top: 0;
        bottom: 0;

        .login-form {
            position: relative;
        }

        .login {
            &-input {
                display: inline-block;
                width: 85%;
            }

            &-form {
                position: relative;
                width: 520px;
                padding-top: 160px;
                margin: 0 auto;
                overflow: hidden;
            }

            &-button {
                width: 85%;
                margin-top: 10px;
            }
        }
    }
</style>

<style lang="scss">
    .login-container {
        .el-input__inner {
            background-color: #e4e7ed;
        }
    }
</style>
