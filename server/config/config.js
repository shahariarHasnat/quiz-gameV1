
require('dotenv').config(); // Load environment variables from .env

const { Sequelize } = require('sequelize');

// Validate environment variables is not empty
const requiredEnvVars = ['DB_NAME', 'DB_USER', 'DB_PASS', 'DB_HOST', 'DB_PORT', 'JWT_SECRET'];
requiredEnvVars.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`${key} is not set in the environment variables.`);
  }
});

// Sequelize database connection 
const sequelize = new Sequelize(
  process.env.DB_NAME, // Database name
  process.env.DB_USER, // Database username
  process.env.DB_PASS, // Database password
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: console.log, // Log SQL queries to the console
  }
);

// JWT secret configuration
const jwtSecret = process.env.JWT_SECRET;

// Export both the sequelize instance and JWT secret
module.exports = {
  sequelize,
  jwtSecret,
};
