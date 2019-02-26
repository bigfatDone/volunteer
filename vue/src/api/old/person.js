import fetch from '@/utils/fetch'

// 账户明细
export function getAccountDetail(data = {}) {
    return fetch(Object.assign({
        url: "/getAccounts",
        method: "get",
        params: data
    }))
}

// 个人详情
export function getUserDetail(data = {}) {
    return fetch(Object.assign({
        url: "/getpersonal",
        method: "get",
        params: data
    }))
}

// 资质认证
export function Authentication(data = {}) {
    return fetch(Object.assign({
        url: "/submitEntrustxxb",
        method: "post",
        data: data
    }))
}

// 或许验证码
export function getCode(data = {}) {
    return fetch(Object.assign({
        url: "/entrustxxbCode",
        method: "get",
        params: data
    }))
}

// 认证记录
export function record(data = {}) {
    return fetch(Object.assign({
        url: "/getEntrustOrderlist",
        method: "get",
        params: data
    }))
}

// 查看认证详情
export function testDetail(data = {}) {
    return fetch(Object.assign({
        url: "/getEntrustOrderDetail",
        method: "get",
        params: data
    }))
}
