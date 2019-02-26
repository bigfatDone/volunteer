import fetch from '@/utils/fetch'

// 获取商品一级分类内容列表
export function getGoodsFirst() {
  return fetch(Object.assign({
    url: '/listGoodsFirstLevelType',
    method: 'get'
  }))
}

// 获取商品二级分类内容列表
export function getGoodsSecond(data ={}) {
  return fetch(Object.assign({
    url: '/listGoodsSecondLevelType',
    method: 'get',
    params: data
  }))
}

// 获取检测类别内容列表
export function getTestType(data ={}) {
  return fetch(Object.assign({
    url: '/getTestCategory',
    method: 'get',
    params: data
  }))
}

// 获取行政区域地址
export function getAddress(data ={}) {
  return fetch(Object.assign({
    url: '/getXzqyChildByPid',
    method: 'get',
    params: data
  }))
}

// 获取益农社信息
export function getYnsMsg(data ={}) {
  return fetch(Object.assign({
    url: '/findYNS',
    method: 'get',
    params: data
  }))
}

// 获取农户信息
export function getFarmerInfo(data ={}) {
  return fetch(Object.assign({
    url: '/getFarmerInformation',
    method: 'get',
    params: data
  }))
}

// 获取类型信息
export function getTypeMsg(data ={}) {
  return fetch(Object.assign({
    url: '/getDetectionItems',
    method: 'get',
    params: data
  }))
}

// 提交粤农优品认证信息
export function submitInfo(data ={}) {
  return fetch(Object.assign({
    url: '/goodAuthentic',
    method: 'post',
    data: data
  }))
}