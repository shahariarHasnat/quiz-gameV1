const authMiddleware = require('./authMiddleware');
const { validate, validateParam } = require('./validationMiddleware');
const validateQuizStatus = require('./validateQuizStatus');
const errorHandler = require('./errorHandler');
const requestLogger = require('./requestLogger');

module.exports = {
  authMiddleware,
  validate,
  validateParam,
  validateQuizStatus,
  errorHandler,
  requestLogger
}; 