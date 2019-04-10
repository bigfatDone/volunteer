import fetch from '@/utils/fetch'

// 获取新闻类型列表
export function getLogin( data = {}) {
    return fetch(Object.assign({
        url: '/login',
        method: 'post',
        data:data
    }))
}
