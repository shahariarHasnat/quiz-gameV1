const { Session, Participant } = require('../models');
const generateCode = require('../utils/generateCode');

const createSession = async (hostId, quizId) => {
  // Generate a 6-character alphanumeric code
  const sessionCode = generateCode().slice(0, 6);
  
  const session = await Session.create({ 
    hostID: hostId, 
    quizID: quizId,
    sessionCode,
    isActive: true
  });

  // Create initial participant record for the host
  await Participant.create({ 
    sessionID: session.sessionID, 
    userID: hostId,
    status: 'approved' // Host is automatically approved
  });

  return session;
};

const joinSession = async (sessionCode, userId) => {
  const session = await Session.findOne({ where: { sessionCode, isActive: true } });
  if (!session) throw new Error('Invalid or inactive session');

  const participantExists = await Participant.findOne({ where: { sessionID: session.sessionID, userID } });
  if (participantExists) throw new Error('User already joined');

  await Participant.create({ sessionID: session.sessionID, userID });
  return session;
};

module.exports = { createSession, joinSession };