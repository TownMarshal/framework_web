<template>
  <!-- 分配路由的组件 -->
  <div>
    <!-- 数据展示表格 -->
    <a-table :columns="columns"
             :data-source="data"
             :row-key="record => querytype=='joiningTrader'?record.id:record.menuCode"
             :loading="loading"
             :scroll="scroll"
             size="small"
             bordered
             :pagination="false"
             :row-selection="{ 
      selectedRowKeys: selectedRowKeys, 
      onChange: onChange,onSelect:onSelect,
      hideDefaultSelections:true,
      columnTitle:' '
      }">
    </a-table>
  </div>
</template>

<script>
import {
  GetAll, // 获取加盟商的路由
  RoleGetMenu, // 获取角色的路由列表
  RoleAddMenu, // 角色新增路由
  RoleRemoveMenu, // 角色移除路由
} from "@/services/menu";

export default {
  name: "DistributionMenu",
  props: {
    querytype: {
      type: String,
      default: "joiningTrader" // JoiningTrader加盟商模式 / role角色模式
    },
    joiningtraderid: { // 加盟商id
      type: String,
      default: ""
    },
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
    GetAll().then(res => {
      this.data = res.data.data;
    });
    RoleGetMenu({ // 获取角色拥有的列表
      roleId: this.roleid
    }).then(res => {
      console.log(res);
      this.selectedRowAssignment(res.data.data);
    });
  },
  methods: {
    // 整理格式 勾选已经选中的路由
    selectedRowAssignment (oldselectRow) {
      let childrenList = [];
      function recursive (item) {
        childrenList.push(item.menuCode);
        if (item.children && item.children.length) {
          item.children.forEach(item => {
            recursive(item);
          });
        }
      }
      oldselectRow.forEach(item => {
        recursive(item);
      });
      this.selectedRowKeys = [...childrenList];
    },
    // 表格选中行有变动时
    onChange (selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys;
    },
    // 勾选或取消选择
    onSelect (record, selected, selectedRows) {
      console.log(record, selected, selectedRows);
      if (selected) { // 选择
        this.addRow(record);
      } else { // 取消选择
        this.deleteRow(record);
      }
    },
    // 添加
    addRow (row) {
      RoleAddMenu({
        roleId: this.roleid,
        sysMenuVos: [row]
      }).then(res => {
        res.data.code == 200 && this.$message.success("添加" + res.data.msg);
      });
    },
    // 移除
    deleteRow (row) {
      RoleRemoveMenu({
        roleId: this.roleid,
        menuId: row.id,
      }).then(res => {
        res.data.code == 200 && this.$message.success("删除" + res.data.msg);
      });
    }
  }
};
</script>