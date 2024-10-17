<template>
    <div>
      <bar-chart :chart-data="chartData" :options="chartOptions"></bar-chart>
    </div>
  </template>
  
  <script>
  import { Bar } from 'vue-chartjs'
  import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title } from 'chart.js'
  
  ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title)
  
  export default {
    name: 'InvestmentChart',
    components: {
      'bar-chart': Bar,
    },
    data() {
      return {
        chartData: {
          labels: ['2018', '2019', '2020', '2021', '2022'],
          datasets: [
            {
              label: 'Investment Growth',
              backgroundColor: '#56ab2f',
              borderColor: '#4caf50',
              borderWidth: 1,
              hoverBackgroundColor: '#4caf50',
              hoverBorderColor: '#388e3c',
              data: [10, 20, 30, 40, 50],
            },
          ],
        },
        chartOptions: {
          responsive: true,
          maintainAspectRatio: false,
          animation: {
            duration: 2000,
            easing: 'easeInOutBounce',
          },
          plugins: {
            legend: {
              display: true,
              labels: {
                color: '#004b28',
                font: {
                  size: 14,
                },
              },
            },
            title: {
              display: true,
              text: 'Investment Growth Over Time',
              color: '#004b28',
              font: {
                size: 18,
                weight: 'bold',
              },
            },
          },
          scales: {
            x: {
              ticks: {
                color: '#004b28',
              },
              grid: {
                color: '#e0e0e0',
              },
            },
            y: {
              ticks: {
                color: '#004b28',
              },
              grid: {
                color: '#e0e0e0',
              },
            },
          },
        },
      }
    },
  }
  </script>
  
  <style scoped>
  div {
    width: 100%;
    height: 400px;
  }
  </style>
  