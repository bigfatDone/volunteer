import fetch from '@/utils/fetch'

// 登录
export function getLogin( data = {}) {
    return fetch(Object.assign({
        url: '/login',
        method: 'post',
        data:data
    }))
}

// 登录验证码
export function getCode(data = {}) {
    return fetch(Object.assign({
        url: '/code',
        method: 'get',
        params: data
    }))
}
