// routes/v1/subtopicRoutes.js

const express = require('express');
const router = express.Router();
const subtopicController = require('../../controllers/subtopicController');
const authMiddleware = require('../../middleware/authMiddleware');

router.get('/topic/:topicID', subtopicController.getSubtopicsByTopicID);
router.get('/:id', subtopicController.getSubtopicById);

// Protected routes
router.use(authMiddleware);
router.post('/', subtopicController.createSubtopic);
router.put('/:id', subtopicController.updateSubtopic);
router.delete('/:id', subtopicController.deleteSubtopic);

module.exports = router;
