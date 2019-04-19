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