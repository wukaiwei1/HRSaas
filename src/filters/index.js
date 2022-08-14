import dayjs from 'dayjs'

// 定义全局过滤器

export const formatTime = (val) => {
  return dayjs(val).format('YYYY-MM-DD')
}
