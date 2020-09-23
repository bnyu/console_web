import router from "./index";
import newRouter from "./router";
import { login, base, content, fallback, landing } from "./routes";
import menuList from "./menu_list/index";

const getMenusAndRoutes = (permitList) => {
  let ps = {};
  let quit = false;
  if (permitList) {
    for (let i = 0; i < permitList.length; i++) {
      ps[permitList[i].toLowerCase()] = true;
    }
  } else {
    quit = true;
  }

  let menuRouterList = [];

  const f = (path, menu) => {
    const fPath = path + "/" + menu.path;
    if (menu.children) {
      const children = menu.children.map((m) => f(fPath, m)).filter((m) => m);
      if (children.length > 0) {
        const item = {
          name: menu.name,
          icon: menu.icon,
          path: fPath,
          path0: children[0].path0,
          children: children,
          hidden: menu.hidden,
        };
        const route = { path: item.path, redirect: item.path0 };
        menuRouterList.push(route);
        return item;
      }
    } else if (!menu.permit || ps[menu.permit]) {
      const item = {
        name: menu.name,
        icon: menu.icon,
        path: fPath,
        path0: fPath,
        hidden: menu.hidden,
      };
      const route = {
        name: menu.name,
        path: item.path,
        component: () => import(`@/views/contents/${menu.component}`),
      };
      menuRouterList.push(route);
      return item;
    }
    return null;
  };

  const updateRouter = (contentRoutes) => {
    if (contentRoutes.length > 0) {
      router.matcher = newRouter([]).matcher;
      const children = [...content.children, ...contentRoutes];
      const contents = { ...content, children };
      router.addRoutes([contents, fallback]);
    } else {
      router.matcher = newRouter([base, login, landing]).matcher;
    }
  };

  if (quit) {
    updateRouter([]);
    return [];
  }

  const myMenuList = menuList.map((m) => f("", m)).filter((m) => m);

  updateRouter(menuRouterList);

  return myMenuList;
};

export default getMenusAndRoutes;
