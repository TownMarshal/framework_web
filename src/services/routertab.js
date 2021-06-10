/*
 * @LastEditTime: 2021-06-10 08:54:29
 * @Description: 路由表相关操作接口
 * @Tags:
 * @FilePath: /vue-antd-admin/src/services/routertab.js
 */
import {
  ROUTER_ADD,
  ROUTER_DELETE,
  ROUTER_QUERU,
  ROUTER_UPDATE
} from "@/services/api";
import { request } from "@/utils/request";

// 保存角色信息
async function save (params = {}) {
  console.log(params);
  if (params.id) {
    return request(ROUTER_UPDATE, "form", params);
  } else {
    return request(ROUTER_ADD, "form", params);
  }
}
// 查询路由树
async function query (params = {}) {
  return request(ROUTER_QUERU, "get", params);
}

// 移除路由
async function remove (param) {
  return request(ROUTER_DELETE, "delete", {
    id: typeof param == "object" ? param.id : param
  });
}

export default {
  save,
  query,
  remove
};
