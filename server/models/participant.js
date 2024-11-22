const { DataTypes } = require('sequelize');
const sequelize = require('../config/config'); // Correct import


const Participant = sequelize.define('Participant', {
  participantId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  sessionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, { timestamps: true });

module.exports = Participant;
