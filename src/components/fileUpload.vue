<!--
 * @LastEditTime: 2021-06-16 14:18:40
 * @Description: 
 * @Tags: 
 * @FilePath: /vue-antd-admin/src/components/fileUpload.vue
-->
<template>
  <div>
    <a-upload name="file" :multiple="multiple" :customRequest="uploadFile" v-model="fileList" @change="handleChange">
      <a-button>上传</a-button>
    </a-upload>
  </div>
</template>

<script>
import { file } from "@/services";
export default {
  name: "FileUpload",
  props: {
    multiple: {
      type: Boolean,
      default: false
    },
    value: {
      type: Array,
      default: function () {
        return [];
      }
    },
  },
  model: {
    prop: "value",
    event: "change",
  },
  watch: {
    value: function (value) {
      this.fileList = value;
    }
  },
  data () {
    return {
      fileList: []
    };
  },
  methods: {
    uploadFile (option) {
      file.MinIoUpload(option.file).then(res => {
        if (res.data.code == 200) {
          option.onSuccess(res.data);
        } else {
          option.onError(res.data);
        }
      });
    },
    handleChange (info) {
      this.fileList = [...info.fileList];
      // 将内容同步到父组件中
      this.$emit("change", this.fileList);
      // if (info.file.status !== "uploading") {
      //   console.log("uploading", info.file, info.fileList);
      // }
      // if (info.file.status === "done") {
      //   this.$message.success(`${info.file.name} 上传成功`);
      // } else if (info.file.status === "error") {
      //   this.$message.error(`${info.file.name} 上传失败`);
      // }
    },
  }
};
</script>

<style>
</style>