import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
  faUser,
  faUserTie,
  faShieldAlt,
  faExclamationTriangle,
  faBuilding,
  faCompass
} from '@fortawesome/free-solid-svg-icons';
import '../App.css';

export function Auth({ onLoginSuccess }) {
  const [view, setView] = useState('login'); // 'login', 'signup', 'forgot', 'reset'
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, getValues, formState: { errors } } = useForm();

  // Mock user database with different roles
  const USERS = [
    // Admin Users
    {
      id: 1,
      email: 'superadmin@airkulty.com',
      password: 'Admin@123',
      role: 'super_admin',
      name: 'Super Admin',
      avatar: '/src/assets/admin1.jpg'
    },
    {
      id: 2,
      email: 'admin@airkulty.com',
      password: 'Admin@123',
      role: 'admin',
      name: 'Admin User',
      avatar: '/src/assets/admin2.jpg'
    },
    {
      id: 3,
      email: 'manager@airkulty.com',
      password: 'Manager@123',
      role: 'manager',
      name: 'Operations Manager',
      avatar: '/src/assets/manager.jpg'
    },

    // Agent Users
    {
      id: 4,
      email: 'agent@airkulty.com',
      password: 'Agent@123',
      role: 'agent',
      name: 'Travel Agent',
      company: 'Tanzania Travels',
      commission: 15,
      avatar: '/src/assets/agent1.jpg'
    },
    {
      id: 5,
      email: 'safari@agent.com',
      password: 'Safari@123',
      role: 'agent',
      name: 'Safari Experts',
      company: 'Safari Experts Ltd',
      commission: 12,
      avatar: '/src/assets/agent2.jpg'
    },

    // Service Providers
    {
      id: 6,
      email: 'hotel@zanzibar.com',
      password: 'Hotel@123',
      role: 'provider',
      providerType: 'hotel',
      name: 'Zanzibar Resort',
      company: 'Zanzibar Beach Resorts',
      avatar: '/src/assets/provider1.jpg'
    },
    {
      id: 7,
      email: 'cars@kilimanjaro.com',
      password: 'Cars@123',
      role: 'provider',
      providerType: 'car',
      name: 'Kilimanjaro Cars',
      company: 'Kilimanjaro Car Rentals',
      avatar: '/src/assets/provider2.jpg'
    },

    // Tour Guides
    {
      id: 8,
      email: 'joseph@guide.com',
      password: 'Guide@123',
      role: 'guide',
      name: 'Joseph Maasai',
      experience: '12 years',
      languages: ['English', 'Swahili', 'Maa'],
      rating: 4.9,
      avatar: '/src/assets/guide1.jpg'
    },
    {
      id: 9,
      email: 'emma@guide.com',
      password: 'Guide@123',
      role: 'guide',
      name: 'Emma Thompson',
      experience: '8 years',
      languages: ['English', 'French'],
      rating: 4.8,
      avatar: '/src/assets/guide2.jpg'
    },

    // Regular Customers
    {
      id: 10,
      email: 'john@example.com',
      password: 'John@123',
      role: 'customer',
      name: 'John Doe',
      phone: '+255 712 345 678',
      membership: 'gold',
      avatar: '/src/assets/customer1.jpg'
    },
    {
      id: 11,
      email: 'sarah@example.com',
      password: 'Sarah@123',
      role: 'customer',
      name: 'Sarah Johnson',
      phone: '+255 723 456 789',
      membership: 'silver',
      avatar: '/src/assets/customer2.jpg'
    },
    {
      id: 12,
      email: 'michael@example.com',
      password: 'Michael@123',
      role: 'customer',
      name: 'Michael Chen',
      phone: '+255 734 567 890',
      membership: 'platinum',
      avatar: '/src/assets/customer3.jpg'
    }
  ];

  const onSubmit = (data) => {
    setServerError('');
    setLoading(true);

    setTimeout(() => {
      const user = USERS.find(
        u => u.email.toLowerCase() === data.email.toLowerCase() && u.password === data.password
      );
      if (user) {
        onLoginSuccess(user);
      } else {
        setServerError('Invalid email or password');
      }
      setLoading(false);
    }, 1000);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      // In production, this would send data to your backend
      alert('Account created successfully! Please check your email to verify your account.');
      setView('login');
      setLoading(false);
    }, 1000);
  };

  const handleForgotPassword = () => {
    const email = getValues('email');
    if (!email) {
      setServerError('Please enter your email address first.');
      return;
    }
    setLoading(true);

    setTimeout(() => {
      alert(`Password reset link has been sent to ${email}`);
      setView('login');
      setLoading(false);
    }, 1000);
  };

  const getRoleIcon = (role) => {
    switch(role) {
      case 'super_admin':
      case 'admin':
      case 'manager':
        return faShieldAlt;
      case 'agent':
        return faUserTie;
      case 'provider':
        return faBuilding;
      case 'guide':
        return faCompass;
      default:
        return faUser;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="auth-container"
    >
      <div className="auth-card">
        <AnimatePresence mode="wait">

          {/* --- LOGIN VIEW --- */}
          {view === 'login' && (
            <motion.form
              key="login"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onSubmit={handleSubmit(onSubmit)}
              className="auth-form"
            >
              <div className="auth-header">
                <div className="logo-wrapper">
                  <span className="logo-icon">✈️</span>
                  <span className="logo-text">AirKulty</span>
                </div>
                <h2>Welcome Back</h2>
                <p className="subtitle">Sign in to your account</p>
              </div>

              {serverError && (
                <div className="auth-error">
                  <span>{serverError}</span>
                </div>
              )}

              <div className="input-group">
                <label><FontAwesomeIcon icon={faEnvelope} /> Email</label>
                <input
                  type="email"
                  {...register('email', { required: 'Email is required' })}
                  placeholder="Enter your email"
                  disabled={loading}
                />
                {errors.email && <span className="field-error">{errors.email.message}</span>}
              </div>

              <div className="input-group">
                <label><FontAwesomeIcon icon={faLock} /> Password</label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    {...register('password', { required: 'Password is required' })}
                    placeholder="Enter your password"
                    disabled={loading}
                  />
                  <button type="button" className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </button>
                </div>
                {errors.password && <span className="field-error">{errors.password.message}</span>}
              </div>

              <button type="submit" className="auth-btn" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In'}
              </button>

              <p className="toggle-auth" onClick={() => setView('signup')}>
                Don't have an account? <strong>Sign Up</strong>
              </p>
            </motion.form>
          )}

        {/* --- SIGNUP VIEW --- */}
        {view === 'signup' && (
          <motion.form
            key="signup"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            onSubmit={handleSignup}
          >
            <div className="auth-header">
              <div className="logo-wrapper">
                <span className="logo-icon">✈️</span>
                <span className="logo-text">AirKulty</span>
              </div>
              <h2>Create Account</h2>
              <p className="subtitle">Join AirKulty today</p>
            </div>

            <div className="input-group">
              <label>Full Name</label>
              <input type="text" placeholder="John Doe" required disabled={loading} />
            </div>

            <div className="input-group">
              <label>Email Address</label>
              <input type="email" placeholder="john@example.com" required disabled={loading} />
            </div>

            <div className="input-group">
              <label>Phone Number</label>
              <input type="tel" placeholder="+255 712 345 678" required disabled={loading} />
            </div>

            <div className="input-group">
              <label>Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a password"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
              <small className="password-hint">Must be at least 8 characters</small>
            </div>

            <div className="input-group">
              <label>I am a:</label>
              <select className="role-select" disabled={loading}>
                <option value="customer">Traveler / Customer</option>
                <option value="agent">Travel Agent</option>
                <option value="provider">Service Provider (Hotel/Car)</option>
                <option value="guide">Tour Guide</option>
              </select>
            </div>

            <div className="terms-agreement">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">
                I agree to the <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>
              </label>
            </div>

            <button
              type="submit"
              className="auth-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </button>

            <p className="toggle-auth" onClick={() => setView('login')}>
              Already have an account? <strong>Sign In</strong>
            </p>
          </motion.form>
        )}

        {/* --- FORGOT PASSWORD VIEW --- */}
        {view === 'forgot' && (
          <motion.div
            key="forgot"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="auth-view"
          >
            <div className="auth-header">
              <div className="logo-wrapper">
                <span className="logo-icon">✈️</span>
                <span className="logo-text">AirKulty</span>
              </div>
              <h2>Reset Password</h2>
              <p className="subtitle">
                Enter your email and we'll send you reset instructions
              </p>
            </div>

            {serverError && (
              <div className="auth-error">
                <span>{serverError}</span>
              </div>
            )}

            <div className="input-group">
              <label>Email Address</label>
              <input
                type="email"
                {...register('email', { required: 'Email is required' })}
                placeholder="Enter your email"
                disabled={loading}
              />
              {errors.email && <span className="field-error">{errors.email.message}</span>}
            </div>

            <button
              className="auth-btn"
              onClick={handleForgotPassword}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Sending...
                </>
              ) : (
                'Send Reset Link'
              )}
            </button>

            <p className="toggle-auth" onClick={() => setView('login')}>
              ← Back to Login
            </p>
          </motion.div>
        )}

        </AnimatePresence>

        {/* Demo Credentials */}
        <div className="demo-credentials">
          <p className="demo-title">Demo Accounts:</p>
          <div className="credential-list">
            <div className="credential-item">
              <span className="role super_admin">👑 Super Admin:</span>
              <code>superadmin@airkulty.com / Admin@123</code>
            </div>
            <div className="credential-item">
              <span className="role admin">👑 Admin:</span>
              <code>admin@airkulty.com / Admin@123</code>
            </div>
            <div className="credential-item">
              <span className="role manager">📊 Manager:</span>
              <code>manager@airkulty.com / Manager@123</code>
            </div>
            <div className="credential-item">
              <span className="role agent">💼 Agent:</span>
              <code>agent@airkulty.com / Agent@123</code>
            </div>
            <div className="credential-item">
              <span className="role provider">🏨 Provider:</span>
              <code>hotel@zanzibar.com / Hotel@123</code>
            </div>
            <div className="credential-item">
              <span className="role guide">🗺️ Guide:</span>
              <code>joseph@guide.com / Guide@123</code>
            </div>
            <div className="credential-item">
              <span className="role customer">👤 Customer:</span>
              <code>john@example.com / John@123</code>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}