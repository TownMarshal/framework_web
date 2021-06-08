/*
 * @LastEditTime: 2021-06-08 16:42:25
 * @Description: 
 * @Tags: 
 * @FilePath: /vue-antd-admin/src/services/user.js
 */
import { LOGIN, ROUTES } from "@/services/api";
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
export function logout () {
  localStorage.removeItem(process.env.VUE_APP_ROUTES_KEY);
  localStorage.removeItem(process.env.VUE_APP_PERMISSIONS_KEY);
  localStorage.removeItem(process.env.VUE_APP_ROLES_KEY);
  removeAuthorization();
}
export default {
  login,
  logout,
  getRoutesConfig
};
