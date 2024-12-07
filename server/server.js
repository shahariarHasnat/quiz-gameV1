require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const db = require('./models');
const sequelize = db.sequelize;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || '*',
    methods: ['GET', 'POST'],
    credentials: true
  },
  // transports: ['websocket'], // Use WebSocket only
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const routes = require('./routes');
app.use('/', routes);


// Socket handlers
socketHandlers(io);

// Database sync and server start
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
    return sequelize.sync({ alter: false }); // setting true will force drop and recreate all the tables
  })
  .then(() => {
    console.log('Database synchronized successfully.');
    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () =>
      console.log(`Server is running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
    process.exit(1);
  });
