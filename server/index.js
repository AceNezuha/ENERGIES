// server/index.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Mock data for stocks
const stocks = [
  { name: 'Tesla', symbol: 'TSLA', price: 700 },
  { name: 'NextEra Energy', symbol: 'NEE', price: 75 },
  { name: 'Enphase Energy', symbol: 'ENPH', price: 150 },
  { name: 'Brookfield Renewable Partners', symbol: 'BEP', price: 45 },
  // Add more stocks here
];

// Endpoint to get stocks
app.get('/api/stocks', (req, res) => {
  res.json(stocks);
});

// Endpoint to process investment
app.post('/api/invest', (req, res) => {
  const selectedStocks = req.body;
  // Process the investment logic here
  console.log('Investing in:', selectedStocks);
  res.json({ message: 'Investment successful' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
