const express = require('express');
const router = express.Router();
const { sessionController } = require('../controllers');
const { authMiddleware } = require('../middleware');

// Session routes
router.post('/create', authMiddleware, sessionController.createSession);
router.post('/join', authMiddleware, sessionController.joinSession);
router.get('/:id', authMiddleware, sessionController.getSession);

module.exports = router;