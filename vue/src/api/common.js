import fetch from '@/utils/fetch'

// 获取志愿快讯详情
export function getDetail( data = {}) {
  return fetch(Object.assign({
      url: '/detail',
      method: 'get',
      params:data
  }))
}

// 获取志愿人物详情
export function getPersonageDetail( data = {}) {
  return fetch(Object.assign({
      url: '/personageDetail',
      method: 'get',
      params:data
  }))
}

// 获取aside志愿快讯
export function getNews( data = {}) {
  return fetch(Object.assign({
      url: '/getNews',
      method: 'get',
      params:data
  }))
}

// 获取aside志愿项目
export function getProjectAside( data = {}) {
  return fetch(Object.assign({
    url: '/getProjectAside',
    method: 'get',
    params:data
  }))
}

// 获取用户限权
export function getPower( data = {}) {
  return fetch(Object.assign({
      url: '/getPower',
      method: 'get',
      params:data
  }))
}


// 获取志愿者/社区注册比例
export function getRegisterRate( data = {}) {
  return fetch(Object.assign({
      url: '/registerRate',
      method: 'get',
      params:data
  }))
}

// 获取首页志愿项目
export function getPersonageAside( data = {}) {
  return fetch(Object.assign({
    url: '/getPersonageAside',
    method: 'get',
    params:data
  }))
}