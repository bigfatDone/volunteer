import fetch from '@/utils/fetch'

// 益农社登录
export function clubLogin(data = {}) {
  return fetch(Object.assign({
    url: '/login',
    method: 'post',
    data: data
  }))
}

// 益农社注册
export function clubRegister(data = {}) {
  return fetch(Object.assign({
    url: '/register',
    method: 'post',
    data: data
  }))
}

// 获取微信登录的用户信息
export function getWechatUser(data = {}) {
  return fetch(Object.assign({
    url: '/cbtest',
    method: 'get',
    params: data
  }))
}