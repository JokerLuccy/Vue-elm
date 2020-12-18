import fetch from "@utils/fetch";

// 用户登录
export const userLogin = data => fetch("/v2/login", data, "POST");
// 获取验证码
export const getCode = () => fetch("/v1/captchas", {}, "POST");
// 修改密码
export const changePwd = data => fetch("/v2/changepassword", data, "POST");
// 获取用户信息
export const getUserMsg = user_id => fetch("/v1/user", { user_id });
