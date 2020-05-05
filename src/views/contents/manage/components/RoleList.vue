<template>
    <el-table :data="roleList" v-loading="loading" class="m-content">
        <el-table-column :label="$t('app.user.roleName')" width="160">
            <template v-slot="s">
                <div class="role-name">
                    {{s.row.role_name}}
                </div>
            </template>
        </el-table-column>
        <el-table-column :label="$t('app.user.permitList')">
            <template v-slot="s">
                <span v-loading="s.row.loading">
                    <el-tag v-for="item in s.row.permit_list" :key="item" class="permit-tag"
                            disable-transitions>
                        {{$t('permit.'+item)}}
                    </el-tag>
                </span>
            </template>
        </el-table-column>
        <el-table-column :label="$t('app.act.operation')" width="220">
            <template v-slot="s">
                <span>
                    <el-button @click="()=>handleEdit(s.row)"
                               type="text" icon="el-icon-edit-outline" size="small">
                        {{$t('app.act.edit')}}
                    </el-button>&nbsp;
                    <el-button @click="()=>handleDelete(s.row)"
                               type="text" icon="el-icon-delete" size="small">
                        {{$t('app.act.delete')}}
                    </el-button>
                </span>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    import api from '@/api/modules/manager'

    export default {
        name: "RoleList",
        props: {
            pageSize: {
                type: Number,
                default: 10
            },
            currentPage: {
                type: Number,
                default: 1
            },
        },
        data() {
            return {
                loading: false,
                roleList: [],
                dataVer: 0
            }
        },
        methods: {
            getRoleList() {
                this.loading = true
                api.getRoleList((this.currentPage - 1) * this.pageSize, this.pageSize).then(data => {
                    const size = data.length
                    if (size > 0) {
                        const id0 = data[size - 1].role_id - 1
                        const id1 = data[0].role_id
                        for (let i = 0; i < data.length; i++) {
                            data[i].loading = true
                            data[i].permit_list = []
                        }
                        this.roleList = data
                        this.getRoles(id0, id1)
                    } else {
                        this.roleList = []
                    }
                    this.loading = false
                }).catch(() => {
                    this.$message({
                        message: this.$t('app.notice.someError'),
                        type: 'error',
                        duration: 1000,
                    })
                    this.loading = false
                })
            },

            getRoles(id0, id1) {
                const dataVer = ++this.dataVer
                api.getRoleInfos(id0, id1).then(data => {
                    if (dataVer === this.dataVer) {
                        for (let i = 0; i < data.length; i++) {
                            data[i].loading = false
                        }
                        this.roleList = data
                    }
                }).catch(() => {
                    this.$message({
                        message: this.$t('app.notice.someError'),
                        type: 'error',
                        duration: 1000,
                    })
                })
            },

            handleEdit(row) {
                this.$router.push({name: 'role-edit', params: {id: row.role_id}}).then()
            },

            handleDelete(row) {
                this.$confirm(this.$t('app.notice.actCanNotUndo'), this.$t('app.act.delete') + ' ' + row.role_name, {
                    confirmButtonText: this.$t('app.act.confirm'),
                    cancelButtonText: this.$t('app.act.cancel'),
                    type: 'warning'
                }).then(() => {
                    this.deleteRole(row)
                }).catch(() => {
                })
            },

            deleteRole(row) {
                row.loading = true
                api.deleteRole(row.role_id).then(() => {
                    let index = -1
                    for (let i = 0; i < this.roleList.length; i++) {
                        if (this.roleList[i].role_id === row.role_id) {
                            index = i
                            break
                        }
                    }
                    if (index >= 0) {
                        this.roleList.splice(index, 1)
                    }
                    this.$emit('del-one')
                    this.$message({
                        message: this.$t('app.notice.deleteRoleSuccess'),
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
            }
        },
        watch: {
            currentPage: function () {
                this.getRoleList()
            },
            pageSize: function () {
                this.getRoleList()
            }
        }
    }
</script>

<style scoped lang="scss">
    .m-content {
        .permit-tag {
            margin-left: 4px;
            margin-bottom: 2px;
        }

        .role-name {
            padding-top: 5px;
        }
    }
</style>

<style lang="scss">
    .m-content {
        .el-table__row td {
            vertical-align: top !important;
        }

        .el-button > span {
            margin-left: 0 !important;
        }
    }
</style>
