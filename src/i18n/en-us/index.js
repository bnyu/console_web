import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang

export default {
  ...elementEnLocale,
  app: {
    title: 'Console Web',
    menu: {
      pm: 'Product Manage',
      dev: 'Development',
      ops: 'Operations',
      dashboard: 'Dashboard',
      manageUser: 'User Manage',
      user: 'User Manage',
      role: 'Role Manage',
      bulletin: 'Bulletin',
      bulletinPost: 'Post New',
      bulletinList: 'View List',
      server: 'Game Server',
      serverList: 'Server List',
      email: 'System Email',
      config: 'Arg Config',
      configVersion: 'Version',
      configFunction: 'Functions',
      configAddress: 'URL Address',
      ecology: 'Ecology'
    },
    login:'Login',
    logout:'Logout',
    err404: 'Sorry, nothing here',
    back: 'Back',
    failed: 'Action failed',
    success: 'Action success'
  }
}
