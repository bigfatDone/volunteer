import fetch from '@/utils/fetch'

// 获取行政区域数据
export function getArea(data ={}) {
  return fetch(Object.assign({
    url: '/getXzqyChildByPid',
    method: 'get',
    params: data
  }))
}

// 提交表单信息
export function postFrom(data) {
  return fetch(Object.assign({
    url: "/saveYnsioregis",
    method: "post",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: data
  }));
}

