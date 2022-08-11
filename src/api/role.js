import request from '@/utils/request'

/**
 *  获取角色列表
 * @param {Object} params
 * page 页码
 * pagesize 每页条数
 * @returns Promise
 */
export const getRolesApi = (params) => {
  return request({
    url: '/sys/role',
    params
  })
}

/**
 *  添加角色
 * @param {Object} params
 * name 角色名称
 * region 角色描述
 * @returns Promise
 */
export const addRolesApi = (data) => {
  return request({
    url: '/sys/role',
    method: 'POST',
    data
  })
}
