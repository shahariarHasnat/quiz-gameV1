const express = require('express');
const router = express.Router();

// Import route files
const userRoutes = require('./v1/userRoutes');
const quizRoutes = require('./v1/quizRoutes');
const questionRoutes = require('./v1/questionRoutes');
const topicRoutes = require('./v1/topicRoutes');
const subtopicRoutes = require('./v1/subtopicRoutes');
const sessionRoutes = require('./v1/sessionRoutes');

// API routes
router.use('/users', userRoutes);
router.use('/quizzes', quizRoutes);
router.use('/questions', questionRoutes);
router.use('/topics', topicRoutes);
router.use('/subtopics', subtopicRoutes);
router.use('/sessions', sessionRoutes);

module.exports = router; 