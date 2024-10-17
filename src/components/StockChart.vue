<template>
    <div>
      <canvas ref="canvas"></canvas>
      <line-chart v-if="datacollection.labels.length" :chart-data="datacollection" :options="chartOptions" />
      <div v-else>{{ errorMessage || 'Loading data...' }}</div>
    </div>
  </template>
  
  <script>
  import { Line } from 'vue-chartjs';
  import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js';
  import 'chartjs-adapter-date-fns';
  
  ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale);
  
  export default {
    name: 'StockChart',
    components: {
      LineChart: Line,
    },
    props: {
      stockSymbol: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        datacollection: {
          labels: [],
          datasets: [
            {
              label: this.stockSymbol,
              borderColor: 'rgba(0, 255, 0, 1)', // Solid green for line
              backgroundColor: 'rgba(0, 255, 0, 0.8)', // Gradient green background
              pointBackgroundColor: 'rgba(0, 128, 0, 1)', // Dark green for points
              pointBorderColor: 'rgba(0, 128, 0, 1)', // Dark green for points
              fill: true, // Enables the gradient fill
              data: [],
            },
          ],
        },
        chartOptions: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              type: 'category', // Use 'category' type to avoid time formatting
              grid: {
                color: 'rgba(255, 255, 255, 0.2)', // Light grid color
              },
              ticks: {
                display: false, // Hide the ticks completely
                color: '#ffffff', // White ticks
              },
            },
            y: {
              grid: {
                color: 'rgba(255, 255, 255, 0.2)', // Light grid color
              },
              ticks: {
                color: '#ffffff', // White ticks
              },
            },
          },
          plugins: {
            legend: {
              display: true,
              labels: {
                color: '#ffffff', // White labels
              },
            },
            tooltip: {
              enabled: true,
              backgroundColor: '#000000',
              titleColor: '#ffffff',
              bodyColor: '#ffffff',
              callbacks: {
                label: (tooltipItem) => `Price: ${tooltipItem.parsed.y} USD`,
              },
            },
          },
          animation: {
            duration: 1000,
            easing: 'easeInOutQuad',
          },
        },
        errorMessage: null,
      };
    },
    mounted() {
      this.populateDummyData();
    },
    methods: {
      setGradient(ctx) {
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(0, 255, 0, 0.8)'); // Green color at the   top
        gradient.addColorStop(1, 'rgba(0, 255, 0, 0)'); // Transparent at the bottom
        this.datacollection.datasets[0].backgroundColor = gradient;
        this.datacollection.datasets[0].borderColor = 'rgba(0, 255, 0, 1)'; // Solid green for line
      },
      populateDummyData() {
        const labels = [];
        const stockData = [];
        const now = new Date();
        
        for (let i = 0; i < 30; i++) {
          const date = new Date(now);
          date.setFullYear(now.getFullYear() - i);
          labels.unshift(date.getFullYear()); // Only use the year for labels
          stockData.unshift((Math.random() * 400000).toFixed(2)); // Dummy stock price data
        }
  
        this.datacollection.labels = labels;
        this.datacollection.datasets[0].data = stockData;
  
        // Set gradient after data is populated
        const ctx = this.$refs.canvas.getContext('2d');
        this.setGradient(ctx);
      },
    },
  };
  </script>
  
  <style scoped>
 
  </style>
  