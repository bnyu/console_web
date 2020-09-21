import http from "@/api/axios";
import Cookies from "js-cookie";
import getMenusAndRoutes from "@/router/menus";

const state = {
  uid: 0,
  username: "",
  token: "",
  permitList: [],
  menuList: [],
  menus: {},
};

const getters = {
  uid: (state) => {
    return state.uid;
  },
  username: (state) => {
    if (state.uid !== 0) {
      return state.username;
    } else {
      return Cookies.get("u-name");
    }
  },
  menus: (state) => {
    return state.menus;
  },
  menuList: (state) => {
    return state.menuList;
  },
  token: (state) => {
    if (state.uid !== 0) {
      return state.token;
    } else {
      return Cookies.get("x-token");
    }
  },
};

const mutations = {
  logout: (state) => {
    state.uid = 0;
    state.username = "";
    state.token = "";
    state.permitList = [];
    state.menuList = getMenusAndRoutes();
    state.menus = {};
    http.defaults.headers.common["X-Token"] = "";
    Cookies.remove("x-token");
    Cookies.remove("u-name");
  },
  login: (state, { uid, username, token, permitList }) => {
    if (username === "root") {
      permitList.push("root");
    }
    state.uid = uid;
    state.username = username;
    state.token = token;
    state.permitList = permitList;
    state.menuList = getMenusAndRoutes(permitList);
    for (let menu of state.menuList) {
      state.menus[menu.path] = menu;
    }
    http.defaults.headers.common["X-Token"] = token;
    Cookies.set("x-token", token, { expires: 1 });
    Cookies.set("u-name", username, { expires: 1 });
  },
};

const actions = {};

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
  state,
};
