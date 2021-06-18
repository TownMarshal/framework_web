/*
 * @LastEditTime: 2021-06-18 11:52:12
 * @Description:
 * @Tags:
 * @FilePath: /framework_web/src/services/obs.js
 */
import ObsClient from "@/utils/esdk-obs-browserjs-without-polyfill-3.19.9.min.js";

let config = {
  // 桶名称
  Bucket: "test2021^",
  // 配置AK
  access_key_id: "L6F5CWK73XWK4Q9KMYRF",
  // 配置SK
  secret_access_key: "aAQMMxoylueo6p2ZPBjUNguJYv9Wx4ouFT49U8Y7",
  // 配置服务地址 endpoint
  server: "obs.cn-east-2.myhuaweicloud.com"
};

// 获取临时ak/sk
var OBS = new ObsClient({
  access_key_id: config.access_key_id,
  secret_access_key: config.secret_access_key,
  server: config.server,
  // 超时时间 (秒)
  timeout: 60 * 5,
  // 是否使用自定义域名访问OBS Boolean 默认false
  is_cname: false,
  // 是否使用原生XHR请求 Boolean 默认false
  useRawXhr: false
});


// this.$obs.Upload(e.target.files[0])
// .then(result => {
//   console.log(result);
// });
export async function Upload (file, filePath) {
  let date = "" + new Date().getFullYear() + (new Date().getMonth() > 9 ? new Date().getMonth() + 1 : "0" + (new Date().getMonth() + 1)) + (new Date().getDate() > 9 ? new Date().getDate() : ("0" + new Date().getDate()));

  let FilePath = filePath || `/${date}/${new Date().getTime()}-${file.name}`;

  let result = await OBS.putObject({
    Bucket: config.Bucket,
    // 文件名
    Key: FilePath,
    // 文件
    SourceFile: file,
  });
  if (result.CommonMsg.Status > 300) {
    return {
      code: result.CommonMsg.Status,
      msg: "上传失败",
    };
  } else {
    return {
      code: 200,
      msg: "上传成功",
      url: `https://${config.Bucket}.${config.server}/${FilePath}`,
      key: FilePath,
    };
  }
}

// this.$obs.Access("https://test20212021.obs.cn-east-2.myhuaweicloud.com/test/20210618/1623986962378-91622606462_.pic_hd.jpg")
export function Access (key) {
  var getObjectResult = OBS.createSignedUrlSync({
    Method: "GET",
    Bucket: config.Bucket,
    Key: decodeURI(
      key.replace(`https://${config.Bucket}.${config.server}/`, "")
    )
  });
  return getObjectResult["SignedUrl"];
}

export default {
  Upload,
  Access
};