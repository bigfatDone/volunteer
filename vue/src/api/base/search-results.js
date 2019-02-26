import fetch from '@/utils/fetch'

// 获取公告列表
export function getRelease(data ={}) {
  return fetch(Object.assign({
    url: '/SolrRelease.do',
    method: 'get',
    params: data
  }))
}
// 获取公益服务列表
export function getWelfare(data ={}) {
  return fetch(Object.assign({
    url: '/SolrWelfare.do',
    method: 'get',
    params: data
  }))
}
// 获取培训体验服务列表
export function getTrain(data ={}) {
  return fetch(Object.assign({
    url: '/SolrTraining',
    method: 'get',
    params: data
  }))
}
// 获取所有列表
export function getAll(data = {}) {
  return fetch(Object.assign({
    url: '/Search',
    method: 'get',
    params: data
  }))
}

export function getYNClubs(data = {}) {
  return fetch(Object.assign({
    url: '/SolrDeclare.do',
    method: 'get',
    params: data
  }))
}