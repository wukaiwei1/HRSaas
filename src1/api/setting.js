import request from '@/utils/request'

/**
 * 查询企业信息
 * @param {*} id  企业id
 * @returns  Promise
 */
export const getCompanyInfoApi = (id) => {
  return request({
    url: `/company/${id}`
  })
}
