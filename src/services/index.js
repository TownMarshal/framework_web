/*
 * @LastEditTime: 2021-06-16 11:39:14
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
import file from "./file";

export {
  userService,
  dataSource,
  role,
  routerTab,
  file,
};
