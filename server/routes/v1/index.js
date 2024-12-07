const express = require('express');
const router = express.Router();

// Import routes
const userRoutes = require('./userRoutes');
const quizRoutes = require('./quizRoutes');
const questionRoutes = require('./questionRoutes');
const topicRoutes = require('./topicRoutes');
const subtopicRoutes = require('./subtopicRoutes');
const sessionRoutes = require('./sessionRoutes');

// Mount routes
router.use('/users', userRoutes);
router.use('/quizzes', quizRoutes);
router.use('/questions', questionRoutes);
router.use('/topics', topicRoutes);
router.use('/subtopics', subtopicRoutes);
router.use('/sessions', sessionRoutes);

module.exports = router; 