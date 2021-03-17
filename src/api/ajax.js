/*
发送ajax请求的模块
1.处理post请求体的参数，转换为urlencode的格式（默认是json 的格式）： 请求拦截器
2. 让成功的结果不是response，而是response.data ： 响应拦截器的成功回调
3. 统一处理请求错误：相应拦截器的失败回调

*/

import axios from 'axios'
import qs from 'qs'

axios.defaults.baseURL = 'http://localhost:8080'
axios.interceptors.request.use(config => {
    const { method, data } = config
    if (method.toUpperCase() == 'POST' && data instanceof Object) {
        config.data = qs.stringify(data)
    }
    return config
})

axios.interceptors.response.use(response => {
    return response.data
}, error => {
    alert('请求：' + error.message)
})
export default axios