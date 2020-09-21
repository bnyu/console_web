import request from "../api";

export default {
  getRoleInfos(offset, size) {
    return request({
      method: "GET",
      url: "/manager/role/permit",
      params: { offset, size },
    });
  },

  getUserInfos(offset, size) {
    return request({
      method: "GET",
      url: "/manager/user/role",
      params: { offset, size },
    });
  },

  getRoleList(offset, size) {
    return request({
      method: "GET",
      url: "/manager/role/list",
      params: { offset, size },
    });
  },

  getUserList(offset, size) {
    return request({
      method: "GET",
      url: "/manager/user/list",
      params: { offset, size },
    });
  },

  getRoleCount() {
    return request({
      method: "GET",
      url: "/manager/role/count",
    });
  },

  getUserCount() {
    return request({
      method: "GET",
      url: "/manager/user/count",
    });
  },

  updateRolePermits(role_id, permit_keys) {
    return request({
      method: "POST",
      url: "/manager/role",
      data: { role_id, permit_keys },
    });
  },

  updateUserRoles(user_id, role_ids) {
    return request({
      method: "POST",
      url: "/manager/user",
      data: { user_id, role_ids },
    });
  },

  deleteRole(role_id) {
    return request({
      method: "DELETE",
      url: "/manager/role",
      data: { role_id },
    });
  },

  deleteUser(user_id) {
    return request({
      method: "DELETE",
      url: "/manager/user",
      data: { user_id },
    });
  },

  searchUser(name) {
    return request({
      method: "GET",
      url: "/manager/user/list",
      params: { name },
    });
  },

  searchRole(name) {
    return request({
      method: "GET",
      url: "/manager/role/list",
      params: { name },
    });
  },

  addUser(username, password) {
    return request({
      method: "PUT",
      url: "/manager/user",
      data: { username, password },
    });
  },

  addRole(name) {
    return request({
      method: "PUT",
      url: "/manager/role",
      data: { name },
    });
  },
};
