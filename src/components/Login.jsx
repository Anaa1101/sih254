import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../App';
import { Shield, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useAppContext();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login process
    setTimeout(() => {
      setUser({
        id: 1,
        name: 'Government User',
        email: formData.email,
        role: 'admin'
      });
      setIsLoading(false);
      navigate('/dashboard');
    }, 1000);
  };

  const handleForgotPassword = () => {
    // Dummy forgot password functionality
    alert('Password reset link will be sent to your email address.');
  };

  return (
    <div className="login-page">
      <div className="login-background">
        <div className="login-pattern"></div>
      </div>
      
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="login-logo">
              <Shield className="logo-icon" />
              <h1>Government Portal</h1>
            </div>
            <p className="login-subtitle">
              Policy Search & Analysis Platform
            </p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <div className="input-wrapper">
                <Mail className="input-icon" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter your email address"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="input-wrapper">
                <Lock className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            <div className="form-options">
              <label className="checkbox-wrapper">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="checkbox-input"
                />
                <span className="checkbox-custom"></span>
                <span className="checkbox-label">Remember me</span>
              </label>

              <button
                type="button"
                className="forgot-password"
                onClick={handleForgotPassword}
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              className={`login-button ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="loading-spinner">
                  <div className="spinner"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="login-footer">
            <p>
              Secure access to government policy documents and AI-powered analysis tools.
            </p>
            <div className="security-badges">
              <span className="security-badge">
                <Shield className="badge-icon" />
                SSL Encrypted
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
