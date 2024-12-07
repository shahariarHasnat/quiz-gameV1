const express = require('express');
const router = express.Router();
const { sessionController } = require('../../controllers');
const { authMiddleware, validateSession } = require('../../middleware');

router.use(authMiddleware);

router.post('/', validateSession.create, sessionController.createSession);
router.get('/', sessionController.getSessions);
router.get('/:id', validateSession.getById, sessionController.getSession);
router.put('/:id', validateSession.update, sessionController.updateSession);
router.delete('/:id', validateSession.delete, sessionController.deleteSession);

// Session specific operations
router.post('/:id/join', validateSession.join, sessionController.joinSession);
router.post('/:id/start', validateSession.start, sessionController.startSession);
router.post('/:id/end', validateSession.end, sessionController.endSession);

module.exports = router;