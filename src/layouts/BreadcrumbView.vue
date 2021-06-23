<!--
 * @LastEditTime: 2021-06-23 14:20:33
 * @Description: 只有面包屑导航的空白页面
 * @Tags: 
 * @FilePath: /framework_web/src/layouts/BreadcrumbView.vue
-->
<template>
  <page-toggle-transition :disabled="animate.disabled"
                          :animate="animate.name"
                          :direction="animate.direction">
    <div>
      <!-- 面包屑导航 -->
      <div class="breadcrumb">
        <a-breadcrumb>
          <a-breadcrumb-item :key="index"
                             v-for="(item, index) in breadcrumb">
            <a v-if="breadcrumbLink[index]"
               :href="breadcrumbLink[index]">{{item}}</a>
            <span v-else>{{item}}</span>
          </a-breadcrumb-item>
        </a-breadcrumb>
      </div>
      <router-view />
    </div>
  </page-toggle-transition>
</template>

<script>
import PageToggleTransition from "../components/transition/PageToggleTransition";
import { mapState } from "vuex";
import { getI18nKey } from "@/utils/routerUtil";
export default {
  name: "BlankView",
  components: { PageToggleTransition },
  data () {
    return {
      breadcrumbLink: []
    };
  },
  computed: {
    ...mapState("setting", ["multiPage", "animate"]),
    breadcrumb () {
      let page = this.page;
      let breadcrumb = page && page.breadcrumb;
      if (breadcrumb) {
        let i18nBreadcrumb = [];
        breadcrumb.forEach(item => {
          i18nBreadcrumb.push(this.$t(item));
        });
        return i18nBreadcrumb;
      } else {
        return this.getRouteBreadcrumb();
      }
    },
  },
  methods: {
    getRouteBreadcrumb () {
      // 面包屑的链接
      this.breadcrumbLink = [];
      let routes = this.$route.matched;
      const path = this.$route.path;
      let breadcrumb = [];
      routes.filter(item => path.includes(item.path))
        .forEach(route => {
          const path = route.path.length === 0 ? "/home" : route.path;
          breadcrumb.push(this.$t(getI18nKey(path)));
          this.breadcrumbLink.push(route.path);
        });
      let pageTitle = this.page && this.page.title;
      if (this.customTitle || pageTitle) {
        breadcrumb[breadcrumb.length - 1] = this.customTitle || pageTitle;
      }
      return breadcrumb;
    },
  }
};
</script>

<style  lang="less" scoped>
.breadcrumb {
  background: @base-bg-color;
  margin: -24px -24px 20px;
  padding: 16px 24px;
}
// 白底无边页面
.new-page {
  background-color: @base-bg-color;
  box-sizing: border-box;
  // 64是header高度 26是面包屑高度 101是页脚高度
  min-height: calc(100vh - 64px - 26px - 101px);
  height: auto;
  padding: 10px 24px 10px;
  margin: -24px;
  overflow: visible;
}
</style>
