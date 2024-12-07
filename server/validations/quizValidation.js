const Joi = require('joi');

const quizValidation = {
  // Quiz Creation
  createQuizSchema: Joi.object({
    quizName: Joi.string().min(3).max(255).required(),
    description: Joi.string().min(10).max(1000).required(),
    visibility: Joi.string().valid('private', 'public').required(),
    maxParticipants: Joi.number().integer().min(1).max(1000),
    topicID: Joi.number().required(),
    startAt: Joi.date().greater('now').required(),
    questionMode: Joi.string().valid('manual', 'ai')
  }),

  // Quiz Update
  updateQuizSchema: Joi.object({
    quizName: Joi.string().min(3).max(255),
    description: Joi.string().min(10).max(1000),
    visibility: Joi.string().valid('private', 'public'),
    maxParticipants: Joi.number().integer().min(1).max(1000),
    startAt: Joi.date().greater('now'),
    status: Joi.string().valid('draft', 'ready')
  }).min(1),

  // Quiz Mode Update
  quizModeSchema: Joi.object({
    mode: Joi.string().valid('manual', 'ai').required()
  }),

  // Quiz Step Update
  quizStepSchema: Joi.object({
    step: Joi.string()
      .valid('initial', 'mode_selected', 'questions_added')
      .required()
  })
}; 