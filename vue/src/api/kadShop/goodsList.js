import fetch from '@/utils/fetch'

// 订单列表
export function getGoodsList(data = {}) {
  return fetch(Object.assign({
    url: '/listKADOrders',
    method: 'get',
    params: data
  }))
}
