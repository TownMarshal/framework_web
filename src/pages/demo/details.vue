<!--
 * @LastEditTime: 2021-06-16 11:01:28
 * @Description: 带参详情页
 * @Tags: 
 * @FilePath: /vue-antd-admin/src/pages/demo/details.vue
-->
<template>
  <a-card>
    当前id:{{$route.query.id}}
  </a-card>
</template>

<script>
export default {
  created () {
    console.log(
      `%c${"created"}`,
      "background:red;font-size:30px;color:white;font-weight:bloder"
    );
    // 在新页面中设置标题
    // this.$setPageTitle(this.$route, this.$route.query.id);
  }
};
</script>

<style lang="less" scoped>
</style>