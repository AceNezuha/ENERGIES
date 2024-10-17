const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 5001;

// Enable CORS
app.use(cors());
// Parse JSON bodies
app.use(express.json());

// Stock data API endpoint
const STOCK_API_URL = 'https://www.alphavantage.co';
const API_KEY = 'RTALXT42O7L081XR';

// Route to fetch stock data
app.get('/api/stocks', async (req, res) => {
  try {
    const response = await axios.get(STOCK_API_URL, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching stock data:', error);
    res.status(500).send('Error fetching stock data');
  }
});

// Route to handle investments (dummy implementation)
app.post('/api/invest', (req, res) => {
  // Your investment handling logic here
  res.send('Investment successful');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
