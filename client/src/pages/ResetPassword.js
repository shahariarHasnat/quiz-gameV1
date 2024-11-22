import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './ResetPassword.css';  // Ensure correct CSS file name is used
import logo from './logo.png'; 


const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');  // 'weak', 'medium', 'strong', 'very-strong'
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const token = query.get('token');  // Extract the reset token from the URL

  // Password validation function based on the schema used in Signup
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/;
    return passwordRegex.test(password);
  };

  // Check password strength
  const checkPasswordStrength = (password) => {
    if (validatePassword(password)) {
      return 'very-strong';  // Alphanumeric + Symbol + Uppercase + Lowercase
    } else if (/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{6,})/.test(password)) {
      return 'strong';  // Alphanumeric
    } else if (/^(?=.*[a-zA-Z])(?=.{6,})/.test(password)) {
      return 'medium';  // Only alphabets
    } else {
      return 'weak';  // Less than 6 characters
    }
  };

  // Handle password change
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setNewPassword(value);

    const strength = checkPasswordStrength(value);
    setPasswordStrength(strength);

    // Check if password matches confirm password
    if (value === confirmPassword) {
      setIsPasswordMatch(true);
    } else {
      setIsPasswordMatch(false);
    }

    setIsFormValid(validatePassword(value) && value === confirmPassword);
  };

  // Handle confirm password change
  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);

    if (value === newPassword) {
      setIsPasswordMatch(true);
      setIsFormValid(validatePassword(newPassword) && value === newPassword);
    } else {
      setIsPasswordMatch(false);
    }
  };

  // Toggle password visibility
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`http://localhost:5000/user/reset-password?token=${token}`, { newPassword });

      if (response.status === 200) {
        setSuccessMessage(response.data.message || 'Password successfully updated!');
        setErrorMessage('');

        // Redirect to login page after success
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.message || 'Invalid or expired token.');
      } else {
        setErrorMessage('Failed to update password. Please try again.');
      }
      setSuccessMessage('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="reset-password-card">
      <img src={logo} alt="QuizMaster Logo" className="logo" />
      <h2>Set Your New Password</h2>

      <form onSubmit={handleSubmit}>
        <div className="password-input-wrapper">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter New Password"
            value={newPassword}
            onChange={handlePasswordChange}
            required
          />
          <button type="button" className="toggle-password-btn" onClick={toggleShowPassword}>
            {/* {showPassword ? 'Hide' : 'Show'} */}
          </button>
        </div>
        <div className={`password-strength ${passwordStrength}`}></div>  {/* Password strength indicator */}

        <div className="password-input-wrapper">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
          <button type="button" className="toggle-password-btn" onClick={toggleShowConfirmPassword}>
            {/* {showConfirmPassword ? 'Hide' : 'Show'} */}
          </button>
        </div>
        {!isPasswordMatch && <p className="error">Passwords do not match</p>}

        {/* Error and Success Messages */}
        {errorMessage && <p className="error">{errorMessage}</p>}
        {successMessage && <p className="success">{successMessage}</p>}

        <button type="submit" className="save-password-btn" disabled={!isFormValid || isLoading}>
          {isLoading ? 'Saving...' : 'Save New Password'}
        </button>
        <button className="return-btn" onClick={() => navigate('/login')}>
      ← Return
      </button>
      </form>
    </div>
  );
};

export default ResetPassword;
