const h = {
    name: 'app.menu.dashboard',
    icon: 'dashboard',
    path: 'dashboard'
}

const manage = [
    {
        name: 'app.menu.user',
        path: 'user',
        permit: 'manage'
    },
    {
        name: 'app.menu.role',
        path: 'role',
        permit: 'manage'
    }
].map(item => {
    return {...item, path: 'manage/' + item.path}
})

const pm = [
    {
        path: 'ecology',
        name: 'app.menu.ecology',
        icon: 'track_changes',
        permit: 'ecology'
    }
].map(item => {
    return {...item, path: 'pm/' + item.path}
})

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
].map(item => {
    return {...item, path: 'dev/' + item.path}
})

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
].map(item => {
    return {...item, path: 'ops/' + item.path}
})

const menus = {
    all: {
        list: [h, ...pm, ...ops, ...dev],
        hiddenNav: true
    },
    dev: {
        list: dev
    },
    ops: {
        list: ops
    },
    pm: {
        list: pm
    },
    manage: {
        list: manage,
        hiddenNav: true
    }
}

export default menus
