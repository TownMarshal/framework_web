/*
 * @LastEditTime: 2021-06-15 15:12:21
 * @Description: @main.js
 * @Tags: 
 * @FilePath: /vue-antd-admin/src/main.js
 */
import Vue from "vue";
import App from "./App.vue";
import { initRouter } from "./router";
import "./theme/index.less";
import Antd from "ant-design-vue";
import Viser from "viser-vue";
// import "@/mock";
import store from "./store";
import "animate.css/source/animate.css";
import Plugins from "@/plugins";
import { initI18n } from "@/utils/i18n";
import bootstrap from "@/bootstrap";
import "moment/locale/zh-cn";

const router = initRouter(store.state.setting.asyncRoutes);
const i18n = initI18n("CN", "US");

Vue.use(Antd);
Vue.config.productionTip = false;
Vue.use(Viser);
Vue.use(Plugins);


// 挂载模拟子权限 使用路由表模拟的按钮权限控制
// 使用实例  {{$permissions("routerName")}}
Vue.prototype.$permissions = function (target) {
  let menuData = this.$store.state.setting.allMenu;
  return menuData.includes(target);
};

bootstrap({ router, store, i18n, message: Vue.prototype.$message });
new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount("#app");