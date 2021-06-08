/*
 * @LastEditTime: 2021-06-08 17:06:39
 * @Description: 
 * @Tags: 
 * @FilePath: /vue-antd-admin/src/services/api.js
 */

// 跨域代理前缀
// const API_PROXY_PREFIX='/api'
// const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_API_BASE_URL : API_PROXY_PREFIX

const BASE_URL = process.env.VUE_APP_API_BASE_URL;

module.exports = {
  // 登录
  LOGIN: "http://192.168.1.110:8999/login",
  // 获取异步路由
  ROUTES: `${BASE_URL}/routes`,

  GOODS: `${BASE_URL}/goods`,
  GOODS_COLUMNS: `${BASE_URL}/columns`,
};
