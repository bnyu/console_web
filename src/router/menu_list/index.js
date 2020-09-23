import content from "@/router/menu_list/content";

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

export default [...content, user];
