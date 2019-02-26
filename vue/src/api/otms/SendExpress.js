import fetch from '@/utils/fetch'
// 获取省
export function getProvinceList() {
  return fetch(Object.assign({
    url: '/provinceList',
    method: 'post',
  }))
}

// 获取城市
export function getCityList(data = {}) {
  return fetch(Object.assign({
    url: '/provinceChildList',
    method: 'post',
    data:data
  }))
}

// 获取县
export function getCountryList(data = {}) {
  return fetch(Object.assign({
    url: '/cityChildList',
    method: 'post',
    data:data
  }))
}

// 提交oTMS寄件表单信息
export function postOtmsForm(data = {}) {
  return fetch(Object.assign({
    url: '/insertOtms',
    method: "post",
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  }))
}

