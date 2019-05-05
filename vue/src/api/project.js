import fetch from '@/utils/fetch'

// 发布信息
export function getProject( data = {}) {
  return fetch(Object.assign({
      url: '/project',
      method: 'post',
      data:data
  }))
}

// 获取志愿项目
export function getProjectAll( data = {}) {
  return fetch(Object.assign({
      url: '/projectAll', 
      method: 'get',
      params:data
  }))
}

// 志愿项目通过
export function getProjectPass( data = {}) {
  return fetch(Object.assign({
      url: '/projectPass',
      method: 'get',
      params:data
  }))
}

// 志愿项目不通过
export function getProjectNoPass( data = {}) {
  return fetch(Object.assign({
      url: '/projectNoPass',
      method: 'get',
      params:data
  }))
}

// 志愿项目删除
export function getProjectDelete( data = {}) {
  return fetch(Object.assign({
      url: '/projectDelete',
      method: 'get',
      params:data
  }))
}

// 志愿项目修改
export function getProjectModify( data = {}) {
  return fetch(Object.assign({
      url: '/projectModify',
      method: 'post',
      data:data
  }))
}

// 获取所以志愿项目
export function getHelpInfo( data = {}) {
  return fetch(Object.assign({
      url: '/helpInfo',
      method: 'get',
      params:data
  }))
}

// 获取志愿项目页码
export function getHelpTotal( data = {}) {
  return fetch(Object.assign({
      url: '/helpTotal',
      method: 'get',
      params:data
  }))
}

// 社区发布信息
export function getProjectPublish( data = {}) {
  return fetch(Object.assign({
      url: '/projectPublish',
      method: 'post',
      data:data
  }))
}

// 志愿项目展示
export function getProjectPage( data = {}) {
  return fetch(Object.assign({
      url: '/projectPage', 
      method: 'get',
      params:data
  }))
}

// 志愿项目详情展示
export function getProjectDetail( data = {}) {
  return fetch(Object.assign({
      url: '/projectDetail', 
      method: 'get',
      params:data
  }))
}

// 社区人员发布志愿项目状态
export function getCommunityProject( data = {}) {
  return fetch(Object.assign({
      url: '/communityProject', 
      method: 'get',
      params:data
  }))
}

// 志愿者报名志愿项目
export function getEntry( data = {}) {
  return fetch(Object.assign({
      url: '/entry', 
      method: 'post',
      data:data
  }))
}

// 判断志愿者已经报名志愿项目
export function getHadEntry( data = {}) {
  return fetch(Object.assign({
      url: '/hadEntry', 
      method: 'get',
      params:data
  }))
}

// 志愿者参加志愿项目状态
export function getVolunteerProject( data = {}) {
  return fetch(Object.assign({
      url: '/volunteerProject', 
      method: 'get',
      params:data
  }))
}

// 获取志愿项目审核
export function getAuditAll( data = {}) {
  return fetch(Object.assign({
      url: '/auditAll', 
      method: 'get',
      params:data
  }))
}

// 志愿项目通过
export function getAuditPass( data = {}) {
  return fetch(Object.assign({
      url: '/auditPass',
      method: 'get',
      params:data
  }))
}

// 志愿项目不通过
export function getAuditNoPass( data = {}) {
  return fetch(Object.assign({
      url: '/auditNoPass',
      method: 'get',
      params:data
  }))
}

// 管理员添加
export function getAdminAdd( data = {}) {
  return fetch(Object.assign({
      url: '/adminAdd', 
      method: 'post',
      data:data
  }))
}

// 模糊查询志愿项目
export function getSearch( data = {}) {
  return fetch(Object.assign({
      url: '/search', 
      method: 'get',
      params:data
  }))
}

// 获取报名人数
export function getApplyNum( data = {}) {
  return fetch(Object.assign({
      url: '/applyNum', 
      method: 'get',
      params:data
  }))
}