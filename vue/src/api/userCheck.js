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
