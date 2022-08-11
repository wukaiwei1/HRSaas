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
