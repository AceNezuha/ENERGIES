const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

require('./db'); // ✅ MongoDB connection

const authRoutes = require('./auth');
const adminRoutes = require('./routes/admin');
const contactRoutes = require('./routes/contact');
const Payment = require('./models/payment');

const app = express();
const port = process.env.PORT || 3000;

// ✅ CORS setup
const corsOptions = {
  origin: [
    'http://localhost:8080',
    'https://acenezuha.github.io' // ✅ allow GitHub Pages frontend
  ],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

// ✅ Routes
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/contact', contactRoutes);

// ✅ Transaction route
app.get('/transactions/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const transactions = await Payment.find({ username }).sort({ date: -1 }).limit(10);
    res.json(transactions);
  } catch (error) {
    res.status(500).send({ message: 'Failed to fetch transactions', error });
  }
});

// ✅ Root health check
app.get('/', (req, res) => {
  res.send('🚀 Energies backend is up and running!');
});

// ✅ Start server
app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
