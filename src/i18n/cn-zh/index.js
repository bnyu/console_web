import elementCnLocale from 'element-ui/lib/locale/lang/zh-CN'// element-ui lang

export default {
  ...elementCnLocale,
  app: {
    menu: {
      all: '', // hide
      dashboard: '总览',
      bulletin: '公告',
      bulletinPost: '发布新公告',
      bulletinList: '公告列表',
      server: '区服',
      serverList: '列表',
      email: '邮件',
      config: '参数配置',
      configVersion: '版本',
      configFunction: '功能',
      configAddress: '地址'
    },
    login:'登录',
    logout:'登出',
    err404: '抱歉, 无法浏览此页',
    back: '返回',
    failed: '操作失败',
    success: '操作成功'
  }
}
