import Layout from '@/layout'
export default {
  path: '/social',
  component: Layout,
  meta: {
    id: 'social_securitys' // 用来匹配后端返回来的用户权限
  },
  children: [
    {
      path: '',
      component: () => import('@/views/social'),
      meta: { title: '社保', icon: 'table' }
    }
  ]
}
