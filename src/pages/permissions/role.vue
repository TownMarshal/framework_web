<!--
 * @LastEditTime: 2021-06-22 17:25:42
 * @Description: @角色管理
 * @Tags: 
 * @FilePath: /framework_web/src/pages/permissions/role.vue
-->
<template>
  <a-card>
    <a-button type="primary"
              icon="reload"
              @click="reload"
              style="margin:2px;">刷 新</a-button>

    <a-button type="default"
              icon="plus"
              @click="showModal"
              style="margin:2px;">新建角色</a-button>
    <!-- 新建角色表单 模态窗口 -->
    <a-modal v-model="visible"
             title="新增/修改角色信息"
             width="40vw"
             @ok="onSubmit"
             @cancel="resetForm"
             okText="保存">
      <div style="max-height:70vh;overflow-y:scroll;">
        <a-form-model ref="ruleForm"
                      :model="editTarget"
                      :label-col="labelCol"
                      :rules="rules"
                      :wrapper-col="wrapperCol">
          <a-form-model-item label="角色名称"
                             prop="roleName">
            <a-input v-model="editTarget.roleName" />
          </a-form-model-item>
          <a-form-model-item label="描述"
                             prop="roleDesc">
            <a-input v-model="editTarget.roleDesc" />
          </a-form-model-item>
        </a-form-model>
      </div>
    </a-modal>

    <!-- 数据展示表格 -->
    <div style="display:flex;">
      <a-table style="flex-grow:1"
               :columns="columns"
               :data-source="data"
               :row-key="record => record.id"
               :loading="loading"
               size="small"
               @change="handleTableChange"
               :pagination="pagination"
               :rowSelection="rowSelection">
        <!-- 自定义操作按钮 -->
        <div slot="action"
             slot-scope="record">
          <a-button type="link"
                    icon="edit"
                    @click="showModal(record)"
                    style="margin:5px">修改</a-button>
          <a-popconfirm title="确认删除该角色?"
                        ok-text="删除"
                        cancel-text="取消"
                        @confirm="deletethis(record)"
                        placement="topLeft">
            <a-button type="link"
                      icon="delete"
                      style="margin:5px"
                      :disabled="record.delStatus == 1">删除</a-button>
          </a-popconfirm>
        </div>
      </a-table>

      <div v-show="this.rowSelection.selectedRowKeys[0]"
           style="width:30%;">
        <!-- 分配菜单组件 -->
        <distribution-menu querytype="role"
                           ref="distributionMenu"
                           :roleid="this.rowSelection.selectedRowKeys[0]" />
      </div>
    </div>

  </a-card>
</template>

<script>
import { role } from "@/services";
import distributionMenu from "@/pages/permissions/components/distributionMenu.vue";

export default {
  components: {
    distributionMenu, // 分配菜单组件
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
      rowSelection: {
        selectedRowKeys: [],
        type: "radio",
        onChange: (selectedRowKeys, selectedRows) => {
          this.rowSelection.selectedRowKeys = selectedRowKeys;
        }
      },
      data: [],
      loading: false,// 加载中
      columns: [      // 表格列
        { title: "名称", dataIndex: "roleName", key: "roleName" },
        { title: "描述", dataIndex: "roleDesc", key: "roleDesc" },
        { title: "操作", dataIndex: "", key: "x", scopedSlots: { customRender: "action" }, width: 280 },
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
    };
  },
  mounted () {
    this.reload();
  },
  methods: {
    reload () {
      this.$refs.distributionMenu.start();
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
        this.data = res.data.data;
        this.loading = false;
        if (!this.rowSelection.selectedRowKeys[0]) {
          this.rowSelection.selectedRowKeys[0] = res.data.data[0].id;
        }
      });
    },
    // 表格分页切换
    handleTableChange (pagination, filters, sorter) {
      this.pagination = pagination;
      this.fetch();
    },
  }
};
</script>

<style scoped lang="less">
.ant-checkbox-wrapper {
  margin-left: 10px;
}
</style>