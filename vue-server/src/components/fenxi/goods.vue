<template>
  <div>
    <h2>商品分析</h2>
    <!-- 扇形图 -->
    <div id="myChartOne" :style="{width: '500px', height: '300px'}"></div>
    <!-- 柱状图 -->
    <div id="myChartTwo" :style="{width: '500px', height: '300px'}"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    // this.chartOne();
    this.chartTwo();
  },
  methods: {
    chartOne() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChartOne"));
      // 数据
        
      // 绘制图表
      myChart.setOption(option);
    },  chartTwo() {
    //  初始化
    let myChart = this.$echarts.init(document.getElementById("myChartTwo"));
    // 数据
    let option = {
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
    }]
};

    // 绘制图表
    myChart.setOption(option);
  }
  },

};
</script>

<style>
</style>