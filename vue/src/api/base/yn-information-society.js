import fetch from '@/utils/fetch'

// 获取行政区域
export function getDivisions( data = {} ) {
  return fetch(Object.assign({
    url: '/getXzqyChildByPid',
    method: 'get',
    params: data
  }))
}

// 获取益农社列表
export function getYNSocieties( data = {} ) {
  return fetch(Object.assign({
    url: '/getYnsList',
    method: 'get',
    params: data
  }))
}

