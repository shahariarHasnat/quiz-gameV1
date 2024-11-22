require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models'); // Import Sequelize instance from models/index.js
const userRoutes = require('./routes/v1/userRoutes'); // User-related routes

const app = express();

// CORS configuration
const corsOptions = {
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions)); // Apply CORS middleware

// Middleware to parse JSON requests
app.use(express.json());

// Register routes
app.use('/', userRoutes); // Example routes for user APIs

// Sync database and start the server
sequelize
  .authenticate() // Test database connection
  .then(() => {
    console.log('Database connection has been established successfully.');
    return sequelize.sync({ alter: true }); // Sync models with the database
  })
  .then(() => {
    console.log('All models were synchronized successfully.');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
    process.exit(1); // Exit process if database connection fails
  });
