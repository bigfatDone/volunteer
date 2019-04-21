import fetch from '@/utils/fetch'

// 登录
export function getLogin( data = {}) {
    return fetch(Object.assign({
        url: '/login',
        method: 'post',
        data:data
    }))
}

// 登录验证码
export function getCode(data = {}) {
    return fetch(Object.assign({
        url: '/code',
        method: 'get',
        params: data
    }))
}

// 用户名重复注册
export function getRepeatName( data = {}) {
  return fetch(Object.assign({
    url: '/repeatName',
    method: 'get',
    params: data
  }))
}

// 身份证重复注册
export function getRepeatCard( data = {}) {
  return fetch(Object.assign({
    url: '/repeatCard',
    method: 'get',
    params: data
  }))
}

// 志愿者注册
export function getVolunteerRegister( data = {}) {
  return fetch(Object.assign({
      url: '/volunteerRegister',
      method: 'post',
      data:data
  }))
}

// 社区编码重复注册
export function getRepeatCoding( data = {}) {
  return fetch(Object.assign({
    url: '/repeatCoding',
    method: 'get',
    params: data
  }))
}

// 社区注册
export function getCommunityRegister( data = {}) {
  return fetch(Object.assign({
      url: '/communityRegister',
      method: 'post',
      data:data
  }))
}

// 管理员登录
export function getAdminLogin( data = {}) {
  return fetch(Object.assign({
      url: '/adminLogin',
      method: 'post',
      data:data
  }))
}


// 获取用户数据
export function getUpdateUser( data = {}) {
  return fetch(Object.assign({
    url: '/updateUser',
    method: 'get',
    params: data
  }))
}

// 志愿者修改
export function getVolunteerModify( data = {}) {
  return fetch(Object.assign({
      url: '/volunteerModify',
      method: 'post',
      data:data
  }))
}

// 社区修改
export function getCommunityModify( data = {}) {
  return fetch(Object.assign({
      url: '/communityModify',
      method: 'post',
      data:data
  }))
}