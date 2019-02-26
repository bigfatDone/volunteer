import fetch from '@/utils/fetch'

// 获取首页地图数据
export function getHomeMap() {
  return fetch(Object.assign({
    url: '/getMapData',
    method: 'get'
  }))
}
//获取首页地图底部数据
export function getFooterData(data = {}) {
  return fetch(Object.assign({
    url: '/getYnsNums',
    method: 'get',
    params: data
  }))
}
