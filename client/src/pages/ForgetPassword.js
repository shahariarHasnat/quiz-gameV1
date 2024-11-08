
import logo from './logo.png'; 
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ForgetPassword.css'; // Assuming you have a CSS file for styling
// const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // // Improved email validation function
  // const validateEmail = (email) => {
  //   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  //   return emailRegex.test(email);
  // };

// Strong email validation function
const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;
  return emailRegex.test(email);
};


  // Handle email change and clear error/success messages
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrorMessage('');  // Clear error on input change
    setSuccessMessage(''); // Clear success on input change
  };

  // Handle back to login navigation
  const handleBackToLogin = () => {
    navigate('/login'); // Navigate back to login page
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the email field is empty
    if (!email) {
      setErrorMessage('Please enter your email address.');
      return;
    }

    // Validate the email format
    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email.');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:5000/forget-password`, { email });

      if (response.data.success) {
        setSuccessMessage('A reset link has been sent to your email.');
        setErrorMessage('');
      }

      if (response.status === 200) {
        // Success response from the server
        setSuccessMessage(response.data.message || 'A reset link has been sent to your email.');
        setErrorMessage('');
      }


    } catch (error) {
      if (error.response && error.response.status === 404) {
        setErrorMessage('No account found with this email.');
        setSuccessMessage('');
      } else {
        setErrorMessage('Something went wrong, please try again.');
      }
    }
  };

  return (
    <div className="forgot-password-card">
      <button className="back-button" onClick={handleBackToLogin}>
        ← {/* Back icon */}
      </button>
      <img src={logo} alt="QuizMaster Logo" className="logo" />
      <h2>Forgot Your Password?</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your registered email address"
          value={email}
          onChange={handleEmailChange}
          required
        />
        {errorMessage && <p className="error">{errorMessage}</p>}
        {successMessage && <p className="success">{successMessage}</p>}

        <button type="submit" className="reset-link-btn" disabled={!email}>
          Send Reset Link
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;