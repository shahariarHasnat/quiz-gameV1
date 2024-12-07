const Joi = require('joi');

const userValidation = {
  // User Registration
  registerSchema: Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/)
      .required()
  }),

  // User Login
  loginSchema: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }),

  // Password Management
  forgetPasswordSchema: Joi.object({
    email: Joi.string().email().required()
  }),

  resetPasswordSchema: Joi.object({
    token: Joi.string().required(),
    newPassword: Joi.string()
      .pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/)
      .required()
  }),

  // Profile Update
  updateProfileSchema: Joi.object({
    username: Joi.string().min(3).max(30),
    email: Joi.string().email()
  }).min(1)
}; 