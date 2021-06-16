<!--
 * @LastEditTime: 2021-06-16 14:55:58
 * @Description: 分配路由的组件
 * @Tags: 
 * @FilePath: /vue-antd-admin/src/pages/permissions/components/distributionMenu.vue
-->
<template>
  <div>
    <!-- 数据展示表格 -->
    <a-table :columns="columns"
             :data-source="data"
             :row-key="record =>  record.id"
             :loading="loading"
             :scroll="scroll"
             size="small"
             bordered
             childrenColumnName="childrenList"
             :pagination="false"
             :row-selection="{ 
      selectedRowKeys: selectedRowKeys, 
      onChange: onChange,
      hideDefaultSelections:true,
      columnTitle:' '
      }">
    </a-table>
  </div>
</template>

<script>
import { role, routerTab } from "@/services";

export default {
  name: "DistributionMenu",
  props: {
    roleid: {
      type: String, // 角色id
      default: ""
    }
  },
  data () {
    return {
      data: [], // 所有路由列表
      selectedRowKeys: [], // 双向绑定 当前选中的row
      loading: false,// 加载中
      scroll: {// 滚动限制
        y: document.body.clientHeight - 300,
      },
      columns: [      // 表格列
        { title: "别名", dataIndex: "name", key: "name" }
      ],
    };
  },
  mounted () {
    this.selectedRowKeys = [];
    // 获取全部路由表
    routerTab.query().then(res => {
      this.data = res.data.data;
    });
    // 获取角色拥有的列表
    role.RoleQueryRouter({
      roleId: this.roleid
    }).then(res => {
      this.selectedRowKeys = res.data.data.map(item => {
        return item.permissionId;
      });
    });
  },
  methods: {
    // 表格选中行有变动时
    onChange (selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys;
      role.RoleAddRouter([...this.selectedRowKeys.map(item => {
        return {
          roleId: this.roleid,
          permissionId: item
        };
      })]).then(res => {
        res.data.code == 200 && this.$message.success("保存" + res.data.msg);
      });
    }
  }
};
</script>