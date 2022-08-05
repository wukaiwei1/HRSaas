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
                <el-dropdown-item @click.native="onRemove"
                  >删除部门</el-dropdown-item
                >
              </template>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delDeptsApi } from '@/api/department'
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

  methods: {
    // 删除部门
    async onRemove() {
      try {
        await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        // 删除部门请求
        await delDeptsApi(this.treeData.id)
        this.$message.success('删除成功')
        // 触发父级的获取部门请求的方法，更新数据
        this.$emit('remove')
      } catch (error) {}
    }
  }
}
</script>

<style scoped lang="scss"></style>
