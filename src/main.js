import 'ant-design-vue/dist/antd.css'
import Vue from 'vue'
import App from './App.vue'
import store from './store'
import Antd from 'ant-design-vue'
import router from "@/router";
import VueRouter from "vue-router";

Vue.use(Antd);
Vue.use(VueRouter);
Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
