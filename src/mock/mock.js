import Mock from "mockjs";

function login() {
  return {
    code: 0,
    msg: "success",
    data: {
      uid: 1,
      token: "xxx",
      permits: [
        "root",
        "dashboard",
        "bookmark",
        "mail",
        "new_note",
        "view_note",
      ],
    },
  };
}

Mock.setup({ timeout: "200-600" });

Mock.mock("http://mock.js/login", "post", login);
Mock.mock("http://mock.js/logout", "post", {
  code: 0,
  msg: "success",
});

Mock.mock("http://mock.js/info", "get", login);
