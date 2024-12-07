// routes/v1/topicRoutes.js

const express = require('express');
const router = express.Router();
const topicController = require('../../controllers/topicController');
const authMiddleware = require('../../middleware/authMiddleware');
const { validate } = require('../../middleware/validationMiddleware');
const {
  createTopicSchema,
  updateTopicSchema
} = require('../../validations/topicValidation');

// Public routes
router.get('/', topicController.getAllTopics);
router.get('/:id', topicController.getTopicById);

// Protected routes
router.use(authMiddleware);
router.post('/', validate(createTopicSchema), topicController.createTopic);
router.put('/:id', validate(updateTopicSchema), topicController.updateTopic);
router.delete('/:id', topicController.deleteTopic);

module.exports = router;
