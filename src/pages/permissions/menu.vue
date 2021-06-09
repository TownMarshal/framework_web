<!--
 * @LastEditTime: 2021-06-09 15:52:47
 * @Description: 
 * @Tags: 
 * @FilePath: /vue-antd-admin/src/pages/permissions/menu.vue
-->
<template>
  <a-card :bordered="false">
    菜单管理
  </a-card>
</template>

<script>
import { routerTab } from "@/services";
export default {
  mounted () {
    routerTab.query().then(res => {
      console.log(res);
    });
  }
};
</script>

<style>
</style>