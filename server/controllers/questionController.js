// controllers/questionController.js

const { Question, Option, Quiz } = require('../models');

class QuestionController {
  // Get questions for a quiz
  async getQuizQuestions(req, res) {
    try {
      const { quizId } = req.params;
      
      const questions = await Question.findAll({
        where: { quizID: quizId },
        include: [Option],
        order: [['createdAt', 'ASC']]
      });

      res.json({
        success: true,
        data: questions
      });
    } catch (error) {
      console.error('Error fetching questions:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching questions'
      });
    }
  }

  // Create a question
  async createQuestion(req, res) {
    try {
      const { quizId } = req.params;
      const { questionText, questionType, options, difficulty, timeLimit } = req.body;

      // Verify quiz ownership
      const quiz = await Quiz.findOne({
        where: { 
          quizID: quizId,
          createdBy: req.user.userId
        }
      });

      if (!quiz) {
        return res.status(404).json({
          success: false,
          message: 'Quiz not found or unauthorized'
        });
      }

      // Create question
      const question = await Question.create({
        questionText,
        questionType,
        difficulty,
        timeLimit,
        quizID: quizId
      });

      // Create options if provided
      if (options && options.length > 0) {
        await Option.bulkCreate(
          options.map(opt => ({
            ...opt,
            questionID: question.questionID
          }))
        );
      }

      // Fetch the created question with its options
      const createdQuestion = await Question.findByPk(question.questionID, {
        include: [Option]
      });

      res.status(201).json({
        success: true,
        data: createdQuestion
      });
    } catch (error) {
      console.error('Error creating question:', error);
      res.status(500).json({
        success: false,
        message: 'Error creating question'
      });
    }
  }

  // Update a question
  async updateQuestion(req, res) {
    try {
      const { questionId } = req.params;
      const updates = req.body;

      const question = await Question.findOne({
        where: { questionID: questionId },
        include: [{
          model: Quiz,
          where: { createdBy: req.user.userId }
        }]
      });

      if (!question) {
        return res.status(404).json({
          success: false,
          message: 'Question not found or unauthorized'
        });
      }

      await question.update(updates);

      // Update options if provided
      if (updates.options) {
        await Option.destroy({ where: { questionID: questionId } });
        await Option.bulkCreate(
          updates.options.map(opt => ({
            ...opt,
            questionID: questionId
          }))
        );
      }

      // Fetch updated question with options
      const updatedQuestion = await Question.findByPk(questionId, {
        include: [Option]
      });

      res.json({
        success: true,
        data: updatedQuestion
      });
    } catch (error) {
      console.error('Error updating question:', error);
      res.status(500).json({
        success: false,
        message: 'Error updating question'
      });
    }
  }

  // Delete a question
  async deleteQuestion(req, res) {
    try {
      const { questionId } = req.params;

      const question = await Question.findOne({
        where: { questionID: questionId },
        include: [{
          model: Quiz,
          where: { createdBy: req.user.userId }
        }]
      });

      if (!question) {
        return res.status(404).json({
          success: false,
          message: 'Question not found or unauthorized'
        });
      }

      await question.destroy();

      res.json({
        success: true,
        message: 'Question deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting question:', error);
      res.status(500).json({
        success: false,
        message: 'Error deleting question'
      });
    }
  }
}

// Export a single instance
module.exports = new QuestionController();
