import axios from "axios";
import { baseURL } from "@utils/myUtils";
// 用户登录
export const userLogin = data =>
  axios({
    method: "POST",
    url: `${baseURL}/v2/login`,
    data
  });
// 获取验证码
export const getCode = () =>
  axios({
    method: "POST",
    withCredentials: true,
    url: `${baseURL}/v1/captchas`,
    data: {}
  });
