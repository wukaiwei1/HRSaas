<template>
  <el-card class="box-card">
    <el-row type="flex">
      <el-col v-if="isShowLeft">
        <el-tag>
          <i :class="leftIcon"></i>
          <slot name="left-tag"></slot>
        </el-tag>
      </el-col>
      <el-col>
        <el-row type="flex" justify="end">
          <slot name="right" />
        </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: 'pageTools',
  props: {
    leftIcon: {
      type: String,
      default: 'el-icon-info'
    },
    isShowLeft: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {}
  },

  created() {},

  methods: {}
}
</script>

<style scoped lang="less"></style>
