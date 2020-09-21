const manage = {
  hidden: true,
  path: "manager",
  children: [
    {
      path: "user",
      name: "app.menu.userManage",
      icon: "people_alt",
      permit: "root",
      component: "manage/UserManage.vue",
    },
    {
      name: "user-add",
      path: "user/add",
      hidden: true,
      permit: "root",
      component: "manage/AddUser.vue",
    },
    {
      name: "user-edit",
      path: "user/id/:id",
      hidden: true,
      permit: "root",
      component: "manage/EditUser.vue",
    },
    {
      path: "role",
      name: "app.menu.roleManage",
      icon: "account_box",
      permit: "root",
      component: "manage/RoleManage.vue",
    },
    {
      name: "role-add",
      path: "role/add",
      hidden: true,
      permit: "root",
      component: "manage/AddRole.vue",
    },
    {
      name: "role-edit",
      path: "role/id/:id",
      hidden: true,
      permit: "root",
      component: "manage/EditRole.vue",
    },
  ],
};

const user = {
  hidden: true,
  path: "user",
  children: [
    {
      path: "security",
      name: "app.menu.changePassword",
      icon: "security",
      component: "user/ChangePassword.vue",
    },
  ],
};

export default [manage, user];
