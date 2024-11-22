const sequelize = require('../config/config');
const Session = require('./session');
const Participant = require('./participant');
const User = require('./User'); 

// Relationships
User.hasMany(Session, { foreignKey: 'hostId', onDelete: 'CASCADE' });
Session.belongsTo(User, { foreignKey: 'hostId' });

User.hasMany(Participant, { foreignKey: 'userId', onDelete: 'CASCADE' });
Participant.belongsTo(User, { foreignKey: 'userId' });

Session.hasMany(Participant, { foreignKey: 'sessionId', onDelete: 'CASCADE' });
Participant.belongsTo(Session, { foreignKey: 'sessionId' });



// Sync Sequelize models with the database
sequelize
  .sync({ alter: true }) // Updates the schema if needed
  .then(() => console.log('All models were synchronized successfully.'))
  .catch((err) => console.error('Error synchronizing models:', err));

// Export models and Sequelize instance
module.exports = { sequelize, Session, Participant, User };
