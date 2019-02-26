import fetch from '@/utils/fetch'

// 获取商品详情
export function getGoodsinfo(data ={}) {
  return fetch(Object.assign({
    url: '/kadGetDrugDetails',
    method: 'get',
    params: data
  }))
}

// 添加商品进购物车
export function postAddGoodsToCart(data ={}) {
  return fetch(Object.assign({
    url: '/addGoodsToCartList',
    method: 'post',
    data: data
  }))
}