<!--
 * @LastEditTime: 2021-06-16 16:34:14
 * @Description: @通用表格
 * @Tags: 
 * @FilePath: /vue-antd-admin/src/pages/demo/generalTable.vue
-->
<template>
  <a-card>
    <!-- 顶部操作按钮 -->
    <a-space class="operator">
      <a-button @click="addNew"
                type="primary"
                icon="plus">新 建</a-button>
      <a-button @click="reload"
                type="default"
                icon="reload">刷 新</a-button>
      <FileUpload v-model="fileList"
                  :multiple="true"
                  style="width:400px;" />
    </a-space>

    <!-- 表格 -->
    <a-table :columns="columns"
             :dataSource="dataSource"
             :row-key="record => record.id"
             :loading="loading"
             @change="handleTableChange"
             size="small"
             :pagination="pagination">

      <div slot="action"
           slot-scope="record">
        <a-button type="link"
                  icon="edit"
                  @click="editRecord(record)">拉起窗口编辑</a-button>

        <a-button type="link"
                  icon="solution"
                  @click="openRecord(record)">新页面查看详情</a-button>

        <a-popconfirm title="确认删除吗?"
                      @confirm="deleteRecord(record.id)"
                      :disabled="record.userName == 'admin'">
          <a-button type="link"
                    icon="delete"
                    :disabled="record.userName == 'admin'">删除</a-button>
        </a-popconfirm>
      </div>
    </a-table>

    <!-- 弹窗新建/修改 -->
    <a-modal v-model="visible"
             :title="editTarget.id?'修改':'新建'"
             :width="$store.state.setting.isMobile ? '98vw':'700px'"
             @ok="onSubmit">
      <!-- 内部容器 -->
      <div style="max-height:70vh;overflow-y:scroll;">
        <!-- 新建/修改表单 -->
        <a-form-model ref="ruleForm"
                      :model="editTarget"
                      :rules="rules"
                      :label-col="{ span: 6 }"
                      :wrapper-col="{ span: 14 }">
          <a-form-model-item label="昵称"
                             prop="loginName">
            <a-input v-model="editTarget.loginName" />
          </a-form-model-item>
          <a-form-model-item label="登录账号"
                             prop="userName">
            <a-input v-model="editTarget.userName"
                     :disabled="editTarget.id" />
          </a-form-model-item>
        </a-form-model>
      </div>
    </a-modal>

  </a-card>
</template>

<script>
// 引入接口请求方法
import {
  userService as tableServices,
} from "@/services";
import FileUpload from "@/components/fileUpload.vue";

// 表格列
const columns = [
  { title: "昵称", dataIndex: "loginName" },
  { title: "登录账号", dataIndex: "userName" },
  { title: "手机号", dataIndex: "phone" },
  { title: "操作", scopedSlots: { customRender: "action" } }
];
export default {
  components: {
    FileUpload
  },
  created () {
    this.reload();
  },
  data () {
    return {
      // 上传文件列表
      fileList: [],
      // table加载
      loading: false,
      dataSource: [],
      columns,
      rules: {
        password: [{ required: true, message: "请输入", trigger: "change" }],
        userName: [{ required: true, message: "请输入", trigger: "change" }],
        loginName: [{ required: true, message: "请输入", trigger: "change" }],
      },
      // 分页
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
        showTotal: ((total) => {
          return `共 ${total} 条`;
        }),
        showSizeChanger: true
      },
      // 正在编辑的对象
      editTarget: {},
      // 编辑窗口是否可见
      visible: false,
    };
  },
  methods: {
    // 刷新表格
    reload () {
      // 刷新前后可执行其他操作
      this.fetch();
    },
    // 获取数据列表
    fetch () {
      this.loading = true;
      tableServices.query({
        pageSize: this.pagination.pageSize,
        pageNo: this.pagination.current,
      }).then(res => {
        this.dataSource = res.data.data;
        this.pagination.total = res.data.totalCount || 0;
        this.loading = false;
      });
    },
    // 编辑用户
    editRecord (editTarget) {
      this.visible = true;
      this.editTarget = JSON.parse(JSON.stringify(editTarget));
    },
    // 跳转详情页
    openRecord (record) {
      // 打开新页面并设置标题 router,title
      this.$openPage(`/demoDetails?id=${record.id}`, record.loginName);
    },
    // 删除行
    deleteRecord (key) {
      // 发送删除用户
      tableServices.remove(key).then(res => {
        this.$message.info(res.data.msg.replace("用户名", "登录账号"));
        this.reload();
      });
    },
    // 新增 显示模态窗口
    addNew () {
      this.editTarget = {};
      this.visible = true;
    },
    // 表格分页切换
    handleTableChange (pagination, filters, sorter) {
      this.pagination = pagination;
      this.fetch();
    },
    // 提交修改
    onSubmit () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          tableServices.save(this.editTarget).then(res => {
            if (res.data.code == 200) {
              this.visible = false;
              this.reload();
            } else {
              this.$message.error(res.data.data);
            }
          });
        } else {
          console.log("表单验证不通过!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
</style>
