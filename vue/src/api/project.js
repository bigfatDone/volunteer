import fetch from '@/utils/fetch'

// 发布信息
export function getProject( data = {}) {
  return fetch(Object.assign({
      url: '/project',
      method: 'post',
      data:data
  }))
}

// 获取志愿项目
export function getProjectAll( data = {}) {
  return fetch(Object.assign({
      url: '/projectAll', 
      method: 'get',
      params:data
  }))
}

// 志愿项目通过
export function getProjectPass( data = {}) {
  return fetch(Object.assign({
      url: '/projectPass',
      method: 'get',
      params:data
  }))
}

// 志愿项目不通过
export function getProjectNoPass( data = {}) {
  return fetch(Object.assign({
      url: '/projectNoPass',
      method: 'get',
      params:data
  }))
}

// 志愿项目删除
export function getProjectDelete( data = {}) {
  return fetch(Object.assign({
      url: '/projectDelete',
      method: 'get',
      params:data
  }))
}

// 志愿项目修改
export function getProjectModify( data = {}) {
  return fetch(Object.assign({
      url: '/projectModify',
      method: 'post',
      data:data
  }))
}

// 获取所以志愿项目
export function getHelpInfo( data = {}) {
  return fetch(Object.assign({
      url: '/helpInfo',
      method: 'get',
      params:data
  }))
}

// 获取志愿项目页码
export function getHelpTotal( data = {}) {
  return fetch(Object.assign({
      url: '/helpTotal',
      method: 'get',
      params:data
  }))
}

// 社区发布信息
export function getProjectPublish( data = {}) {
  return fetch(Object.assign({
      url: '/projectPublish',
      method: 'post',
      data:data
  }))
}

// 志愿项目展示
export function getProjectPage( data = {}) {
  return fetch(Object.assign({
      url: '/projectPage', 
      method: 'get',
      params:data
  }))
}

// 志愿项目详情展示
export function getProjectDetail( data = {}) {
  return fetch(Object.assign({
      url: '/projectDetail', 
      method: 'get',
      params:data
  }))
}
