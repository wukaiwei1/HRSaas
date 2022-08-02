import { login } from '@/api/user'
export default {
  namespaced: true,
  state: {
    token: ''
  },
  mutations: {
    // 存储用户token
    setToken(state, payload) {
      state.token = payload
    }
  },
  actions: {
    async getToken(context, payload) {
      const data = await login(payload)
      console.log(data)
      context.commit('setToken', data)
    }
  }
}
