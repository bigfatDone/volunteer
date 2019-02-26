import fetch from '@/utils/fetch'

// 获取农产品一级分类
export function getGoodsType1() {
  return fetch(Object.assign({
    url: '/listAgriculturalGoods',
    method: 'get'
  }))
}

// 获取农产品二级分类
export function getGoodsType2(data = {}) {
  return fetch(Object.assign({
    url: '/listGoodsSecondLevelType',
    method: 'get',
    params: data
  }))
}

// 获取商品列表
export function getGoods(data = {}) {
  return fetch(Object.assign({
    url: '/listGoodsCondition',
    method: 'get',
    params: data
  }))
}




