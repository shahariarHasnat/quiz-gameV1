// middlewares/validationMiddleware.js
const Joi = require('joi');

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
      context: { user: req.user }
    });

    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path[0],
        message: detail.message
      }));

      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }

    req.validatedData = schema.validate(req.body, { stripUnknown: true }).value;
    next();
  };
};

module.exports = { validate };
  
