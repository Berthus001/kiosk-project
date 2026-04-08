import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { validateSignupForm } from '../utils/validation';
import '../styles/signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    setSuccessMessage('');

    // Validate form
    const validation = validateSignupForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      // Send signup data to backend
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle backend errors
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setApiError(data.message || 'Signup failed. Please try again.');
        }
        setLoading(false);
        return;
      }

      // Success
      setSuccessMessage('Signup successful! Redirecting to login...');
      setFormData({ name: '', email: '', password: '' });

      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      console.error('Signup error:', error);
      setApiError('Network error. Please try again later.');
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-wrapper">
        <div className="signup-header">
          <h1>🏪 Create Account</h1>
          <p>Join our kiosk system</p>
        </div>

        {successMessage && (
          <div className="success-message">
            ✓ {successMessage}
          </div>
        )}

        {apiError && (
          <div className="error-alert">
            ✕ {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              disabled={loading}
              className={errors.name ? 'input-error' : ''}
            />
            {errors.name && (
              <span className="field-error">{errors.name}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && (
              <span className="field-error">{errors.email}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter password (min. 6 characters)"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
              className={errors.password ? 'input-error' : ''}
            />
            {errors.password && (
              <span className="field-error">{errors.password}</span>
            )}
          </div>

          <button
            type="submit"
            className="signup-btn"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div className="signup-footer">
          <p>Already have an account?</p>
          <Link to="/login" className="login-link">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
