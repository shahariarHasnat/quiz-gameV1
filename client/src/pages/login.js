
import './login.css';

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';  // Import axios for API calls
// import './Login.css';  // Add your CSS for styling
import logo from './logo.png';  

// const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;  // Use environment variable for base API URL

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();  // For redirect

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'email') {
      if (validateEmail(value)) {
        setEmailError('');
      } else {
        setEmailError('Please enter a valid email.');
      }
    }

    if (name === 'password' && value.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
    } else {
      setPasswordError('');
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Send the email and password to the server using axios
      const response = await axios.post(`http://localhost:5000/login`, {
        email: formData.email,
        password: formData.password,
      });

      // Store the token in localStorage for authorization purposes
      localStorage.setItem('token', response.data.token);

      //temp display in browser console
      console.log('signed token by server:', localStorage.getItem('token'));


      // Display success message and clear errors
      setSuccess('Login successful!');
      setError('');

      // Redirect the user to the dashboard or another protected route
      // navigate('/');
    } catch (err) {
      // Handle different server responses and display appropriate errors
      if (err.response && err.response.status === 401) {
        setError('Invalid email or password.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
      setSuccess('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-card">
      <img src={logo} alt="QuizMaster Logo" className="logo" />
      <h2>Log In to QuizMaster</h2>

      <button className="google-login-btn">
        <span>G</span> Log in with Google
      </button>

      <div className="divider">or</div>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Enter your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {emailError && <p className="error">{emailError}</p>}

        <input
          type="password"
          name="password"
          placeholder="Enter your Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {passwordError && <p className="error">{passwordError}</p>}

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <Link to="/forget-password" className="forgot-password-link">Forgot password?</Link>

        <button type="submit" className="login-btn" disabled={isLoading || emailError || passwordError}>
          {isLoading ? 'Logging in...' : 'Log in'}
        </button>
      </form>

      <p className="signup-prompt">
        Don’t have an account? <Link to="/register">Sign up</Link>
      </p>
    </div>
  );
};

export default Login;