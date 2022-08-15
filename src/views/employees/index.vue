<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools>
        <span slot="left-tag">共166条记录</span>
        <template slot="right">
          <el-button
            size="small"
            type="warning"
            @click="$router.push('/import')"
            >导入</el-button
          >
          <el-button size="small" type="danger" @click="exportExcel"
            >导出</el-button
          >
          <el-button size="small" type="primary" @click="addEmployeeFn"
            >新增员工</el-button
          >
        </template>
      </page-tools>
      <!-- 放置表格和分页 -->
      <el-card v-loading="loading">
        <el-table border :data="employees">
          <el-table-column label="序号" sortable="" type="index" />
          <el-table-column label="姓名" sortable="" prop="username" />
          <el-table-column label="员工" sortable="">
            <template slot-scope="{ row }">
              <img
                :src="row.staffPhoto"
                alt=""
                v-imgError="require('@/assets/common/head.jpg')"
                style="
                  width: 100px;
                  height: 100px;
                  border-radius: 50%;
                  padding: 10px;
                "
              />
            </template>
          </el-table-column>
          <el-table-column label="工号" sortable="" prop="workNumber" />
          <el-table-column
            label="聘用形式"
            sortable=""
            :formatter="formatFormOfEmployment"
            prop="formOfEmployment"
          />
          <el-table-column label="部门" sortable="" prop="departmentName" />
          <el-table-column label="入职时间" sortable="">
            <template slot-scope="{ row }">
              {{ row.timeOfEntry | formatTime }}
            </template>
          </el-table-column>
          <el-table-column label="账户状态" sortable="">
            <template slot-scope="{ row }">
              <el-switch
                :value="row.enableState === 1"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template slot-scope="{ row }">
              <el-button
                type="text"
                size="small"
                @click="$router.push('/employees/detail/' + row.id)"
                >查看</el-button
              >
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small" @click="delFn(row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row
          type="flex"
          justify="center"
          align="middle"
          style="height: 60px"
        >
          <el-pagination
            layout="prev, pager, next"
            :total="total"
            :page-size="pages.size"
            @current-change="handleCurrentChange"
          />
        </el-row>
      </el-card>
    </div>
    <!-- 弹框 -->
    <add-employees
      :isShowAddDept.sync="isShowAddDept"
      @addEmployee="getEmployeesList"
    ></add-employees>
  </div>
</template>

<script>
import { getEmployeesInfoApi, delEmployee } from '@/api/employees'
import employees from '@/constant/employees'
import addEmployees from './commponents/add-employees.vue'
const { exportExcelMapPath, hireType } = employees
export default {
  data() {
    return {
      employees: [],
      loading: false,
      pages: {
        page: 1,
        size: 5
      },
      total: 0,
      isShowAddDept: false
    }
  },

  created() {
    this.getEmployeesList()
  },

  methods: {
    async getEmployeesList() {
      this.loading = true
      const { rows, total } = await getEmployeesInfoApi(this.pages)
      this.employees = rows
      this.total = total
      this.loading = false
    },
    handleCurrentChange(val) {
      this.pages.page = val
      this.getEmployeesList()
    },
    formatFormOfEmployment(row, column, callValue, index) {
      const findItem = employees.hireType.find((item) => item.id === callValue)
      return findItem ? findItem.value : '未知'
    },
    // 删除员工
    async delFn(id) {
      try {
        await this.$confirm('是否删除该员工')
        await delEmployee(id)
        this.$success('删除成功')
      } catch (error) {}
    },
    // 点击新增员工
    addEmployeeFn() {
      this.isShowAddDept = true
    },
    // 导出员工
    async exportExcel() {
      const { export_json_to_excel } = await import('@/vendor/Export2Excel.js')
      const { rows } = await getEmployeesInfoApi({ page: 1, size: this.total })

      const header = Object.keys(exportExcelMapPath)
      const data = rows.map((item) => {
        return header.map((row) => {
          if (row === '聘用形式') {
            const findItem = hireType.find((hire) => {
              return hire.id === item[exportExcelMapPath[row]]
            })
            return findItem ? findItem.value : '未知'
          } else {
            return item[exportExcelMapPath[row]]
          }
        })
      })
      export_json_to_excel({
        header, //表头 必填
        data, //具体数据 必填
        filename: 'excel-list', //非必填
        autoWidth: true, //非必填
        bookType: 'xlsx' //非必填
      })
    }
  },
  components: {
    addEmployees
  }
}
</script>

<style scoped lang="less"></style>
