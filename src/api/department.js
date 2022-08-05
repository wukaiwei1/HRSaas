import request from '@/utils/request'

/**
 * 获取部门信息
 * @returns Promise
 */
export const getDeptsApi = () => {
  return request({
    url: '/company/department'
  })
}
/**
 * 删除部门
 * @param {*} id 要删除的部门id
 * @returns
 */
export const delDeptsApi = (id) => {
  return request({
    url: `/company/department/${id}`,
    method: 'DELETE'
  })
}
