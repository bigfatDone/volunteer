import fetch from '@/utils/fetch'

// 获取培训服务的类表
export function getServiceList(data = {}) {
    return fetch(Object.assign({
        url: "/listTrainingPage",
        method: "get",
        params: data
    }))
}

// 电子商务详情页
export function getGoodsInfo(data = {}) {
    return fetch(Object.assign({
        url: "/getGoodsDetail2.do",
        method: "get",
        params: data
    }))
}