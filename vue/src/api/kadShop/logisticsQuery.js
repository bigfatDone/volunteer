import fetch from '@/utils/fetch'

// 获取物流信息
export function getLogisticsInfo(data ={}) {
  return fetch(Object.assign({
    url: '/kadGetLogistics',
    method: 'get',
    params: data
  }))
}