const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const User = require('./models/user');

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, 'profilePicture-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const token = jwt.sign({ id: user._id, username: user.username, role: user.role }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

router.post('/signup', async (req, res) => {
  const { name, email, username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const secretKey = crypto.randomBytes(20).toString('hex'); // Generate a random secret key
    const user = new User({
      name,
      email,
      username,
      password: hashedPassword,
      secretKey
    });
    await user.save();
    res.status(201).json({ message: 'User registered successfully', secretKey });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

router.post('/forgot-password', async (req, res) => {
  const { email, secretKey, newPassword } = req.body;
  try {
    const user = await User.findOne({ email, secretKey });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or secret key' });
    }
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

router.get('/profile', async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    const user = await User.findById(decoded.id, '-password'); // Exclude password field
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized', error });
  }
});

router.put('/profile', async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const { name, firstName, lastName, email, username, phone, bio, country, cityState, postalCode, taxId } = req.body;
  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user information
    user.name = name || user.name;
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.username = username || user.username;
    user.phone = phone || user.phone;
    user.bio = bio || user.bio;
    user.country = country || user.country;
    user.cityState = cityState || user.cityState;
    user.postalCode = postalCode || user.postalCode;
    user.taxId = taxId || user.taxId;

    await user.save();
    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized', error });
  }
});

router.post('/uploadProfilePicture', upload.single('profilePicture'), async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.profilePicture = `/uploads/${req.file.filename}`;
    await user.save();
    res.json({ message: 'Profile picture uploaded successfully', profilePicture: user.profilePicture });
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized', error });
  }
});

module.exports = router;
