const express = require('express');
const cors = require('cors');
const db = require('./db');
const mongoose = require('mongoose');
const path = require('path');
const authRoutes = require('./auth');
const Payment = require('./models/payment'); // Import the Payment model
const adminRoutes = require('./routes/admin');
const contactRoutes = require('./routes/contact'); // Import the contact routes

const app = express();
const port = 3000;

// Configure CORS options
const corsOptions = {
  origin: 'http://localhost:8080', // Replace with your frontend's URL
  optionsSuccessStatus: 200,
  credentials: true
};

// Use CORS with the configured options
app.use(cors(corsOptions));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/contact', contactRoutes);

// Route to get user-specific transactions
app.get('/transactions/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const transactions = await Payment.find({ username }).sort({ date: -1 }).limit(10);
    res.json(transactions);
  } catch (error) {
    res.status(500).send({ message: 'Failed to fetch transactions', error });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
