import fetch from '@/utils/fetch'

export function getGoodsNewsType() {
  return fetch(Object.assign({
    url: '/getGoodsNewsType',
    method: 'get'
  }))
}

export function listGoodsNews(data={}) {
  return fetch(Object.assign({
      url: '/listGoodsNews',
      method: 'get',
      params:data
  }))
}
