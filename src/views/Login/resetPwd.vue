/* 重置密码 */
<template>
  <div>
    <van-nav-bar
      title="重置密码"
      left-arrow
      style="margin-bottom:15px"
      @click-left="$router.push('/login')"
    />
    <van-form>
      <!-- 账号 -->
      <van-field
        v-model="username"
        name="账号"
        label="账号"
        placeholder="请输入账号"
        :rules="[{ required: true, message: '请填写账号' }]"
      />
      <!-- 旧密码 -->
      <van-field
        v-model="oldpassWord"
        type="'password"
        name="原密码"
        label="原密码"
        placeholder="请输入原密码"
        :rules="[{ required: true, message: '请填写原密码' }]"
      >
        >
      </van-field>
      <!-- 新密码 -->
      <van-field
        v-model="newpassword"
        type="'password"
        name="新密码"
        label="新密码"
        placeholder="请输入新密码"
        :rules="[{ required: true, message: '请填写新密码' }]"
      >
      </van-field>
      <!-- 确认密码 -->
      <van-field
        v-model="confirmpassword"
        type="'password"
        name="确认密码"
        label="确认密码"
        placeholder="请确认密码"
        :rules="[
          {
            required: true,
            validator: this.validataConfirmPwd,
            message: '两次密码不一样'
          }
        ]"
      >
      </van-field>
      <!-- 验证码 -->
      <van-field
        v-model="captcha_code"
        type="code"
        name="验证码"
        label="验证码"
        placeholder="请输入验证码"
        :rules="[{ required: true, message: '请填写验证码' }]"
      >
        <div slot="button">
          <img v-show="codeUrl" :src="codeUrl" @click="getCaptcha_Code" />
        </div>
      </van-field>
      <!-- 提交按钮 -->
      <div style="margin: 16px;">
        <van-button
          round
          block
          type="info"
          native-type="button"
          @click="onSubmit"
        >
          确认修改
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { getCode, changePwd } from "@api/login";
import { Dialog } from "vant";
export default {
  name: "ResetPwd",
  data() {
    return {
      username: "", //用户名
      oldpassWord: "", //旧密码
      newpassword: "", //新密码
      confirmpassword: "", //确认密码
      captcha_code: "", // 验证码
      codeUrl: "" // 图片验证码
    };
  },
  methods: {
    // 校验确认密码
    validataConfirmPwd(value) {
      if (value !== this.newpassword) {
        return false;
      }
    },
    // 提交表单
    async onSubmit() {
      const {
        username,
        oldpassWord,
        newpassword,
        confirmpassword,
        captcha_code
      } = this;
      const data = {
        username,
        oldpassWord,
        newpassword,
        confirmpassword,
        captcha_code
      };

      this.show = true;
      const res = await changePwd(data);
      this.username = "";
      this.oldpassWord = "";
      this.newpassword = "";
      this.confirmpassword = "";
      this.captcha_code = "";
      if (res.status === 1) {
        Dialog.alert({
          title: "提示",
          message: "修改密码成功"
        }).then(() => {
          // on close
          this.$router.push("/login");
        });
      } else {
        Dialog.alert({
          title: "提示",
          message: "验证码不正确"
        }).then(() => {
          // on close
          this.getCaptcha_Code();
        });
      }
    },
    // 获取验证码
    async getCaptcha_Code() {
      const captcha_code = await getCode();
      this.codeUrl = captcha_code.code;
    }
  },
  mounted() {
    // 获取验证码
    this.getCaptcha_Code();
  }
};
</script>

<style></style>
