/*
 * @LastEditTime: 2021-06-18 11:47:53
 * @Description: 使用时 import { role as ? } from "@/services";
 * @Tags: @API集成引入
 * @FilePath: /framework_web/src/services/index.js
 */

// 华为OBS方法
import obs from "./obs";

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
  obs
};
