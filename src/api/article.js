// 负责处理所有的文章网络请求

import { axios2 } from '../utils/request'

// 得到频道下对应的文章数据
function apiGetArticleOfChannel ({ channel_id, timestamp }) {
  return axios2({
    url: '/articles',
    method: 'GET',
    params: {
      channel_id,
      with_top: 0,
      timestamp
    }
  })
}

// 导出
export { apiGetArticleOfChannel }
