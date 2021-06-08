/*
 * @LastEditTime: 2021-06-08 16:42:33
 * @Description: 
 * @Tags: 
 * @FilePath: /vue-antd-admin/src/services/dataSource.js
 */
import {GOODS, GOODS_COLUMNS} from "./api";
import {request} from "@/utils/request";

export async function goodsList(params) {
  return request(GOODS, "get", params);
}

export async function goodsColumns() {
  return request(GOODS_COLUMNS, "get");
}

export default {goodsList, goodsColumns};