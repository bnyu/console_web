<template>
    <el-form label-position="left" label-width="120px">
        <el-form-item :label="$t('app.user.roleName')" class="m-add-input">
            <el-input size="small" v-model="name" disabled>
            </el-input>
        </el-form-item>
        <el-form-item :label="$t('app.user.permitList')" class="m-add-input">
            <el-checkbox-group v-model="checkedList" size="small" class="permit-list">
                <el-checkbox v-for="item in permitList" :key="item" :label="item" border class="permit-key">
                    {{$t('app.permit.'+item)}}
                </el-checkbox>
            </el-checkbox-group>
        </el-form-item>
        <el-form-item>
            <el-button size="small" type="primary" @click="handleSave" v-loading="loading">
                {{$t('app.act.confirm')}}
            </el-button>
            <el-button size="small" @click="handleBack" :disabled="loading">{{$t('app.act.back')}}
            </el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import api from '@/api/modules/manager'
    import permit_key from '@/assets/permit_key'

    export default {
        name: "SetRolePermit",
        props: {
            id: {
                type: Number,
                default: 0
            },
        },
        data() {
            return {
                loading: false,
                name: '',
                permitList: permit_key,
                checkedList: []
            }
        },
        methods: {
            getRoleInfo() {
                this.loading = true
                api.getRoleInfos(this.id - 1, this.id).then(data => {
                    if (data.length === 1) {
                        this.checkedList = data[0].permit_list
                        this.name = data[0].role_name
                    } else {
                        this.$message({
                            message: this.$t('app.notice.roleNotExist'),
                            type: 'error',
                            duration: 1000,
                        })
                    }
                    this.loading = false
                }).catch(() => {
                    this.loading = false
                    this.$message({
                        message: this.$t('app.notice.someError'),
                        type: 'error',
                        duration: 1000,
                    })
                })
            },

            saveRolePermits() {
                api.updateRolePermits(this.id, this.checkedList).then(() => {
                    this.loading = false
                    this.$message({
                        message: this.$t('app.notice.saveSuccess'),
                        type: 'success',
                        duration: 1000,
                    })
                }).catch(() => {
                    this.$message({
                        message: this.$t('app.notice.someError'),
                        type: 'error',
                        duration: 1000,
                    })
                })
            },
            handleSave() {
                this.saveRolePermits()
            },
            handleBack() {
                this.$router.go(-1)
            }
        },
        created() {
            this.getRoleInfo()
        }
    }
</script>

<style scoped lang="scss">
    .el-form-item__label {
        width: 600px;
    }

    .el-checkbox {
        margin-right: 3px;
    }
</style>
