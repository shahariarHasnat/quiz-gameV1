import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', 
});

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/register', userData);
    return response.data;  // Ensure you're returning the `data` field from the response
  } catch (error) {
    // Handle errors properly, for example, if there's no response from the backend
    if (error.response) {
      throw new Error(error.response.data.message || 'An error occurred while registering');
    } else {
      throw new Error('Server error or no response from the backend');
    }
  }
};

// Login User
export const loginUser = async (userData) => {
  try {
    const response = await api.post('/login', userData);
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

// Forget Password
export const forgetPassword = async (email) => {
  try {
    const response = await api.post('/forget-password', { email });
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

// Reset Password
export const resetPassword = async (token, newPassword) => {
  try {
    const response = await api.post(`/reset-password?token=${token}`, { newPassword });
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};
