<template>
  <el-row type="flex" style="width: 100%">
    <el-col>{{ treeData.name }}</el-col>
    <el-col :span="4">
      <el-row type="flex">
        <el-col>{{ treeData.manager }}</el-col>
        <el-col>
          <el-dropdown>
            <span class="el-dropdown-link">
              操作<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>添加部门</el-dropdown-item>
              <template v-if="!isRoot">
                <el-dropdown-item>编辑部门</el-dropdown-item>
                <el-dropdown-item>删除部门</el-dropdown-item>
              </template>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: {
    treeData: {
      type: Object,
      required: true
    },
    isRoot: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },

  created() {},

  methods: {}
}
</script>

<style scoped lang="scss">

</style>
