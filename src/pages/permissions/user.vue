<!--
 * @LastEditTime: 2021-06-10 14:10:09
 * @Description: @用户管理
 * @Tags: 
 * @FilePath: /vue-antd-admin/src/pages/permissions/user.vue
-->
<template>
  <a-card>
    <div>
      <a-space class="operator">
        <a-button @click="addNew" type="primary" icon="plus">新 建</a-button>
        <a-button @click="reload" type="default" icon="reload">刷 新</a-button>
      </a-space>

      <a-table :columns="columns" :dataSource="dataSource" :row-key="record => record.id" :loading="loading" @change="handleTableChange" size="small" :pagination="pagination">

        <div slot="levels" slot-scope="val">
          <a-tag color="#FF4D4D" v-if="(val == 0)">管理员</a-tag>
          <a-tag color="#1890FF" v-else-if="(val == 1)">普通用户</a-tag>
          <span v-else>{{val}}</span>
        </div>

        <div slot="action" slot-scope="record">
          <a style="margin-right: 8px" @click="editUser(record)" :disabled="record.username == 'admin'">
            <a-icon type="edit" />编辑
          </a>

          <a-popconfirm title="确认删除吗?" ok-text="Yes" cancel-text="No" @confirm="deleteRecord(record.id)">
            <a href="javascript:void(0)" :disabled="record.username == 'admin'">
              <a-icon type="delete" />删除
            </a>
          </a-popconfirm>
        </div>
      </a-table>

      <a-modal v-model="visible" :title="modalType == 'create'? '创建用户' : '修改用户信息'" :width="$store.state.setting.isMobile ? '98vw':'700px'" @ok="onSubmit" @cancel="resetForm">
        <div style="max-height:70vh;overflow-y:scroll;">
          <a-form-model ref="ruleForm" :model="editTarget" :rules="rules">

            <a-form-model-item label="昵称" prop="loginName">
              <a-input v-model="editTarget.loginName" />
            </a-form-model-item>
            <a-form-model-item label="登录账号" prop="userName">
              <a-input v-model="editTarget.userName" />
            </a-form-model-item>
            <a-form-model-item label="手机号" prop="phone">
              <a-input v-model="editTarget.phone" />
            </a-form-model-item>
            <a-form-model-item label="密码" prop="password">
              <a-input v-model="editTarget.password" />
            </a-form-model-item>
          </a-form-model>
        </div>
      </a-modal>
    </div>
  </a-card>
</template>

<script>
import { userService } from "@/services";
const columns = [
  { title: "昵称", dataIndex: "loginName" },
  { title: "登录账号", dataIndex: "username" },
  { title: "手机号", dataIndex: "phone" },
  { title: "操作", scopedSlots: { customRender: "action" } }
];
export default {
  name: "UserList",
  computed: {
    desc () {
      return "管理可登录系统的用户信息";
    }
  },
  created () {
    this.reload();
  },
  data () {
    return {
      // table加载
      loading: false,
      dataSource: [],
      columns: columns,
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
      // 弹出窗口状态
      modalType: "",
    };
  },
  methods: {
    reload () {
      this.fetch();
    },
    // 编辑用户
    editUser (editTarget) {
      this.visible = true;
      this.modalType = "edit";
      this.editTarget = JSON.parse(JSON.stringify(editTarget));
    },
    // 获取用户列表
    fetch () {
      this.loading = true;
      userService.query({
        pageSize: this.pagination.pageSize,
        pageNo: this.pagination.current,
      }).then(res => {
        this.dataSource = res.data.data;
        this.pagination.total = res.data.totalCount || 0;
        this.loading = false;
      });
    },
    // 删除行
    deleteRecord (key) {
      // 发送删除用户
      userService.remove(key).then(res => {
        this.$message.info(res.data.msg.replace("用户名", "登录账号"));
        this.reload();
      });
    },
    // 新增 显示模态窗口
    addNew () {
      this.editTarget = {};
      this.modalType = "create";
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
          userService.save(this.editTarget).then(res => {
            if (res.data.code == 200) {
              this.visible = false;
              this.reload();
            } else {
              this.$message.error(res.data.data);
            }
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
  }
};
</script>

<style lang="less" scoped>
.fold {
  width: calc(100% - 216px);
  display: inline-block;
}
.operator {
  margin-bottom: 18px;
  display: flex;
  flex-wrap: wrap;
}
@media screen and (max-width: 900px) {
  .fold {
    width: 100%;
  }
}
</style>
