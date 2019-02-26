import fetch from '@/utils/fetch'
// 微信登录
export function getUserLogin(data = {}) {
  return fetch(Object.assign({
      url: "/userLogin",
      method: "get",
      params: data
  }))
}
