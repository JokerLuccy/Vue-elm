<template>
  <div>
    <van-nav-bar
      title="密码登录"
      left-arrow
      style="margin-bottom:15px"
      @click-left="$router.push('/')"
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
      <!-- 密码 -->
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
          <img v-show="codeUrl" :src="codeUrl" @click="getCode" />
        </div>
      </van-field>
      <!-- 文字提示 -->
      <p class="login_tips">
        温馨提示：未注册过的账号，登录时将自动注册
      </p>
      <p class="login_tips">
        注册过的用户可凭账号密码登录
      </p>
      <!-- 重置密码 -->
      <div class="resetPwd">
        <router-link to="/forget">
          <a>重置密码</a>
        </router-link>
      </div>
      <!-- 登录按钮 -->
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
      this.codeUrl = res.code;
    },
    // 提交表单
    async onSubmit() {
      const { username, password, captcha_code } = this;
      const data = { username, password, captcha_code };
      const res = await userLogin(data);
      console.log(res);
      if (res.status === 0) {
        this.$dialog
          .alert({
            title: "提示",
            message: "账号或密码错误"
          })
          .then(() => {
            this.getCode();
          });
      } else {
        (this.username = ""),
          (this.password = ""),
          (this.captcha_code = ""),
          window.localStorage.setItem("user_id", res.user_id);
        this.$router.push("/");
      }
    }
  },

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
.resetPwd {
  font-size: 0.5rem;
  padding: 0.4rem 0.6rem;
  line-height: 0.5rem;
}
</style>
