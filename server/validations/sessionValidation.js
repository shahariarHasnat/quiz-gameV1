const Joi = require('joi');

const sessionValidation = {
  create: (req, res, next) => {
    const schema = Joi.object({
      quizId: Joi.number().required()
    });

    validateRequest(req, res, next, schema);
  },

  join: (req, res, next) => {
    const schema = Joi.object({
      sessionCode: Joi.string().length(6).required()
    });

    validateRequest(req, res, next, schema);
  }
};

const validateRequest = (req, res, next, schema) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message
    });
  }
  next();
};

module.exports = sessionValidation; 