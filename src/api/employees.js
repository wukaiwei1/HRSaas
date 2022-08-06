import request from '@/utils/request'

/*  获取员工信息
 * @returns Promise
 */
export const getEmployeesList = () => {
  return request({
    url: '/sys/user/simple'
  })
}
