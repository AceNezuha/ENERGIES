require('dotenv').config(); // Load environment variables

const jwt = require('jsonwebtoken');
const User = require('./models/user');

const isAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use env variable
    const user = await User.findById(decoded.id);

    if (user && user.role === 'admin') {
      req.user = user;
      next();
    } else {
      res.status(403).json({ message: 'Forbidden' });
    }
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized', error });
  }
};

module.exports = { isAdmin };
