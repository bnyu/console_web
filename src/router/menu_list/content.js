export default [
    {
        name: 'menu.deploy',
        path: 'deploy',
        children: [
            {
                name: 'menu.config',
                icon: 'build',
                path: 'config',
                children: [
                    {
                        name: 'menu.configVersion',
                        path: 'version',
                        permit: 'config_version',
                        component: 'config/VersionConfig.vue'
                    },
                    {
                        name: 'menu.configFunction',
                        path: 'function',
                        permit: 'config_function',
                        component: 'config/FunctionConfig.vue'
                    },
                    {
                        name: 'menu.configAddress',
                        path: 'address',
                        permit: 'config_address',
                        component: 'config/AddressConfig.vue'
                    }
                ]
            },
            {
                name: 'menu.server',
                icon: 'device_hub',
                path: 'server',
                children: [
                    {
                        name: 'menu.serverList',
                        path: 'list',
                        permit: 'view_server_list',
                        component: 'server/ServerList.vue'
                    }
                ]
            }
        ]
    },
    {
        name: 'menu.operate',
        path: 'operate',
        children: [
            {
                name: 'menu.bulletin',
                icon: 'event_note',
                path: 'bulletin',
                children: [
                    {
                        name: 'menu.bulletinPost',
                        path: 'post',
                        permit: 'post_bulletin',
                        component: 'bulletin/BulletinPost.vue'
                    },
                    {
                        name: 'menu.bulletinList',
                        path: 'list',
                        permit: 'view_bulletin',
                        component: 'bulletin/BulletinList.vue'
                    }
                ]
            },
            {
                name: 'menu.email',
                icon: 'email',
                path: 'email',
                permit: 'send_email',
                component: 'email/SystemEmail.vue'
            }
        ]
    },
    {
        name: 'menu.product',
        path: 'product',
        children: [
            {
                path: 'ecology',
                name: 'menu.ecology',
                icon: 'track_changes',
                permit: 'ecology',
                component: 'ecology/Ecology.vue'
            }
        ]
    }
]
