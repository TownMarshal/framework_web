/*
 * @LastEditTime: 2021-06-09 09:39:14
 * @Description: 
 * @Tags: @api @baseURL
 * @FilePath: /vue-antd-admin/src/services/api.js
 */
// 跨域代理前缀
// const API_PROXY_PREFIX='/api'
// const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_API_BASE_URL : API_PROXY_PREFIX

// @swagger
// http://192.168.1.110:8999/swagger-ui.html#/

// 本地调试
let BASE_URL = "http://192.168.1.110:8999";

// 线上
// eslint-disable-next-line
if (process.env.NODE_ENV === 'production' || false) {
  BASE_URL = process.env.VUE_APP_API_BASE_URL;
}

module.exports = {
  // 登录
  LOGIN: `${BASE_URL}/login`,
  // 获取异步路由
  ROUTES: `${BASE_URL}/routes`,
  GOODS: `${BASE_URL}/goods`,
  GOODS_COLUMNS: `${BASE_URL}/columns`,
};
