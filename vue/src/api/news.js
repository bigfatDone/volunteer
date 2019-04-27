import fetch from '@/utils/fetch'

// 发布志愿快讯
export function getNews( data = {}) {
  return fetch(Object.assign({
      url: '/news',
      method: 'post',
      data:data
  }))
}

// 获取志愿快讯
export function getNewsAll( data = {}) {
  return fetch(Object.assign({
      url: '/newsAll',
      method: 'get',
      params:data
  }))
}

// 获取志愿快讯详情
export function getNewsDetail( data = {}) {
  return fetch(Object.assign({
      url: '/newsDetail',
      method: 'get',
      params:data
  }))
}

// 新闻信息修改
export function getNewsModify( data = {}) {
  return fetch(Object.assign({
      url: '/newsModify',
      method: 'post',
      data:data
  }))
}

// 新闻信息删除
export function getNewsDelete( data = {}) {
  return fetch(Object.assign({
      url: '/newsDelete',
      method: 'get',
      params:data
  }))
}