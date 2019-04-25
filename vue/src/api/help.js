import fetch from '@/utils/fetch'

// 发布求助信息
export function getHelp( data = {}) {
  return fetch(Object.assign({
      url: '/help',
      method: 'post',
      data:data
  }))
}

// 获取所以求助信息
export function getHelpAll( data = {}) {
  return fetch(Object.assign({
      url: '/helpAll',
      method: 'get',
      params:data
  }))
}

// 求助信息通过
export function getHelpPass( data = {}) {
  return fetch(Object.assign({
      url: '/helpPass',
      method: 'get',
      params:data
  }))
}

// 求助信息不通过
export function getHelpNoPass( data = {}) {
  return fetch(Object.assign({
      url: '/helpNoPass',
      method: 'get',
      params:data
  }))
}

// 求助信息删除
export function getHelpDelete( data = {}) {
  return fetch(Object.assign({
      url: '/helpDelete',
      method: 'get',
      params:data
  }))
}

// 求助信息修改
export function getHelpModify( data = {}) {
  return fetch(Object.assign({
      url: '/helpModify',
      method: 'post',
      data:data
  }))
}

// 获取所以求助信息
export function getHelpInfo( data = {}) {
  return fetch(Object.assign({
      url: '/helpInfo',
      method: 'get',
      params:data
  }))
}

// 获取所以求助信息
export function getHelpTotal( data = {}) {
  return fetch(Object.assign({
      url: '/helpTotal',
      method: 'get',
      params:data
  }))
}