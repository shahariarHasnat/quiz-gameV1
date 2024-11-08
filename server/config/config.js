require('dotenv').config({ path: './.env' }); // Explicitly specify path

const { Sequelize } = require('sequelize');

// Initialize Sequelize with environment variables
const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASS, 
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false
  }
);

const jwtSecret = process.env.JWT_SECRET;

module.exports = {
  sequelize,
  jwtSecret
};

