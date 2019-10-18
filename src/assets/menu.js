const MLayout = () => import('@/views/layouts/MLayout.vue')
const AppLayout = () => import('@/views/layouts/AppLayout.vue')

const menus = [
    {
        path: 'all',
        props: {kind: 'all'},
        component: AppLayout,
        children: [
            {
                name: 'app.menu.dashboard',
                icon: 'dashboard',
                path: 'dashboard',
                component: () => import('@/views/contents/Dashboard.vue')
            }
        ]
    },
    {
        name: 'app.menu.dev',
        path: 'dev',
        props: {kind: 'dev'},
        component: AppLayout,
        children: [
            {
                name: 'app.menu.config',
                icon: 'build',
                path: 'config',
                component: MLayout,
                children: [
                    {
                        name: 'app.menu.configVersion',
                        path: 'version',
                        permit: 'config_version',
                        component: () => import('@/views/contents/config/VersionConfig.vue')
                    },
                    {
                        name: 'app.menu.configFunction',
                        path: 'function',
                        permit: 'config_function',
                        component: () => import('@/views/contents/config/FunctionConfig.vue')
                    },
                    {
                        name: 'app.menu.configAddress',
                        path: 'address',
                        permit: 'config_address',
                        component: () => import('@/views/contents/config/AddressConfig.vue')
                    }
                ]
            },
            {
                name: 'app.menu.server',
                icon: 'device_hub',
                path: 'server',
                component: MLayout,
                children: [
                    {
                        name: 'app.menu.serverList',
                        path: 'list',
                        icon: 'format_list_numbered',
                        permit: 'view_server_list',
                        component: () => import('@/views/contents/server/ServerList.vue')
                    }
                ]
            }
        ]
    },
    {
        name: 'app.menu.ops',
        path: 'ops',
        props: {kind: 'ops'},
        component: AppLayout,
        children: [
            {
                name: 'app.menu.bulletin',
                icon: 'event_note',
                path: 'bulletin',
                component: MLayout,
                children: [
                    {
                        name: 'app.menu.bulletinPost',
                        path: 'post',
                        icon: 'post_add',
                        permit: 'post_bulletin',
                        component: () => import('@/views/contents/bulletin/BulletinPost.vue')
                    },
                    {
                        name: 'app.menu.bulletinList',
                        path: 'list',
                        icon: 'notes',
                        permit: 'view_bulletin',
                        component: () => import('@/views/contents/bulletin/BulletinList.vue')
                    }
                ]
            },
            {
                name: 'app.menu.email',
                icon: 'email',
                path: 'email',
                permit: 'send_email',
                component: () => import('@/views/contents/email/SystemEmail.vue')
            }
        ]
    },
    {
        name: 'app.menu.pm',
        path: 'pm',
        props: {kind: 'pm'},
        component: AppLayout,
        children: [
            {
                path: 'ecology',
                name: 'app.menu.ecology',
                icon: 'track_changes',
                permit: 'ecology',
                component: () => import('@/views/contents/ecology/Ecology.vue')
            }
        ]
    },
    {
        path: 'manage',
        props: {kind: 'manage', hiddenNav: true},
        component: AppLayout,
        children: [
            {
                name: 'app.menu.user',
                path: 'user',
                permit: 'manage',
                component: () => import('@/views/contents/manage/RoleManage.vue')
            },
            {
                name: 'app.menu.role',
                path: 'role',
                permit: 'manage',
                component: () => import('@/views/contents/manage/UserManage.vue')
            }
        ]
    }
]

export default menus
