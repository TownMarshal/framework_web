/*
 * @LastEditTime: 2021-06-16 11:38:23
 * @Description: @文件上传
 * @Tags: 
 * @FilePath: /vue-antd-admin/src/services/file.js
 */
import {
  FILE_UPLOAD
} from "@/services/api";
import { request } from "@/utils/request";

// MinIo上传文件
export async function MinIoUpload (file) {
  let formdata = new FormData();
  formdata.append("file", file);
  return request(FILE_UPLOAD, "post", formdata);
}

export default {
  MinIoUpload
};
