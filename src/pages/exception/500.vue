<!--
 * @LastEditTime: 2021-06-16 15:02:10
 * @Description: 
 * @Tags: 
 * @FilePath: /vue-antd-admin/src/pages/exception/500.vue
-->
<template>
  <exception-page home-route="/dashboard"
                  :style="`min-height: ${minHeight}`"
                  type="500" />
</template>

<script>
import ExceptionPage from "@/components/exception/ExceptionPage";
import { mapState } from "vuex";
export default {
  name: "Exp500",
  components: { ExceptionPage },
  computed: {
    ...mapState("setting", ["pageMinHeight"]),
    minHeight () {
      return this.pageMinHeight ? this.pageMinHeight + "px" : "100vh";
    }
  }
};
</script>

<style scoped lang="less">
</style>
