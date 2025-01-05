import axios from 'axios';

// API base URL
const API_URL = 'http://localhost:4000/api/users';

// Sign Up request
export const signUp = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/createUser`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

// Sign In request
export const signIn = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/signInUser`, credentials);
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

// Get user by ID
export const getUserById = async (userId, token) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};
