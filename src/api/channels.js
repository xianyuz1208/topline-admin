// 处理所有与频道相关的网络请求

// 导入 axios
import axios from '../utils/request.js'

// 请求频道数据的方法
function apiGetChannels () {
  return axios({
    url: '/user/channels',
    method: 'GET'
    // 这里不太好取 token 暂时不传
    // headers: {
    //   Authorization:
    // }
  })
}

// 得到所有的频道数据
function apiGetAllChannels () {
  return axios({
    url: '/channels',
    method: 'GET'
  })
}

// 暴露接口
export { apiGetChannels, apiGetAllChannels }
