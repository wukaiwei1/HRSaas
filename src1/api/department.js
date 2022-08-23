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
/**
 * 新增部门
 * @returns Promise
 */
export const addDeptsApi = (data) => {
  return request({
    url: '/company/department',
    method: 'POST',
    data
  })
}

/**
 * 根据ID查询部门详情
 * @param {*} id 部门ID
 * @returns Promise
 */
export const getDeptByIdApi = (id) => {
  return request({
    url: `/company/department/${id}`
  })
}

/**
 * 根据ID查询部门详情
 * @param {*} id 部门ID
 * @returns Promise
 */
export const changeDeptByIdApi = (data) => {
  return request({
    url: `/company/department/${data.id}`,
    method: 'PUT',
    data
  })
}
