import Layout from '@/layout'
export default {
  path: '/permission',
  component: Layout,
  meta: {
    id: 'permissions' // 用来匹配后端返回来的用户权限
  },
  children: [
    {
      path: '',
      component: () => import('@/views/permission'),
      meta: { title: '权限管理', icon: 'lock' }
    }
  ]
}
