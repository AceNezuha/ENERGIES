import axios from 'axios';

const BASE_URL = process.env.VUE_APP_API || 'http://localhost:3000';
const AUTH_URL = `${BASE_URL}/auth`;
const ADMIN_URL = `${BASE_URL}/admin`;

const apiService = {
  // Auth
  login(credentials) {
    return axios.post(`${AUTH_URL}/login`, credentials);
  },
  signup(user) {
    return axios.post(`${AUTH_URL}/signup`, user);
  },
  getUserProfile(token) {
    return axios.get(`${AUTH_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  updateUserProfile(token, userData) {
    return axios.put(`${AUTH_URL}/profile`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  uploadProfilePicture(token, formData) {
    return axios.post(`${AUTH_URL}/uploadProfilePicture`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // User Transactions
  getTransactions(username) {
    return axios.get(`${BASE_URL}/transactions/${username}`);
  },

  // Admin Panel
  getAllTransactions() {
    return axios.get(`${ADMIN_URL}/transactions`);
  },
  getPaymentsByTxHash(txHash) {
    return axios.get(`${ADMIN_URL}/payments/${txHash}`);
  }
};

export default apiService;
