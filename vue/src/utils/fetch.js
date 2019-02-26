import axios from 'axios'

// 创建axios实例
const service = axios.create({
  baseURL: '/portal2',    // api的base_url
  timeout: 20000          // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  return config
}, error => {
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.code && res.code != 0) {
      return Promise.reject(res)
    } else {
      return Promise.resolve(res);
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
