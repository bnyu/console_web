<template>
    <div ref="page" class="user-manage">
        <div>
            <div class="search-add">
                <div style="width: 160px">
                    <el-input v-model="input" :disabled="loading"
                              :placeholder="$t('app.notice.inputUsername')"></el-input>
                </div>
                <div>
                    <el-button @click="handleSearch" :disabled="loading">{{$t('app.act.searchOrAdd')}}</el-button>
                </div>
                <div>
                    <el-button @click="handleRefresh" :disabled="loading">{{$t('app.act.refresh')}}</el-button>
                </div>
            </div>
            <el-table class="user-table"
                      :data="userList"
                      v-loading="loading"
                      border
                      style="width: 100%">
                <el-table-column :label="$t('app.user.username')" prop="username"
                                 width="160">
                </el-table-column>
                <el-table-column :label="$t('app.user.roleList')" width="600">
                    <template v-slot="s">
                        <div class="user-role" v-loading="s.row.loading">
                            <span v-for="item in s.row.edit ? s.row.role_list_a : s.row.role_list" :key="item.role_id">
                                <el-tag
                                        :closable="s.row.edit"
                                        :disable-transitions="false"
                                        @close="()=>handleRemove(s.row, item)">
                                    {{item.role_name}}
                                </el-tag>
                            </span>
                            <span>
                                <el-dropdown v-if="s.row.edit" trigger="click"
                                             @command="(item)=>handleAdd(s.row, item)">
                                    <span>
                                        <el-tag><i class="el-icon-plus"></i></el-tag>
                                    </span>
                                    <el-dropdown-menu slot="dropdown" v-loading="loading1">
                                        <el-dropdown-item v-for="item in roleList" :key="item.role_id" :command="item"
                                                          :disabled="s.row.roles['_'+item.role_id]">
                                            {{item.role_name}}
                                        </el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('app.act.operation')" width="160">
                    <template v-slot="s">
                        <div v-if="s.row.role_list">
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
                                <el-button v-if="uid!==s.row.user_id"
                                           @click="()=>handleDelete(s.row)" :disabled="s.row.loading"
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
            <el-pagination class="user-page"
                           v-show="total>pageSize"
                           layout="prev, pager, next, jumper"
                           :page-size="pageSize"
                           :pager-count="5"
                           @size-change="getUserList"
                           @current-change="getUserList"
                           :current-page.sync="currentPage"
                           :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import api from '@/api/modules/manager'
    import Err from '@/assets/error_code'

    export default {
        name: "UserManage",
        data() {
            return {
                uid: this.$store.getters['user/uid'],
                loading: false,
                loading1: false,
                input: '',
                defaultPassword: '123456',
                password: '',
                currentPage: 1,
                pageSize: 20,
                total: 0,
                maxRoleSize: 100,
                roleList: [],
                userList: [],
                dataVer: 0
            }
        },
        methods: {
            getRoleList() {
                this.loading1 = true
                api.getRoleList(0, this.maxRoleSize).then(data => {
                    this.roleList = data
                    this.loading1 = false
                })
            },

            getUserList() {
                this.loading = true
                this.input = ''
                api.getUserList((this.currentPage - 1) * this.pageSize, this.pageSize).then(data => {
                    const size = data.length
                    if (size > 0) {
                        const id0 = data[0].user_id - 1
                        const id1 = data[size - 1].user_id
                        for (let i = 0; i < data.length; i++) {
                            data[i].loading = true
                        }
                        this.userList = data
                        this.getUsers(id0, id1)
                    } else {
                        this.userList = []
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

            getUsers(id0, id1) {
                const dataVer = ++this.dataVer
                api.getUserInfos(id0, id1).then(data => {
                    if (dataVer === this.dataVer) {
                        for (let i = 0; i < data.length; i++) {
                            data[i].loading = false
                            data[i].edit = false
                            data[i].role_list_a = []
                            data[i].roles = {}
                        }
                        this.userList = data
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
                api.getUserCount().then(data => {
                    if (data > 0) {
                        this.total = data
                        this.getUserList()
                    }
                }).catch(() => {
                    this.$message({
                        message: this.$t('app.notice.someError'),
                        type: 'error',
                        duration: 1000,
                    })
                })
            },

            handleRemove(row, role) {
                let index = -1
                for (let i = 0; i < row.role_list_a.length; i++) {
                    if (row.role_list_a[i].role_id === role.role_id) {
                        index = i
                        break
                    }
                }
                if (index >= 0) {
                    row.role_list_a.splice(index, 1)
                }
                row.roles['_' + role.role_id] = false
            },

            handleEdit(row) {
                row.role_list_a = [...row.role_list]
                let roles = {}
                for (let role of row.role_list_a) {
                    roles['_' + role.role_id] = true
                }
                row.roles = roles
                row.edit = true
            },

            handleAdd(row, role) {
                if (!row.roles['_' + role.role_id]) {
                    row.roles['_' + role.role_id] = true
                    row.role_list_a.push(role)
                }
            },

            handleCancel(row) {
                row.roles = {}
                row.edit = false
            },

            handleSave(row) {
                row.loading = true
                row.edit = false
                let roleIds = []
                for (let role of row.role_list_a) {
                    roleIds.push(role.role_id)
                }
                api.updateUserRoles(row.user_id, roleIds).then(() => {
                    row.role_list = row.role_list_a
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
                api.deleteUser(row.user_id).then(() => {
                    let index = -1
                    for (let i = 0; i < this.userList.length; i++) {
                        if (this.userList[i].user_id === row.user_id) {
                            index = i
                            break
                        }
                    }
                    if (index >= 0) {
                        this.userList.splice(index, 1)
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
                    const username = this.input
                    api.searchUser(username).then(data => {
                        if (data.length > 0) {
                            const id = data[0].user_id
                            data[0].loading = true
                            this.userList = data
                            this.getUsers(id - 1, id)
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
                            this.handleAddNewNotice(username)
                        }
                    })
                } else {
                    this.$message({
                        message: this.$t('app.notice.inputUsername'),
                        type: 'warning',
                        duration: 1000,
                    })
                }
            },

            handleAddNewNotice(username) {
                this.$prompt(this.$t('app.notice.addNewUser'), username, {
                    confirmButtonText: this.$t('app.act.confirm'),
                    cancelButtonText: this.$t('app.act.cancel'),
                    inputPlaceholder: this.defaultPassword,
                    inputErrorMessage: ''
                }).then(({ value }) => {
                    let password = this.defaultPassword
                    if (value && value.length >= 6) {
                        password = value
                    }
                    this.addNew(username, password)
                }).catch(() => {
                    this.input = ''
                });
            },

            addNew(username, password) {
                this.loading = true
                api.addUser(username, password).then(data => {
                    let list = [{user_id: data.user_id, username: username}]
                    list[0].loading = false
                    list[0].edit = false
                    list[0].role_list = []
                    list[0].role_list_a = []
                    list[0].roles = {}
                    this.userList = list
                    this.loading = false
                    this.$message({
                        message: this.$t('app.notice.addNewUserSuccess'),
                        type: 'success',
                        duration: 1000,
                    })
                }).catch(({code}) => {
                    if (code === Err.BaseErrorCode.UserNotfound) {
                        this.handleAddNewNotice()
                    } else if (code === Err.BaseErrorCode.UserDeleted) {
                        this.$message({
                            message: this.$t('app.notice.userDeleted'),
                            type: 'warning',
                            duration: 1500,
                        })
                    } else {
                        this.$message({
                            message: this.$t('app.notice.someError'),
                            type: 'error',
                            duration: 1000,
                        })
                    }
                    this.loading = false
                })
            }
        },
        mounted() {

        },
        created() {
            this.getRoleList()
            this.getTotalNum()
        }
    }
</script>

<style scoped lang="scss">
    .user-manage {
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

        .user-table {
            padding-top: 10px;

            .user-role {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;

                > span {
                    padding: 2px 4px;
                }
            }
        }

        .user-page {
            padding-top: 20px;
            padding-bottom: 20px;
        }
    }
</style>

<style lang="scss">
    .user-page {
        .el-pager li {
            background-color: transparent;
        }

        .btn-prev, .btn-next, .button, button:disabled {
            background-color: transparent;
        }
    }
</style>
