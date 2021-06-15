<!--
 * @LastEditTime: 2021-06-15 11:20:01
 * @Description: 
 * @Tags: 
 * @FilePath: /vue-antd-admin/src/pages/exception/403.vue
-->
<template>
  <exception-page home-route="/dashboard" :style="`min-height: ${minHeight}`" type="403" />
</template>

<script>
import ExceptionPage from "@/components/exception/ExceptionPage";
import {mapState} from "vuex";
export default {
  name: "Exp403",
  components: {ExceptionPage},
  computed: {
    ...mapState("setting", ["pageMinHeight"]),
    minHeight() {
      return this.pageMinHeight ? this.pageMinHeight + "px" : "100vh";
    }
  }
};
</script>

<style scoped lang="less">
</style>
