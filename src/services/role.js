/*
 * @LastEditTime: 2021-06-10 11:05:52
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
    return request(ROLE_ADD, "post", params);
  } else {
    return request(ROLE_UPDATE, "post", params);
  }
}

async function query (params = {}) {
  return request(ROLE_QUERY, "post", params);
}

export default {
  save,
  query
};
