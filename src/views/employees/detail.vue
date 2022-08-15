<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane name="account" label="登录账户设置">
            <!-- 放置表单 -->
            <el-form
              label-width="120px"
              style="margin-left: 120px; margin-top: 30px"
            >
              <el-form-item label="姓名:">
                <el-input style="width: 300px" v-model="formData.username" />
              </el-form-item>
              <el-form-item label="密码:">
                <el-input
                  style="width: 300px"
                  type="password"
                  v-model="formData.password"
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="update">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane name="user" label="个人详情">
            <user-info></user-info>
          </el-tab-pane>
          <el-tab-pane name="job" label="岗位信息" />
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserDetailsApi, saveUserDetailById } from '@/api/user'
import userInfo from './commponents/user-info.vue'
import cookies from 'js-cookie'
export default {
  data() {
    return {
      formData: {},
      activeName: cookies.get('employeeDetailTab') || 'account'
    }
  },

  created() {
    this.getUserInfo()
  },

  methods: {
    async getUserInfo() {
      const res = await getUserDetailsApi(this.$route.params.id)
      this.formData = res
    },
    async update() {
      await saveUserDetailById(this.formData)
      this.$message.success('修改资料成功')
    },
    handleClick() {
      cookies.set('employeeDetailTab', this.activeName)
    }
  },
  components: {
    userInfo
  }
}
</script>

<style scoped lang="less"></style>
