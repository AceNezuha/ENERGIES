<template>
  <div class="admin-dashboard">
    <h1>Admin Dashboard</h1>
    <p>Welcome to the admin dashboard. Only users with the admin role can access this page.</p>

    <div class="transactions-table">
      <h2>Transactions</h2>
      <input type="text" v-model="searchQuery" @input="filterTransactions" placeholder="Search by username" class="search-bar" />
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th @click="sortBy('txHash')">Transaction Hash</th>
              <th @click="sortBy('previousTxHash')">Previous Transaction Hash</th>
              <th @click="sortBy('stock')">Stock</th>
              <th @click="sortBy('amount')">Amount</th>
              <th @click="sortBy('username')">Username</th>
              <th @click="sortBy('date')">Date</th>
              <th @click="sortBy('status')">Status</th>
              <th @click="sortBy('confirmations')">Confirmations</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="transaction in filteredTransactions" :key="transaction._id" :data-txhash="transaction.txHash" :class="{ highlight: isHighlighted(transaction.username) }">
              <td>{{ transaction.txHash }}</td>
              <td>
                <a v-if="transaction.previousTxHash" @click.prevent="scrollToTransaction(transaction.previousTxHash)">
                  {{ transaction.previousTxHash }}
                </a>
                <span v-else>N/A</span>
              </td>
              <td>{{ transaction.stock }}</td>
              <td>{{ formatAmount(transaction.amount) }}</td>
              <td>{{ transaction.username }}</td>
              <td>{{ formatDate(transaction.date) }}</td>
              <td :class="{'pending': transaction.status === 'Pending', 'confirmed': transaction.status === 'Confirmed'}">{{ transaction.status }}</td>
              <td :class="{'red': transaction.confirmations === 0, 'green': transaction.confirmations === 3}">{{ transaction.confirmations }}</td>
              <td class="action-buttons">
                <button @click="copyTxHash(transaction.txHash)">Copy Hash</button>
                <button @click="verifyTransaction(transaction)">Verify</button>
                <button @click="showTransactionDetails(transaction)">Details</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <transaction-details-modal v-if="selectedTransaction" :transaction="selectedTransaction" @close="selectedTransaction = null"></transaction-details-modal>
  </div>
</template>

<script>
import axios from 'axios';
import TransactionDetailsModal from '@/components/TransactionDetailsModal.vue';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

export default {
  name: 'AdminDashboard',
  components: {
    TransactionDetailsModal,
  },
  data() {
    return {
      transactions: [],
      searchQuery: '',
      filteredTransactions: [],
      selectedTransaction: null,
      sortKey: '',
      sortAsc: true,
    };
  },
  created() {
    this.fetchTransactions();
  },
  methods: {
    async fetchTransactions() {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:3000/admin/transactions', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.transactions = response.data;

        // Add previousTxHash dynamically
        const userTransactionsMap = {};
        this.transactions.forEach((transaction) => {
          if (!userTransactionsMap[transaction.username]) {
            userTransactionsMap[transaction.username] = [];
          }
          userTransactionsMap[transaction.username].push(transaction);
        });

        for (const username in userTransactionsMap) {
          userTransactionsMap[username].sort((a, b) => new Date(a.date) - new Date(b.date));
          for (let i = 1; i < userTransactionsMap[username].length; i++) {
            userTransactionsMap[username][i].previousTxHash = userTransactionsMap[username][i - 1].txHash;
          }
        }

        // Flatten the map back into an array
        this.transactions = Object.values(userTransactionsMap).flat();

        this.filteredTransactions = this.transactions;
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    },
    copyTxHash(txHash) {
      navigator.clipboard.writeText(txHash).then(
        () => {
          toastr.success('Transaction hash copied to clipboard', 'Success', { timeOut: 3000, closeButton: true });
        },
        (err) => {
          console.error('Could not copy text: ', err);
        }
      );
    },
    async verifyTransaction(transaction) {
      if (transaction.status === 'Confirmed') {
        toastr.warning('This transaction is already confirmed', 'Warning', { timeOut: 3000, closeButton: true });
        return;
      }

      const token = localStorage.getItem('token');
      try {
        const response = await axios.post('http://localhost:3000/admin/verify-transaction', { txHash: transaction.txHash }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.message === 'Transaction verified successfully') {
          toastr.success('Transaction verified successfully', 'Success', { timeOut: 3000, closeButton: true });
          await this.fetchTransactions(); // Refresh transactions
          this.filterTransactions(); // Reapply the filter after fetching transactions
        } else {
          toastr.error('Transaction verification failed', 'Error', { timeOut: 3000, closeButton: true });
        }
      } catch (error) {
        console.error('Error verifying transaction:', error);
        toastr.error('Error verifying transaction. Please try again later.', 'Error', { timeOut: 3000, closeButton: true });
      }
    },
    filterTransactions() {
      const query = this.searchQuery.toLowerCase();
      this.filteredTransactions = this.transactions.filter(transaction =>
        transaction.username.toLowerCase().includes(query)
      );
    },
    isHighlighted(username) {
      const query = this.searchQuery.toLowerCase();
      return username.toLowerCase().includes(query);
    },
    formatDate(date) {
      const d = new Date(date);
      const day = ('0' + d.getDate()).slice(-2);
      const month = ('0' + (d.getMonth() + 1)).slice(-2);
      const year = d.getFullYear();
      let hours = d.getHours();
      const minutes = ('0' + d.getMinutes()).slice(-2);
      const seconds = ('0' + d.getSeconds()).slice(-2);
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      return `${day}/${month}/${year}, ${hours}:${minutes}:${seconds} ${ampm}`;
    },
    formatAmount(amount) {
      return `$${amount.toFixed(2)}`;
    },
    showTransactionDetails(transaction) {
      this.selectedTransaction = transaction;
    },
    sortBy(key) {
      if (this.sortKey === key) {
        this.sortAsc = !this.sortAsc;
      } else {
        this.sortKey = key;
        this.sortAsc = true;
      }
      this.filteredTransactions.sort((a, b) => {
        let result = 0;
        if (a[key] > b[key]) result = 1;
        if (a[key] < b[key]) result = -1;
        return this.sortAsc ? result : -result;
      });
    },
    scrollToTransaction(txHash) {
      const element = document.querySelector(`[data-txhash="${txHash}"]`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        element.classList.add('highlight-green');
        setTimeout(() => {
          element.classList.remove('highlight-green');
        }, 3000); // Highlight for 3 seconds
      }
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap');
@import 'toastr/build/toastr.min.css';

.admin-dashboard {
  padding: 20px;
  font-family: 'Montserrat', sans-serif;
  animation: fadeIn 0.5s ease-in;
}

h1 {
  color: #333;
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
}

p {
  text-align: center;
  color: #777;
  margin-bottom: 30px;
}

.transactions-table {
  margin-top: 20px;
}

.transactions-table h2 {
  font-size: 28px;
  font-weight: 600;
  color: #004b28;
  margin-bottom: 20px;
}

.search-bar {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.table-container {
  max-height: 600px; /* Adjust height as needed */
  overflow-y: auto;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  animation: fadeInUp 0.5s ease-in-out;
}

th,
td {
  border: 1px solid #ddd;
  padding: 12px 15px;
  text-align: left;
  cursor: pointer;
}

th {
  background-color: #4caf50;
  color: white;
  text-transform: uppercase;
}

td {
  background-color: #f9f9f9;
}

tbody tr:nth-child(even) {
  background-color: #f1f1f1;
}

tbody tr:hover {
  background-color: #e0e0e0;
}

button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-right: 5px;
}

button:hover {
  background-color: #45a049;
}

.highlight-green {
  background-color: #d4edda !important;
}

.pending {
  color: red;
}

.confirmed {
  color: green;
}

.red {
  color: red;
}

.green {
  color: green;
}

.action-buttons {
  display: flex;
  gap: 5px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
