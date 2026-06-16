import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  // LOGIN - Backend API Call
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setUser(response.data.user);
        setIsAuthenticated(true);
        return { success: true };
      }
      return { success: false, error: response.data.error };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Server error. Please try again.' };
    }
  };

  // REGISTER - Backend API Call
  const register = async (firstName, lastName, email, password, confirmPassword) => {
    if (password !== confirmPassword) {
      return { success: false, error: 'Passwords do not match', shouldRedirectToLogin: false };
    }
    
    try {
      const response = await axios.post(`${API_URL}/register`, {
        firstName, lastName, email, password
      });
      
      if (response.data.success) {
        return { 
          success: true, 
          message: response.data.message, 
          shouldRedirectToLogin: true 
        };
      }
      return { success: false, error: response.data.error };
    } catch (error) {
      console.error('Register error:', error);
      return { success: false, error: 'Server error. Please try again.' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};