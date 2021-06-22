/*
 * @LastEditTime: 2021-06-22 16:59:18
 * @Description: 
 * @Tags: @异步路由 @router
 * @FilePath: /framework_web/src/router/async/router.map.js
 */

// 视图组件
const view = {
  tabs: () => import("@/layouts/tabs"),
  blank: () => import("@/layouts/BlankView"),
  page: () => import("@/layouts/PageView")
};

// 路由组件注册
const routerMap = {
  login: {
    authority: "*",
    path: "/login",
    name: "登录",
    component: () => import("@/pages/login")
  },
  root: {
    path: "/",
    name: "首页",
    redirect: "/login",
    component: view.tabs
  },
  dashboard: {
    name: "工作台",
    path: "/dashboard",
    meta: { icon: "dashboard" },
    component: () => import("@/pages/dashboard/workplace")
  },
  // ================= = demo实例 = ======================
  demo: {
    path: "/demo",
    name: "demo实例",
    meta: { icon: "code", },
    component: view.blank
  },
  richText: {
    path: "/richText",
    name: "富文本组件",
    component: () => import("@/pages/demo/richtext")
  },
  generalTable: {
    path: "/generalTable",
    name: "通用表格",
    component: () => import("@/pages/demo/generalTable")
  },
  demoDetails: {
    path: "/demoDetails",
    name: "带参详情页",
    meta: { invisible: true },
    component: () => import("@/pages/demo/details")
  },
  module: {
    path: "/model",
    name: "功能模块",
    redirect: "/moduleTable",
    component: view.blank
  },
  moduleDetails: {
    path: "/moduleDetails",
    name: "模块详情",
    meta: { invisible: true },
    component: () => import("@/pages/demo/details")
  },
  moduleTable: {
    path: "/moduleTable",
    name: "模块列表",
    meta: { invisible: true },
    component: () => import("@/pages/demo/generalTable")
  },
  // ================= = 权限控制部分 = ======================
  PermissionControl: {
    path: "/PermissionControl",
    name: "权限控制",
    meta: { icon: "control" },
    component: view.page,
  },
  user: {
    name: "用户管理",
    path: "/user",
    component: () => import("@/pages/permissions/user")
  },
  role: {
    name: "角色管理",
    path: "/role",
    component: () => import("@/pages/permissions/role")
  },
  menu: {
    name: "菜单管理",
    path: "/menu",
    component: () => import("@/pages/permissions/menu")
  },
  // ================= = 其他 = ======================
  swagger: {
    name: "接口文档",
    path: "/swagger",
    icon: "file-word",
    link: `${process.env.VUE_APP_API_BASE_URL}/swagger-ui.html#/`
  },
  // ===================== = 异常页 = ===================
  exp403: {
    authority: "*",
    name: "exp403",
    path: "403",
    component: () => import("@/pages/exception/403")
  },
  exp404: {
    name: "exp404",
    path: "404",
    component: () => import("@/pages/exception/404")
  },
  exp500: {
    name: "exp500",
    path: "500",
    component: () => import("@/pages/exception/500")
  },
};
export default routerMap;

