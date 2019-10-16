const h = {
    name: 'app.menu.dashboard',
    icon: 'dashboard',
    path: 'dashboard'
}

const pm = [

]

const dev = [
    {
        name: 'app.menu.config',
        icon: 'build',
        path: 'config',
        children: [
            {
                name: 'app.menu.configVersion',
                path: 'version',
                permit: 'config_version'
            },
            {
                name: 'app.menu.configFunction',
                path: 'function',
                permit: 'config_function'
            },
            {
                name: 'app.menu.configAddress',
                path: 'address',
                permit: 'config_address'
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
                icon: 'format_list_numbered',
                permit: 'view_server_list'
            }
        ]
    }
]

const ops = [
    {
        name: 'app.menu.bulletin',
        icon: 'event_note',
        path: 'bulletin',
        children: [
            {
                name: 'app.menu.bulletinPost',
                path: 'post',
                icon: 'post_add',
                permit: 'post_bulletin'
            },
            {
                name: 'app.menu.bulletinList',
                path: 'list',
                icon: 'notes',
                permit: 'view_bulletin'
            }
        ]
    },
    {
        name: 'app.menu.email',
        icon: 'email',
        path: 'email',
        permit: 'send_email'
    }
]

const menus = {
    all: [h, ...pm, ...ops, ...dev].map(item => {
        return {...item, path: 'all/' + item.path}
    }),
    dev: [h, ...dev].map(item => {
        return {...item, path: 'dev/' + item.path}
    }),
    ops: [h, ...ops].map(item => {
        return {...item, path: 'ops/' + item.path}
    }),
    pm: [h, ...pm].map(item => {
        return {...item, path: 'pm/' + item.path}
    }),
}

export default menus
