import Layout from '@/layout'
export default {
  path: '/salarys',
  component: Layout,
  meta: {
    id: 'salarys' // 用来匹配后端返回来的用户权限
  },
  children: [
    {
      path: '',
      component: () => import('@/views/salarys'),
      meta: { title: '工资', icon: 'money' }
    }
  ]
}
