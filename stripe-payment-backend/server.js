const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const stripe = require('stripe')('sk_test_CsnggH3iChIYjrFoue5y6M98'); // Replace with your Stripe secret key
const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode'); // Import jwt-decode


const app = express();
const port = 4242;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://password:DB_ID.e674w9c.mongodb.net/sample_mflix?retryWrites=true&w=majority')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const paymentSchema = new mongoose.Schema({
  stock: String,
  amount: Number,
  username: String,
  date: { type: Date, default: Date.now },
  txHash: String // Add transaction hash field
});

const Payment = mongoose.model('Payment', paymentSchema);

// Middleware to check admin role
function isAdmin(req, res, next) {
  const token = req.headers.authorization.split(' ')[1];
  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    if (decoded.role === 'admin') {
      next();
    } else {
      res.status(403).send({ message: 'Forbidden' });
    }
  } catch (error) {
    res.status(401).send({ message: 'Unauthorized' });
  }
}

app.post('/create-payment-intent', async (req, res) => {
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

app.post('/save-payment', async (req, res) => {
  const { stock, amount, username } = req.body;
  console.log('Received data:', { stock, amount, username });
  const payment = new Payment({ stock, amount, username });
  try {
    // Simulate blockchain transaction logging
    const txHash = await logTransactionOnBlockchain({ stock, amount, username });
    payment.txHash = txHash;
    await payment.save();
    console.log('Payment details saved successfully', payment);
    res.status(200).send({ message: 'Payment saved successfully', txHash });
  } catch (error) {
    console.error('Error saving payment:', error);
    res.status(500).send({ message: 'Failed to save payment', error });
  }
});

// Simulated blockchain logging function
async function logTransactionOnBlockchain(payment) {
  // Simulate a transaction hash
  const txHash = '0x' + Math.floor(Math.random() * 1e16).toString(16);
  console.log('Simulated blockchain transaction hash:', txHash);
  return txHash;
}

// Admin route to fetch transactions
app.get('/transactions', isAdmin, async (req, res) => {
  try {
    const transactions = await Payment.find();
    res.send(transactions);
  } catch (error) {
    res.status(500).send({ message: 'Failed to fetch transactions', error });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
