const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const Session = sequelize.define('Session', {
  sessionId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  sessionCode: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  hostId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, { timestamps: true });

module.exports = Session;
