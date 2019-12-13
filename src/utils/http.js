import Vue from 'vue'
import router from '@/router/'
import axios from 'axios'
Vue.prototype.$axios = axios;
axios.defaults.baseURL = "http://ttapi.research.itcast.cn/"
Vue.config.productionTip = false
//如果有vue后缀与js后缀的文件,会默认先找js的

import JSONbig from 'json-bigint'
axios.defaults.transformResponse = [function(data){
  try{
      //能转换,就转换再返回
      return JSONbig.parse(data)
  }
  catch{
      //如果上面不能转换,就原样返回
      return data
}
  }];
axios.interceptors.request.use(function(config){
    let obj = JSON.parse(window.localStorage.getItem('userInfo'));
    if(obj){
        config.headers.Authorization = `Bearer ${obj.token}`
    }
    return config
    },function(error){
      return Promise.reject(error);
    })
    // 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
    // window.console.log(response)
  return response;
}, function (error) {
  // 对响应错误做点什么
  if(error.response.status == 401){
    Vue.prototype.$message.error('请先登录')
    router.push('/login')
  }else{
    return Promise.reject(error);
  }
});