<!--
 * @LastEditTime: 2021-06-09 22:55:51
 * @Description: 
 * @Tags: 
 * @FilePath: /vue-antd-admin/src/pages/permissions/menu.vue
-->
<template>
  <a-card :bordered="false">
    <a-button type="primary"
              icon="reload"
              @click="reload"
              style="margin:5px 5px 5px 0;">刷 新</a-button>
    <a-button type="default"
              icon="plus"
              @click="showModal({id:0})"
              style="margin:5px 5px 5px 0;">新建路由</a-button>

    <a-table :columns="columns"
             :data-source="tableData"
             :row-key="record => record.id"
             bordered
             :pagination="false"
             :loading="loading"
             size="small"
             childrenColumnName="childrenList">

      <!-- 自定义操作按钮 -->
      <div slot="action"
           slot-scope="record">
        <a-button type="primary"
                  @click="showModal(record)"
                  style="margin:5px">创建子路由</a-button>
        <a-button @click="showModal(record,true)"
                  style="margin:5px">修改</a-button>
        <a-button type="danger"
                  style="margin:5px"
                  @click="deletethis(record)">删除</a-button>
      </div>

    </a-table>
  </a-card>
</template>

<script>
// import { routerTab } from "@/services";
export default {
  data () {
    return {
      // 页面header
      desc:"在功能增添时在这里将新页面进行注册和移除，非开发人员无需操作。",
      loading: false,
      // 表格列
      columns: [
        { title: "别名", dataIndex: "name", key: "name" },
        { title: "路由", dataIndex: "url", key: "url" },
        { title: "排序", dataIndex: "layer", key: "layer", width: 100 },
        { title: "操作", dataIndex: "", key: "x", width: 300, scopedSlots: { customRender: "action" } },
      ],

      res: { code: 200, msg: "成功", data: [{ id: "1391228098789207110", url: "一级1", name: "一级1", parentId: "1", childrenList: [{ id: "1391228098789207112", url: "二级11", name: "二级11", parentId: "1391228098789207110", childrenList: [{ id: "1391228098789207115", url: "三级111", name: "三级111", parentId: "1391228098789207112", childrenList: null }, { id: "1391228098789207116", url: "三级211", name: "三级211", parentId: "1391228098789207112", childrenList: null }] }, { id: "1391228098789207113", url: "二级12", name: "二级12", parentId: "1391228098789207110", childrenList: [] }] }, { id: "1391228098789207111", url: "一级2", name: "一级2", parentId: "1", childrenList: [{ id: "1391228098789207114", url: "二级21", name: "二级21", parentId: "1391228098789207111", childrenList: [] }] }] },

      tableData: []
    };
  },
  mounted () {
    console.log(this.res);
    this.fetch();
  },
  methods: {
    reload () {
      this.fetch();
    },
    fetch () {
      this.loading = true;
      // routerTab.query().then(res => {
      //   console.log(res);
      // });
      this.tableData = this.res.data;
      this.loading = false;
    },
  }
};
</script>

<style>
</style>