const sequelize = require('../config/config'); // Now correctly imports the Sequelize instance
const Session = require('./session');
const Participant = require('./participant');
const User = require('./user');

// Define relationships
User.hasMany(Session, { foreignKey: 'hostId', onDelete: 'CASCADE' });
Session.belongsTo(User, { foreignKey: 'hostId' });

User.hasMany(Participant, { foreignKey: 'userId', onDelete: 'CASCADE' });
Participant.belongsTo(User, { foreignKey: 'userId' });

Session.hasMany(Participant, { foreignKey: 'sessionId', onDelete: 'CASCADE' });
Participant.belongsTo(Session, { foreignKey: 'sessionId' });

// Export models and Sequelize instance
module.exports = { sequelize, Session, Participant, User };
