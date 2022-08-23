<template>
  <div id="main">图表组件</div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  data() {
    return {}
  },

  created() {},
  mounted() {
    this.initEcharts()
  },

  methods: {
    initEcharts() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('main'))
      const option = {
        backgroundColor: '#fff',
        title: {
          text: '员工绩效表',
          left: 'center',
          textStyle: {
            color: '#333'
          }
        },
        legend: {
          // 文字位置
          bottom: 5,
          //文字
          data: ['张三', '李四'],
          //文字间隔
          itemGap: 120,
          //文字样式
          textStyle: {
            color: '#333',
            fontSize: 18
          },
          // 显示一项数据
          selectedMode: 'single'
        },
        radar: {
          // 圆形
          shape: 'circle',
          //圆形个数
          splitNumber: 10,
          axisName: {
            //选项文字颜色
            color: 'skyblue'
          },
          //   圆形条线样式
          splitLine: {
            lineStyle: {
              //颜色
              color: ['skyblue', 'yellow'].reverse()
            }
          },
          // 填充颜色
          splitArea: {
            show: false
          },
          //六边线条
          axisLine: {
            //   样式
            lineStyle: {
              color: 'green'
            }
          },
          indicator: [
            { name: '吃饭', max: 100 },
            { name: '睡觉', max: 100 },
            { name: '打豆豆', max: 100 },
            { name: '迟到', max: 100 },
            { name: '早退', max: 100 },
            { name: 'bug数量', max: 100 }
          ]
        },
        series: [
          {
            name: 'Budget vs spending',
            type: 'radar',
            itemStyle: {
              color: 'red'
            },
            areaStyle: {
              opacity: 0.1
            },
            lineStyle: {
              width: 1,
              opacity: 0.4
            },
            data: [
              {
                value: [60, 58, 67, 80, 56, 60],
                name: '张三'
              },
              {
                value: [80, 65, 50, 80, 70, 90],
                name: '李四'
              }
            ]
          }
        ]
      }
      // 绘制图表
      myChart.setOption(option)
    }
  }
}
</script>

<style scoped lang="scss">
#main {
  width: 500px;
  height: 500px;
}
</style>
