const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  secretKey: String,
  role: { type: String, default: 'user' },
  name: String,
  email: String,
  phone: String,
  firstName: String,
  lastName: String,
  bio: String,
  country: String,
  cityState: String,
  postalCode: Number,
  taxId: String,
  profilePicture: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
