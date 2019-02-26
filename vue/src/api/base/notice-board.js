import fetch from '@/utils/fetch'

// 获取公告栏列表
export function getnoticeBoard(data = {}) {
  return fetch(Object.assign({
    url: '/listGovNewsPage',
    method: 'get',
    params: data
  }))
}

// 获取公告详情
export function getnoticeNewsInfo(data = {}) {
  return fetch(Object.assign({
    url: '/getGovNewsDetail',
    method: 'get',
    params: data
  }))
}