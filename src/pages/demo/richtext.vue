<!--
 * @LastEditTime: 2021-06-16 09:07:01
 * @Description: 
 * @Tags: 
 * @FilePath: /vue-antd-admin/src/pages/demo/richtext.vue
-->
<template>
  <a-card>
    <div style="display:flex;flex-wrap:wrap;">
      <!-- 富文本组件 使用时引用 -->
      <EditorBar v-model="content" :height="200" style="width:50%;min-width:550px;flex-grow:1" />
      <textarea v-model="content" style="width:50%;flex-grow:1" placeholder="只读代码预览" readonly></textarea>
    </div>
    <div v-html="content" style="min-height:200px;"></div>
  </a-card>
</template>

<script>
import EditorBar from "@/components/wangEditor.vue";
export default {
  components: {
    EditorBar,
  },
  data () {
    return {
      desc: "描述",
      content: "",
    };
  }
};
</script>

<style>
</style>