const express = require('express');
const router = express.Router();
const { questionController } = require('../controllers');
const { authMiddleware } = require('../middleware');

router.post('/quiz/:quizId', 
    authMiddleware, 
    (req, res, next) => questionController.createQuestion(req, res, next)
);

router.get('/quiz/:quizId', 
    authMiddleware, 
    (req, res, next) => questionController.getQuizQuestions(req, res, next)
);

router.put('/:id', 
    authMiddleware, 
    (req, res, next) => questionController.updateQuestion(req, res, next)
);

router.delete('/:id', 
    authMiddleware, 
    (req, res, next) => questionController.deleteQuestion(req, res, next)
);

module.exports = router; 