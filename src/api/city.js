// import fetch from "../config/fetch";

// export const cityGuess = () => fetch("/v1/cities", { type: "guess" });
import axios from "axios";
import { baseUrl } from "@utils/myUtils";
// 定位城市 热门城市,所有城市
export const cityGuess = type =>
  axios({
    method: "GET",
    url: `${baseUrl}/v1/cities`,
    params: {
      type
    }
  });
// 获取所选城市信息
export const selectedCityMsg = id =>
  axios({
    method: "GET",
    url: `${baseUrl}/v1/cities/${id}`
  });
// 搜索地址
export const getPois = (city_id, keyword, type) =>
  axios({
    method: "GET",
    url: `${baseUrl}/v1/pois`,
    params: {
      city_id,
      keyword,
      type
    }
  });
