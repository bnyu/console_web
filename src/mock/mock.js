import Mock from "mockjs";

const normalPermits = [
  "build",
  "dashboard",
  "bookmark",
  "mail",
  "new_note",
  "view_note",
];

const randomPermits = ["rice", "celery", "orange", "peanut", "walnut"];

// some cases
const root = [...normalPermits, ...randomPermits];
const p1 = [root[0], root[3], root[5], root[6], root[7], root[9]];
const p2 = [root[0], root[1], root[2], root[5], root[8], root[9]];
const p3 = [root[0], root[1], root[4], root[5], root[9], root[10]];
const p4 = [root[0], root[2], root[5], root[6], root[7], root[10]];

function login({ body }) {
  let req = null;
  if (body) {
    try {
      req = JSON.parse(body);
    } catch (d) {
      console.log(d);
    }
  }
  let resp = {
    code: 0,
    msg: "success",
  };
  if (!req) {
    resp.code = 1;
    resp.msg = "wrong req param";
    return resp;
  }
  let data = {
    uid: 0,
    token: "",
    permits: [],
  };
  if (req.username === "root") {
    let t = "root-temp-token";
    if (req.token === t || req.password === "123456") {
      data.uid = 1;
      data.token = t;
      data.permits = root;
    }
  } else if (req.username === "p1") {
    let t = "p1-temp-token";
    if (req.token === t || req.password === "123456") {
      data.uid = 2;
      data.token = t;
      data.permits = p1;
    }
  } else if (req.username === "p2") {
    let t = "p2-temp-token";
    if (req.token === t || req.password === "123456") {
      data.uid = 3;
      data.token = t;
      data.permits = p2;
    }
  } else if (req.username === "p3") {
    let t = "p3-temp-token";
    if (req.token === t || req.password === "123456") {
      data.uid = 4;
      data.token = t;
      data.permits = p3;
    }
  } else if (req.username === "p4") {
    let t = "p4-temp-token";
    if (req.token === t || req.password === "123456") {
      data.uid = 5;
      data.token = t;
      data.permits = p4;
    }
  } else if (req.username === "pr") {
    let t = "random-temp-token";
    let pr = randomPermits.filter(() => Math.random() > 0.6);
    data.permits = [...normalPermits, ...pr];
    if (req.token === t || req.password === "123456") {
      data.uid = 6;
      data.token = t;
      data.permits = pr;
    }
  }
  if (data.uid > 0) {
    resp.data = data;
  } else {
    resp.code = 2;
    resp.msg = "wrong username or password";
  }
  return resp;
}

Mock.setup({ timeout: "200-600" });

Mock.mock("http://mock.js/login", "post", login);
Mock.mock("http://mock.js/logout", "post", {
  code: 0,
  msg: "success",
});
Mock.mock("http://mock.js/change_password", "post", {
  code: 0,
  msg: "success",
});

Mock.mock("http://mock.js/re_login", "post", login);
