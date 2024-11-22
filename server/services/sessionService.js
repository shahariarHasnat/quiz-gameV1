const { Session, Participant } = require('../models');
const generateCode = require('../utils/generateCode');

const createSession = async (hostId) => {
  const sessionCode = generateCode();
  const session = await Session.create({ hostId, sessionCode });
  await Participant.create({ sessionId: session.sessionId, userId: hostId });
  return session;
};

const joinSession = async (sessionCode, userId) => {
  const session = await Session.findOne({ where: { sessionCode, isActive: true } });
  if (!session) throw new Error('Invalid or inactive session');

  const participantExists = await Participant.findOne({ where: { sessionId: session.sessionId, userId } });
  if (participantExists) throw new Error('User already joined');

  await Participant.create({ sessionId: session.sessionId, userId });
  return session;
};

module.exports = { createSession, joinSession };