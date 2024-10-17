const express = require('express');
const jwt = require('jsonwebtoken');
const Payment = require('../models/payment');
const Contact = require('../models/contact');
const router = express.Router();

// Middleware to check if the user is an admin
function isAdmin(req, res, next) {
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, 'your_jwt_secret');
  if (decoded.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Forbidden' });
  }
}

// Route to get all transactions
router.get('/transactions', isAdmin, async (req, res) => {
  try {
    const transactions = await Payment.find().sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch transactions', error });
  }
});

// Simulated verify transaction endpoint
router.post('/verify-transaction', isAdmin, async (req, res) => {
  const { txHash } = req.body;
  try {
    const payment = await Payment.findOne({ txHash });
    if (!payment) {
      return res.status(404).send({ message: 'Transaction not found' });
    }
    payment.status = 'Confirmed';
    payment.confirmations = 3; // Simulate confirmations
    await payment.save();
    res.status(200).send({ message: 'Transaction verified successfully' });
  } catch (error) {
    console.error('Error verifying transaction:', error);
    res.status(500).send({ message: 'Failed to verify transaction', error });
  }
});

router.get('/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).send({ message: 'Failed to fetch contact messages', error });
  }
});
module.exports = router;
