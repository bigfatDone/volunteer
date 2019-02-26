import fetch from '@/utils/fetch'

// 获取康爱多商品列表信息
export function getDrugList(data = {}) {
  return fetch(Object.assign({
    url: '/kadGetDrugList',
    method: 'get',
    params: data
  }))
}