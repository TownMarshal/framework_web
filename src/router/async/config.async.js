/*
 * @LastEditTime: 2021-06-15 15:47:54
 * @Description: 异步路由配置
 * @Tags: 
 * @FilePath: /vue-antd-admin/src/router/async/config.async.js
 */
import routerMap from "./router.map";
import { parseRoutes } from "@/utils/routerUtil";

// 异步路由配置
const routesConfig = [
  "login",
  "root",
  {
    router: "exp404",
    path: "*",
    name: "404"
  },
  {
    router: "exp403",
    path: "/403",
    name: "403"
  },
];

const options = {
  routes: parseRoutes(routesConfig, routerMap)
};

export default options;
