const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const mongoose = require('mongoose');
const authRoutes = require('./auth');
const adminRoutes = require('./routes/admin');
const contactRoutes = require('./routes/contact');
const Payment = require('./models/payment'); // Import the Payment model

const app = express();
const port = process.env.PORT || 3000;

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    appName: "ENERGIES"
  })
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ CORS setup
const corsOptions = {
  origin: [
    'http://localhost:8080',
    'https://acenezuha.github.io' // Replace with your actual frontend GitHub Pages URL
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
