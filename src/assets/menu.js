const dashboard = {
    hidden: true,
    name: 'app.menu.dashboard',
    icon: 'dashboard',
    path: 'dashboard',
    component: 'Dashboard.vue',
}

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
            name: 'app.menu.roleManage',
            path: 'role',
            permit: 'root',
            component: 'manage/RoleManage.vue'
        },
        {
            name: 'app.menu.userManage',
            path: 'user',
            permit: 'root',
            component: 'manage/UserManage.vue'
        }
    ]
}

export default [dashboard, product, operate, deploy, manage]
