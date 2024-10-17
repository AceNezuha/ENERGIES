<template>
  <div class="chart-container">
    <canvas ref="doughnutChart"></canvas>
  </div>
</template>

<script>
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, registerables } from 'chart.js'
ChartJS.register(...registerables)

export default {
  extends: Doughnut,
  props: {
    chartData: {
      type: Object,
      required: true
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  },
  data() {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 1,
      }
    }
  }
}
</script>

<style scoped>
.chart-container {
  width: 400px;
  height: 400px;
  position: relative;
}
</style>
