/*
 * @LastEditTime: 2021-06-10 15:39:11
 * @Description: 角色表相关接口
 * @Tags: 
 * @FilePath: /vue-antd-admin/src/services/role.js
 */
import {
  ROLE_ADD,
  ROLE_DELETE,
  ROLE_QUERY,
  // ROLE_SELECT,
  ROLE_UPDATE,
  // 保存角色路由
  ROLE_SAVE_ROUTER,
  // 查询角色路由
  ROLE_QUERY_ROUTER
} from "@/services/api";
import { request } from "@/utils/request";

// 保存角色信息
async function save (params = {}) {
  if (params.id) {
    return request(ROLE_UPDATE, "post", params);
  } else {
    return request(ROLE_ADD, "post", params);
  }
}

async function query (params = {}) {
  return request(ROLE_QUERY, "post", params);
}

// 移除路由
async function remove (param) {
  return request(ROLE_DELETE, "delete", {
    id: typeof param == "object" ? param.id : param
  });
}

// 为角色添加菜单
async function RoleAddRouter (params = {}) {
  return request(ROLE_SAVE_ROUTER, "post", params);
}
// 查询角色路由
async function RoleQueryRouter (params = {}) {
  return request(ROLE_QUERY_ROUTER, "get", params);
}

export default {
  save,
  query,
  remove,
  RoleAddRouter,
  RoleQueryRouter
};
