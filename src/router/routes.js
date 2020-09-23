import Content from "@/views/pages/Content";
import Fallback from "@/views/pages/Fallback";
import Landing from "@/views/pages/Landing";
import Login from "@/views/pages/Login";
import Dashboard from "@/views/contents/Dashboard";

const base = {
  path: "/",
  component: Landing,
};

const login = {
  path: "/login",
  component: Login,
};

const content = {
  path: "/",
  component: Content,
  children: [
    {
      path: "",
      component: Dashboard,
    },
  ],
};

const fallback = {
  path: "*",
  component: Fallback,
};

const landing = {
  path: "*",
  component: Landing,
};

export { base, login, content, fallback, landing };
