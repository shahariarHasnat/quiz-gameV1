const Joi = require('joi');

const topicValidation = {
  // Topic Creation
  createTopicSchema: Joi.object({
    topicName: Joi.string().min(3).max(50).required()
  }),

  // Topic Update
  updateTopicSchema: Joi.object({
    topicName: Joi.string().min(3).max(50).required()
  })
}; 