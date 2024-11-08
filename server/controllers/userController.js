const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const { jwtSecret } = require('../config/config');
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
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};


// try {
//     // Send the email and password to the server using axios
//     const response = await axios.post(`http://localhost:5000/login`, {
//       email: formData.email,
//       password: formData.password,
//     });
  
//     // Store the token in localStorage for authorization purposes
//     localStorage.setItem('token', response.data.token);
  
//     //temp display in browser console
//     console.log('signed token by server:', localStorage.getItem('token'));
  
//     // Display success message and clear errors
//     setSuccess('Login successful!');
//     setError('');
  
//     // Redirect the user to the dashboard or another protected route
//     navigate('/dashboard');
//   } catch (err) {
//     // Handle different server responses and display appropriate errors
//     if (err.response && err.response.status === 401) {
//       setError(err.response.data.message);  // Display specific error message from server
//     } else if (err.response && err.response.status === 500) {
//       setError('Server error. Please try again later.');
//       console.error('Server error:', err.response.data.error);  // Log the actual server error
//     } else {
//       setError('An unexpected error occurred. Please try again.');
//     }
//     setSuccess('');
//   } finally {
//     setIsLoading(false);
//   }
  

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if the user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, { expiresIn: '1h' });

    // Respond with the token
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
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
  