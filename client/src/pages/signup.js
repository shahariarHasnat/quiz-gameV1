
import './signup.css';

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import './Signup.css';  // Import your CSS for styling
import logo from './logo.png';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',  // Added username
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [emailError, setEmailError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(''); // 'weak', 'medium', 'strong', 'very strong'
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle input changes for form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Additional validation
    if (name === 'email') {
      if (validateEmail(value)) {
        setEmailError('');
      } else {
        setEmailError('Please enter a valid email.');
      }
    }

    if (name === 'password') {
      const strength = checkPasswordStrength(value);
      setPasswordStrength(strength);
    }

    if (name === 'confirmPassword') {
      setIsPasswordMatch(value === formData.password);
    }
  };

  // Check password strength
  const checkPasswordStrength = (password) => {
    if (/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(password)) {
      return 'very-strong'; // Alphanumeric + special character
    } else if (/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{6,})/.test(password)) {
      return 'strong'; // Alphanumeric
    } else if (/^(?=.*[a-zA-Z])(?=.{6,})/.test(password)) {
      return 'medium'; // Only alphabets
    } else {
      return 'weak'; // Less than 6 characters
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email) || formData.password.length < 8 || !isPasswordMatch) {
      setError('Please fix the form errors before submitting.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(`http://localhost:5000/user/register`, {
        username: formData.username,  // Added username in the request
        email: formData.email,
        password: formData.password
      });

      // Dynamic success message from the server
      setSuccess(response.data.message || 'Account successfully created! Check your email for verification.');
      setError('');

      // Optional: Log the registered user (response data)
      const newUser = response.data.user;
      console.log('New user registered:', newUser);

      // Redirect to verification or home page
      // navigate('/'); // Adjust as needed
    } catch (err) {
      setError(err.response?.data?.message || 'An unexpected error occurred.');
      setSuccess('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-card">
      <img src={logo} alt="QuizMaster Logo" className="logo" />
      <h2>Create your account</h2>

      <button className="google-login-btn">
        <span>G</span> Create with Google
      </button>

      <div className="divider">or</div>

      <form onSubmit={handleSubmit}>
        {/* Username input field */}
        <input
          type="text"
          name="username"
          placeholder="Enter your Username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        {/* Email input field */}
        <input
          type="email"
          name="email"
          placeholder="Enter your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {emailError && <p className="error">{emailError}</p>}

        {/* Password input field */}
        <input
          type="password"
          name="password"
          placeholder="Create Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <div className={`password-strength ${passwordStrength}`}> </div> {/* Add classes for password strength */}

        {/* Confirm Password input field */}
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        {!isPasswordMatch && <p className="error">Passwords do not match</p>}

        {/* Error and Success Messages */}
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <Link to="/forget-password" className="forgot-password-link">Forgot password?</Link>

        <button type="submit" className="continue-btn" disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Continue'}
        </button>
      </form>

      <p className="signup-prompt">
        Already have an account? <Link to="/login">Log in</Link>
      </p>

      <p className="terms">
        Our <Link to="/terms">Terms & Conditions</Link> and <Link to="/privacy">Privacy Policy</Link>
      </p>
    </div>
  );
};

export default Signup;
