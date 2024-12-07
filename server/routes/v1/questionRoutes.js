// routes/v1/questionRoutes.js

const express = require('express');
const router = express.Router();
const questionController = require('../../controllers/questionController');
const authMiddleware = require('../../middleware/authMiddleware');
const { validate } = require('../../middleware/validationMiddleware');
const {
  createQuestionSchema,
  updateQuestionSchema
} = require('../../validations/questionValidation');

router.use(authMiddleware);

// Search route before parameterized routes
router.get('/search', questionController.searchQuestions);

// Question CRUD operations
router.post('/', validate(createQuestionSchema), questionController.createQuestion);
router.get('/', questionController.getAllQuestions);
router.get('/:id', questionController.getQuestionById);
router.put('/:id', validate(updateQuestionSchema), questionController.updateQuestion);
router.delete('/:id', questionController.deleteQuestion);

// Quiz specific question routes
router.get('/quiz/:quizId', questionController.getQuizQuestions);
router.post('/quiz/:quizId', validate(createQuestionSchema), questionController.createQuestion);

module.exports = router;
