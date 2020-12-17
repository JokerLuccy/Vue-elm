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
  /* dev: {
    env: {
      NODE_ENV: '"development"'
    },
    port: 8080,
    assetsSubDirectory: "static",
    assetsPublicPath: "/",
    context: [
      //代理路径
      "/shopping",
      "/ugc",
      "/v1",
      "/v2",
      "/v3",
      "/v4",
      "/bos",
      "/member",
      "/promotion",
      "/eus",
      "/payapi",
      "/img"
    ],
    proxypath: "http://cangdu.org:8001",
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }, */
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
