const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { User } = require('../models');
const jwtSecret = require('../config/jwtConfig'); // Import JWT secret
const { sendPasswordResetEmail } = require('../utils/email');
const { Op } = require('sequelize');

// Registration
exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, email, password: hashedPassword });
    res.status(201).json({
      success: true,
      message: 'User registered successfully.',
      user: { userID, username, email, createdAt, updatedAt },
    });
  } catch (error) {
  console.error('Error registering user:', error);
  res.status(500).json({ success: false, message: 'Internal server error.' });
}


// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    // Generate both tokens
    const { accessToken, refreshToken } = generateTokens(user);

    // Store refresh token in database
    await user.update({ refreshToken });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user.userID,
          username: user.username,
          email: user.email
        },
        accessToken,
        refreshToken
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error logging in' 
    });
  }
};

// Refresh Token endpoint
exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ 
      success: false, 
      message: 'Refresh token is required' 
    });
  }

  try {
    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    
    // Find user with this refresh token
    const user = await User.findOne({ 
      where: { 
        userID: decoded.id,
        refreshToken 
      }
    });

    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid refresh token' 
      });
    }

    // Generate new tokens
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } = generateTokens(user);

    // Update refresh token in database
    await user.update({ refreshToken: newRefreshToken });

    res.status(200).json({
      success: true,
      data: {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
      }
    });
  } catch (error) {
    console.error('Refresh token error:', error);
    res.status(401).json({ 
      success: false, 
      message: 'Invalid refresh token' 
    });
  }
};

// Logout endpoint
exports.logout = async (req, res) => {
  try {
    const { userId } = req.user;
    
    // Clear refresh token in database
    await User.update(
      { refreshToken: null },
      { where: { userID: userId } }
    );

    res.status(200).json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Error logging out'
    });
  }
};

// Forget Password (Initiate Reset)
exports.forgetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Email not found' });
    }
  
    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetExpires = Date.now() + 3600000;  // 1 hour
  
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetExpires;
    await user.save();
  
    await sendPasswordResetEmail(user.email, resetToken);
    res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending reset email', error });
  }
};
  
// Reset Password (Complete Reset)
exports.resetPassword = async (req, res) => {
  const { newPassword } = req.body;
  const token = req.query.token; // Extract token from query string
  
  try {
    if (!token) {
      return res.status(400).json({ message: 'Token is required' });
    }
  
    const user = await User.findOne({ 
      where: { 
        resetPasswordToken: token, 
        resetPasswordExpires: { [Op.gt]: Date.now() } 
      } 
    });
  
    if (!user) {
      return res.status(400).json({ message: 'Token is invalid or has expired' });
    }
  
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();
  
    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ message: 'Error resetting password', error });
  }
};
  
const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { id: user.userID },
    process.env.JWT_SECRET,
    { expiresIn: '15m' } // Short lived access token
  );

  const refreshToken = jwt.sign(
    { id: user.userID },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' } // Longer lived refresh token
  );

  return { accessToken, refreshToken };
};
  