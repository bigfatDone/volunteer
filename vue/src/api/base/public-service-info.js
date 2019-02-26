import fetch from '@/utils/fetch'

// 获取公益服务内容详情
export function getPublicServiceInfo(data ={}) {
  return fetch(Object.assign({
    url: '/getNewsDetail',
    method: 'get',
    params: data
  }))
}