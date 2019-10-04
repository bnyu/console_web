const h = {
  name: 'app.menu.dashboard',
  icon: 'dashboard',
  path: 'dashboard'
}

const pm = [
  {
    name: 'app.menu.bulletin',
    icon: 'event_note',
    path: 'bulletin',
    children: [
      {
        name: 'app.menu.bulletinPost',
        path: 'post'
      },
      {
        name: 'app.menu.bulletinList',
        path: 'list'
      }
    ]
  },
  {
    name: 'app.menu.email',
    icon: 'email',
    path: 'email'
  }
]

const dev = [
  {
    name: 'app.menu.config',
    icon: 'build',
    path: 'config',
    children: [
      {
        name: 'app.menu.configVersion',
        path: 'version'
      },
      {
        name: 'app.menu.configFunction',
        path: 'function'
      },
      {
        name: 'app.menu.configAddress',
        path: 'address'
      }
    ]
  }
]

const ops = [
  {
    name: 'app.menu.server',
    icon: 'device_hub',
    path: 'server',
    children: [
      {
        name: 'app.menu.serverList',
        path: 'list'
      }
    ]
  }
]

const menus = {
  all: [h, ...pm, ...dev, ...ops].map(item => { return { ...item, path: 'all/' + item.path } }),
  pm: [h, ...pm].map(item => { return { ...item, path: 'pm/' + item.path } }),
  dev: [h, ...dev].map(item => { return { ...item, path: 'dev/' + item.path } }),
  ops: [h, ...ops].map(item => { return { ...item, path: 'ops/' + item.path } })
}

export default menus
