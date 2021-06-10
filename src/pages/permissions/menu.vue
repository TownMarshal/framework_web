<!--
 * @LastEditTime: 2021-06-10 09:06:38
 * @Description: 
 * @Tags: 
 * @FilePath: /vue-antd-admin/src/pages/permissions/menu.vue
-->
<template>
  <a-card :bordered="false">
    <a-button type="primary" icon="reload" @click="reload" style="margin:5px 5px 5px 0;">刷 新</a-button>
    <a-button type="default" icon="plus" @click="showModal({id:1})" style="margin:5px 5px 5px 0;">新建路由</a-button>

    <!-- 路由编辑模态窗口 -->
    <a-modal v-model="visible" title="新增/修改路由信息" width="40vw" @ok="onSubmit" @cancel="resetForm" okText="保存">
      <div style="max-height:70vh;overflow-y:scroll;">
        <a-form-model ref="ruleForm" :model="editTarget" :label-col="labelCol" :rules="rules" :wrapper-col="wrapperCol">
          <a-form-model-item label="别名" prop="name">
            <a-input v-model="editTarget.name" />
          </a-form-model-item>
          <a-form-model-item label="路由" prop="url">
            <a-input v-model="editTarget.url" />
          </a-form-model-item>
          <a-form-model-item label="排序" prop="orderNum">
            <a-input v-model.number="editTarget.orderNum" />
          </a-form-model-item>
          <a-input v-model="editTarget.parentId" disabled />
        </a-form-model>
      </div>
    </a-modal>

    <a-table :columns="columns" :data-source="tableData" :row-key="record => record.id" bordered :pagination="false" :loading="loading" size="small" childrenColumnName="childrenList">

      <!-- 自定义操作按钮 -->
      <div slot="action" slot-scope="record">
        <a-button type="primary" @click="showModal(record)" style="margin:5px" v-if="record.childrenList">
          创建子路由</a-button>
        <a-button @click="showModal(record,true)" style="margin:5px">修改</a-button>
        <a-button type="danger" style="margin:5px" @click="deletethis(record)">删除</a-button>
      </div>
      
    </a-table>
  </a-card>
</template>

<script>
import { routerTab } from "@/services";
export default {
  data () {
    return {
      // 页面header
      desc: "在功能增添时在这里将新页面进行注册和移除，非开发人员无需操作。",

      // 是否显示模态修改窗
      visible: false,
      // 编辑路由的表单布局 
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      // 当前正在修改的row
      editTarget: {},
      rules: {
        name: [{ required: true, message: "请输入", trigger: "change" }],
        url: [{ required: true, message: "请输入", trigger: "change" }],
        orderNum: [{
          required: true, message: "请输入", trigger: "change", type: "number",
        }, {
          min: 0, max: 255, trigger: "change", type: "number", message: "最小0最大255"
        }]
      },
      loading: false,
      // 表格列
      columns: [
        { title: "别名", dataIndex: "name", key: "name" },
        { title: "路由", dataIndex: "url", key: "url" },
        { title: "排序", dataIndex: "orderNum", key: "orderNum", width: 100 },
        { title: "操作", dataIndex: "", key: "x", width: 300, scopedSlots: { customRender: "action" } },
      ],
      tableData: [],
    };
  },
  mounted () {
    this.fetch();
  },
  methods: {
    reload () {
      this.fetch();
    },
    fetch () {
      this.loading = true;
      routerTab.query().then(res => {
        this.tableData = res.data.data;
        this.loading = false;
      });
    },
    // 显示修改窗口
    showModal (editTarget = {}, edit = false) {
      if (edit) { // 修改
        this.editTarget = JSON.parse(JSON.stringify(editTarget));
      } else { // 创建
        this.editTarget = {
          parentId: editTarget.id
        };
      }
      this.visible = true;
    },
    // 提交修改
    onSubmit () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          routerTab.save(this.editTarget).then(res => {
            this.visible = false;
            this.reload();
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 还原表单
    resetForm () {
      this.$refs.ruleForm.resetFields();
    },
    // 删除路由
    deletethis (editTarget) {
      this.$confirm({
        title: `确认删除 ${editTarget.name} 路由吗？`,
        onOk: function () {
          routerTab.remove(editTarget.id).then(res => {
            this.reload();
          });
        }.bind(this)
      });
    },
  }
};
</script>

<style>
</style>