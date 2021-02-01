import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import IconSvg from "./plugins/icons";
import ElementUI from "element-ui";
import "@/styles/reset.less";
import "@/styles/common.less";
import "@/styles/theme/index.css";

Vue.use(IconSvg);
Vue.use(ElementUI);
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
