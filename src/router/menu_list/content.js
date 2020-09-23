const example = {
  name: "menu.example",
  path: "example",
  children: [
    {
      name: "menu.dashboard",
      icon: "dashboard",
      path: "dashboard",
      permit: "dashboard",
      component: "example/intro/Dashboard.vue",
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
    {
      name: "menu.bookmark",
      icon: "bookmarks",
      path: "bookmark",
      permit: "bookmark",
      component: "example/bookmark/Bookmark.vue",
    },
    {
      name: "menu.mail",
      icon: "mail_outline",
      path: "mail",
      children: [
        {
          name: "menu.sendMail",
          path: "new",
          icon: "send",
          permit: "mail",
          component: "example/mail/SendMail.vue",
        },
        {
          name: "menu.mailBox",
          path: "box",
          icon: "mail",
          permit: "mail",
          component: "example/mail/MailBox.vue",
        },
      ],
    },
    {
      name: "menu.eat.foodMenu",
      icon: "menu_book",
      path: "food",
      children: [
        {
          name: "menu.eat.rice",
          path: "rice",
          component: "example/food/Rice.vue",
        },
        {
          name: "menu.eat.vegetable",
          path: "vegetables",
          children: [
            {
              name: "menu.eat.cucumber",
              path: "cucumber",
              component: "example/food/Cucumber.vue",
            },
            {
              name: "menu.eat.celery",
              path: "celery",
              component: "example/food/Celery.vue",
            },
          ],
        },
        {
          name: "menu.eat.fruit",
          path: "fruit",
          children: [
            {
              name: "menu.eat.apple",
              path: "apple",
              component: "example/food/Apple.vue",
            },
            {
              name: "menu.eat.banana",
              path: "banana",
              component: "example/food/Banana.vue",
            },
            {
              name: "menu.eat.orange",
              path: "orange",
              children: [
                {
                  name: "menu.eat.mandarinOrange",
                  path: "mandarin",
                  component: "example/food/MandarinOrange.vue",
                },
                {
                  name: "menu.eat.sweetOrange",
                  path: "sweet",
                  component: "example/food/SweetOrange.vue",
                },
              ],
            },
          ],
        },
        {
          name: "menu.eat.nut",
          path: "nut",
          children: [
            {
              name: "menu.eat.peanut",
              path: "peanut",
              component: "example/food/Peanut.vue",
            },
            {
              name: "menu.eat.walnut",
              path: "walnut",
              component: "example/food/Walnut.vue",
            },
          ],
        },
      ],
    },
  ],
};

const introduction = {
  name: "menu.introduction",
  path: "introduction",
  children: [
    {
      name: "menu.description",
      icon: "description",
      path: "description",
      component: "introduction/Description.vue",
    },
    {
      name: "menu.build",
      icon: "build",
      path: "build",
      children: [
        {
          name: "menu.install",
          icon: "get_app",
          path: "install",
          permit: "root",
          component: "introduction/BuildInstall.vue",
        },
        {
          name: "menu.apply",
          icon: "settings",
          path: "apply",
          permit: "root",
          component: "introduction/BuildApply.vue",
        },
      ],
    },
    {
      name: "menu.bugReport",
      icon: "bug_report",
      path: "bug_report",
      component: "introduction/BugReport.vue",
    },
  ],
};

export default [example, introduction];
