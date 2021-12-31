/* 
    axios二次封装
*/
import axios from 'axios'
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'
import store from '@/store'
// 配置的通用的基础路径和超时时间
// service 是一个能任意发送ajax请求的函数 也可以当做对象使用
const service = axios.create({
    // baseURL: 'http://39.98.123.211/api',
    baseURL: '/api',
    timeout: 20000, // 超时时间
})

// 添加请求拦截器
service.interceptors.request.use((config) => {
    // 2, 显示请求进度条
    NProgress.start()

    // 携带临时标识
    let userTempId = store.state.user.userTempId
    if (userTempId) {
        config.headers.userTempId = userTempId
    }

    let token = store.state.user.token
    if (token) {
        config.headers.token = token
    }
    // 必须返回config
    return config; // 后面会根据返回的config，使用xhr对象发送ajax请求
})

// 添加响应拦截器 Interceptors
service.interceptors.response.use(
    response => {
        // 请求成功返回的回调
        // 隐藏请求进度条： 在响应拦截器成功的回调中
        NProgress.done()
        // return response
        return response.data
    },
    error => {
        // 请求失败返回的回调 隐藏进度条
        NProgress.done()
        alert(error.message || '未知的请求错误')
        // 统一处理请求错误，具体请求也可以选择处理或不处理

        // throw error
        // return error 不能这样写 属于成功的promise值 value是error
        return Promise.reject(error)
    }
)

// service.get('/xxx').then(result => {
//     // const result = response.data
// }).catch(error => {
//     // 做一些提示之外的特定工作
// })

// 向外暴露service
export default service
