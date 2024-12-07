// server/routes/v1/quizRoutes.js

const express = require('express');
const router = express.Router();
const quizController = require('../../controllers/quizController');
const { 
  authMiddleware, 
  validate, 
  validateQuizStatus,
  requestLogger 
} = require('../../middleware');
const { 
  createQuizSchema,
  updateQuizSchema,
  quizModeSchema,
  quizStepSchema 
} = require('../../validations/quizValidation');

// Apply middleware to all routes
router.use(authMiddleware);
router.use(requestLogger);

// Search route (before parameterized routes)
router.get('/search', quizController.searchQuizzes);

// Quiz CRUD operations
router.post('/', validate(createQuizSchema), quizController.createQuiz);
router.get('/', quizController.getQuizzes);
router.get('/:id', quizController.getQuiz);
router.put('/:id', [validate(updateQuizSchema), validateQuizStatus], quizController.updateQuiz);
router.delete('/:id', validateQuizStatus, quizController.deleteQuiz);

// Quiz specific operations
router.post('/:id/questions', [validate(createQuestionSchema), validateQuizStatus], quizController.addQuestions);
router.put('/:id/mode', [validate(quizModeSchema), validateQuizStatus], quizController.updateQuizMode);
router.put('/:id/step', [validate(quizStepSchema), validateQuizStatus], quizController.updateQuizStep);

module.exports = router;
