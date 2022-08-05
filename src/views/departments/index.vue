<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <!-- 头部 -->
        <treeTools
          :treeData="{ name: '传智教育', manager: '负责人' }"
          :isRoot="true"
        ></treeTools>
        <!-- 树形部分 -->
        <el-tree
          :data="treeData"
          :props="defaultProps"
          @node-click="handleNodeClick"
          default-expand-all
        >
          <template v-slot="scope">
            <treeTools :treeData="scope.data" @remove="getDepts"></treeTools>
          </template>
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import treeTools from './components/tree-tools.vue'
import { getDeptsApi } from '@/api/department'
import { transListToTree } from '@/utils'
export default {
  data() {
    return {
      // 树形结构数据
      treeData: [
        { name: '总裁办', children: [{ name: '董事会' }] },
        { name: '行政部' },
        { name: '人事部' }
      ],
      // 配置选项
      defaultProps: {
        label: 'name'
      }
    }
  },

  created() {
    // 获取组织架构数据
    this.getDepts()
  },

  methods: {
    handleNodeClick() {},
    // 获取组织架构数据
    async getDepts() {
      const res = await getDeptsApi()
      this.treeData = transListToTree(res.depts, '')
      console.log(this.treeData)
    }
  },
  components: {
    treeTools
  }
}
</script>

<style scoped lang="scss">
::v-deep .el-card__body {
  padding: 20px 200px;
}
::v-deep .el-tree {
  margin-top: 15px;
}
</style>
