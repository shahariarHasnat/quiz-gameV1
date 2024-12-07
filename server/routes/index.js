const express = require('express');
const router = express.Router();

// Import routes
const quizRoutes = require('./quizRoutes');
const userRoutes = require('./userRoutes');
const sessionRoutes = require('./sessionRoutes');
const questionRoutes = require('./questionRoutes');

// Mount routes
router.use('/quizzes', quizRoutes);
router.use('/users', userRoutes);
router.use('/sessions', sessionRoutes);
router.use('/questions', questionRoutes);

module.exports = router; 