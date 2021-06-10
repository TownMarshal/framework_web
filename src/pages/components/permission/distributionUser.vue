<!--
 * @LastEditTime: 2021-06-10 15:01:39
 * @Description: 为角色分配用户
 * @Tags: 
 * @FilePath: /vue-antd-admin/src/pages/components/permission/distributionUser.vue
-->
<template>
  <div>
    <p>根据手机号或昵称搜索用户：</p>
    <a-mentions v-model="value" @change="onChange" @select="onSelect" :loading="loading" prefix="">
      <a-mentions-option v-for="(item) in users" :key="item.id" :value="item.phoneNum">
        <div :data-info="JSON.stringify(item)">
          <img :src="HeadPortrait" :alt="item.name" style="width: 20px; margin-right: 8px;">
          <span>{{item.phoneNum}} --- {{item.name}}</span>
        </div>
      </a-mentions-option>
    </a-mentions>

    <div style="padding:10px 0;" v-if="selectUser.length">
      <p style="margin:10px 0;">已选择列表：</p>
      <a-list :grid="{ gutter: 16, column: 2 }" :data-source="selectUser">
        <a-list-item slot="renderItem" slot-scope="item">
          <a-card :title="item.name">
            <div style="display:flex">
              <div>
                <img :src="HeadPortrait" :alt="item.name" style="width: 60px;margin:10px 10px 0 0;">
              </div>
              <div>
                <span>手机号：{{item.phoneNum}}</span>
                <div style="margin-top:20px;text-align:right;">
                  <!-- <a-button type="primary" @click="removeSelect(item.id)">取消添加</a-button> -->
                  <a-button type="danger" @click="confirmAdd(item.id)">确认添加</a-button>
                </div>
              </div>
            </div>
          </a-card>
        </a-list-item>
      </a-list>
    </div>

    <div style="text-align:right;padding-top:10px;">
      <a-button @click="cancelAdd" style="margin-right:10px;">取消</a-button>
    </div>
  </div>
</template>

<script>
import { role } from "@/services";
export default {
  props: ["AllotUserViewRoleID"],
  data () {
    return {
      loading: false,
      value: "", // 当前输入框中的值
      users: [], // 查询获得的用户列表
      selectUser: [], // 当前选中的用户列表
      timer: "",// change防抖
    };
  },
  computed: {
    // 随机头像
    HeadPortrait () {
      const avatars = [
        "https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png",
        "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
        "https://gw.alipayobjects.com/zos/rmsportal/gaOngJwsRYRaVAuXXcmB.png",
        "https://gw.alipayobjects.com/zos/rmsportal/ubnKSIfAJTxIgXOKlciN.png",
        "https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png"
      ];
      return avatars[Math.ceil(Math.random() * 5) - 1];
    }
  },
  methods: {
    //   提及框值变化时
    onChange (searchValue) {
      this.loading = true;
      clearTimeout(this.timer);
      this.timer = setTimeout(function () {
        getUserList({
          search: searchValue
        }).then(res => {
          this.users = res.data.data;
          this.loading = false;
        });
      }.bind(this), 400);
    },
    // 提及框选中时
    onSelect (selectItem) {
      //   console.log("select", arguments)
      if (!selectItem.value) {
        this.$message.error("该用户未绑定手机号，请重新选择");
        this.value = "";
      } else {
        this.value = "";
        this.selectUser.push(
          JSON.parse(selectItem.children[0].data.attrs["data-info"])
        );
      }
    },
    // 已选中列表移除
    removeSelect (userid) {
      this.selectUser = this.selectUser.filter(item => item.id != userid);
    },
    // 取消添加
    cancelAdd () {
      this.selectUser = [];
      this.$emit("closeMe");
      // 发送自定义时间使外层组件控制显示状态
    },
    // 确认添加
    confirmAdd (userId) {
      this.sendAddRequest(userId);
    },
    // 发送新增绑定请求
    sendAddRequest (id) {
      role.RoleAddUser({
        userId: id,
        roleId: this.AllotUserViewRoleID
      }).then(res => {
        console.log(res.data);
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.selectUser = this.selectUser.filter(item => item.id != id);
          this.$emit("reload");
        } else {
          this.$message.error(res.data.msg);
        }
      });
    }
  }
};
</script>

<style>
</style>