import fetch from '@/utils/fetch'

// 获取统计数据
export function getTotalData(data = {}) {
  return fetch(Object.assign({
    url: '/data',
    method: 'get',
    params: data
  }))
}
