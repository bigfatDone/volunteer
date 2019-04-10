<template>
  <div class="page">
    <div id="myChart" :style="{width: '350px', height: '300px'}"></div>
    <div id="myChart1" :style="{width: '350px', height: '300px'}"></div>
  </div>
</template>
<script>
export default {
  name: "hello",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      let myChart1 = this.$echarts.init(document.getElementById("myChart1"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: "志愿者/社区注册比例",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          bottom: 10,
          left: "center",
          data: ["志愿者", "社区"]
        },
        series: [
          {
            type: "pie",
            radius: "65%",
            center: ["50%", "50%"],
            selectedMode: "single",
            data: [
              { value: 535, name: "志愿者" },
              { value: 780, name: "社区" },
            ]
          }
        ]
      });
      myChart1.setOption({
        title: {
          text: "志愿者参与项目比例",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          bottom: 10,
          left: "center",
          data: ["志愿项目", "志愿者"]
        },
        color: ['#e057cf','#1bb127'],
        series: [
          {
            type: "pie",
            radius: "65%",
            center: ["50%", "50%"],
            selectedMode: "single",
            data: [
              { value: 500, name: "志愿项目" },
              { value: 230, name: "志愿者" },
            ]
          }
        ]
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  justify-content: space-between;
  padding-top: 30px;
  border: 1px solid #d4d4cd;
}
</style>

