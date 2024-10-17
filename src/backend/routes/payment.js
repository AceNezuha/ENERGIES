const express = require('express');
const Payment = require('../models/payment');
const { isAdmin } = require('../auth');
const stripe = require('stripe')('your_stripe_secret_key');

const router = express.Router();

router.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).send({ message: 'Failed to create payment intent', error });
  }
});

router.post('/save-payment', async (req, res) => {
  const { stock, amount, username } = req.body;
  console.log('Received data:', { stock, amount, username });

  try {
    // Find the latest transaction for the user
    const latestPayment = await Payment.findOne({ username }).sort({ date: -1 });
    const previousTxHash = latestPayment ? latestPayment.txHash : 'N/A';
    console.log('Previous transaction hash:', previousTxHash);

    // Simulate blockchain transaction logging
    const txHash = await logTransactionOnBlockchain({ stock, amount, username });

    // Create new payment
    const payment = new Payment({ stock, amount, username, txHash });

    await payment.save();
    console.log('Payment details saved successfully', payment);
    res.status(200).send({ message: 'Payment saved successfully', previousTxHash, txHash });
  } catch (error) {
    console.error('Error saving payment:', error);
    res.status(500).send({ message: 'Failed to save payment', error });
  }
});

// Simulated blockchain logging function
async function logTransactionOnBlockchain(payment) {
  const txHash = '0x' + Math.floor(Math.random() * 1e16).toString(16);
  console.log('Simulated blockchain transaction hash:', txHash);
  return txHash;
}

// Admin route to fetch transactions
router.get('/transactions', isAdmin, async (req, res) => {
  try {
    const transactions = await Payment.find();
    res.send(transactions);
  } catch (error) {
    res.status(500).send({ message: 'Failed to fetch transactions', error });
  }
});

module.exports = router;
