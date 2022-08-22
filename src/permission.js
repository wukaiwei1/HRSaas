// 权限控制
import router, { asyncRoutes, resetRouter } from '@/router'
import store from '@/store'

// 白名单（不用登录也能访问）
const whiteList = ['/login', '/404']
// 路由全局前置守卫
router.beforeEach(async (to, from, next) => {
  const token = store.state.user.token
  //   console.log(token)
  //登录了
  if (token) {
    if (!store.state.user.userInfo.userId) {
      // 获取用户信息  store.dispatch的返回值是promise
      const { roles } = await store.dispatch('user/getUserInfo')
      
      await store.dispatch('permission/filterRoutes', roles)
      next(to.path)
    }
    //如果访问的登录页
    if (to.path === '/login') {
      // 跳回主页
      next('/')
    } else {
      // 放行
      next()
    }
  } else {
    //没有登录
    const isCludes = whiteList.includes(to.path)
    if (isCludes) {
      // 如果访问的是白名单，放行
      next()
    } else {
      // 不是白名单，则跳转登录页
      resetRouter()
      next('/login')
    }
  }
})
