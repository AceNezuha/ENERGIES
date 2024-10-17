const mongoose = require('mongoose');

// URL-encoded password
mongoose.connect('mongodb+srv://password:DB_ID.e674w9c.mongodb.net/sample_mflix?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  appName: 'RenewableEnergyPlatform' // Optional: specify your app name
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Connection error:', err));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
  console.log('MongoDB connected successfully');
});

module.exports = db;
