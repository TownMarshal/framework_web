<!--
 * @LastEditTime: 2021-06-15 16:53:21
 * @Description: 个人中心
 * @Tags: 
 * @FilePath: /vue-antd-admin/src/layouts/header/HeaderAvatar.vue
-->
<template>
  <div style="display:flex;">
    <a-dropdown>
      <div class="header-avatar" style="cursor: pointer">
        <a-avatar class="avatar" size="small" shape="circle" :src="user.avatar" />
        <span class="name">{{user.name}}</span>
      </div>
      <a-menu :class="['avatar-menu']" slot="overlay">
        <a-menu-item @click="visible = true">
          <a-icon type="user" />
          <span>修改密码</span>
        </a-menu-item>

        <a-menu-divider />
        <a-menu-item @click="logout">
          <a-icon style="margin-right: 8px;" type="poweroff" />
          <span>退出登录</span>
        </a-menu-item>
      </a-menu>
    </a-dropdown>

    <a-modal :visible="visible" title="修改密码" @ok="handleOk" @cancel="handleCancel">
      <a-form-model ref="form" :model="form" :rules="rules" :label-col="{ span: 8 }" :wrapper-col="{ span: 14 }">
        <a-form-model-item label="请输入新密码" prop="password">
          <a-input type="password" v-model="form.password"></a-input>
        </a-form-model-item>
        <a-form-model-item label="请再次输入新密码" prop="passwordcheck">
          <a-input type="password" v-model="form.passwordcheck"></a-input>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>

</template>

<script>
import { mapGetters } from "vuex";
import { logout, save } from "@/services/user";

export default {
  name: "HeaderAvatar",
  computed: {
    ...mapGetters("account", ["user"]),
  },
  data () {
    return {
      // 是否显示修改密码窗口
      visible: false,
      form: {},
      rules: {
        password: [{
          required: true, message: "请输入新密码", trigger: "blur"
        }],
        passwordcheck: [
          { required: true, message: "请再次输入新密码", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              if (value !== this.form.password) {
                callback(new Error("两次密码输入不一致!"));
              } else {
                callback();
              }
            },
            trigger: "change"
          }]
      },
    };

  },
  methods: {
    // 退出登录
    logout () {
      return logout({ router: this.$router });
    },
    handleOk (e) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          save({
            password: this.form.password,
            id: this.$store.state.account.user.id
          }).then((res) => {
            console.log(res);
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.visible = false;
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          return false;
        }
      });
    },
    handleCancel () {
      this.visible = false;
    },
  }
};
</script>

<style lang="less">
.header-avatar {
  display: inline-flex;
  .avatar,
  .name {
    align-self: center;
  }
  .avatar {
    margin-right: 8px;
  }
  .name {
    font-weight: 500;
  }
}
.avatar-menu {
  width: 150px;
}
</style>
