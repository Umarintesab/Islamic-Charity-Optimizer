

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  // Validation Functions
  const validateName = (name) => {
    const nameRegex = /^[A-Za-z]+$/;
    return nameRegex.test(name);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const validateForm = () => {
    const newErrors = {};

    // First Name Validation
    if (!firstName) {
      newErrors.firstName = 'First name is required';
    } else if (!validateName(firstName)) {
      newErrors.firstName = 'First name must contain only letters (A-Z, a-z)';
    }

    // Last Name Validation
    if (!lastName) {
      newErrors.lastName = 'Last name is required';
    } else if (!validateName(lastName)) {
      newErrors.lastName = 'Last name must contain only letters (A-Z, a-z)';
    }

    // Email Validation
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid Gmail address (example@gmail.com)';
    }

    // Password Validation
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(password)) {
      newErrors.password = 'Password must be at least 8 characters with letters and numbers';
    }

    // Confirm Password Validation
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setErrors({});
    setSuccessMessage('');

    const result = await register(firstName, lastName, email, password, confirmPassword);
    
    if (result.success) {
      setSuccessMessage(result.message || 'Registration successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } else {
      setErrors({ submit: result.error });
      if (result.shouldRedirectToLogin) {
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    }
    setLoading(false);
  };

  return (
    <div className="card">
      <h2 className="card-title">Create Account</h2>
      <p style={{ color: '#a9b4d6', marginBottom: '1.5rem' }}>Join us to manage your Zakat</p>
      
      {errors.submit && <div className="error-message">{errors.submit}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>First Name <span style={{ color: '#ff4757' }}>*</span></label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                if (errors.firstName) setErrors({ ...errors, firstName: '' });
              }}
              className={errors.firstName ? 'error-input' : ''}
              placeholder=""
            />
            {errors.firstName && <span className="field-error">{errors.firstName}</span>}
          </div>
          
          <div className="form-group">
            <label>Last Name <span style={{ color: '#ff4757' }}>*</span></label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                if (errors.lastName) setErrors({ ...errors, lastName: '' });
              }}
              className={errors.lastName ? 'error-input' : ''}
              placeholder=""
            />
            {errors.lastName && <span className="field-error">{errors.lastName}</span>}
          </div>
        </div>
        
        <div className="form-group">
          <label>Email Address <span style={{ color: '#ff4757' }}>*</span></label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors({ ...errors, email: '' });
            }}
            className={errors.email ? 'error-input' : ''}
            placeholder=""
          />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Password <span style={{ color: '#ff4757' }}>*</span></label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors({ ...errors, password: '' });
                if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' });
              }}
              className={errors.password ? 'error-input' : ''}
              placeholder=""
            />
            {errors.password && <span className="field-error">{errors.password}</span>}
          </div>
          
          <div className="form-group">
            <label>Confirm Password <span style={{ color: '#ff4757' }}>*</span></label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' });
              }}
              className={errors.confirmPassword ? 'error-input' : ''}
              placeholder=""
            />
            {errors.confirmPassword && <span className="field-error">{errors.confirmPassword}</span>}
          </div>
        </div>
        
        <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%' }}>
          {loading ? 'Creating Account...' : 'Register'}
        </button>
      </form>
      
      <p style={{ marginTop: '1.5rem', textAlign: 'center', color: '#a9b4d6' }}>
        Already have an account? <Link to="/login" style={{ color: '#667eea' }}>Login here</Link>
      </p>
    </div>
  );
}

export default Register;