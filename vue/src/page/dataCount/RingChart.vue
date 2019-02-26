<template>
  <div class="ring-chart">
    <div :id="chartData.idName" :style="{width: '156px', height: '156px'}"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chartData: this.ringData,
      percent: ''
    }
  },
  props: {
    ringData: {
      type: Object
    }
  },
  mounted() {
    this.dataInitia();
  },
  methods: {
    // 数据初始化
    dataInitia() {
      setTimeout(() => {
        if(this.chartData.aTotal) {
          let num = this.chartData.num / (this.chartData.aTotal + this.chartData.bTotal)
          this.percent = Number(num*100).toFixed(2)
          this.drawLine();
        } else {
          this.chartData.num = 0
          this.chartData.aTotal = 0
          this.chartData.bTotal = 0
          this.percent = 0
          this.drawLine();
        }
      }, 1000)
    },

    // 绘制图形
    drawLine() {
      let ringChart = echarts.init(document.getElementById(this.chartData.idName))
      // 上层样式
      let labelTop = {
        normal: {
          color: this.chartData.color,
          label: {
            show: true,
            position: 'center',
            formatter: '{b}',
            textStyle: {
              baseline: 'bottom',
              fontSize: 0
            }
          },
          labelLine: {
            show: false
          }
        }
      }
      // 环内样式
      let labelFromatter = {
        normal: {
          label: {
            textStyle: {
              baseline: 'top',
              fontSize: 32,
              color: this.chartData.color
            }
          }
        },
      }
      // 底层样式
      let labelBottom = {
        normal: {
          color: '#20285c',
          label: {
            show: true,
            position: 'center'
          },
          labelLine: {
            show: false
          }
        },
        emphasis: {
          color: 'rgba(0,0,0,0)'
        }
      };
      let radius = [64, 78];  // 半径[内半径，外半径]
      let pieChartOption = { 
        tooltip: {}, 
        series: [ {
            type: 'pie',
            center: ['50%', '50%'],
            radius: radius,
            x: '0%',
            itemStyle: labelFromatter,
            hoverAnimation: false,
            data: [
              { value: this.chartData.num, itemStyle: labelTop },
              { name: this.percent + '%', value: (this.chartData.aTotal + this.chartData.bTotal) - this.chartData.num, itemStyle: labelBottom }
            ]
        }]
      };
      ringChart.setOption(pieChartOption)
    }
  }
}
</script>
