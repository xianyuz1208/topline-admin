// 封装 axios 对象
// 导入 axios
import axios from 'axios'
// 导入 store
import store from '../store'

// 根据 axios 创建一个 axios 实例对象
//  这个实例使用起来与 axios 完全一样
let instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/app/v1_0/'
})
// 设置请求拦截器
instance.interceptors.request.use(function (config) {
  // 得到用户的登录信息
  let user = store.state.user
  // 判断用户是否登录
  if (user) {
    // 请求头中添加 token
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
// 响应拦截器
instance.interceptors.response.use(function (response) {
  // // response: 后端服务器响应回来的数据
  // console.log('------------------------------------------------interceptors.response--------------------------')
  // console.log(response) // data.data 才是我们要的数据
  // console.log('-------------------------------------------------interceptors.response-------------------------')
  // // 这里的 return 将来会将给交给网络请求
  return response.data.data
}, function (error) {
  return Promise.reject(error)
})

// 再次创建一个新的实例
let axios2 = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/app/v1_1/'
})
// 设置请求拦截器
axios2.interceptors.request.use(function (config) {
  // 得到用户的登录信息
  let user = store.state.user
  // 判断用户是否登录
  if (user) {
    // 请求头中添加 token
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
// 响应拦截器
axios2.interceptors.response.use(function (response) {
  // // response: 后端服务器响应回来的数据
  // console.log('------------------------------------------------interceptors.response--------------------------')
  // console.log(response) // data.data 才是我们要的数据
  // console.log('-------------------------------------------------interceptors.response-------------------------')
  // // 这里的 return 将来会将给交给网络请求
  return response.data.data
}, function (error) {
  return Promise.reject(error)
})

// 默认暴露
export default instance

// 按需导出
export { axios2 }
