// server/routes/v1/quizRoutes.js

const express = require('express');
const router = express.Router();
const quizController = require('../../controllers/quizController');
const authMiddleware = require('../../middleware/authMiddleware');
const { validate } = require('../../middleware/validationMiddleware');
const {
  createQuizSchema,
  updateQuizSchema,
  quizModeSchema,
  quizStepSchema
} = require('../../validations/quizValidation');

router.use(authMiddleware);

// Search route before parameterized routes
router.get('/search', quizController.searchQuizzes);

// Quiz CRUD operations
router.post('/', validate(createQuizSchema), quizController.createQuiz);
router.get('/', quizController.getQuizzes);
router.get('/:id', quizController.getQuiz);
router.put('/:id', validate(updateQuizSchema), quizController.updateQuiz);
router.delete('/:id', quizController.deleteQuiz);

// Quiz specific operations
router.post('/:id/questions', validate(createQuestionSchema), quizController.addQuestions);
router.put('/:id/mode', validate(quizModeSchema), quizController.updateQuizMode);
router.put('/:id/step', validate(quizStepSchema), quizController.updateQuizStep);
router.post('/:id/start', quizController.startQuiz);

module.exports = router;
