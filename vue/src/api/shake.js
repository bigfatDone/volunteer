import fetch from '@/utils/fetch'

// 获取省市县三级列表
export function getShakeGoods(data = {}) {
  return fetch(Object.assign({
    url: '/getShakeGoods',
    method: 'get',
    params: data
  }))
}