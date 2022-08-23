<template>
  <el-dialog
    :visible="isShowRoleDialog"
    title="分配角色"
    @close="onClose"
    @open="onOpen"
  >
    <el-checkbox-group v-model="checkList">
      <el-checkbox :label="item.id" v-for="item in roleList" :key="item.id">
        {{ item.name }}
      </el-checkbox>
    </el-checkbox-group>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" @click="assignRoles">确 定</el-button>
    </span></el-dialog
  >
</template>

<script>
import { getRolesApi } from '@/api/role'
import { getUserDetailsApi } from '@/api/user'
import { assignRolesApi } from '@/api/employees'
export default {
  name: 'assignRole',
  props: {
    isShowRoleDialog: {
      type: Boolean,
      required: true
    },
    employeesId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      checkList: [],
      roleList: []
    }
  },

  created() {},

  methods: {
    onClose() {
      this.$emit('update:isShowRoleDialog', false)
    },
    // 获取角色列表
    async getRoles() {
      const { rows } = await getRolesApi()
      this.roleList = rows
    },
    // 对话框打开时调用
    onOpen() {
      this.getRoles()
      this.getUserDetails()
    },
    // 获取当前用户的角色
    async getUserDetails() {
      const { roleIds } = await getUserDetailsApi(this.employeesId)
      this.checkList = roleIds
    },
    // 点击确定
    async assignRoles() {
      if (!this.checkList.length) {
        return this.$message.error('请选择角色')
      }
      await assignRolesApi({
        id: this.employeesId,
        roleIds: this.checkList
      })
      this.$message.success('分配角色成功')
      this.onClose()
    }
  }
}
</script>

<style scoped lang="less"></style>
