import fetch from '@/utils/fetch'

// 获取康爱多商品列表信息
export function getCartList(data = {}) {
  return fetch(Object.assign({
    url: '/findCartList',
    method: 'get',
    params: data
  }))
}
