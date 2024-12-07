const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const { validate } = require('../middleware/validationMiddleware');
const {
  registerSchema,
  loginSchema,
  forgetPasswordSchema,
  resetPasswordSchema,
  updateProfileSchema
} = require('../validations/userValidation');

// Public routes
router.post('/register', validate(registerSchema), userController.register);
router.post('/login', validate(loginSchema), userController.login);
router.post('/forget-password', validate(forgetPasswordSchema), userController.forgetPassword);
router.post('/reset-password/:token', validate(resetPasswordSchema), userController.resetPassword);
router.post('/refresh-token', userController.refreshToken);

// Protected routes
router.use(authMiddleware);
router.post('/logout', userController.logout);
router.get('/profile', userController.getProfile);
router.put('/profile', validate(updateProfileSchema), userController.updateProfile);

module.exports = router;
