<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal">
      <div class="modal-header">
        <h2>Transaction Details</h2>
        <button class="close-button" @click="close">&times;</button>
      </div>
      <div class="modal-body">
        <p><strong>Transaction Hash:</strong> {{ transaction.txHash }}</p>
        <p v-if="transaction.previousTxHash"><strong>Previous Transaction Hash:</strong> {{ transaction.previousTxHash }}</p>
        <p><strong>Stock:</strong> {{ transaction.stock }}</p>
        <p><strong>Amount:</strong> {{ formatAmount(transaction.amount) }}</p>
        <p><strong>Username:</strong> {{ transaction.username }}</p>
        <p><strong>Date:</strong> {{ formatDate(transaction.date) }}</p>
        <p><strong>Status:</strong> <span :class="statusClass">{{ transaction.status }}</span></p>
        <p><strong>Confirmations:</strong> <span :class="confirmationsClass">{{ transaction.confirmations }}</span></p>
      </div>
      <div class="modal-footer">
        <button @click="close">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TransactionDetailsModal',
  props: {
    transaction: Object,
  },
  methods: {
    close() {
      this.$emit('close');
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
      return `$${amount.toFixed(2)} USD`;
    }
  },
  computed: {
    statusClass() {
      return this.transaction.status === 'Confirmed' ? 'status-confirmed' : 'status-pending';
    },
    confirmationsClass() {
      return this.transaction.confirmations >= 3 ? 'confirmations-high' : 'confirmations-low';
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap');

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadeIn 0.3s ease-in-out;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  font-family: 'Montserrat', sans-serif;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
}

.modal-header h2 {
  margin: 0;
  font-size: 24px;
  color: #333;
}

.close-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #aaa;
}

.close-button:hover {
  color: #000;
}

.modal-body {
  padding: 20px 0;
}

.modal-body p {
  margin: 10px 0;
  color: #555;
}

.modal-footer {
  text-align: right;
  border-top: 1px solid #ddd;
  padding-top: 10px;
}

button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #45a049;
}

.status-confirmed {
  color: green;
  font-weight: bold;
}

.status-pending {
  color: red;
  font-weight: bold;
}

.confirmations-high {
  color: green;
}

.confirmations-low {
  color: red;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
