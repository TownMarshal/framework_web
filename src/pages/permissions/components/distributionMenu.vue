<!--
 * @LastEditTime: 2021-06-22 17:19:40
 * @Description: 分配路由的组件
 * @Tags: 
 * @FilePath: /framework_web/src/pages/permissions/components/distributionMenu.vue
-->
<template>
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
  watch: {
    roleid: function () {
      this.start();
    }
  },
  created () {
    this.start();
  },
  methods: {
    start () {
      if (!this.roleid) {
        return false;
      }
      this.selectedRowKeys = [];
      // 获取全部路由表
      routerTab.query().then(res => {
        this.data = res.data.data;
        // 获取角色拥有的列表
        role.RoleQueryRouter({
          roleId: this.roleid
        }).then(res => {
          this.selectedRowKeys = res.data.data.map(item => item.permissionId).filter(item => item);
        });
      });
    },
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

<!--
 * @LastEditTime: 2021-06-18 11:44:33
 * @Description: 分配路由的组件 a-tree历史版本 tree部分选择时显示有bug
 * @Tags: 
 * @FilePath: /framework_web/src/pages/permissions/components/distributionMenu.vue

<template>
  <div>
    <a-tree :tree-data="data"
            checkable
            v-model="selectedRowKeys"
            @check="onChange"
            :replaceFields="{ key: 'id', title: 'name' ,children:'childrenList'}" />
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
    };
  },
  watch: {
    roleid: function () {
      this.start();
    }
  },
  created () {
    this.start();
  },
  methods: {
    start () {
      if (!this.roleid) {
        return false;
      }
      this.selectedRowKeys = [];
      // 获取全部路由表
      routerTab.query().then(res => {
        this.data = res.data.data;
        // 获取角色拥有的列表
        role.RoleQueryRouter({
          roleId: this.roleid
        }).then(res => {
          this.selectedRowKeys = res.data.data.map(item => item.permissionId).filter(item => item);
        });
      });
    },
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
-->