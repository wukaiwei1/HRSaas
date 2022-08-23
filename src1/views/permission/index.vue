<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools :isShowLeft="false">
        <template slot="right">
          <el-button type="primary" @click="showAddDialog(0, 1)"
            >添加权限</el-button
          >
        </template>
      </page-tools>
      <el-table
        row-key="id"
        :data="permissions"
        style="width: 100%"
        border
        ref="table"
      >
        <el-table-column label="名称">
          <template v-slot="{ row }">
            <i
              v-if="row.children"
              style="margin-right: 5px; cursor: pointer"
              class="el-icon-folder-opened"
              @click="expand(row)"
            ></i>
            <span>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="code" label="标识"> </el-table-column>
        <el-table-column prop="description" label="描述"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{ row }">
            <el-button type="text" @click="showAddDialog(row.id, 2)"
              >添加</el-button
            ><el-button type="text">编辑</el-button
            ><el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 添加对话框 -->
    <!-- 放置一个弹层 用来编辑新增节点 -->
    <el-dialog
      :title="`${showText}权限点`"
      :visible.sync="showDialog"
      @close="btnCancel"
      width="40%"
    >
      <!-- 表单 -->
      <el-form
        ref="perForm"
        :model="formData"
        :rules="rules"
        label-width="120px"
      >
        <el-form-item label="权限名称" prop="name">
          <el-input v-model="formData.name" style="width: 90%" />
        </el-form-item>
        <el-form-item label="权限标识" prop="code">
          <el-input v-model="formData.code" style="width: 90%" />
        </el-form-item>
        <el-form-item label="权限描述">
          <el-input v-model="formData.description" style="width: 90%" />
        </el-form-item>
        <el-form-item label="开启">
          <el-switch
            v-model="formData.enVisible"
            active-value="1"
            inactive-value="0"
          />
        </el-form-item>
      </el-form>
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" @click="btnCancel">取消</el-button>
          <el-button size="small" type="primary" @click="btnOK">确定</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { addPermission, getPermissionList } from '@/api/permission'
import { transListToTree } from '@/utils'
export default {
  data() {
    return {
      permissions: [],
      showText: '添加',
      showDialog: false,
      formData: {
        name: '',
        code: '',
        description: '',
        enVisible: '',
        pid: '',
        type: ''
      },
      rules: {
        name: [{ required: true, message: '请输入权限名称', trigger: 'blur' }],
        code: [{ required: true, message: '请输入权限标识', trigger: 'blur' }]
      }
    }
  },

  created() {
    this.getPermission()
  },

  methods: {
    async getPermission() {
      const res = await getPermissionList()
      this.permissions = transListToTree(res, '0')
    },
    expand(row) {
      row.isExpanded = !row.isExpanded
      this.$refs.table.toggleRowExpansion(row, row.isExpanded)
    },
    btnCancel() {
      this.showDialog = false
      this.$refs.perForm.resetFields()
      this.formData.description = ''
      this.formData.enVisible = ''
    },
    showAddDialog(pid, type) {
      this.showDialog = true
      this.formData.pid = pid
      this.formData.type = type
      console.log(this.formData)
    },
    btnOK() {
      this.$refs.perForm.validate(async (valid) => {
        if (!valid) return
        await addPermission(this.formData)
        this.$message.success('添加权限点成功')
        this.btnCancel()
        this.getPermission()
      })
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .el-table [class*='el-table__row--level'] .el-table__expand-icon {
  display: none;
}
</style>
