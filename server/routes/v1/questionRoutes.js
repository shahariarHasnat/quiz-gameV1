// routes/v1/questionRoutes.js

const express = require('express');
const router = express.Router();
const { questionController } = require('../../controllers');
const { authMiddleware, validateQuestion } = require('../../middleware');

// All question routes require authentication
router.use(authMiddleware);

router.post('/', validateQuestion.create, questionController.createQuestion);
router.get('/', questionController.getAllQuestions);
router.get('/:id', validateQuestion.getById, questionController.getQuestionById);
router.put('/:id', validateQuestion.update, questionController.updateQuestion);
router.delete('/:id', validateQuestion.delete, questionController.deleteQuestion);

// Question search
router.get('/search', validateQuestion.search, questionController.searchQuestions);

module.exports = router;
