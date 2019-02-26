import fetch from '@/utils/fetch'

// 普通支付
export function payOrdinary(data ={}) {
  return fetch(Object.assign({
    url: '/payByBlance',
    method: 'get',
    params: data
  }))
}

// 微信支付
export function payWeChat(data ={}) {
  return fetch(Object.assign({
    url: '/payByWeChat',
    method: 'get',
    params: data
  }))
}

// 支付宝支付
export function payAlipay(data ={}) {
  return fetch(Object.assign({
    url: '/payByAlipay',
    method: 'get',
    params: data
  }))
}