import fetch from '@/utils/fetch'

// 获取公益服务内容列表
export function getPublicList(data ={}) {
  return fetch(Object.assign({
    url: '/listPolicyNewsPage',
    method: 'get',
    params: data
  }))
}