import fetch from '@/utils/fetch'

// 根据手机号获取快递物流信息
export function getOtmsList(data = {}) {
  return fetch(Object.assign({
    url: '/selectOtmsListByPhone',
    method: 'post',
    data: data
  }))
}

// 添加物流详情
export function searchOtmsInfo(data = {}) {
  return fetch(Object.assign({
    url: '/selectOtmsByErNumber',
    method: 'post',
    data: data
  }))
}