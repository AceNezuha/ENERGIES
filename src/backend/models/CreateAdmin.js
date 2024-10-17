const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('./user'); // Adjust the path based on your project structure
const db = require('../db'); // Adjust the path based on your project structure

async function createAdminUser() {
  try {
    // Wait for the database connection to be established
    await db;
    
    const hashedPassword = await bcrypt.hash('adminpassword', 10);
    const user = new User({
      name: 'AdminUser',
      email: 'admin@example.com',
      username: 'admin',
      password: hashedPassword,
      role: 'admin'
    });
    await user.save();
    console.log('Admin user created successfully');
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.connection.close(); // Close the connection after operation
  }
}

createAdminUser();
