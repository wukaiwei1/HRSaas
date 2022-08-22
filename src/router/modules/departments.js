import Layout from '@/layout'
export default {
  path: '/departments',
  component: Layout,
  meta: {
    id: 'departments' // 用来匹配后端返回来的用户权限
  },
  children: [
    {
      path: '',
      component: () => import('@/views/departments'),
      meta: { title: '组织架构', icon: 'tree' }
    }
  ]
}
