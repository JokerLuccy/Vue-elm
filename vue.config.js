/*
 * @Author: your name
 * @Date: 2020-11-27 20:37:33
 * @LastEditTime: 2020-11-28 14:56:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue_reception\src\vue.config.js
 */
const path = require("path");
module.exports = {
  devServer: {
    proxy: "http://cangdu.org:8001"
  },
  configureWebpack: {
    resolve: {
      alias: {
        // 配置路径别名(可以简写路径)
        "@views": path.resolve(__dirname, "src/views"),
        "@assets": path.resolve(__dirname, "src/assets"),
        "@comps": path.resolve(__dirname, "src/components"),
        "@store": path.resolve(__dirname, "src/store"),
        "@utils": path.resolve(__dirname, "src/utils"),
        "@api": path.resolve(__dirname, "src/api")
      }
    }
  }
};
