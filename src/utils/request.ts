import axios from 'axios'

const request = axios.create({
  baseURL: 'http://localhost:8888',
  timeout: 5000
})


// 添加请求拦截器
request.interceptors.request.use(config => {
    return config
})

// 添加响应拦截器
request.interceptors.response.use(res => {
    return res.data
})


export default request