import employeesText from '@/constant/permission'
export default {
  data() {
    return {
      point: employeesText
    }
  },
  methods: {
    // 判断权限按钮
    isHas(point) {
      return this.$store.state.permission.points.includes(point)
    }
  }
}
