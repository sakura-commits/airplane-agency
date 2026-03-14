import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUserShield, faArrowLeft, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import '../App.css';
import { useNavigate } from 'react-router-dom';

export function Auth({ onLoginSuccess }) {
  const [view, setView] = useState('login'); // 'login', 'signup', 'forgot', 'reset'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const ADMIN_EMAIL = "admin@airkulty.com";
  const ADMIN_PASSWORD = "password123";

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userRole', 'admin');
      onLoginSuccess();
      navigate('/home');
    } else {
      setError("Invalid credentials. Try admin@airkulty.com / password123");
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    // Simulate signup: just save to localStorage and log them in
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userRole', 'user'); // Mark as regular user
    alert("Account created successfully!");
    onLoginSuccess();
    navigate('/home');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        
        {/* --- LOGIN VIEW --- */}
        {view === 'login' && (
          <form onSubmit={handleLogin}>
            <div className="auth-header">
              <FontAwesomeIcon icon={faUserShield} className="auth-logo" />
              <h2>Admin Login</h2>
            </div>
            {error && <div className="auth-error">{error}</div>}
            <div className="input-group">
              <label>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="auth-btn">Login</button>
            <p className="toggle-auth" onClick={() => setView('signup')}>Don't have an account? <strong>Sign Up</strong></p>
            <p className="toggle-auth" onClick={() => setView('forgot')}>Forgot Password?</p>
          </form>
        )}

        {/* --- SIGNUP VIEW --- */}
        {view === 'signup' && (
          <form onSubmit={handleSignup}>
            <div className="auth-header">
              <FontAwesomeIcon icon={faUserPlus} className="auth-logo" />
              <h2>Create Account</h2>
              <p>Join AirKulty today.</p>
            </div>
            <div className="input-group">
              <label>Full Name</label>
              <input type="text" placeholder="John Doe" required />
            </div>
            <div className="input-group">
              <label>Email</label>
              <input type="email" placeholder="user@example.com" required />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input type="password" placeholder="••••••••" required />
            </div>
            <button type="submit" className="auth-btn">Sign Up</button>
            <p className="toggle-auth" onClick={() => setView('login')}><FontAwesomeIcon icon={faArrowLeft} /> Back to Login</p>
          </form>
        )}

        {/* --- FORGOT PASSWORD VIEW --- */}
        {view === 'forgot' && (
          <div className="auth-view">
            <h2>Forgot Password?</h2>
            <p>No worries! Enter your email and we'll send you reset instructions.</p>
            <div className="input-group">
              <input type="email" placeholder="Enter your email" required />
            </div>
            <button className="auth-btn" onClick={() => setView('reset')}>Send Reset Link</button>
            <p className="toggle-auth" onClick={() => setView('login')}><FontAwesomeIcon icon={faArrowLeft} /> Back to Login</p>
          </div>
        )}

        {/* --- RESET PASSWORD VIEW --- */}
        {view === 'reset' && (
          <div className="auth-view">
            <h2>Reset Password</h2>
            <p>Choose a strong new password.</p>
            <div className="input-group">
              <label>New Password</label>
              <input type="password" placeholder="••••••••" required />
            </div>
            <div className="input-group">
              <label>Confirm Password</label>
              <input type="password" placeholder="••••••••" required />
            </div>
            <button className="auth-btn" onClick={() => { alert("Password Reset!"); setView('login'); }}>Update Password</button>
          </div>
        )}
      </div>
    </div>
  );
}