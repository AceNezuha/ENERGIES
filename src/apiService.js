import axios from 'axios';

const API_URL = 'http://localhost:3000/auth';

const apiService = {
  login(credentials) {
    return axios.post(`${API_URL}/login`, credentials);
  },
  signup(user) {
    return axios.post(`${API_URL}/signup`, user);
  },
  getUserProfile(token) {
    return axios.get(`${API_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  updateUserProfile(token, userData) {
    return axios.put(`${API_URL}/profile`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  uploadProfilePicture(token, formData) {
    return axios.post(`${API_URL}/uploadProfilePicture`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  getTransactions(username) {
    return axios.get(`http://localhost:3000/transactions/${username}`);
  },
  getAllTransactions() {
    return axios.get(`http://localhost:3000/admin/transactions`);
  },
  getPaymentsByTxHash(txHash) {
    return axios.get(`http://localhost:3000/admin/payments/${txHash}`);
  }
};

export default apiService;
