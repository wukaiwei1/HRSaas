<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-tabs v-model="activeName">
        <el-tab-pane label="角色管理" name="first">
          <!-- 按钮部分 -->
          <el-button
            type="primary"
            style="margin-bottom: 30px"
            @click="dialogVisible = true"
            v-if="isHas(point.roles.add)"
            >新增角色</el-button
          >
          <!-- 表格部分 -->
          <el-table :data="tableData" style="width: 100%" border>
            <el-table-column type="index" label="序号" width="80">
            </el-table-column>
            <el-table-column prop="name" label="角色"> </el-table-column>
            <el-table-column prop="description" label="描述"> </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="small"
                  type="success"
                  @click="showPermissions(scope.row)"
                  >分配权限</el-button
                >
                <el-button size="small" type="primary">编辑</el-button>
                <el-button
                  size="small"
                  type="danger"
                  @click="removeRole(scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页部分 -->
          <el-pagination
            :page-size="pagesize"
            layout="sizes,prev, pager, next"
            :page-sizes="[3, 5, 10, 20]"
            :total="total"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
          >
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="公司信息" name="second">
          <el-alert
            title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            type="info"
            show-icon
            :closable="false"
          >
          </el-alert>
          <el-form ref="form" label-width="80px">
            <el-form-item label="公司名称">
              <el-input disabled v-model="companyInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input
                disabled
                v-model="companyInfo.companyAddress"
              ></el-input>
            </el-form-item>
            <el-form-item label="公司邮箱">
              <el-input disabled v-model="companyInfo.mailbox"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input disabled v-model="companyInfo.remarks"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 对话框 -->
    <el-dialog
      title="编辑角色"
      :visible.sync="dialogVisible"
      width="40%"
      @close="dialogClose"
    >
      <el-form
        ref="form"
        label-width="80px"
        :model="addRolesData"
        :rules="addRolesFormRules"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="addRolesData.name"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="addRolesData.description"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onClose">取 消</el-button>
        <el-button type="primary" @click="addRoleFn">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 分配权限对话框 -->

    <el-dialog
      title="给角色分配权限"
      :visible.sync="isShowRightsDialog"
      @close="rightsClose"
      width="50%"
      destroy-on-close
    >
      <el-tree
        :data="permissions"
        :props="{ label: 'name' }"
        show-checkbox
        default-expand-all
        node-key="id"
        :default-checked-keys="defaultCheckedKeys"
        ref="perTree"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="rightsClose">取 消</el-button>
        <el-button type="primary" @click="onSaveRights">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  addRolesApi,
  getRolesApi,
  removeRolesApi,
  getRolesInfoApi,
  assignPerm
} from '@/api/role'
import { getCompanyInfoApi } from '@/api/setting'
import { getPermissionList } from '@/api/permission'
import { transListToTree } from '@/utils'
import permissionMixin from '@/mixins/permission'
export default {
  data() {
    return {
      activeName: 'first',
      tableData: [],
      total: 0,
      pagesize: 2,
      page: 1,
      dialogVisible: false,
      addRolesData: {
        name: '',
        description: ''
      },
      addRolesFormRules: {
        name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }]
      },
      companyInfo: {},
      isShowRightsDialog: false,
      permissions: [],
      defaultCheckedKeys: [],
      roleId: ''
    }
  },
  mixins: [permissionMixin],
  created() {
    this.getRoles()
    this.getCompanyInfo()
    this.getPermissionList()
  },

  methods: {
    // 获取表格数据
    async getRoles() {
      const { rows, total } = await getRolesApi({
        page: this.page,
        pagesize: this.pagesize
      })
      this.tableData = rows
      this.total = total
    },
    // 点击分页
    handleCurrentChange(val) {
      this.page = val
      this.getRoles()
    },
    // 切换条数
    handleSizeChange(val) {
      this.pagesize = val
      this.getRoles()
    },
    // 点击取消
    onClose() {
      this.dialogVisible = false
    },
    // 点击确认
    async addRoleFn() {
      try {
        await this.$refs.form.validate()
        // 发送请求，添加角色
        await addRolesApi(this.addRolesData)
        this.$message.success('添加角色成功')
        // 关闭弹框
        this.dialogVisible = false
        // 更新数据
        this.getRoles()
      } catch (error) {
        console.log(error)
      }
    },
    // 监听对话框关闭
    dialogClose() {
      // 重置表单
      this.$refs.form.resetFields()
      this.addRolesData.description = ''
    },
    // 获取企业信息
    async getCompanyInfo() {
      const res = await getCompanyInfoApi(
        this.$store.state.user.userInfo.companyId
      )
      this.companyInfo = res
    },
    async removeRole(val) {
      try {
        await this.$confirm('确认删除该角色嘛', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await removeRolesApi(val.id)
        this.getRoles()
        this.$message.success('角色删除成功')
      } catch (error) {
        console.log(error)
      }
    },
    // 分配权限
    async showPermissions(row) {
      this.roleId = row.id
      this.isShowRightsDialog = true
      const res = await getRolesInfoApi(row.id)
      this.defaultCheckedKeys = res.permIds
    },
    // 分配权限关闭回调
    rightsClose() {
      this.defaultCheckedKeys = []
      this.isShowRightsDialog = false
    },
    // 获取所有权限
    async getPermissionList() {
      const res = await getPermissionList()
      this.permissions = transListToTree(res, '0')
    },
    // 分配权限点击确定回调
    async onSaveRights() {
      await assignPerm({
        id: this.roleId,
        permIds: this.$refs.perTree.getCheckedKeys()
      })
      this.$message.success('分配权限成功')
      this.rightsClose()
    }
  }
}
</script>

<style scoped lang="less"></style>
