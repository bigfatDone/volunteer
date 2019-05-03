import fetch from '@/utils/fetch'

// 志愿者审核
export function getVolunteerCheck(data = {}) {
    return fetch(Object.assign({
        url: '/volunteerCheck',
        method: 'get',
        params:data
    }))
}

// 志愿者审核通过
export function getVolunteerPass(data = {}) {
    return fetch(Object.assign({
        url: '/volunteerPass',
        method: 'get',
        params: data
    }))
}

// 志愿者审核不通过
export function getVolunteerNoPass(data = {}) {
    return fetch(Object.assign({
        url: '/volunteerNoPass',
        method: 'get',
        params: data
    }))
}

// 志愿者删除
export function getVolunteerDelete(data = {}) {
    return fetch(Object.assign({
        url: '/volunteerDelete',
        method: 'get',
        params: data
    }))
}

// 社区审核
export function getCommunityCheck(data = {}) {
  return fetch(Object.assign({
      url: '/communityCheck',
      method: 'get',
      params:data
  }))
}

// 社区审核通过
export function getCommunityPass(data = {}) {
  return fetch(Object.assign({
      url: '/communityPass',
      method: 'get',
      params: data
  }))
}

// 社区审核不通过
export function getCommunityNoPass(data = {}) {
  return fetch(Object.assign({
      url: '/communityNoPass',
      method: 'get',
      params: data
  }))
}

// 社区删除
export function getCommunityDelete(data = {}) {
  return fetch(Object.assign({
      url: '/communityDelete',
      method: 'get',
      params: data
  }))
}

// 获取全部管理员
export function getAdminAll(data = {}) {
  return fetch(Object.assign({
      url: '/adminAll',
      method: 'get',
      params:data
  }))
}

// 删除管理员
export function getAdminDelete(data = {}) {
  return fetch(Object.assign({
      url: '/adminAllDelete',
      method: 'get',
      params:data
  }))
}

// 添加管理员
export function getAdminAdd(data = {}) {
  return fetch(Object.assign({
      url: 'adminAdd',
      method: 'post',
      data:data
  }))
}
