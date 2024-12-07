const Joi = require('joi');

const questionValidation = {
  // Question Creation
  createQuestionSchema: Joi.object({
    questionText: Joi.string().min(10).max(1000).required(),
    questionType: Joi.string()
      .valid('MCQ', 'TRUE_FALSE', 'SHORT_ANSWER', 'FILL_IN_THE_BLANKS')
      .required(),
    difficulty: Joi.string().valid('easy', 'medium', 'hard').required(),
    timeLimit: Joi.number().integer().min(5).max(300).required(),
    correctAns: Joi.string().when('questionType', {
      is: Joi.string().valid('SHORT_ANSWER', 'FILL_IN_THE_BLANKS'),
      then: Joi.required()
    }),
    options: Joi.when('questionType', {
      is: Joi.string().valid('MCQ', 'TRUE_FALSE'),
      then: Joi.array().items(
        Joi.object({
          text: Joi.string().required(),
          isCorrect: Joi.boolean().required()
        })
      ).min(2).required()
    }),
    subtopicID: Joi.number()
  }),

  // Question Update
  updateQuestionSchema: Joi.object({
    questionText: Joi.string().min(10).max(1000),
    difficulty: Joi.string().valid('easy', 'medium', 'hard'),
    timeLimit: Joi.number().integer().min(5).max(300),
    correctAns: Joi.string(),
    options: Joi.array().items(
      Joi.object({
        text: Joi.string().required(),
        isCorrect: Joi.boolean().required()
      })
    ).min(2)
  }).min(1)
}; 