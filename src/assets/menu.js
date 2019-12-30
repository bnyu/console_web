const deploy = {
    name: 'app.menu.deploy',
    path: 'deploy',
    children: [
        {
            name: 'app.menu.config',
            icon: 'build',
            path: 'config',
            children: [
                {
                    name: 'app.menu.configVersion',
                    path: 'version',
                    permit: 'config_version',
                    component: 'config/VersionConfig.vue'
                },
                {
                    name: 'app.menu.configFunction',
                    path: 'function',
                    permit: 'config_function',
                    component: 'config/FunctionConfig.vue'
                },
                {
                    name: 'app.menu.configAddress',
                    path: 'address',
                    permit: 'config_address',
                    component: 'config/AddressConfig.vue'
                }
            ]
        },
        {
            name: 'app.menu.server',
            icon: 'device_hub',
            path: 'server',
            children: [
                {
                    name: 'app.menu.serverList',
                    path: 'list',
                    permit: 'view_server_list',
                    component: 'server/ServerList.vue'
                }
            ]
        }
    ]
}

const operate = {
    name: 'app.menu.operate',
    path: 'operate',
    children: [
        {
            name: 'app.menu.bulletin',
            icon: 'event_note',
            path: 'bulletin',
            children: [
                {
                    name: 'app.menu.bulletinPost',
                    path: 'post',
                    permit: 'post_bulletin',
                    component: 'bulletin/BulletinPost.vue'
                },
                {
                    name: 'app.menu.bulletinList',
                    path: 'list',
                    permit: 'view_bulletin',
                    component: 'bulletin/BulletinList.vue'
                }
            ]
        },
        {
            name: 'app.menu.email',
            icon: 'email',
            path: 'email',
            permit: 'send_email',
            component: 'email/SystemEmail.vue'
        }
    ]
}

const product = {
    name: 'app.menu.product',
    path: 'product',
    children: [
        {
            path: 'ecology',
            name: 'app.menu.ecology',
            icon: 'track_changes',
            permit: 'ecology',
            component: 'ecology/Ecology.vue'
        }
    ]
}

const manage = {
    hidden: true,
    path: 'manager',
    children: [
        {
            path: 'user',
            name: 'app.menu.userManage',
            icon: 'people_alt',
            permit: 'root',
            component: 'manage/UserManage.vue'
        },
        {
            name: 'user-add',
            path: 'user/add',
            hidden: true,
            permit: 'root',
            component: 'manage/AddUser.vue'
        },
        {
            name: 'user-edit',
            path: 'user/id/:id',
            hidden: true,
            permit: 'root',
            component: 'manage/EditUser.vue'
        },
        {
            path: 'role',
            name: 'app.menu.roleManage',
            icon: 'account_box',
            permit: 'root',
            component: 'manage/RoleManage.vue'
        },
        {
            name: 'role-add',
            path: 'role/add',
            hidden: true,
            permit: 'root',
            component: 'manage/AddRole.vue'
        },
        {
            name: 'role-edit',
            path: 'role/id/:id',
            hidden: true,
            permit: 'root',
            component: 'manage/EditRole.vue'
        },
    ]
}

const user = {
    hidden: true,
    path: 'user',
    children: [
        {
            path: 'security',
            name: 'app.menu.changePassword',
            icon: 'security',
            component: 'user/ChangePassword.vue'
        }
    ]
}

export default [product, operate, deploy, manage, user]
