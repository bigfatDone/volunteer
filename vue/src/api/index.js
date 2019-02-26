import fetch from '@/utils/fetch'

// 获取新闻类型列表
export function getNewsType() {
    return fetch(Object.assign({
        url: '/government_Press_Releases',
        method: 'get'
    }))
}

// 获取新闻列表
export function getNewsList() {
    return fetch(Object.assign({
        url: '/government_Press',
        method: 'get'
    }))
}

// 获取公益服务类型列表
export function getPublicType() {
    return fetch(Object.assign({
        url: '/public_Service_Entrance',
        method: 'get'
    }))
}

// 获取新闻列表
export function getPublicList() {
    return fetch(Object.assign({
        url: '/public_Service',
        method: 'get'
    }))
}

// 获取农产品类型列表
export function getProductType() {
    return fetch(Object.assign({
        url: '/listAgriculturalGoods',
        method: 'get'
    }))
}

// 获取培训体验服务类型列表
export function getTrainType() {
    return fetch(Object.assign({
        url: '/classification',
        method: 'get'
    }))
}

// 获取培训体验服务列表
export function getTraninList() {
    return fetch(Object.assign({
        url: '/detailed',
        method: 'get'
    }))
}

// 获取粤农优品类型列表
export function getYnProductsType() {
    return fetch(Object.assign({
        url: '/getGoodsNewsType',
        method: 'get'
    }))
}

// 根据id获取下级地区
export function getArea(data = {}) {
    return fetch(Object.assign({
        url: '/getXzqyChildByPid',
        method: 'get',
        params: data
    }))
}

// 点击了粤农优品认证判断是否已经审核通过
export function checkStatus(data = {}) {
    return fetch(Object.assign({
        url: '/checkstatus',
        method: 'get',
        params: data
    }))
}