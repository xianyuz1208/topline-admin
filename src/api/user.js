// 封装的所有用户相关的网络请求

// 导入 axios
import axios from '../utils/request'

// 进行用户登录
function apiUserLogin (options) {
  // 发送请求
  // 这里的 return： return 的是 axios 方法返回的 promise 对象
  return axios({
    url: `/authorizations`,
    method: 'POST',
    data: {
      mobile: options.mobile,
      code: options.code
    }
  })
}

// 暴露出去：按需导出
export { apiUserLogin }
