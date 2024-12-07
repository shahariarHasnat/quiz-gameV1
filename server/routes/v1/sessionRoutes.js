const express = require('express');
const router = express.Router();
const sessionController = require('../../controllers/sessionController');
const authMiddleware = require('../../middleware/authMiddleware');
const { validate } = require('../../middleware/validationMiddleware');
const {
  createSessionSchema,
  joinSessionSchema
} = require('../../validations/sessionValidation');

router.use(authMiddleware);

// Session CRUD operations
router.post('/', validate(createSessionSchema), sessionController.createSession);
// router.get('/', sessionController.getSessions);
// router.get('/:id', sessionController.getSession);
// router.delete('/:id', sessionController.deleteSession);

// Session specific operations
router.post('/:id/join', validate(joinSessionSchema), sessionController.joinSession);
// router.put('/:id/start', sessionController.startSession);
// router.put('/:id/end', sessionController.endSession);

module.exports = router;