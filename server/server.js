
import dotenv from 'dotenv';
dotenv.config();  // Load environment variables

const express = require('express');
const { sequelize } = require('./config/config');  // Import Sequelize instance
const userRoutes = require('./routes/v1/userRoutes');
const app = express();

const cors = require('cors');
    const corsOptions = {
    origin: "http://localhost:3000",
    };

app.use(cors(corsOptions));
app.use(express.json());
app.use('/', userRoutes);

sequelize.sync()
  .then(() => {
    console.log('Database synced');
    const PORT = 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => console.log('Error syncing database:', err));

