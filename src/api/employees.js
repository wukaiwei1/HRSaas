import request from '@/utils/request'

/*  获取员工信息
 * @returns Promise
 */
export const getEmployeesList = () => {
  return request({
    url: '/sys/user/simple'
  })
}

/*  获取员工列表
 * @param {} params {page,size}
 * @returns Promise
 */
export const getEmployeesInfoApi = (params) => {
  return request({
    url: '/sys/user',
    params
  })
}
/**
 * 删除员工接口
 * ****/
export function delEmployee(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}

/** **
 *  新增员工的接口
 * **/
export function addEmployee(data) {
  return request({
    method: 'post',
    url: '/sys/user',
    data
  })
}
/** 批量导入员工信息
 *
 * @param {*} data  员工信息
 * @returns
 */
export const importEmployees = (data) => {
  return request({
    url: '/sys/user/batch',
    method: 'POST',
    data
  })
}

/** *
 *  读取用户详情的基础信息
 * **/
export function getPersonalDetail(id) {
  return request({
    url: `/employees/${id}/personalInfo`
  })
}

/** *
 *  更新用户详情的基础信息
 * **/
export function updatePersonal(data) {
  return request({
    url: `/employees/${data.userId}/personalInfo`,
    method: 'put',
    data
  })
}

/** *
 * 给用户分配角色
 * ***/
export function assignRolesApi(data) {
  return request({
    url: '/sys/user/assignRoles',
    data,
    method: 'put'
  })
}
