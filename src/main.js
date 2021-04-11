import 'ant-design-vue/dist/antd.css';
import Vue from 'vue'
import App from './App.vue'
import store from './store'
import Antd from 'ant-design-vue';

Vue.use(Antd);
Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
