import Vue from 'vue'

import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import './utils/http'
import './assets/base.css'
import router from '@/router/'
import store from '@/store';
new Vue({
  store,
  render: h => h(App),
  router,

}).$mount('#app') 