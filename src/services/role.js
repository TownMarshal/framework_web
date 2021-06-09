/*
 * @LastEditTime: 2021-06-09 15:08:56
 * @Description: 角色表相关接口
 * @Tags: 
 * @FilePath: /vue-antd-admin/src/services/role.js
 */
import {
  ROLE_ADD,
  ROLE_DELETE,
  ROLE_QUERY,
  ROLE_SELECT,
  ROLE_UPDATE,
} from "@/services/api";
import { request } from "@/utils/request";

// 保存角色信息
async function save (params = {}) {
  if (params.id) {
    return request(ROLE_ADD, "form", params);
  } else {
    return request(ROLE_UPDATE, "form", params);
  }
}

async function query (params = {}) {
  return request(ROLE_QUERY, "form", params);
}

export default {
  save,
  query
};
