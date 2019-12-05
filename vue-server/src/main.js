// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import animated from 'animate.css'
Vue.use(animated)

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios,axios);
// 全局地址前缀
axios.defaults.baseURL='http://127.0.0.1:3000'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
