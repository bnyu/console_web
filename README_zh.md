# Console Web Framework

[English](./README.md)

基于 [Vue](https://github.com/vuejs/vue) 开发

## 使用介绍

1. Git克隆此代码库 `git clone https://github.com/bnyu/console_web.git`
2. 安装 [Yarn](https://yarnpkg.com/getting-started/install) 或者直接使用 [Npm](https://www.npmjs.com/)
3. 在你克隆的文件夹目录下运行 `yarn install` 或 `npm install` 安装依赖
4. 在此框架下编写你自己的代码, 同时使用 `yarn run serve` 或 `npm run serve` 查看效果
5. 将你的应用打包 `yarn run build` or `npm run build`

### 开发

快速开始:  
你只需要在 `src/views/contents` 文件夹里添加你想要的视图, 类似里面已有的一些示例.  
然后编辑 `src/router/menu_list/content.js` 文件管理视图结构. 根据登录用户的权限, 会自动生成路由以及目录.

```javascript
let demo = [
  {
    name: "menu.dashboard", // 目录名称的本地化key
    icon: "dashboard",      // 目录图标的key
    path: "dashboard",      // URL相对路径
    // permit: "dashboard", // 如果需要的权限key 
    component: "example/intro/Dashboard.vue", // vue视图文件在contents文件夹中的相对路径
    // children: []  // 如果有子节点, 则是没有视图的父节点, 如下
  },
  {
    name: "menu.notes",
    icon: "event_note",
    path: "note",
    children: [
      {
        name: "menu.newNote",
        icon: "note_add",
        path: "new",
        permit: "new_note",
        component: "example/note/NewNote.vue",
      },
      {
        name: "menu.viewNote",
        icon: "notes",
        path: "view",
        permit: "view_note",
        component: "example/note/ViewNote.vue",
      },
    ],
  },
]
```

> 同时, 你可以根据需求自己定制此框架, 例如修改样式等等.
> 文件 `src/views/layouts/ContentLayout.vue` 提供了一种通用方式来统一内容样式风格, 你可以定制化修改.

### 示例

在 `src/mock` 文件夹下伪造了一些有着不同权限的用户. 你可以尝试登录他们, 查看效果.

| 用户名       |  密码        |
| ----------- | ----------- |
| root        | 123456      |
| p1          | 123456      |
| p2          | 123456      |
| p3          | 123456      |
| p4          | 123456      |

![示例截图](./doc/assets/screenshot.png)

正式环境你需要服务器来处理用户登录以及其他响应, 不过你可以通过mock来帮助开发.

## 证书

使用 [Apache License 2.0](LICENSE) 证书.
