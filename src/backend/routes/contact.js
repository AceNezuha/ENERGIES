const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

// POST route to handle contact form submissions
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.status(200).json({ message: 'Contact form submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while submitting the form' });
  }
});

// GET route to fetch contact form submissions for admin
router.get('/messages', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ date: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching contact forms' });
  }
});

module.exports = router;
