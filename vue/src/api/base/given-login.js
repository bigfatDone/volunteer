import fetch from '@/utils/fetch'

// 发送登录请求
export function postGivenLogin(data ={}) {
  return fetch(Object.assign({
    url: '/getReportingStatistics',
    method: 'get',
    params: data
  }))
}