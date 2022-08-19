<template>
  <div>
    <i
      @click="$router.push('/employees/print?type=job')"
      class="el-icon-printer"
      style="cursor: pointer"
      title="打印"
    ></i>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },

  created() {},

  methods: {}
}
</script>

<style scoped lang="less"></style>
