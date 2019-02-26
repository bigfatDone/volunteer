<template>
  <div class="comm-chart-box">
    <div id="commChart" :style="{width: '370px', height: '300px'}"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      let barChart = echarts.init(document.getElementById('commChart'))
      // 绘制图表
      barChart.setOption({
        xAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#FFF' // 轴线的颜色
            }
          },
          axisTick: {
            show: false // 不显示刻度线
          },
          axisLabel: {
            textStyle: {
              fontSize: 16
            }
          },
          splitLine: { 
            lineStyle: { 
              color: ['#5e608c']  // 分割线的颜色 
            } 
          }
        },
        yAxis: {
          type: 'category',
          data: ['下架商品', '活动商品', '特价推荐', '新品推荐', '库存警告', '新增商品'],
          axisLine: {
            lineStyle: {
              color: '#FFF' // 轴线的颜色
            }
          },
          axisTick: {
            show: false // 不显示刻度线
          },
          axisLabel: {
            textStyle: {
              fontSize: 16
            }
          },
          splitLine: { 
            lineStyle: { 
              color: ['#5e608c']  // 分割线的颜色 
            } 
          }
        },
        tooltip: {},
        series: [{
          data: [0, 0, 0, 0, 0, 0],
          type: 'bar',  // 柱状图 
          itemStyle: { 
            normal: { 
              color: '#00E7E8',     // 设置柱子颜色 
              label: { 
                show: true,         // 柱子上显示值 
                position: 'right',  // 值在柱子右边显示 
                textStyle: {
                  color: '#00E7E8'  // 值得颜色 
                } 
              } 
            } 
          }, 
          barWidth: 16  // 设置柱子宽度，单位为px
        }],
        grid: {
          x: 90,
          y: 20,
          x2: 40,
          y2: 40
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.comm-chart-box {
  width: 340px;
  height: 280px;
  padding: 10px;
}
</style>
