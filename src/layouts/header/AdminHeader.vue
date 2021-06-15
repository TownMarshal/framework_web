<!--
 * @LastEditTime: 2021-06-15 17:12:36
 * @Description: 头部
 * @Tags: @header
 * @FilePath: /vue-antd-admin/src/layouts/header/AdminHeader.vue
-->

<template>
  <a-layout-header :class="[headerTheme, 'admin-header']">
    <div :class="['admin-header-wide', layout, pageWidth]">
      <router-link v-if="isMobile || layout === 'head'" to="/" :class="['logo', isMobile ? null : 'pc', headerTheme]">
        <img width="32" src="@/assets/img/logo.png" />
        <h1 v-if="!isMobile">{{systemName}}</h1>
      </router-link>
      <a-divider v-if="isMobile" type="vertical" />
      <a-icon v-if="layout !== 'head'" class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="toggleCollapse" />

      <div v-if="layout !== 'side' && !isMobile" class="admin-header-menu" :style="`width: ${menuWidth};`">
        <i-menu class="head-menu" :theme="headerTheme" mode="horizontal" :options="menuData" @select="onSelect" />
      </div>
      <div :class="['admin-header-right', headerTheme]">

        <!-- 通知列表 -->
        <header-notice class="header-item" />
        <!-- 全屏 -->
        <div style="font-size:18px;padding:0 12px;">
          <a-icon :type="fullscreen? 'fullscreen-exit':'fullscreen'" @click="handleFullScreen" />
        </div>
        <!-- 用户头像 -->
        <header-avatar class="header-item" />

        <!-- 多语言切换 -->
        <a-dropdown class="lang header-item" v-show="false">
          <div>
            <a-icon type="global" /> {{langAlias}}
          </div>
          <a-menu @click="val => setLang(val.key)" :selected-keys="[lang]" slot="overlay">
            <a-menu-item v-for=" lang in langList" :key="lang.key">{{lang.key.toLowerCase() + ' ' + lang.name}}</a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
    </div>
  </a-layout-header>
</template>

<script>
import HeaderNotice from "./HeaderNotice";
import HeaderAvatar from "./HeaderAvatar";
import IMenu from "@/components/menu/menu";
import { mapState, mapMutations } from "vuex";

export default {
  name: "AdminHeader",
  components: { IMenu, HeaderAvatar, HeaderNotice },
  props: ["collapsed", "menuData"],
  data () {
    return {
      langList: [
        { key: "CN", name: "简体中文", alias: "简体" },
        { key: "HK", name: "繁體中文", alias: "繁體" },
        { key: "US", name: "English", alias: "English" }
      ],
      fullscreen: false,
      searchActive: false
    };
  },
  computed: {
    ...mapState("setting", ["theme", "isMobile", "layout", "systemName", "lang", "pageWidth"]),
    headerTheme () {
      if (this.layout == "side" && this.theme.mode == "dark" && !this.isMobile) {
        return "light";
      }
      return this.theme.mode;
    },
    langAlias () {
      let lang = this.langList.find(item => item.key == this.lang);
      return lang.alias;
    },
    menuWidth () {
      const { layout, searchActive } = this;
      const headWidth = layout === "head" ? "100% - 188px" : "100%";
      const extraWidth = searchActive ? "600px" : "400px";
      return `calc(${headWidth} - ${extraWidth})`;
    }
  },
  methods: {
    toggleCollapse () {
      this.$emit("toggleCollapse");
    },
    onSelect (obj) {
      this.$emit("menuSelect", obj);
    },
    // 切换全屏
    handleFullScreen () {
      let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    },
    ...mapMutations("setting", ["setLang"])
  }
};
</script>

<style lang="less" scoped>
@import 'index';
</style>
