const Joi = require('joi');

const sessionValidation = {
  // Session Creation
  createSessionSchema: Joi.object({
    quizID: Joi.number().required(),
    maxParticipants: Joi.number().integer().min(1).max(1000)
  }),

  // Session Join
  joinSessionSchema: Joi.object({
    sessionCode: Joi.string().length(6).required()
  }),

  // Session Update
  updateSessionSchema: Joi.object({
    isActive: Joi.boolean(),
    maxParticipants: Joi.number().integer().min(1).max(1000)
  }).min(1)
}; 