import fetch from '@/utils/fetch'

// 获取省市县三级列表
export function getAllAreaList() {
  return fetch(Object.assign({
    url: '/changeArea',
    method: 'get'
  }))
}