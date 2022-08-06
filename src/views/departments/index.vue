<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card" v-loading="loading">
        <!-- 头部 -->
        <treeTools
          @add="isShowAddDept"
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
            <treeTools
              :treeData="scope.data"
              @remove="getDepts"
              @add="isShowAddDept"
              @edit="showEdit"
            ></treeTools>
          </template>
        </el-tree>
      </el-card>
    </div>
    <!-- 添加部门弹框 -->
    <add-dept
      ref="addDept"
      :visible.sync="dialogVisible"
      :DepartmentData="DepartmentData"
      @add-success="getDepts"
    />
  </div>
</template>

<script>
import treeTools from './components/tree-tools.vue'
import { getDeptsApi } from '@/api/department'
import { transListToTree } from '@/utils'
import addDept from './components/add-dept.vue'
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
      },
      dialogVisible: false,
      // 点击添加时的部门数据
      DepartmentData: {},
      loading: false
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
      this.loading = true
      const res = await getDeptsApi()
      this.treeData = transListToTree(res.depts, '')
      console.log(this.treeData)
      this.loading = false
    },
    // 添加部门
    isShowAddDept(value) {
      // 显示弹框
      this.dialogVisible = true
      this.DepartmentData = value
    },
    //编辑部门
    showEdit(val) {
      // 显示弹框
      this.dialogVisible = true
      this.$refs.addDept.getDeptById(val.id)
    }
  },
  components: {
    treeTools,
    addDept
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
