<template>
    <div>
      <canvas ref="lineChart"></canvas>
    </div>
  </template>
  
  <script>
  import { Line } from 'vue-chartjs'
  import { Chart as ChartJS, registerables } from 'chart.js'
  ChartJS.register(...registerables)
  
  export default {
    extends: Line,
    props: {
      chartData: {
        type: Object,
        required: true
      }
    },
    mounted () {
      this.renderChart(this.chartData, this.options)
    }
  }
  </script>
  