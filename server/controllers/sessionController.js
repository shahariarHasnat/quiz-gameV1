const sessionService = require('../services/sessionService');
const Quiz = require('../models/quiz');

const createSession = async (req, res) => {
  try {
    const { userId } = req.user;
    const { quizId } = req.body;

    // Validate request body
    if (!quizId) {
      return res.status(400).json({ error: 'quizId is required' });
    }

    // Check if quiz exists and is valid
    const quiz = await Quiz.findOne({ 
      where: { 
        quizID: quizId,
        status: 'ready' // Only allow creating sessions for ready quizzes
      } 
    });

    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found or not ready' });
    }

    const session = await sessionService.createSession(userId, quizId);
    res.status(201).json({ sessionCode: session.sessionCode });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const joinSession = async (req, res) => {
  try {
    const { sessionCode } = req.body;
    const { userId } = req.user;
    await sessionService.joinSession(sessionCode, userId);
    res.status(200).json({ message: 'Successfully joined the session' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { createSession, joinSession };