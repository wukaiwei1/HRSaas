import request from '@/utils/request'

/**
 * 登录请求
 * @param {Object} data mobile password
 * @returns Promise
 */
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}
/**
 * 获取用户信息
 * @returns Promise
 */
export const getUserInfoApi = () => {
  return request({
    url: '/sys/profile',
    method: 'POST'
  })
}
/**
 * 根据用户id获取员工详细数据
 * @param {*} id  用户id
 * @returns  Promise
 */
export const getUserDetailsApi = (id) => {
  return request({
    url: '/sys/user/' + id
  })
}
