<template>
  <el-dialog title="提示" :visible="isShowAddDept" width="40%" @close="onClose">
    <el-form :model="formData" :rules="rules" label-width="120px" ref="form">
      <el-form-item label="姓名" prop="username">
        <el-input
          v-model="formData.username"
          style="width: 90%"
          placeholder="请输入姓名"
        />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input
          v-model="formData.mobile"
          style="width: 90%"
          placeholder="请输入手机号"
        />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker
          v-model="formData.timeOfEntry"
          style="width: 90%"
          placeholder="请选择日期"
        />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select
          v-model="formData.formOfEmployment"
          style="width: 90%"
          placeholder="请选择"
        >
          <el-option
            v-for="item in hireType"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input
          v-model="formData.workNumber"
          style="width: 90%"
          placeholder="请输入工号"
        />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-select
          placeholder="请选择部门"
          style="width: 90%"
          @focus="getDepts"
          v-model="formData.departmentName"
          ref="select"
        >
          <el-option value="" v-loading="isTreeLoading" class="treeOption">
            <el-tree
              :data="depts"
              :props="treeProps"
              @node-click="nodeClick"
            ></el-tree>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker
          v-model="formData.correctionTime"
          style="width: 90%"
          placeholder="请选择日期"
        />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" @click="onAddemployees">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getDeptsApi } from '@/api/department'
import employees from '@/constant/employees'
import { transListToTree } from '@/utils'
import { addEmployee } from '@/api/employees'

const { hireType } = employees
export default {
  props: {
    isShowAddDept: {
      type: Boolean
    }
  },
  data() {
    return {
      formData: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
      rules: {
        username: [
          { required: true, message: '用户姓名不能为空', trigger: 'blur' },
          {
            min: 1,
            max: 4,
            message: '用户姓名为1-4位'
          }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: '手机号格式不正确',
            trigger: 'blur'
          }
        ],
        formOfEmployment: [
          { required: true, message: '聘用形式不能为空', trigger: 'change' }
        ],
        workNumber: [
          { required: true, message: '工号不能为空', trigger: 'blur' }
        ],
        departmentName: [
          { required: true, message: '部门不能为空', trigger: 'change' }
        ],
        timeOfEntry: [{ required: true, message: '入职时间', trigger: 'blur' }]
      },
      hireType,
      depts: [],
      treeProps: {
        label: 'name'
      },
      isTreeLoading: false
    }
  },

  created() {},

  methods: {
    onClose() {
      this.$emit('update:isShowAddDept', false)
      this.$refs.form.resetFields()
    },
    async getDepts() {
      this.isTreeLoading = true
      const res = await getDeptsApi()
      transListToTree(res.depts, '')
      this.depts = res.depts
      this.isTreeLoading = false
    },
    nodeClick(row) {
      this.formData.departmentName = row.name
      this.$refs.select.blur()
    },
    // 点击提交
    onAddemployees() {
      this.$refs.form.validate(async (valid) => {
        if (!valid) return
        console.log('发送请求')
        await addEmployee(this.formData)
        this.$message.success('添加员工成功')
        this.onClose()
        this.$emit('addEmployee')
      })
    }
  }
}
</script>

<style scoped lang="scss">
.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  background-color: unset;
}
.treeOption {
  height: 100px !important;
  overflow: unset;
}
</style>
