import Layout from '@/layout'
export default {
  path: '/attendances',
  component: Layout,
  meta: {
    id: 'attendances' // 用来匹配后端返回来的用户权限
  },
  children: [
    {
      path: '',
      component: () => import('@/views/attendances'),
      meta: { title: '考勤', icon: 'skill' }
    }
  ]
}
