/*
 * @LastEditTime: 2021-06-15 14:25:15
 * @Description: 
 * @Tags: @异步路由
 * @FilePath: /vue-antd-admin/src/router/async/router.map.js
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

