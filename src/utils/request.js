// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getTokenTime } from './auth'
import router from '@/router'
// 创建一个axios的实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
// 判断token是否过期
function timeOut() {
  // 本地的token时间戳
  const tokenTime = getTokenTime()
  // 当前发送请求的时间戳
  const currentTime = Date.now()
  // token过期的时效
  const timeOut = 2 * 60 * 60 * 1000
  return currentTime - tokenTime > timeOut
}

// 请求拦截器
service.interceptors.request.use(async (comfig) => {
  // 注入token,本地存在token
  if (store.state.user.token) {
    if (timeOut()) {
      // 如果超时，执行退出功能
      await store.dispatch('user/logout')
      // 跳转页面
      router.push('/login')
      // 抛出错误
      return Promise.reject(new Error('登录过期'))
    } else {
      comfig.headers.Authorization = 'Bearer ' + store.state.user.token
    }
  }
  return comfig
})
// 响应拦截器
service.interceptors.response.use(
  // 请求返回resolve对象
  (res) => {
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
  async (error) => {
    if (error?.response?.status === 401) {
      Message.error('登录过期')
      // 如果超时，执行退出功能
      await store.dispatch('user/logout')
      // 跳转页面
      router.push('/login')
    } else {
      // 错误提示
      Message.error(error.message)
    }
    return Promise.reject(error)
  }
)
// 导出axios实例
export default service
