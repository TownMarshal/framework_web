/*
 * @LastEditTime: 2021-06-10 09:27:39
 * @Description: 
 * @Tags: @api @baseURL
 * @FilePath: /vue-antd-admin/src/services/api.js
 */
// @swagger
// http://192.168.1.110:8999/swagger-ui.html#/

// 跨域代理前缀
const API_PROXY_PREFIX = "/api";
const BASE_URL = process.env.NODE_ENV === "production" ?
  process.env.VUE_APP_API_BASE_URL : API_PROXY_PREFIX;

module.exports = {
  // 登录
  LOGIN: `${BASE_URL}/login`,
  // 获取异步路由
  ROUTES: `${BASE_URL}/routes`,
  GOODS: `${BASE_URL}/goods`,
  GOODS_COLUMNS: `${BASE_URL}/columns`,

  // ================ = 用户管理 = =====================
  USER_ADD:`${BASE_URL}/sysUser/add`,
  USER_DELETE:`${BASE_URL}/sysUser/delete`,
  USER_SELECT:`${BASE_URL}/sysUser/select`,
  USER_UPDATE:`${BASE_URL}/sysUser/update`,

  // ================ = 角色管理 = =====================
  ROLE_ADD: `${BASE_URL}/sysRole/add`,
  ROLE_DELETE: `${BASE_URL}/sysRole/delete`,
  ROLE_QUERY: `${BASE_URL}/sysRole/select`,
  ROLE_SELECT: `${BASE_URL}/sysRole/selectList`,
  ROLE_UPDATE: `${BASE_URL}/sysRole/update`,

  // ============= = 权限管理(路由表) = ====================
  ROUTER_ADD: `${BASE_URL}/sysPermission/add`,
  ROUTER_DELETE: `${BASE_URL}/sysPermission/delete`,
  ROUTER_QUERU: `${BASE_URL}/sysPermission/selectTree`,
  ROUTER_UPDATE: `${BASE_URL}/sysPermission/update`,

};
