<template>
    <div class="role-manage">
        <div>
            <div class="search-add">
                <div style="width: 160px">
                    <el-input v-model="input" :disabled="loading"
                              :placeholder="$t('app.notice.inputRoleName')"></el-input>
                </div>
                <div>
                    <el-button @click="handleSearch" :disabled="loading">{{$t('app.act.searchOrAdd')}}</el-button>
                </div>
                <div>
                    <el-button @click="handleRefresh" :disabled="loading">{{$t('app.act.refresh')}}</el-button>
                </div>
            </div>
            <el-table :data="roleList"
                      ref="rolesList"
                      v-loading="loading"
                      border
                      class="role-table"
                      style="width: 100%">
                <el-table-column :label="$t('app.user.roleName')" prop="role_name"
                                 width="160">
                </el-table-column>
                <el-table-column :label="$t('app.user.permitList')" width="600">
                    <template v-slot="s">
                        <div class="role-permits" v-loading="s.row.loading">
                            <span v-for="item in s.row.edit ? s.row.permit_list_a : s.row.permit_list" :key="item">
                                <el-tag
                                        :closable="s.row.edit"
                                        :disable-transitions="false"
                                        @close="()=>handleRemove(s.row, item)">
                                    {{$t('app.permit.'+item)}}
                                </el-tag>
                            </span>
                            <span>
                                <el-dropdown v-if="s.row.edit" trigger="click"
                                             @command="(item)=>handleAdd(s.row, item)">
                                    <span>
                                        <el-tag><i class="el-icon-plus"></i></el-tag>
                                    </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item v-for="item in permitList" :key="item" :command="item"
                                                          :disabled="s.row.permits[item]">
                                            {{$t('app.permit.'+item)}}
                                        </el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </span>
                        </div>
                    </template>

                </el-table-column>
                <el-table-column :label="$t('app.act.operation')" width="160">
                    <template v-slot="s">
                        <div v-if="s.row.permit_list">
                            <span v-if="s.row.edit">
                                <el-button @click="()=>handleCancel(s.row)" :disabled="s.row.loading"
                                           type="text" icon="el-icon-refresh-left" size="small">
                                    {{$t('app.act.cancel')}}
                                </el-button>&nbsp;
                                <el-button @click="()=>handleSave(s.row)" :disabled="s.row.loading"
                                           type="text" icon="el-icon-check" size="small">
                                    {{$t('app.act.save')}}
                                </el-button>
                            </span>
                            <span v-else>
                                <el-button @click="()=>handleEdit(s.row)" :disabled="s.row.loading"
                                           type="text" icon="el-icon-edit-outline" size="small">
                                    {{$t('app.act.edit')}}
                                </el-button>&nbsp;
                                <el-button @click="()=>handleDelete(s.row)" :disabled="s.row.loading"
                                           type="text" icon="el-icon-delete" size="small">
                                    {{$t('app.act.delete')}}
                                </el-button>
                            </span>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <div>
            <el-pagination class="role-page"
                           v-show="total>pageSize"
                           layout="prev, pager, next, jumper"
                           :page-size="pageSize"
                           :pager-count="5"
                           @size-change="getRoleList"
                           @current-change="getRoleList"
                           :current-page.sync="currentPage"
                           :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import api from '@/api/modules/manager'
    import permits from '@/assets/permit_key'

    export default {
        name: "roleManage",
        data() {
            return {
                loading: false,
                loading0: false,
                input: '',
                currentPage: 1,
                pageSize: 20,
                maxRoleSize: 100,
                total: 0,
                permitList: permits,
                roleList: [],
                dataVer: 0
            }
        },
        methods: {
            getRoleList() {
                this.loading = true
                this.input = ''
                api.getRoleList((this.currentPage - 1) * this.pageSize, this.pageSize).then(data => {
                    const size = data.length
                    if (size > 0) {
                        const id0 = data[0].role_id - 1
                        const id1 = data[size - 1].role_id
                        for (let i = 0; i < data.length; i++) {
                            data[i].loading = true
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
                            data[i].edit = false
                            data[i].permit_list_a = []
                            data[i].permits = {}
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

            getTotalNum() {
                this.loading = true
                api.getRoleCount().then(data => {
                    if (data > 0) {
                        this.total = data
                        this.getRoleList()
                    }
                }).catch(() => {
                    this.$message({
                        message: this.$t('app.notice.someError'),
                        type: 'error',
                        duration: 1000,
                    })
                })
            },

            handleRemove(row, permit) {
                row.permit_list_a.splice(row.permit_list_a.indexOf(permit), 1)
                row.permits[permit] = false
            },

            handleEdit(row) {
                row.permit_list_a = [...row.permit_list]
                let permits = {}
                for (let item of row.permit_list_a) {
                    permits[item] = true
                }
                row.permits = permits
                row.edit = true
            },

            handleAdd(row, permit) {
                if (!row.permits[permit]) {
                    row.permits[permit] = true
                    row.permit_list_a.push(permit)
                }
            },

            handleCancel(row) {
                row.permits = {}
                row.edit = false
            },

            handleSave(row) {
                row.loading = true
                row.edit = false
                api.updateRolePermits(row.role_id, row.permit_list_a).then(() => {
                    row.permit_list = row.permit_list_a
                    row.loading = false
                }).catch(() => {
                    this.$message({
                        message: this.$t('app.notice.someError'),
                        type: 'error',
                        duration: 1000,
                    })
                })
            },

            handleDelete(row) {
                row.loading = true
                row.edit = false
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
                }).catch(() => {
                    this.$message({
                        message: this.$t('app.notice.someError'),
                        type: 'error',
                        duration: 1000,
                    })
                })
            },

            handleRefresh() {
                this.getTotalNum()
            },

            handleSearch() {
                if (this.input !== '') {
                    this.loading = true
                    const name = this.input
                    api.searchRole(name).then(data => {
                        if (data.length > 0) {
                            const id = data[0].role_id
                            data[0].loading = true
                            this.roleList = data
                            this.getRoles(id - 1, id)
                            this.loading = false
                        }
                    }).catch(({error}) => {
                        this.loading = false
                        if (error) {
                            this.$message({
                                message: this.$t('app.notice.someError'),
                                type: 'error',
                                duration: 1000,
                            })
                        } else {
                            if (this.total >= this.maxRoleSize) {
                                this.$message({
                                    message: this.$t('app.notice.maxRoleSize'),
                                    type: 'warning',
                                    duration: 1000,
                                })
                            } else {
                                this.handleAddNewNotice(name)
                            }
                        }
                    })
                } else {
                    this.$message({
                        message: this.$t('app.notice.inputRoleName'),
                        type: 'warning',
                        duration: 1000,
                    })
                }
            },

            handleAddNewNotice(name) {
                this.$confirm(this.$t('app.notice.addNewRole'), name, {
                    confirmButtonText: this.$t('app.act.confirm'),
                    cancelButtonText: this.$t('app.act.cancel'),
                    type: 'info'
                }).then(() => {
                    this.addNew(name)
                }).catch(() => {
                    this.input = ''
                })
            },

            addNew(name) {
                this.loading = true
                api.addRole(name).then(id => {
                    let data = [{role_id: id, role_name: name}]
                    data[0].loading = false
                    data[0].edit = false
                    data[0].permit_list = []
                    data[0].permit_list_a = []
                    data[0].permits = {}
                    this.roleList = data
                    this.loading = false
                    this.$message({
                        message: this.$t('app.notice.addNewRoleSuccess'),
                        type: 'success',
                        duration: 1000,
                    })
                }).catch(() => {
                    this.$message({
                        message: this.$t('app.notice.someError'),
                        type: 'error',
                        duration: 1000,
                    })
                    this.loading = false
                })
            }
        },
        mounted() {

        },
        created() {
            this.getTotalNum()
        }
    }
</script>

<style scoped lang="scss">
    .role-manage {
        position: absolute;
        top: 0;
        bottom: 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;

        .search-add {
            display: flex;
            flex-direction: row;
            padding-top: 10px;
            padding-bottom: 10px;

            > div {
                padding-right: 6px;
            }
        }

        .role-table {
            padding-top: 10px;

            .role-permits {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;

                > span {
                    padding: 2px 4px;
                }
            }
        }

        .role-page {
            padding-top: 20px;
            padding-bottom: 20px;
        }
    }
</style>

<style lang="scss">
    .role-page {
        .el-pager li {
            background-color: transparent;
        }

        .btn-prev, .btn-next, .button, button:disabled {
            background-color: transparent;
        }
    }
</style>
