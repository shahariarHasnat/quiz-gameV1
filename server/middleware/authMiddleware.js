// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/jwtConfig'); // Import JWT secret

const authMiddleware = (req, res, next) => {
  //Check multiple possible token locations
  const token = 
    req.headers.authorization?.replace('Bearer ', '') ||
    req.query?.token ||
    req.body?.token ;  // If you're using cookie-parser middleware

  if (!token) {
    console.log('No token provided in request');
    return res.status(403).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    console.log('Token verified successfully:', decoded);

    req.user = {
      userId: decoded.id
    };
    
    next();
  } catch (err) {
    console.error('Token verification failed:', err.message);
    return res.status(401).json({ message: 'Failed to authenticate token' });
  }
};

module.exports = authMiddleware;
