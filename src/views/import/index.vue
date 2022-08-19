<template>
  <div class="dashboard-container">
    <div class="app-container">
      <updateExcal
        :beforeUpload="excelSuccess"
        :onSuccess="onSuccess"
      ></updateExcal>
    </div>
  </div>
</template>

<script>
import employees from '@/constant/employees'
import { importEmployees } from '@/api/employees'
import { formatTime } from '@/filters'
const { importMapKeyPath } = employees
export default {
  data() {
    return {}
  },

  created() {},

  methods: {
    excelSuccess(file) {
      if (!file.name.endsWith('.xlsx')) {
        this.$message.error('请选择xlsx文件')
        return false
      }
      return true
    },
    async onSuccess({ header, results }) {
      // 处理数据
      const newArr = results.map((item) => {
        const obj = {}
        for (let key in importMapKeyPath) {
          if (key === '入职日期' || key === '转正日期') {
            // 拿到时间戳
            const timestamp = item[key]
            // 转换事件戳
            const date = new Date((timestamp - 1) * 24 * 60 * 60 * 1000)
            // 设置年份
            date.setFullYear(date.getFullYear() - 70)
            obj[importMapKeyPath[key]] = formatTime(date)
          } else {
            obj[importMapKeyPath[key]] = item[key]
          }
        }
        // return 新的对象
        return obj
      })
      // 发起导入员工信息
      await importEmployees(newArr)
      this.$message.success('导入成功')
      this.$router.go('-1')
    }
  }
}
</script>

<style scoped lang="less"></style>
