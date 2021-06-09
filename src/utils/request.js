import axios from "axios";
import Cookie from "js-cookie";
import qs from "qs";

// 跨域认证信息 header 名
const xsrfHeaderName = "Authorization";

// jwt Token验证相关
let token = localStorage.getItem("token");
axios.defaults.timeout = 5000;
axios.defaults.withCredentials = true;
if (token) {
  axios.defaults.headers.common["Access-Token"] = token;
}

/**
 * axios请求
 * @param url 请求地址
 * @param method {METHOD} http method
 * @param params 请求参数
 * @returns {Promise<AxiosResponse<T>>}
 */
async function request (url, method, params, config) {
  switch (method) {
    case "get":
      return axios.get(url, { params, ...config });
    case "post":
      return axios.post(url, params, config);
    case "form":
      return axios.post(
        url,
        qs.stringify(params),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        }
      );
    default:
      return axios.get(url, { params, ...config });
  }
}

/**
 * 设置认证信息
 * @param auth {Object}
 * @param authType 认证类型，默认：{"Bearer"}
 */
function setAuthorization (auth, authType = "Bearer") {
  switch (authType) {
    case "Bearer":
      Cookie.set(xsrfHeaderName, "Bearer " + auth.token, { expires: auth.expireAt });
      break;
    case "token":
      // auth.token = 1;
      localStorage.setItem("token", auth.token);
      token = auth.token;
      axios.defaults.headers.common["Access-Token"] = auth.token;
      break;
    case "basic":
    case "auth1":
    case "auth2":
    default:
      break;
  }
}

/**
 * 移出认证信息
 * @param authType 认证类型
 */
function removeAuthorization (authType = "Bearer") {
  switch (authType) {
    case "Bearer":
      Cookie.remove(xsrfHeaderName);
      break;
    case "token":
      localStorage.removeItem("token");
      token = null;
      if (axios.defaults.headers.common.Authorization) {
        delete axios.defaults.headers.common.Authorization;
      }
      break;
    case "basic":
    case "auth1":
    case "auth2":
    default:
      break;
  }
}

/**
 * 检查认证信息
 * @param authType
 * @returns {boolean}
 */
function checkAuthorization (authType = "Bearer") {
  switch (authType) {
    case "Bearer":
      if (Cookie.get(xsrfHeaderName)) {
        return true;
      }
      break;
    case "token":
      if (token) {
        return true;
      }
      break;
    case "basic":
    case "auth1":
    case "auth2":
    default:
      break;
  }
  return false;
}

/**
 * 加载 axios 拦截器
 * @param interceptors
 * @param options
 */
function loadInterceptors (interceptors, options) {
  const { request, response } = interceptors;
  // 加载请求拦截器
  request.forEach(item => {
    let { onFulfilled, onRejected } = item;
    if (!onFulfilled || typeof onFulfilled !== "function") {
      onFulfilled = config => config;
    }
    if (!onRejected || typeof onRejected !== "function") {
      onRejected = error => Promise.reject(error);
    }
    axios.interceptors.request.use(
      config => onFulfilled(config, options),
      error => onRejected(error, options)
    );
  });
  // 加载响应拦截器
  response.forEach(item => {
    let { onFulfilled, onRejected } = item;
    if (!onFulfilled || typeof onFulfilled !== "function") {
      onFulfilled = response => response;
    }
    if (!onRejected || typeof onRejected !== "function") {
      onRejected = error => Promise.reject(error);
    }
    axios.interceptors.response.use(
      response => onFulfilled(response, options),
      error => onRejected(error, options)
    );
  });
}

/**
 * 解析 url 中的参数
 * @param url
 * @returns {Object}
 */
function parseUrlParams (url) {
  const params = {};
  if (!url || url === "" || typeof url !== "string") {
    return params;
  }
  const paramsStr = url.split("?")[1];
  if (!paramsStr) {
    return params;
  }
  const paramsArr = paramsStr.replace(/&|=/g, " ").split(" ");
  for (let i = 0; i < paramsArr.length / 2; i++) {
    const value = paramsArr[i * 2 + 1];
    params[paramsArr[i * 2]] = value === "true" ? true : (value === "false" ? false : value);
  }
  return params;
}

export {
  request,
  setAuthorization,
  removeAuthorization,
  checkAuthorization,
  loadInterceptors,
  parseUrlParams
};
