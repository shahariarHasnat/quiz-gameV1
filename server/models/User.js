const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/config');  // Import Sequelize instance

// Define the User model
const User = sequelize.define('User', {
  userID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  resetPasswordToken: {
    type: DataTypes.STRING,
    allowNull: true
  },
  resetPasswordExpires: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  timestamps: true   // Automatically adds createdAt and updatedAt fields
});

module.exports = User;
