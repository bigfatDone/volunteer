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


