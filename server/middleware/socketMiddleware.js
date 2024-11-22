const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwtConfig');

const socketAuthMiddleware = (socket, next) => {
  const token = socket.handshake.query.token;

  if (!token) return next(new Error('Authentication error'));

  jwt.verify(token, secret, (err, user) => {
    if (err) return next(new Error('Authentication error'));

    socket.user = user;
    next();
  });
};

module.exports = socketAuthMiddleware;