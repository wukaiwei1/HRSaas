// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import axios from 'axios'
import { Message } from 'element-ui'
// 创建一个axios的实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
// 请求拦截器
service.interceptors.request.use()
// 响应拦截器
service.interceptors.response.use(
  // 请求返回resolve对象
  (res) => {
    console.log(res)
    const { data, success, message } = res.data
    // 数据响应成功
    if (success) {
      return data
    }
    // 失败返回错误提示
    Message.error(message)
    return Promise.reject(new Error(message))
  },
  // 请求失败返回reject对象
  (error) => {
    // 错误提示
    Message.error('系统异常')
    return Promise.reject(error)
  }
)
// 导出axios实例
export default service
