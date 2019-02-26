import fetch from '@/utils/fetch'

// 订单列表
export function getOrderDetails(data = {}) {
  return fetch(Object.assign({
    url: '/kadGetOrderInfo',
    method: 'get',
    params: data
  }))
}
