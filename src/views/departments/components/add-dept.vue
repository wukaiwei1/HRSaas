<template>
  <!-- 弹框组件 -->
  <el-dialog
    title="提示"
    :visible="visible"
    @close="onClose"
    width="30%"
    v-if="visible"
  >
    <el-form
      ref="form"
      :model="formData"
      label-width="100px"
      :rules="formRules"
    >
      <el-form-item label="部门名称" prop="name">
        <el-input
          placeholder="请输入部门名称"
          v-model="formData.name"
        ></el-input>
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input
          placeholder="请输入部门编码"
          v-model="formData.code"
        ></el-input>
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select
          style="width: 100%"
          placeholder="请选择部门负责人"
          v-model="formData.manager"
        >
          <el-option
            :label="item.username"
            :value="item.username"
            v-for="item in employees"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          type="textarea"
          placeholder="请输入部门介绍"
          v-model="formData.introduce"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" @click="sibmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getDeptsApi, addDeptsApi } from '@/api/department'
import { getEmployeesList } from '@/api/employees'
export default {
  props: {
    DepartmentData: {
      type: Object,
      required: true
    },
    visible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    // 判断添加的部门是否和同级部门重复
    const isPartName = (rule, value, callback) => {
      const isRepeat = this.DepartmentData?.children?.some(
        (item) => item.name === value
      )
      // 如果重复则抛出个错误
      isRepeat ? callback(new Error('部门重复')) : callback()
    }

    // 判断部门编码是否重复
    const isPartCode = async (rule, value, callback) => {
      const { depts } = await getDeptsApi()
      const isRepeat = depts.some((item) => item.code === value)
      isRepeat ? callback(new Error('部门编码重复')) : callback()
    }
    return {
      formData: {
        // 部门名称
        name: '',
        // 部门编码
        code: '',
        // 部门负责人
        manager: '',
        // 部门介绍
        introduce: '',
        // 上级部门ID
        pid: ''
      },
      // 表单校验
      formRules: {
        name: [
          { required: true, message: '请输入部门名称', trigger: 'blur' },
          { validator: isPartName, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入部门编码', trigger: 'blur' },
          { validator: isPartCode, trigger: 'blur' }
        ],
        manager: [
          { required: true, message: '请输入部门负责人', trigger: 'change' }
        ],
        introduce: [
          { required: true, message: '请输入部门介绍', trigger: 'blur' }
        ]
      },
      // 员工信息
      employees: []
    }
  },

  created() {
    // 获取员工信息
    this.getEmployeesList()
  },

  methods: {
    // 获取员工信息
    async getEmployeesList() {
      const res = await getEmployeesList()
      this.employees = res
    },
    // 关闭对话框
    onClose() {
      this.$emit('update:visible', false)
    },
    // 新增部门
    async sibmit() {
      try {
        await this.$refs.form.validate()
        this.formData.pid = this.DepartmentData.id
        await addDeptsApi(this.formData)
        this.$message.success('部门添加成功')
        // 触发获取部门数据更新数据
        this.$emit('add-success')
        // 关闭对话框
        this.onClose()
        // // 重置
        this.formData = {
          // 部门名称
          name: '',
          // 部门编码
          code: '',
          // 部门负责人
          manager: '',
          // 部门介绍
          introduce: '',
          // 上级部门ID
          pid: ''
        }
      } catch (error) {}
    }
  }
}
</script>

<style scoped lang="less"></style>
