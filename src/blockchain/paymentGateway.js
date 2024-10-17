const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { createHash } = require('crypto');

const app = express();
const port = 5002;

app.use(cors());
app.use(bodyParser.json());

// Simulated blockchain transactions
let blockchain = [];

const createTransaction = (stock, amount) => {
  const timestamp = new Date().toISOString();
  const transaction = {
    stock,
    amount,
    timestamp,
    hash: createHash('sha256')
      .update(JSON.stringify({ stock, amount, timestamp }))
      .digest('hex'),
  };
  blockchain.push(transaction);
  return transaction;
};

app.post('/api/pay', (req, res) => {
  const { stock, amount, paymentMethod } = req.body;

  // Simulate payment processing
  if (paymentMethod !== 'fpx') {
    return res.status(400).json({ message: 'Unsupported payment method' });
  }

  // Create blockchain transaction
  const transaction = createTransaction(stock, amount);

  res.json({
    message: 'Payment successful',
    transaction,
  });
});

app.get('/api/transactions', (req, res) => {
  res.json(blockchain);
});

app.listen(port, () => {
  console.log(`Payment server is running on http://localhost:${port}`);
});
