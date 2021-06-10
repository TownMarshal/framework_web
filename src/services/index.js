/*
 * @LastEditTime: 2021-06-10 14:18:58
 * @Description: 使用时 import { role as ? } from "@/services";
 * @Tags: @API集成引入
 * @FilePath: /vue-antd-admin/src/services/index.js
 */
import userService from "./user";
import dataSource from "./dataSource";
// 角色表
import role from "./role";
// 路由表
import routerTab from "./routertab";

export {
  userService,
  dataSource,
  role,
  routerTab,
};
