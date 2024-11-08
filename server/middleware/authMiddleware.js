// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/config');  // JWT secret

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Failed to authenticate token' });
    }

    req.userID = decoded.userID;
    next();
  });
};

module.exports = authMiddleware;
