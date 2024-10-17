const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  stock: String,
  amount: Number,
  username: String,
  date: { type: Date, default: Date.now },
  txHash: String,
  status: { type: String, default: 'Pending' },
  confirmations: { type: Number, default: 0 }
});

module.exports = mongoose.model('Payment', paymentSchema);
