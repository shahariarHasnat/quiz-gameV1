// server/routes/v1/quizRoutes.js

const express = require('express');
const router = express.Router();
const { quizController } = require('../../controllers');
const { authMiddleware, validateQuiz, validateQuizStatus } = require('../../middleware');

// All quiz routes require authentication
router.use(authMiddleware);

// Quiz CRUD operations
router.post('/', validateQuiz.create, quizController.createQuiz);
router.get('/', quizController.getQuizzes);
router.get('/:id', validateQuiz.getById, quizController.getQuiz);
router.put('/:id', [validateQuiz.update, validateQuizStatus], quizController.updateQuiz);
router.delete('/:id', validateQuiz.delete, quizController.deleteQuiz);

// Quiz specific operations
router.post('/:id/questions', validateQuiz.addQuestions, quizController.addQuestions);
router.put('/:id/mode', validateQuiz.updateMode, quizController.updateQuizMode);
router.put('/:id/step', validateQuiz.updateStep, quizController.updateQuizStep);
router.post('/:id/start', validateQuiz.start, quizController.startQuiz);

module.exports = router;
