const userController = require('./userController');
const quizController = require('./quizController');
const sessionController = require('./sessionController');
const questionController = require('./questionController');

// Verify controllers exist
if (!userController || !quizController || !sessionController || !questionController) {
  throw new Error('Controllers not properly initialized');
}

module.exports = {
  userController,
  quizController,
  sessionController,
  questionController
}; 