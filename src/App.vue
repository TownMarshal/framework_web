<!--
 * @LastEditTime: 2021-06-15 15:29:45
 * @Description: 
 * @Tags: 
 * @FilePath: /vue-antd-admin/src/App.vue
-->
<template>
  <a-config-provider :locale="locale" :get-popup-container="popContainer">
    <router-view />
  </a-config-provider>
</template>

<script>
import { enquireScreen } from "./utils/util";
import { mapState, mapMutations } from "vuex";
import themeUtil from "@/utils/themeUtil";
import { getI18nKey } from "@/utils/routerUtil";

import { getRoutesConfig } from "@/services/user";
import { loadRoutes } from "@/utils/routerUtil";

export default {
  name: "App",
  data () {
    return {
      locale: {}
    };
  },
  created () {
    this.setHtmlTitle();
    this.setLanguage(this.lang);
    enquireScreen(isMobile => this.setDevice(isMobile));
  },
  mounted () {
    this.setWeekModeTheme(this.weekMode);
    let token = localStorage.getItem("token");
    if (token) {
      this.getAsyncRouter();
    }
  },
  watch: {
    weekMode (val) {
      this.setWeekModeTheme(val);
    },
    lang (val) {
      this.setLanguage(val);
      this.setHtmlTitle();
    },
    $route () {
      this.setHtmlTitle();
    },
    "theme.mode": function (val) {
      let closeMessage = this.$message.loading(`您选择了主题模式 ${val}, 正在切换...`);
      themeUtil.changeThemeColor(this.theme.color, val).then(closeMessage);
    },
    "theme.color": function (val) {
      let closeMessage = this.$message.loading(`您选择了主题色 ${val}, 正在切换...`);
      themeUtil.changeThemeColor(val, this.theme.mode).then(closeMessage);
    },
    "layout": function () {
      window.dispatchEvent(new Event("resize"));
    }
  },
  computed: {
    ...mapState("setting", ["layout", "theme", "weekMode", "lang"])
  },
  methods: {
    ...mapMutations("setting", ["setDevice"]),
    setWeekModeTheme (weekMode) {
      if (weekMode) {
        document.body.classList.add("week-mode");
      } else {
        document.body.classList.remove("week-mode");
      }
    },
    setLanguage (lang) {
      this.$i18n.locale = lang;
      switch (lang) {
        case "CN":
          this.locale = require("ant-design-vue/es/locale-provider/zh_CN").default;
          break;
        case "HK":
          this.locale = require("ant-design-vue/es/locale-provider/zh_TW").default;
          break;
        case "US":
        default:
          this.locale = require("ant-design-vue/es/locale-provider/en_US").default;
          break;
      }
    },
    setHtmlTitle () {
      const route = this.$route;
      const key = route.path === "/" ? "home.name" : getI18nKey(route.matched[route.matched.length - 1].path);
      document.title = process.env.VUE_APP_NAME + " | " + this.$t(key);
    },
    popContainer () {
      return document.getElementById("popContainer");
    },
    //  更新路由权限
    getAsyncRouter () {
      // 获取异步路由
      getRoutesConfig().then(res => {
        // 格式化异步路由
        let RouterConfig = [{
          router: "root",
          children: [
            "dashboard",
            ...res.data.data.map(item => {
              return {
                router: item.url,
                children: this.childrenFor(item)
              };
            })]
        }];
        // 加载异步路由
        loadRoutes(RouterConfig);
        // 存储路由表
        this.$store.commit("setting/setAllMenu", RouterConfig);
      });
    },
    // 子层级循环函数
    childrenFor (item) {
      if (item.childrenList) {
        let list = item.childrenList.map(Citem => {
          return {
            router: Citem.url,
            children: this.childrenFor(Citem)
          };
        });
        return list;
      } else {
        return [];
      }
    },
  }
};
</script>
