import fetch from "@/utils/fetch"

// 获取益农优品详情
export function getGoodsNewsDetail(data = {}) {
  return fetch(Object.assign({
    url: '/getGoodsNewsDetail',
    methods: 'get',
    params: data
  }))
}