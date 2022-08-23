import Layout from '@/layout'
export default {
  path: '/approvals',
  component: Layout,
  meta: {
    id: 'approvals' // 用来匹配后端返回来的用户权限
  },
  children: [
    {
      path: '',
      component: () => import('@/views/approvals'),
      meta: { title: '审批', icon: 'tree-table' }
    }
  ]
}
