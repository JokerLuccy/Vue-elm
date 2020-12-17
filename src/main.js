import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./styles/reset.css";
import "./styles/iconfont.css";
import "./config/rem";
import "./plugins/vant.js";
import "vant/lib/index.css";
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router
}).$mount("#app");
