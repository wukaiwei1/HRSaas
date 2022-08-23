<template>
  <div class="calendar">
    <el-row type="flex" justify="end">
      <el-col :span="4">
        <el-select
          @change="updateCalender"
          v-model="currentYear"
          placeholder="请选择"
        >
          <el-option
            v-for="item in YearList"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="3" style="margin-left: 10px">
        <el-select
          @change="updateCalender"
          v-model="currentMonth"
          placeholder="请选择"
        >
          <el-option v-for="item in 12" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <!-- 日历 -->
    <el-calendar v-model="currentDate">
      <template v-slot:dateCell="{ date }">
        <div class="cell-box">
          {{ date.getDate() }}
        </div>
        <span v-if="date.getDay() === 6 || date.getDay() === 0" class="Hugh">
          休
        </span>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  name: 'Calendar',
  data() {
    return {
      currentYear: '',
      currentMonth: '',
      currentDate: '',
      YearList: []
    }
  },

  created() {
    this.initCalendar()
  },

  methods: {
    initCalendar() {
      const date = new Date()
      this.currentYear = date.getFullYear()
      this.currentMonth = date.getMonth() + 1
      this.YearList = Array(11)
        .fill(this.currentYear - 5)
        .map((item, i) => item + i)
      this.currentDate = date
    },
    updateCalender() {
      this.currentDate = this.currentYear + '-' + this.currentMonth
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .el-calendar {
  .el-calendar__header {
    display: none;
  }
  .el-calendar-table tr td {
    border: none;
  }
  .el-calendar-day {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  // .next .el-calendar-day {
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  // }
  .cell-box {
    width: 20px;
  }
  .Hugh {
    display: inline-block;
    margin-left: 10px;
    width: 20px;
    height: 20px;
    color: #fff;
    line-height: 20px;
    font-size: 12px;
    text-align: center;
    border-radius: 50%;
    background-color: #fa7c4d;
  }
}
</style>
