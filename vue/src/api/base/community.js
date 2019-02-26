import fetch from '@/utils/fetch'

// 获取一社一页信息
export function getCommunityData(data = {}) {
  return fetch(Object.assign({
    url: '/getYnsInfoPage',
    method: 'get',
    params: data
  }))
}