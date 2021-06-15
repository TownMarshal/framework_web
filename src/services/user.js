/*
 * @LastEditTime: 2021-06-15 16:24:55
 * @Description: 
 * @Tags: 
 * @FilePath: /vue-antd-admin/src/services/user.js
 */
import {
  LOGIN,
  ROUTES,
  USER_ADD,
  USER_UPDATE,
  USER_SELECT,
  USER_DELETE,
  // 根据用户查他的角色
  USER_QUERY_ROLE
} from "@/services/api";
import { request, removeAuthorization } from "@/utils/request";

/**
 * 登录服务
 * @param name 账户名
 * @param password 账户密码
 * @returns {Promise<AxiosResponse<T>>}
 */

export async function login (name, password) {
  return request(LOGIN, "form", {
    username: name,
    password: password
  });
}

export async function getRoutesConfig () {
  return request(ROUTES, "get");
}

/**
 * 退出登录
 */
export function logout (options) {
  localStorage.removeItem(process.env.VUE_APP_ROUTES_KEY);
  localStorage.removeItem(process.env.VUE_APP_PERMISSIONS_KEY);
  localStorage.removeItem(process.env.VUE_APP_ROLES_KEY);
  options.router.push("/login");
  removeAuthorization("token");
}


// 保存信息用户
export async function save (params = {}) {
  if (params.id) {
    return request(USER_UPDATE, "post", params);
  } else {
    return request(USER_ADD, "post", params);
  }
}
// 查询路由树
export async function query (params = {}) {
  return request(USER_SELECT, "post", params);
}

// 移除路由
export async function remove (param) {
  return request(USER_DELETE, "delete", {
    id: typeof param == "object" ? param.id : param
  });
}


export async function QueryRole (param) {
  return request(USER_QUERY_ROLE, "get", param);
}


export default {
  login,
  logout,
  getRoutesConfig,
  save,
  query,
  remove,
  QueryRole
};
