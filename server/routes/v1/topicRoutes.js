// routes/v1/topicRoutes.js

const express = require('express');
const router = express.Router();
const { topicController } = require('../../controllers');
const { authMiddleware, validateTopic } = require('../../middleware');

router.get('/', topicController.getAllTopics);
router.get('/:id', validateTopic.getById, topicController.getTopicById);

// Protected routes
router.use(authMiddleware);
router.post('/', validateTopic.create, topicController.createTopic);
router.put('/:id', validateTopic.update, topicController.updateTopic);
router.delete('/:id', validateTopic.delete, topicController.deleteTopic);

module.exports = router;
