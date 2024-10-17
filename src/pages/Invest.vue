<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item">
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">Invest in Renewable Energy Stocks</h4>
            <p class="category">
              Select from a list of renewable energy stocks to invest in.
            </p>
          </md-card-header>
          <md-card-content>
            <div class="md-layout">
              <div class="md-layout-item md-size-100">
                <h5>Available Stocks</h5>
                <div v-if="loading">Loading stocks...</div>
                <div v-if="error">{{ error }}</div>
                <div v-for="stock in stocks" :key="stock.symbol" class="stock-item">
                  <p>
                    <b>{{ stock.name }}</b> ({{ stock.symbol }}) - {{ stock.price }} USD 
                  </p>
                  <div class="button-group">
                    <md-button class="md-primary" @click="toggleChart(stock)">
                      Show Chart
                    </md-button>
                    <md-button class="md-primary" @click="initiatePayment(stock)">
                      Buy
                    </md-button>
                  </div>
                  <transition name="fade">
                    <div v-if="selectedStock === stock.symbol" class="chart-card">
                      <md-card>
                        <md-card-header>
                          <h4 class="title">{{ stock.name }} ({{ stock.symbol }})</h4>
                          <button class="close-button" @click="closeChart">&times;</button>
                        </md-card-header>
                        <md-card-content>
                          <StockChart :stockSymbol="stock.symbol" />
                        </md-card-content>
                      </md-card>
                    </div>
                  </transition>
                </div>
              </div>
            </div>
          </md-card-content>
        </md-card>
      </div>
    </div>
    <div v-if="showPaymentForm" class="payment-overlay">
      <div class="payment-form">
        <button class="close-button" @click="cancelPayment">&times;</button>
        <h3>Complete your Payment</h3>
        <form @submit.prevent="handleSubmit">
          <div class="debit-card">
            <div :class="['debit-card-inner', { flipped: isFlipped }]">
              <div class="debit-card-front">
                <div class="card-chip">
                  <img src="@/assets/img/chip-preview.png" alt="Card Chip" />
                </div>
                <div class="card-number">{{ formattedNumber }}</div>
                <div class="card-holder">Card Holder<br>{{ user.username }}</div>
                <div class="card-expiry">Expires<br>{{ cardExpiry }}</div> <!-- Expires element -->
                <i v-if="cardType === 'visa'" class="fab fa-cc-visa card-type-icon"></i>
                <i v-if="cardType === 'mastercard'" class="fab fa-cc-mastercard card-type-icon"></i>
                <i v-if="cardType === 'amex'" class="fab fa-cc-amex card-type-icon"></i>
                <i v-if="cardType === 'discover'" class="fab fa-cc-discover card-type-icon"></i>
              </div>
              <div class="debit-card-back">
                <div class="black-strip"></div>
                <div class="card-cvc">{{ cardCVC }}</div>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label for="card-number">Card Number</label>
            <input id="card-number" v-model="cardNumber" @input="handleCardNumberInput" type="text" class="form-control" maxlength="19" placeholder="0000 0000 0000 0000" />
          </div>
          <div class="form-group">
            <label for="card-expiry">Expiry Date</label>
            <input id="card-expiry" v-model="cardExpiry" @input="handleCardExpiryInput" :class="{'invalid': !isExpiryValid}" type="text" class="form-control" maxlength="5" placeholder="MM/YY" />
          </div>
          <div class="form-group">
            <label for="card-cvc">CVC</label>
            <input id="card-cvc" v-model="cardCVC" @focus="isFlipped = true" @blur="isFlipped = false" type="text" class="form-control" maxlength="3" placeholder="123" />
          </div>
          <div class="payment-buttons">
            <md-button class="md-raised md-primary" type="submit">Submit Payment</md-button>
            <md-button class="md-raised md-accent" @click="cancelPayment">Cancel</md-button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import StockChart from '../components/StockChart.vue';
import apiService from "@/apiService.js"; // Import the apiService
import Swal from 'sweetalert2'; // Import SweetAlert2

export default {
  components: {
    StockChart,
  },
  data() {
    return {
      stocks: [
        { name: 'Tesla', symbol: 'TSLA', price: 700 },
        { name: 'NextEra Energy', symbol: 'NEE', price: 75 },
        { name: 'Enphase Energy', symbol: 'ENPH', price: 150 },
        { name: 'Brookfield Renewable Partners', symbol: 'BEP', price: 45 },
      ],
      selectedStock: null,
      loading: false,
      error: null,
      showPaymentForm: false,
      clientSecret: '',
      user: {
        username: '', // Assuming the username is fetched from some authentication mechanism
      },
      selectedStockForPayment: null,
      previousTxHash: '', // Add previousTxHash to store the previous transaction hash
      cardNumber: '',
      cardExpiry: '',
      cardCVC: '',
      isFlipped: false,
      cardType: '', // Add cardType to store the detected card type
      isExpiryValid: true, // Add isExpiryValid to track the validity of the expiry date
    };
  },
  computed: {
    formattedNumber() {
      return this.cardNumber.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim();
    },
  },
  watch: {
    showPaymentForm(newValue) {
      if (newValue) {
        this.$nextTick(() => {
          // No initialization for Stripe elements needed
        });
      }
    }
  },
  methods: {
    async fetchUserProfile() {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await apiService.getUserProfile(token);
          this.user.username = response.data.username;
        } catch (error) {
          console.error("Failed to fetch user profile:", error);
        }
      }
    },
    toggleChart(stock) {
      if (this.selectedStock === stock.symbol) {
        this.selectedStock = null;
      } else {
        this.selectedStock = stock.symbol;
      }
    },
    closeChart() {
      this.selectedStock = null;
    },
    async initiatePayment(stock) {
      try {
        const response = await axios.post('http://localhost:4242/create-payment-intent', {
          amount: stock.price * 100,
        });
        this.clientSecret = response.data.clientSecret;
        this.showPaymentForm = true;
        this.selectedStockForPayment = stock; // Store selected stock for payment
        // Fetch the latest transaction hash for previousTxHash
        const txResponse = await axios.get(`http://localhost:4242/transactions/${this.user.username}`);
        if (txResponse.data && txResponse.data.length > 0) {
          this.previousTxHash = txResponse.data[0].txHash;
        } else {
          this.previousTxHash = 'N/A';
        }
      } catch (error) {
        console.error('Error initiating payment:', error);
      }
    },
    cancelPayment() {
      this.showPaymentForm = false;
      this.clientSecret = '';
      this.clearCardDetails(); // Clear card details on cancel
    },
    async handleSubmit() {
      // Validate expiry date and CVC
      if (!this.isExpiryValid || this.cardCVC.length !== 3) {
        Swal.fire({
          title: 'Error',
          text: 'Invalid Expiry Date.',
          icon: 'error',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          },
          timer: 3000, // Adjust timer as needed
          timerProgressBar: true
        });
        return;
      }

      // Implement the payment submission logic without Stripe elements
      Swal.fire({
        title: 'Payment Successful',
        icon: 'success',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        },
        timer: 3000, // Adjust timer as needed
        timerProgressBar: true
      });

      this.showPaymentForm = false;
      this.clientSecret = '';

      try {
        const saveResponse = await axios.post('http://localhost:4242/save-payment', {
          username: this.user.username, // Include username in the save-payment request
          stock: this.selectedStockForPayment.name,
          amount: this.selectedStockForPayment.price,
        });

        // Update previousTxHash with the new transaction hash from the saved payment
        this.previousTxHash = saveResponse.data.txHash;

        
      } catch (error) {
        console.error('Failed to save payment details:', error);
        Swal.fire({
          title: 'Error',
          text: 'Failed to save payment details',
          icon: 'error',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          },
          timer: 3000, // Adjust timer as needed
          timerProgressBar: true
        });
      }

      this.clearCardDetails(); // Clear card details after payment submission
    },
    handleCardNumberInput(event) {
      const input = event.target.value.replace(/\D/g, ''); // Remove non-numeric characters
      this.cardNumber = input.match(/.{1,4}/g)?.join(' ') || ''; // Add space after every 4 digits
      this.cardType = this.detectCardType(input);
    },
    handleCardExpiryInput(event) {
      const input = event.target.value.replace(/\D/g, ''); // Remove non-numeric characters
      if (input.length <= 2) {
        this.cardExpiry = input;
      } else {
        this.cardExpiry = `${input.substring(0, 2)}/${input.substring(2, 4)}`;
      }
      this.validateExpiryDate();
    },
    validateExpiryDate() {
      const [month, year] = this.cardExpiry.split('/');
      const currentYear = new Date().getFullYear() % 100; // Get last two digits of current year
      const currentMonth = new Date().getMonth() + 1; // Months are zero-based in JavaScript
      if (year < currentYear || (year == currentYear && month < currentMonth) || year <= 24) {
        this.isExpiryValid = false;
      } else {
        this.isExpiryValid = true;
      }
    },
    detectCardType(number) {
      const cardPatterns = {
        visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
        mastercard: /^5[1-5][0-9]{14}$/,
        amex: /^3[47][0-9]{13}$/,
        discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
      };
      for (let card in cardPatterns) {
        if (cardPatterns[card].test(number)) {
          return card;
        }
      }
      return '';
    },
    clearCardDetails() {
      this.cardNumber = '';
      this.cardExpiry = '';
      this.cardCVC = '';
      this.cardType = '';
      this.isExpiryValid = true; // Reset expiry validation
    }
  },
  mounted() {
    this.fetchUserProfile(); // Fetch user profile on component mount
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');

.profile-container {
  padding: 24px;
  font-family: 'Roboto', sans-serif;
}

.md-card {
  margin-bottom: 24px;
}

.profile-section {
  margin-bottom: 24px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.section-content {
  display: flex;
  flex-wrap: wrap;
}

.info-item {
  flex: 1 1 45%;
  margin-bottom: 16px;
}

.info-item label {
  display: block;
  font-weight: bold;
  color: #333;
}

.info-item span {
  display: block;
  margin-top: 4px;
  color: #555;
}

.md-icon-button {
  position: relative;
  top: -4px;
}

.md-dialog {
  display: flex;
  align-items: center;
  justify-content: center;
}

.md-dialog-title {
  background-color: #4caf50;
  color: #fff;
}

.centered-dialog {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.file-input-container {
  display: flex;
  align-items: center;
}

.file-input {
  display: none;
}

.file-name {
  margin-left: 16px;
  color: #555;
}

.md-button span {
  margin-left: 8px;
}

.stock-item {
  margin-bottom: 15px;
}

.button-group {
  display: flex;
  gap: 10px;
}

.chart-card {
  position: relative;
  margin-top: 15px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.close-button:hover {
  color: red;
}

.payment-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
}

.payment-form {
  position: relative;
  width: 100%;
  max-width: 400px;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  animation: fadeIn 0.3s ease-in-out;
}

.payment-form h3 {
  margin-bottom: 20px;
}

.card-element {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.payment-buttons {
  display: flex;
  justify-content: space-between;
}

.md-button.md-primary {
  background-color: #6200ea;
  color: #fff;
}

.md-button.md-accent {
  background-color: gray; /* or use #808080 */
  color: #fff;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Debit Card Styles */
.debit-card {
  width: 100%;
  max-width: 350px;
  height: 200px;
  perspective: 1000px;
  margin: 0 auto 20px;
}

.debit-card-inner {
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  position: relative;
}

.debit-card-inner.flipped {
  transform: rotateY(180deg);
}

.debit-card-front, .debit-card-back {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  backface-visibility: hidden;
  border-radius: 10px;
  background: url('/src/assets/img/background.jpg') no-repeat center center;
  background-size: cover;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
}

.debit-card-front {
  justify-content: flex-start;
  position: relative;
}

.card-chip {
  width: 50px;
  height: 35px;
  background-color: #fff;
  border-radius: 4px;
  margin: 20px 0;
  align-self: flex-start;
  margin-left: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-chip img {
  width: 100%;
  height: auto;
}

.card-number, .card-holder, .card-expiry, .card-cvc {
  margin: 10px 0;
}

.card-number {
  font-size: 1.2rem;
  letter-spacing: 2px;
  align-self: flex-start;
  margin-left: 20px;
}

.input-card-number {
  font-size: 1.2rem;
  letter-spacing: 2px;
  align-self: flex-start;
  margin-top: 20px;
}

.card-holder {
  font-size: 0.8rem;
  align-self: flex-start;
  margin-left: 20px;
}

.card-expiry {
  font-size: 0.8rem;
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.5);
  padding: 5px 10px;
  border-radius: 5px;
}

.card-type-icon {
  width: 50px;
  height: auto;
  position: absolute;
  top: 10px;
  right: 20px;
}

.debit-card-back {
  transform: rotateY(180deg);
}

.black-strip {
  width: 100%;
  height: 40px;
  background-color: #000;
  position: absolute;
  top: 20px;
}

.card-cvc {
  position: absolute;
  top: 80px;
  right: 20px;
  font-size: 1rem;
}

/* Form Control Styles */
.form-control {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  font-size: 16px;
}

.form-control.invalid {
  border-color: red;
}

.form-control:focus {
  border-color: #6200ea;
  box-shadow: 0 0 8px rgba(98, 0, 234, 0.2);
}

.form-group label {
  font-weight: bold;
  color: #555;
  margin-bottom: 5px;
  display: block;
}
</style>
