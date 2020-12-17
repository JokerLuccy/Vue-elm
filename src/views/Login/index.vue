<template>
  <div>
    <van-nav-bar title="密码登录" left-arrow style="margin-bottom:15px" />
    <van-form>
      <van-field
        v-model="username"
        name="账号"
        label="账号"
        placeholder="请输入账号"
        :rules="[{ required: true, message: '请填写账号' }]"
      />

      <van-field
        v-model="password"
        :type="checked ? 'password' : 'text'"
        name="密码"
        label="密码"
        placeholder="请输入密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      >
        <template #right-icon>
          <van-switch v-model="checked" size="24" />
        </template>
      </van-field>

      <van-field
        v-model="captcha_code"
        type="code"
        name="验证码"
        label="验证码"
        placeholder="请输入验证码"
        :rules="[{ required: true, message: '请填写验证码' }]"
      >
        <div slot="button">
          <img v-show="codeUrl" :src="codeUrl" @click="getCode" />
          <div>
            <p>看不清</p>
            <p>换一张</p>
          </div>
        </div>
      </van-field>
      <p class="login_tips">
        温馨提示：未注册过的账号，登录时将自动注册
      </p>
      <p class="login_tips">
        注册过的用户可凭账号密码登录
      </p>
      <div style="margin: 16px;">
        <van-button
          round
          block
          type="info"
          native-type="button"
          @click="onSubmit"
        >
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { getCode, userLogin } from "@api/login";
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      captcha_code: "",
      codeUrl: "",
      checked: true
    };
  },
  methods: {
    // 获取验证码
    async getCode() {
      const res = await getCode();
      this.codeUrl = res.data.code;
    },
    // 提交表单
    async onSubmit() {
      const { username, password, captcha_code } = this;
      const data = { username, password, captcha_code };
      const res = await userLogin(data);
      this.getCode();
      console.log(res);
    }
  },
  created() {},
  mounted() {
    this.getCode();
  }
};
</script>

<style lang="less" scoped>
.login_tips {
  font-size: 0.5rem;
  color: red;
  padding: 0.4rem 0.6rem;
  line-height: 0.5rem;
}
</style>
