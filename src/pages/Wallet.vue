<template>
  <div class="main-container">
    <md-card>
      <md-card-header data-background-color="green">
        <h4 class="title">Wallet</h4>
        <p class="category">Your Financial Overview</p>
      </md-card-header>
      <md-card-content>
        <div class="dashboard">
          <md-card class="dashboard-card balance-card">
            <md-card-header data-background-color="green">
              <h4 class="title">Current Balance</h4>
            </md-card-header>
            <md-card-content>
              <div class="balance-container">
                <div class="card-item">
                  <div class="card-info">
                    <div class="card-number">
                      <img :src="cards[0].img" alt="Card Image" class="card-icon" />
                      <span>{{ cards[0].showNumber ? cards[0].number : '**** **** **** ' + cards[0].last4 }}</span>
                      <button class="eye-icon-button" @click="toggleCardNumber(cards[0])">
                        <i :class="cards[0].showNumber ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                      </button>
                    </div>
                    <div class="card-name">{{ cards[0].name }}</div>
                    <div class="card-expiry">Exp: {{ cards[0].expiry }}</div>
                  </div>
                </div>
                <div class="balance">$ {{ currentBalance.toFixed(2) }}</div>
                <div class="additional-info">Recent transactions included.</div>
              </div>
            </md-card-content>
          </md-card>

          <md-card class="dashboard-card">
            <md-card-header data-background-color="green">
              <h4 class="title">Budget</h4>
            </md-card-header>
            <md-card-content>
              <line-chart :chart-data="budgetData" />
            </md-card-content>
          </md-card>

          <md-card class="dashboard-card transactions-card">
            <md-card-header data-background-color="green">
              <h4 class="title">Recent Transactions</h4>
            </md-card-header>
            <md-card-content>
              <div class="transactions-wrapper">
                <div v-for="transaction in transactions" :key="transaction._id" class="transaction-container">
                  <div class="transaction-date">{{ formatTransactionDate(transaction.date) }}</div>
                  <div class="transaction-item">
                    <img :src="getTransactionIcon(transaction.stock)" class="transaction-icon" alt="Company Logo" />
                    <div class="transaction-details">
                      <div class="transaction-name">{{ transaction.stock }}</div>
                      <div class="transaction-headline">Stock Transaction</div>
                      <div class="transaction-time">{{ formatTransactionTime(transaction.date) }}</div>
                    </div>
                    <div :class="{'transaction-amount': true, 'positive': transaction.amount >= 0, 'negative': transaction.amount < 0}">
                      {{ formatTransactionAmount(transaction.amount) }}
                    </div>
                  </div>
                </div>
              </div>
            </md-card-content>
          </md-card>

          <md-card class="dashboard-card doughnut-chart-card">
            <md-card-header data-background-color="green">
              <h4 class="title">Investment Balance</h4>
            </md-card-header>
            <md-card-content>
              <div class="investment-summary">
                <div class="total-investment">Total Investment: ${{ totalInvestment.toFixed(2) }}</div>
                <div class="percentage-change">Change: {{ percentageChange.toFixed(2) }}%</div>
                <div class="total-gains">Gains/Losses: ${{ totalGains.toFixed(2) }}</div>
              </div>
              <div class="chart-container">
                <doughnut-chart :chart-data="investmentData" :options="chartOptions" />
              </div>
              <div class="investment-legend">
                <div v-for="(color, index) in investmentData.datasets[0].backgroundColor" :key="index" class="legend-item">
                  <div :style="{ backgroundColor: color }" class="legend-color"></div>
                  <span>{{ investmentData.labels[index] }}</span>
                </div>
              </div>
            </md-card-content>
          </md-card>
        </div>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import LineChart from '@/components/LineChart.vue';
import DoughnutChart from '@/components/DoughnutChart.vue';
import apiService from "@/apiService.js"; // Ensure you import your API service

export default {
  components: {
    LineChart,
    DoughnutChart,
  },
  data() {
    return {
      currentBalance: 0, // Initialize to 0 and compute later
      totalInvestment: 0,
      percentageChange: 0,
      totalGains: 0,
      cards: [
        {
          id: 1,
          img: require('@/assets/img/Old_Visa_Logo.png'),
          number: '4242 4242 4242 4242',
          last4: '4242',
          name: '', // Name will be set dynamically
          expiry: '12/28',
          showNumber: false
        },
      ],
      budgetData: {
        labels: ['18 Dec', '25 Dec', '1 Jan', '8 Jan', '15 Jan', '22 Jan', '29 Jan'],
        datasets: [
          {
            label: 'Budget',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            data: [3000, 4000, 6000, 531.22, 4000, 3500, 3000],
          },
        ],
      },
      transactions: [],
      investmentData: {
        labels: [],
        datasets: [
          {
            label: 'Investment',
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            data: [],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  created() {
    this.fetchUserProfile();
    this.fetchTransactions();
  },
  methods: {
    toggleCardNumber(card) {
      card.showNumber = !card.showNumber;
    },
    async fetchUserProfile() {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await apiService.getUserProfile(token);
          const user = response.data;
          this.cards.forEach(card => {
            card.name = user.name;
          });
        } catch (error) {
          console.error("Failed to fetch user profile:", error);
        }
      }
    },
    async fetchTransactions() {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await apiService.getUserProfile(token);
          const user = response.data;
          const transactionsResponse = await apiService.getTransactions(user.username);
          this.transactions = transactionsResponse.data;
          this.computeCurrentBalance();
          this.computeInvestmentData();
        } catch (error) {
          console.error("Failed to fetch transactions:", error);
        }
      }
    },
    computeCurrentBalance() {
      let balance = 0;
      this.transactions.forEach(transaction => {
        balance += transaction.amount;
      });
      this.currentBalance = balance;
    },
    computeInvestmentData() {
      let totalInvestment = 0;
      let totalGains = 0;

      this.transactions.forEach(transaction => {
        if (transaction.amount > 0) {
          totalInvestment += transaction.amount;
        }
        totalGains += transaction.amount;
      });

      const initialInvestment = totalInvestment; // Assuming initial investment is the total positive transactions
      const percentageChange = ((totalGains - initialInvestment) / initialInvestment) * 100;

      this.totalInvestment = totalInvestment;
      this.totalGains = totalGains - totalInvestment;
      this.percentageChange = percentageChange;

      this.investmentData.labels = ['Tesla', 'NextEra Energy', 'Enphase Energy', 'Brookfield Renewable Partners'];
      this.investmentData.datasets[0].data = [
        this.transactions.filter(t => t.stock === 'Tesla').reduce((sum, t) => sum + t.amount, 0),
        this.transactions.filter(t => t.stock === 'NextEra Energy').reduce((sum, t) => sum + t.amount, 0),
        this.transactions.filter(t => t.stock === 'Enphase Energy').reduce((sum, t) => sum + t.amount, 0),
        this.transactions.filter(t => t.stock === 'Brookfield Renewable Partners').reduce((sum, t) => sum + t.amount, 0)
      ];
    },
    formatTransactionDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
    },
    formatTransactionTime(date) {
      const options = { hour: '2-digit', minute: '2-digit' };
      return new Date(date).toLocaleTimeString(undefined, options);
    },
    formatTransactionAmount(amount) {
      const sign = amount > 0 ? '+' : '-';
      return `${sign}$${Math.abs(amount).toFixed(2)}`;
    },
    getTransactionIcon(stock) {
      switch (stock) {
        case 'Tesla':
          return require('@/assets/img/tesla.png');
        case 'NextEra Energy':
          return require('@/assets/img/NEE-84769d68.png');
        case 'Enphase Energy':
          return require('@/assets/img/enphase.png');
        case 'Brookfield Renewable Partners':
          return require('@/assets/img/BEPC-fc7f80e8.png');
        default:
          return '';
      }
    }
  },
};
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

.main-container {
  padding: 16px;
}

.dashboard {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.dashboard-card {
  background: rgba(255, 255, 255, 0.8); /* Transparent white */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  flex: 1 1 calc(33.333% - 16px);
  min-width: 300px; /* Adjusted for better responsiveness */
  padding: 16px;
  transition: transform 0.3s ease;
}

.balance-card {
  position: relative;
  background: white; /* Background changed to white */
  color: #000;
}

.balance-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.balance-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.balance-amount {
  font-size: 2rem;
  font-weight: 700;
  margin: 10px 0;
  color: #4caf50;
}

.card-item {
  background: linear-gradient(145deg, #e0e0e0, #c0c0c0); /* Gradient background */
  color: #000;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.card-item:hover {
  transform: translateY(-5px);
}

.card-icon {
  width: 40px;
  height: auto;
  margin-right: 8px;
}

.card-info {
  margin-top: 8px;
  text-align: center;
}

.card-number {
  font-size: 1.25rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
}

.eye-icon-button {
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 8px;
}

.card-name {
  font-size: 1rem;
  color: #666;
}

.card-expiry {
  font-size: 1rem;
  color: #666;
}

.balance {
  font-size: 2.5rem; /* Increased font size for better visibility */
  font-weight: 700;
  color: #4caf50;
  margin-top: 16px;
}

.additional-info {
  margin-top: 16px;
}

.transactions-card {
  max-height: 400px;
  overflow-y: auto;
}

.transactions-wrapper {
  max-height: 100%;
  overflow-y: auto;
  padding-right: 10px;
}

.transaction-date {
  font-size: 1rem;
  font-weight: 600;
  margin-top: 16px;
}

.transaction-item {
  display: flex;
  align-items: center;
  margin-top: 8px;
  border-top: 1px solid #e0e0e0;
  padding-top: 8px;
}

.transaction-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 16px;
}

.transaction-details {
  flex-grow: 1;
}

.transaction-name {
  font-size: 1rem;
  font-weight: 600;
}

.transaction-headline {
  font-size: 0.85rem;
  color: #888;
}

.transaction-time {
  font-size: 0.85rem;
  color: #888;
  margin-top: 4px;
}

.transaction-amount {
  font-size: 1rem;
  font-weight: 600;
}

.transaction-amount.negative {
  color: red;
}

.transaction-amount.positive {
  color: green;
}

.doughnut-chart-card .card-content {
  align-items: center; /* Center the chart horizontally */
}

.investment-summary {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 16px;
  font-weight: bold;
}

.investment-legend {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 16px;
}

.legend-item {
  display: flex;
  align-items: center;
  margin: 4px 8px;
}

.legend-color {
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-right: 8px;
  border-radius: 50%;
}

.chart-container {
  width: 300px;
  height: 300px;
  margin: 0 auto; /* Center the chart horizontally */
}
</style>
