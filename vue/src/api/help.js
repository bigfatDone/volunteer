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