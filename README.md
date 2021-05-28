# Console Web Framework

[中文文档](./README_zh.md)

Based on [Vue](https://github.com/vuejs/vue)

## Usage

1. Git clone `git clone https://github.com/bnyu/console_web.git`
2. Install [Yarn](https://yarnpkg.com/getting-started/install) or just use [Npm](https://www.npmjs.com/)
3. Run `yarn install` or `npm install` in the directory you cloned to install dependencies
4. Write your code and Developed with `yarn run serve` or `npm run serve`
5. Build with `yarn run build` or `npm run build`

### Develop

Getting Started:  
You just need add views to `src/views/contents`, just like some example files already under that directory.  
Add edit the `src/router/menu_list/content.js` to manage views. This will atomically generate routers and menus
according to user's permits.

```javascript
let demo = [
  {
    name: "menu.dashboard", // menu name key of i18n
    icon: "dashboard",      // menu icon key of material-icon
    path: "dashboard",      // url relative path
    // permit: "dashboard", // if need permit to view 
    component: "example/intro/Dashboard.vue", // relative path of vue component file in contents directory
    // children: []  // if it has childrens, it's a paraent node that do not have component. like below
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

> Also, you can customize the framework such as change style. etc.
> The `src/views/layouts/ContentLayout.vue` provided a general way to unified content style that you can customize it to your onw.

### Example

Under the `src/mock`, there are some users defined with different permits, you can try login and see the efforts.

| Username    | Password    |
| ----------- | ----------- |
| root        | 123456      |
| p1          | 123456      |
| p2          | 123456      |
| p3          | 123456      |
| p4          | 123456      |

![DemoScreenshot](./doc/assets/screenshot.png)

You need a server to deal with login and other request in production environment, but you can use mock for the
development.

## License

This is licensed under the Apache License, Version 2.0. See [License](LICENSE) for the full license text.
