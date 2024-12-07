// server/routes/v1/quizRoutes.js

const express = require('express');
const router = express.Router();
const { quizController } = require('../controllers');
const { authMiddleware } = require('../middleware');

// Quiz routes
router.get('/', authMiddleware, quizController.getQuizzes);
router.post('/', authMiddleware, quizController.createQuiz);
router.get('/:id', authMiddleware, quizController.getQuiz);
router.put('/:id', authMiddleware, quizController.updateQuiz);
router.delete('/:id', authMiddleware, quizController.deleteQuiz);

module.exports = router;
