import router, { constantRoutes, asyncRoutes } from '@/router'
export default {
  namespaced: true,
  state: {
    // 路由规则
    routes: [],
    // 按钮权限
    points: []
  },
  mutations: {
    setRoutes(state, routes) {
      state.routes = [...constantRoutes, ...routes]
    },
    setPoints(state, points) {
      state.points = points
    }
  },
  actions: {
    filterRoutes(context, roles) {
      // 手动添加导入权限
      roles.menus.push('import')
      // 筛选动态路由，根据后端返回来的权限，显示对应的路由
      const routers = asyncRoutes.filter((item) => {
        return roles.menus.includes(item?.meta?.id)
      })
      context.commit('setRoutes', routers)
      context.commit('setPoints', roles.points)
      // 添加动态路由
      router.addRoutes([
        ...routers,
        { path: '*', redirect: '/404', hidden: true }
      ])
    }
  }
}
