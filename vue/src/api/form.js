import fetch from '@/utils/fetch'

// 保存申报信息
export function storageDeclartForm(data = {}) {
  return fetch(Object.assign({
    url: '/saveInformation',
    method: 'post',
    data: data
  }))
}

// 提交申报信息
export function submitDeclartForm(data = {}) {
  return fetch(Object.assign({
    url: '/submitInformation',
    method: 'post',
    data: data
  }))
}

// 补充申报信息
export function submitSupplyForm(data = {}) {
  return fetch(Object.assign({
    url: '/saveAddInfo',
    method: 'post',
    data: data
  }))
}

// 补充申报信息2
export function submitSupplyForm2(data = {}) {
  return fetch(Object.assign({
    url: '/saveAddInfo2',
    method: 'post',
    data: data
  }))
}

// 下载主体二维码
export function getCodeImg(data = {}) {
  return fetch(Object.assign({
    url: '/downloadApplyEwm',
    method: 'get',
    params: data
  }))
}
