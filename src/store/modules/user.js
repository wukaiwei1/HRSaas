import { getUserDetailsApi, getUserInfoApi, login } from '@/api/user'
import { setTokenTime } from '@/utils/auth'
export default {
  namespaced: true,
  state: {
    // 用户token
    token: '',
    // 用户信息
    userInfo: {}
  },
  mutations: {
    // 存储用户token
    setToken(state, payload) {
      state.token = payload
    },
    // 存储用户信息
    setUserinfo(state, payload) {
      state.userInfo = payload
    }
  },
  actions: {
    // 登录请求
    async getToken(context, payload) {
      const data = await login(payload)
      context.commit('setToken', data)
      setTokenTime()
    },
    // 获取用户信息
    async getUserInfo(context) {
      const userBaseInfo = await getUserInfoApi()
      const userInfo = await getUserDetailsApi(userBaseInfo.userId)
      context.commit('setUserinfo', { ...userBaseInfo, ...userInfo })
    },
    // 退出
    logout(context) {
      context.commit('setToken', '')
      context.commit('setUserinfo', {})
    }
  }
}
