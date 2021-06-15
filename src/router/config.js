/*
 * @LastEditTime: 2021-06-15 17:23:34
 * @Description: 
 * @Tags: 
 * @FilePath: /vue-antd-admin/src/router/config.js
 */
// 视图组件
const view = {
  tabs: () => import("@/layouts/tabs"),
  blank: () => import("@/layouts/BlankView"),
  page: () => import("@/layouts/PageView")
};

// 路由配置 @router
const options = {
  routes: [
    {
      path: "/login",
      name: "登录页",
      component: () => import("@/pages/login")
    },
    {
      path: "*",
      name: "404",
      component: () => import("@/pages/exception/404"),
    },
    {
      path: "/403",
      name: "403",
      component: () => import("@/pages/exception/403"),
    },
    {
      path: "/",
      name: "首页",
      component: view.tabs,
      redirect: "/login",
      children: [
        {
          path: "dashboard",
          name: "工作台",
          meta: { icon: "dashboard" },
          component: () => import("@/pages/dashboard/workplace"),
        },
        {
          path: "PermissionControl",
          name: "权限控制",
          meta: { icon: "control" },
          component: view.page,
          children: [
            {
              path: "user",
              name: "用户管理",
              component: () => import("@/pages/permissions/user"),
            },
            {
              path: "role",
              name: "角色管理",
              component: () => import("@/pages/permissions/role"),
            },
            {
              path: "menu",
              name: "菜单管理",
              component: () => import("@/pages/permissions/menu"),
            },
          ]
        },

        // ========== = 原始自带路由 不使用可直接删除 = ============
      ]
    },

  ]
};

export default options;
