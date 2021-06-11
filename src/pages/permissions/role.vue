<!--
 * @LastEditTime: 2021-06-10 17:18:30
 * @Description: @角色管理
 * @Tags: 
 * @FilePath: /vue-antd-admin/src/pages/permissions/role.vue
-->
<template>
  <a-card>
    <a-button type="primary" icon="reload" @click="reload" style="margin:2px;">刷 新</a-button>

    <a-button type="default" icon="plus" @click="showModal" style="margin:2px;">新建角色</a-button>
    <!-- 新建角色表单 模态窗口 -->
    <a-modal v-model="visible" title="新增/修改角色信息" width="40vw" @ok="onSubmit" @cancel="resetForm" okText="保存">
      <div style="max-height:70vh;overflow-y:scroll;">
        <a-form-model ref="ruleForm" :model="editTarget" :label-col="labelCol" :rules="rules" :wrapper-col="wrapperCol">
          <a-form-model-item label="角色名称" prop="roleName">
            <a-input v-model="editTarget.roleName" />
          </a-form-model-item>
          <a-form-model-item label="描述" prop="roleDesc">
            <a-input v-model="editTarget.roleDesc" />
          </a-form-model-item>
        </a-form-model>
      </div>
    </a-modal>

    <!-- 数据展示表格 -->
    <a-table :columns="columns" :data-source="data" :row-key="record => record.id" bordered size="small" @expandedRowsChange="RowsChange" :loading="loading" :expandedRowKeys="expandedRowKeys" @change="handleTableChange" :pagination="pagination">
      <!-- 自定义操作按钮 -->
      <div slot="action" slot-scope="record">
        <a-button type="primary" @click="showModal(record)" style="margin:5px">修改</a-button>
        <a-button @click="showMenuModal(record)" style="margin:5px">设置权限</a-button>
        <!-- <a-button @click="showAllot(record)" style="margin:5px">新增成员</a-button> -->
        <a-popconfirm title="确认删除该角色?" ok-text="删除" cancel-text="取消" @confirm="deletethis(record)" placement="topLeft">
          <a-button type="danger" style="margin:5px" :disabled="record.delStatus == 1">删除</a-button>
        </a-popconfirm>
      </div>
      <p slot="expandedRowRender" slot-scope="record" style="margin: 0">
        <a-table :columns="innercolumns" :data-source="record.member" :row-key="record => record.id" style='background:white;' :pagination="false" size="small">
          <div slot="action" slot-scope="record">
            <a-popconfirm title="确认移除该成员?" ok-text="移除" cancel-text="取消" @confirm="RomoveUser(record)" placement="topLeft">
              <a type="danger">移除成员</a>
            </a-popconfirm>
          </div>
        </a-table>
      </p>
    </a-table>
    <a-modal v-model="MenuModalShow" title="角色分配菜单" width="50vw" destroyOnClose :footer="null">
      <!-- 分配菜单组件 -->
      <distribution-menu querytype="role" :roleid="roleid" />
    </a-modal>
    <!-- destroyOnClose 销毁内部组件 -->
    <a-modal v-model="ShowAllotUserView" title="角色分配用户" width="50vw" destroyOnClose :footer="null">
      <!-- 分配用户组件 -->
      <DistributionUser :AllotUserViewRoleID="AllotUserViewRoleID" @closeMe="ShowAllotUserView = false" @reload="reload" />
    </a-modal>
  </a-card>
</template>

<script>
import { role } from "@/services";

import distributionMenu from "@/pages/components/permission/distributionMenu.vue";
import DistributionUser from "@/pages/components/permission/distributionUser.vue";

export default {
  components: {
    distributionMenu, // 分配菜单组件
    DistributionUser  // 分配用户组件
  },
  name: "rolelist",
  computed: {
    desc () {
      return "将菜单分配到不同职位角色上,被分配角色的用户只能访问角色下的菜单页面。";
    }
  },
  data () {
    return {
      visible: false, // 是否显示模态修改窗
      MenuModalShow: false, // 是否显示分配路由页面
      roleid: "", // 当前分配角色的id
      data: [],
      loading: false,// 加载中
      columns: [      // 表格列
        { title: "名称", dataIndex: "roleName", key: "roleName" },
        { title: "描述", dataIndex: "roleDesc", key: "roleDesc" },
        { title: "操作", dataIndex: "", key: "x", scopedSlots: { customRender: "action" }, width: 380 },
      ],
      innercolumns: [
        { title: "用户名", dataIndex: "userName", key: "userName" },
        { title: "手机号", dataIndex: "phone", key: "phone" },
        // { title: "操作", dataIndex: "", key: "x", scopedSlots: { customRender: "action" } },
      ],
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
      // 当前正在修改的row
      editTarget: {
        address: "",
        addressCode: ""
      },
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      rules: {
        roleName: [{ required: true, message: "请输入", trigger: "change" }],
      },
      expandedRowKeys: [],// 展开的行
      ShowAllotUserView: false, // 是否显示分配用户模态窗口
      AllotUserViewRoleID: "", // 当前正在分配用户的角色id
    };
  },
  mounted () {
    this.reload();
  },
  methods: {
    reload () {
      this.fetch();
    },
    // 提交角色信息修改
    onSubmit () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          role.save(this.editTarget).then(res => {
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
    // 显示角色信息修改窗口
    showModal (editTarget = {}) {
      if (!editTarget.id) {// 新建角色
        this.editTarget = {};
      } else {
        this.editTarget = editTarget;
      }
      this.visible = true;
    },
    // 显示分配路由组件
    showMenuModal (target) {
      this.roleid = target.id;
      this.MenuModalShow = true;
    },
    // 删除角色
    deletethis (editTarget) {
      role.remove({ id: editTarget.id }).then(res => {
        this.reload();
      });
    },
    // 请求数据
    fetch () {
      this.loading = true;
      role.query({
        pageSize: this.pagination.pageSize,
        pageNo: this.pagination.current,
      }).then((res) => {
        this.pagination.total = res.data.totalCount || 0;
        this.data = res.data.data
          .map(item => {
            item.member = [];
            return item;
          });
        // 检查是否有展开的行 请求行下的成员
        this.RowsChange(this.expandedRowKeys);
        this.loading = false;
      });
    },
    // 表格分页切换
    handleTableChange (pagination, filters, sorter) {
      this.pagination = pagination;
      this.fetch();
    },
    // 角色展开
    RowsChange (rowKeys) {
      this.expandedRowKeys = [rowKeys[rowKeys.length - 1]];
      this.expandedRowKeys = this.expandedRowKeys.filter(item => item);
      if (this.expandedRowKeys.length) {
        role.RoleQueryUser({
          roleId: this.expandedRowKeys[0]
        }).then(res => {
          console.log(res);
          // 获取角色下的用户列表
          let RoleIncludeUser = res.data.data || [];
          for (let index = 0; index < this.data.length; index++) {
            const element = this.data[index];
            if (element.id == this.expandedRowKeys[0]) {
              element.member = RoleIncludeUser;
              break;
            }
          }
        });
      }
    },
    // 显示分配用户模态窗口
    showAllot (row) {
      this.AllotUserViewRoleID = row.id;
      this.ShowAllotUserView = true;
    },
    // 移除用户角色
    RomoveUser (userInfo) {
      console.log(userInfo);
      // role.removeUser({ id: userInfo.id }).then(res => {
      //   if (res.data.code == 200) {
      //     this.$message.success(res.data.msg);
      //     this.RowsChange(this.expandedRowKeys);
      //   }
      // });
    }
  }
};
</script>

<style scoped lang="less">
.ant-checkbox-wrapper {
  margin-left: 10px;
}
</style>