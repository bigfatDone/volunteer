import fetch from '@/utils/fetch'

// 获取培训服务详情信息
export function getDetailData(data = {}) {
  return fetch(Object.assign({
    url: '/traingingDetails',
    method: 'get',
    params: data
  }))
}