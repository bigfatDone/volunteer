import fetch from '@/utils/fetch'

// 发布志愿人物
export function getPersonage( data = {}) {
  return fetch(Object.assign({
      url: '/personage',
      method: 'post',
      data:data
  }))
}

// 获取志愿人物
export function getPersonageAll( data = {}) {
  return fetch(Object.assign({
      url: '/personageAll',
      method: 'get',
      params:data
  }))
}

// 获取志愿人物详情
export function getNewsDetail( data = {}) {
  return fetch(Object.assign({
      url: '/newsDetail',
      method: 'get',
      params:data
  }))
}

// 志愿人物修改
export function getPersonageModify( data = {}) {
  return fetch(Object.assign({
      url: '/personageModify',
      method: 'post',
      data:data
  }))
}

// 志愿人物删除
export function getPersonageDelete( data = {}) {
  return fetch(Object.assign({
      url: '/personageDelete',
      method: 'get',
      params:data
  }))
}

// 志愿人物风采
export function getPersonageOne( data = {}) {
  return fetch(Object.assign({
      url: '/personageOne',
      method: 'get',
      params:data
  }))
}

// 志愿人物故事
export function getPersonageTwo( data = {}) {
  return fetch(Object.assign({
      url: '/personageTwo',
      method: 'get',
      params:data
  }))
}

// 志愿人物心语
export function getPersonageThree( data = {}) {
  return fetch(Object.assign({
      url: '/personageThree',
      method: 'get',
      params:data
  }))
}