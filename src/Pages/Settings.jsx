import { useState } from 'react';
import { Navbar } from "../Components/Navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faLock,
  faBell,
  faMoon,
  faSun,
  faPalette,
  faEye,
  faEyeSlash,
  faMobile,
  faEnvelope,
  faSms,
  faToggleOn,
  faToggleOff,
  faKey,
  faDownload,
  faExclamationTriangle,
  faSave,
  faTimes,
  faCheck,
  faGlobe
} from '@fortawesome/free-solid-svg-icons';
import '../App.css';
import { Toast } from '../Components/Toast';

export function Settings() {
  const [activeSection, setActiveSection] = useState('account');
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Account Settings
  const [accountSettings, setAccountSettings] = useState({
    email: 'john.doe@example.com',
    username: 'johndoe',
    language: 'english',
    timezone: 'Africa/Dar_es_Salaam',
    dateFormat: 'DD/MM/YYYY',
    currency: 'USD'
  });

  // Privacy & Security
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    loginAlerts: true,
    deviceTracking: true,
    biometricLogin: false,
    sessionTimeout: '30',
    showProfile: 'public',
    shareBookings: 'private'
  });

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: {
      bookingConfirmation: true,
      flightUpdates: true,
      specialOffers: false,
      newsletter: false,
      paymentReceipts: true,
      accountAlerts: true
    },
    smsNotifications: {
      bookingConfirmation: true,
      flightUpdates: true,
      checkInReminders: true,
      gateChanges: true
    },
    pushNotifications: {
      bookingUpdates: true,
      checkInReminders: true,
      specialOffers: false
    }
  });

  // Appearance Settings
  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: 'light',
    fontSize: 'medium',
    compactView: false,
    animations: true
  });

  // Privacy Settings
  const [privacySettings, setPrivacySettings] = useState({
    dataCollection: true,
    cookieConsent: true,
    marketingEmails: false
  });

  // Connected Devices
  const [devices, setDevices] = useState([
    { id: 1, name: 'Chrome on Windows', location: 'Dar es Salaam, Tanzania', lastActive: 'Now', current: true },
    { id: 2, name: 'Safari on iPhone', location: 'Zanzibar, Tanzania', lastActive: '2 hours ago', current: false },
    { id: 3, name: 'Firefox on MacOS', location: 'Arusha, Tanzania', lastActive: '3 days ago', current: false }
  ]);

  // Password Change Form
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const handleAccountChange = (field, value) => {
    setAccountSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationChange = (type, field) => {
    setNotificationSettings(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: !prev[type][field]
      }
    }));
  };

  const handleSecurityChange = (field, value) => {
    setSecuritySettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAppearanceChange = (field, value) => {
    setAppearanceSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePrivacyChange = (field, value) => {
    setPrivacySettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'newPassword') {
      let strength = 0;
      if (value.length >= 8) strength++;
      if (value.match(/[a-z]/)) strength++;
      if (value.match(/[A-Z]/)) strength++;
      if (value.match(/[0-9]/)) strength++;
      if (value.match(/[^a-zA-Z0-9]/)) strength++;
      setPasswordStrength(strength);
    }
  };

  const handleSaveAll = () => {
    setShowSuccessMessage(true);
    setShowToast(true);
    setIsEditing(false);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleLogoutAllDevices = () => {
    if (window.confirm('This will log you out from all other devices. Continue?')) {
      alert('Logged out from all other devices');
    }
  };

  const handleRemoveDevice = (deviceId) => {
    if (window.confirm('Remove this device from trusted devices?')) {
      setDevices(devices.filter(d => d.id !== deviceId));
    }
  };

  const handleDeleteAccount = () => {
    setShowDeleteConfirm(false);
    alert('Account deletion requested. You will receive a confirmation email.');
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const getPasswordStrengthText = () => {
    switch(passwordStrength) {
      case 0:
      case 1:
        return { text: 'Weak', color: '#dc3545' };
      case 2:
      case 3:
        return { text: 'Medium', color: '#ffc107' };
      case 4:
      case 5:
        return { text: 'Strong', color: '#28a745' };
      default:
        return { text: '', color: '' };
    }
  };

  return (
    <>
      <Navbar />
      <div className="settings-page">
        <div className="settings-header">
          <h1>Account Settings</h1>
          <div className="header-actions">
            {isEditing ? (
              <>
                <button className="cancel-btn" onClick={() => setIsEditing(false)}>
                  <FontAwesomeIcon icon={faTimes} /> Cancel
                </button>
                <button className="save-btn" onClick={handleSaveAll}>
                  <FontAwesomeIcon icon={faSave} /> Save Changes
                </button>
              </>
            ) : (
              <button className="edit-btn" onClick={() => setIsEditing(true)}>
                Edit Settings
              </button>
            )}
          </div>
        </div>

        {showSuccessMessage && showToast && (
          <Toast
            message="Settings saved successfully!"
            type="success"
            onClose={() => setShowToast(false)}
          />
        )}

        <div className="settings-container">
          {/* Settings Sidebar */}
          <div className="settings-sidebar">
            <ul>
              <li
                className={activeSection === 'account' ? 'active' : ''}
                onClick={() => setActiveSection('account')}
              >
                <FontAwesomeIcon icon={faUser} />
                Account
              </li>
              <li
                className={activeSection === 'security' ? 'active' : ''}
                onClick={() => setActiveSection('security')}
              >
                <FontAwesomeIcon icon={faLock} />
                Privacy & Security
              </li>
              <li
                className={activeSection === 'notifications' ? 'active' : ''}
                onClick={() => setActiveSection('notifications')}
              >
                <FontAwesomeIcon icon={faBell} />
                Notifications
              </li>
              <li
                className={activeSection === 'appearance' ? 'active' : ''}
                onClick={() => setActiveSection('appearance')}
              >
                <FontAwesomeIcon icon={faPalette} />
                Appearance
              </li>
              <li
                className={activeSection === 'devices' ? 'active' : ''}
                onClick={() => setActiveSection('devices')}
              >
                <FontAwesomeIcon icon={faMobile} />
                Connected Devices
              </li>
              <li
                className={activeSection === 'data' ? 'active' : ''}
                onClick={() => setActiveSection('data')}
              >
                <FontAwesomeIcon icon={faDownload} />
                Data & Privacy
              </li>
              <li
                className={activeSection === 'danger' ? 'active danger' : ''}
                onClick={() => setActiveSection('danger')}
              >
                <FontAwesomeIcon icon={faExclamationTriangle} />
                Danger Zone
              </li>
            </ul>
          </div>

          {/* Settings Content */}
          <div className="settings-content">
            {/* Account Settings */}
            {activeSection === 'account' && (
              <div className="settings-section">
                <h2>Account Information</h2>

                <div className="settings-form">
                  <div className="form-group">
                    <label>Email Address</label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={accountSettings.email}
                        onChange={(e) => handleAccountChange('email', e.target.value)}
                      />
                    ) : (
                      <p className="setting-value">{accountSettings.email}</p>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Username</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={accountSettings.username}
                        onChange={(e) => handleAccountChange('username', e.target.value)}
                      />
                    ) : (
                      <p className="setting-value">{accountSettings.username}</p>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Language</label>
                    {isEditing ? (
                      <select
                        value={accountSettings.language}
                        onChange={(e) => handleAccountChange('language', e.target.value)}
                      >
                        <option value="english">English</option>
                        <option value="swahili">Swahili</option>
                        <option value="french">French</option>
                        <option value="arabic">Arabic</option>
                      </select>
                    ) : (
                      <p className="setting-value">{accountSettings.language}</p>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Timezone</label>
                    {isEditing ? (
                      <select
                        value={accountSettings.timezone}
                        onChange={(e) => handleAccountChange('timezone', e.target.value)}
                      >
                        <option value="Africa/Dar_es_Salaam">Dar es Salaam (GMT+3)</option>
                        <option value="Africa/Nairobi">Nairobi (GMT+3)</option>
                        <option value="Africa/Johannesburg">Johannesburg (GMT+2)</option>
                        <option value="Europe/London">London (GMT+0)</option>
                      </select>
                    ) : (
                      <p className="setting-value">{accountSettings.timezone}</p>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Preferred Currency</label>
                    {isEditing ? (
                      <select
                        value={accountSettings.currency}
                        onChange={(e) => handleAccountChange('currency', e.target.value)}
                      >
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="GBP">GBP (£)</option>
                        <option value="TZS">TZS (TSh)</option>
                      </select>
                    ) : (
                      <p className="setting-value">{accountSettings.currency}</p>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Date Format</label>
                    {isEditing ? (
                      <select
                        value={accountSettings.dateFormat}
                        onChange={(e) => handleAccountChange('dateFormat', e.target.value)}
                      >
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      </select>
                    ) : (
                      <p className="setting-value">{accountSettings.dateFormat}</p>
                    )}
                  </div>

                  <button
                    className="change-password-btn"
                    onClick={() => setShowPasswordModal(true)}
                  >
                    <FontAwesomeIcon icon={faKey} />
                    Change Password
                  </button>
                </div>
              </div>
            )}

            {/* Privacy & Security */}
            {activeSection === 'security' && (
              <div className="settings-section">
                <h2>Privacy & Security</h2>

                <div className="settings-form">
                  <div className="toggle-group">
                    <div className="toggle-info">
                      <label>Two-Factor Authentication</label>
                      <p className="setting-description">Add an extra layer of security to your account</p>
                    </div>
                    {isEditing ? (
                      <button
                        className={`toggle-btn ${securitySettings.twoFactorAuth ? 'active' : ''}`}
                        onClick={() => handleSecurityChange('twoFactorAuth', !securitySettings.twoFactorAuth)}
                      >
                        <FontAwesomeIcon icon={securitySettings.twoFactorAuth ? faToggleOn : faToggleOff} />
                        {securitySettings.twoFactorAuth ? 'Enabled' : 'Disabled'}
                      </button>
                    ) : (
                      <span className="setting-value">{securitySettings.twoFactorAuth ? 'Enabled' : 'Disabled'}</span>
                    )}
                  </div>

                  <div className="toggle-group">
                    <div className="toggle-info">
                      <label>Biometric Login</label>
                      <p className="setting-description">Use fingerprint or face recognition to log in</p>
                    </div>
                    {isEditing ? (
                      <button
                        className={`toggle-btn ${securitySettings.biometricLogin ? 'active' : ''}`}
                        onClick={() => handleSecurityChange('biometricLogin', !securitySettings.biometricLogin)}
                      >
                        <FontAwesomeIcon icon={securitySettings.biometricLogin ? faToggleOn : faToggleOff} />
                        {securitySettings.biometricLogin ? 'Enabled' : 'Disabled'}
                      </button>
                    ) : (
                      <span className="setting-value">{securitySettings.biometricLogin ? 'Enabled' : 'Disabled'}</span>
                    )}
                  </div>

                  <div className="toggle-group">
                    <div className="toggle-info">
                      <label>Login Alerts</label>
                      <p className="setting-description">Get notified when someone logs into your account</p>
                    </div>
                    {isEditing ? (
                      <button
                        className={`toggle-btn ${securitySettings.loginAlerts ? 'active' : ''}`}
                        onClick={() => handleSecurityChange('loginAlerts', !securitySettings.loginAlerts)}
                      >
                        <FontAwesomeIcon icon={securitySettings.loginAlerts ? faToggleOn : faToggleOff} />
                        {securitySettings.loginAlerts ? 'Enabled' : 'Disabled'}
                      </button>
                    ) : (
                      <span className="setting-value">{securitySettings.loginAlerts ? 'Enabled' : 'Disabled'}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Session Timeout (minutes)</label>
                    {isEditing ? (
                      <select
                        value={securitySettings.sessionTimeout}
                        onChange={(e) => handleSecurityChange('sessionTimeout', e.target.value)}
                      >
                        <option value="15">15 minutes</option>
                        <option value="30">30 minutes</option>
                        <option value="60">1 hour</option>
                        <option value="120">2 hours</option>
                      </select>
                    ) : (
                      <p className="setting-value">{securitySettings.sessionTimeout} minutes</p>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Profile Visibility</label>
                    {isEditing ? (
                      <select
                        value={securitySettings.showProfile}
                        onChange={(e) => handleSecurityChange('showProfile', e.target.value)}
                      >
                        <option value="public">Public - Anyone can see</option>
                        <option value="private">Private - Only me</option>
                        <option value="contacts">Contacts - Only people I've booked with</option>
                      </select>
                    ) : (
                      <p className="setting-value">{securitySettings.showProfile}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Notifications */}
            {activeSection === 'notifications' && (
              <div className="settings-section">
                <h2>Notification Preferences</h2>

                <div className="notification-groups">
                  <div className="notification-group">
                    <h3>
                      <FontAwesomeIcon icon={faEnvelope} />
                      Email Notifications
                    </h3>
                    {Object.entries(notificationSettings.emailNotifications).map(([key, value]) => (
                      <div key={key} className="toggle-group">
                        <label>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</label>
                        {isEditing ? (
                          <button
                            className={`toggle-btn small ${value ? 'active' : ''}`}
                            onClick={() => handleNotificationChange('emailNotifications', key)}
                          >
                            <FontAwesomeIcon icon={value ? faToggleOn : faToggleOff} />
                          </button>
                        ) : (
                          <span className="setting-value">{value ? 'On' : 'Off'}</span>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="notification-group">
                    <h3>
                      <FontAwesomeIcon icon={faSms} />
                      SMS Notifications
                    </h3>
                    {Object.entries(notificationSettings.smsNotifications).map(([key, value]) => (
                      <div key={key} className="toggle-group">
                        <label>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</label>
                        {isEditing ? (
                          <button
                            className={`toggle-btn small ${value ? 'active' : ''}`}
                            onClick={() => handleNotificationChange('smsNotifications', key)}
                          >
                            <FontAwesomeIcon icon={value ? faToggleOn : faToggleOff} />
                          </button>
                        ) : (
                          <span className="setting-value">{value ? 'On' : 'Off'}</span>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="notification-group">
                    <h3>
                      <FontAwesomeIcon icon={faMobile} />
                      Push Notifications
                    </h3>
                    {Object.entries(notificationSettings.pushNotifications).map(([key, value]) => (
                      <div key={key} className="toggle-group">
                        <label>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</label>
                        {isEditing ? (
                          <button
                            className={`toggle-btn small ${value ? 'active' : ''}`}
                            onClick={() => handleNotificationChange('pushNotifications', key)}
                          >
                            <FontAwesomeIcon icon={value ? faToggleOn : faToggleOff} />
                          </button>
                        ) : (
                          <span className="setting-value">{value ? 'On' : 'Off'}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Appearance */}
            {activeSection === 'appearance' && (
              <div className="settings-section">
                <h2>Appearance</h2>

                <div className="settings-form">
                  <div className="form-group">
                    <label>Theme</label>
                    {isEditing ? (
                      <div className="theme-options">
                        <button
                          className={`theme-option ${appearanceSettings.theme === 'light' ? 'active' : ''}`}
                          onClick={() => handleAppearanceChange('theme', 'light')}
                        >
                          <FontAwesomeIcon icon={faSun} />
                          Light
                        </button>
                        <button
                          className={`theme-option ${appearanceSettings.theme === 'dark' ? 'active' : ''}`}
                          onClick={() => handleAppearanceChange('theme', 'dark')}
                        >
                          <FontAwesomeIcon icon={faMoon} />
                          Dark
                        </button>
                        <button
                          className={`theme-option ${appearanceSettings.theme === 'system' ? 'active' : ''}`}
                          onClick={() => handleAppearanceChange('theme', 'system')}
                        >
                          <FontAwesomeIcon icon={faGlobe} />
                          System
                        </button>
                      </div>
                    ) : (
                      <p className="setting-value">{appearanceSettings.theme}</p>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Font Size</label>
                    {isEditing ? (
                      <select
                        value={appearanceSettings.fontSize}
                        onChange={(e) => handleAppearanceChange('fontSize', e.target.value)}
                      >
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                      </select>
                    ) : (
                      <p className="setting-value">{appearanceSettings.fontSize}</p>
                    )}
                  </div>

                  <div className="toggle-group">
                    <div className="toggle-info">
                      <label>Compact View</label>
                      <p className="setting-description">Show more content with reduced spacing</p>
                    </div>
                    {isEditing ? (
                      <button
                        className={`toggle-btn ${appearanceSettings.compactView ? 'active' : ''}`}
                        onClick={() => handleAppearanceChange('compactView', !appearanceSettings.compactView)}
                      >
                        <FontAwesomeIcon icon={appearanceSettings.compactView ? faToggleOn : faToggleOff} />
                      </button>
                    ) : (
                      <span className="setting-value">{appearanceSettings.compactView ? 'On' : 'Off'}</span>
                    )}
                  </div>

                  <div className="toggle-group">
                    <div className="toggle-info">
                      <label>Animations</label>
                      <p className="setting-description">Enable smooth animations throughout the app</p>
                    </div>
                    {isEditing ? (
                      <button
                        className={`toggle-btn ${appearanceSettings.animations ? 'active' : ''}`}
                        onClick={() => handleAppearanceChange('animations', !appearanceSettings.animations)}
                      >
                        <FontAwesomeIcon icon={appearanceSettings.animations ? faToggleOn : faToggleOff} />
                      </button>
                    ) : (
                      <span className="setting-value">{appearanceSettings.animations ? 'On' : 'Off'}</span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Connected Devices */}
            {activeSection === 'devices' && (
              <div className="settings-section">
                <h2>Connected Devices</h2>
                <p className="section-description">Devices that have access to your account</p>

                <div className="devices-list">
                  {devices.map(device => (
                    <div key={device.id} className="device-item">
                      <div className="device-icon">
                        <FontAwesomeIcon icon={faMobile} />
                      </div>
                      <div className="device-info">
                        <div className="device-name">
                          {device.name}
                          {device.current && <span className="current-badge">Current Device</span>}
                        </div>
                        <div className="device-location">{device.location}</div>
                        <div className="device-active">Last active: {device.lastActive}</div>
                      </div>
                      {!device.current && (
                        <button
                          className="remove-device-btn"
                          onClick={() => handleRemoveDevice(device.id)}
                        >
                          <FontAwesomeIcon icon={faTimes} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <button
                  className="logout-all-btn"
                  onClick={handleLogoutAllDevices}
                >
                  Log out from all other devices
                </button>
              </div>
            )}

            {/* Data & Privacy */}
            {activeSection === 'data' && (
              <div className="settings-section">
                <h2>Data & Privacy</h2>

                <div className="data-options">
                  <div className="data-option">
                    <h3>Download Your Data</h3>
                    <p>Get a copy of all your personal data, bookings, and preferences</p>
                    <button className="data-action-btn">
                      <FontAwesomeIcon icon={faDownload} />
                      Request Data Export
                    </button>
                  </div>

                  <div className="data-option">
                    <h3>Data Collection</h3>
                    <p>Help us improve your experience by allowing data collection</p>
                    {isEditing ? (
                      <button
                        className={`toggle-btn ${privacySettings.dataCollection ? 'active' : ''}`}
                        onClick={() => handlePrivacyChange('dataCollection', !privacySettings.dataCollection)}
                      >
                        <FontAwesomeIcon icon={privacySettings.dataCollection ? faToggleOn : faToggleOff} />
                        {privacySettings.dataCollection ? 'Enabled' : 'Disabled'}
                      </button>
                    ) : (
                      <span className="setting-value">{privacySettings.dataCollection ? 'Enabled' : 'Disabled'}</span>
                    )}
                  </div>

                  <div className="data-option">
                    <h3>Cookie Consent</h3>
                    <p>Manage your cookie preferences</p>
                    {isEditing ? (
                      <button
                        className={`toggle-btn ${privacySettings.cookieConsent ? 'active' : ''}`}
                        onClick={() => handlePrivacyChange('cookieConsent', !privacySettings.cookieConsent)}
                      >
                        <FontAwesomeIcon icon={privacySettings.cookieConsent ? faToggleOn : faToggleOff} />
                        {privacySettings.cookieConsent ? 'Enabled' : 'Disabled'}
                      </button>
                    ) : (
                      <span className="setting-value">{privacySettings.cookieConsent ? 'Enabled' : 'Disabled'}</span>
                    )}
                  </div>

                  <div className="data-option">
                    <h3>Marketing Emails</h3>
                    <p>Receive updates about promotions and special offers</p>
                    {isEditing ? (
                      <button
                        className={`toggle-btn ${privacySettings.marketingEmails ? 'active' : ''}`}
                        onClick={() => handlePrivacyChange('marketingEmails', !privacySettings.marketingEmails)}
                      >
                        <FontAwesomeIcon icon={privacySettings.marketingEmails ? faToggleOn : faToggleOff} />
                        {privacySettings.marketingEmails ? 'Subscribed' : 'Unsubscribed'}
                      </button>
                    ) : (
                      <span className="setting-value">{privacySettings.marketingEmails ? 'Subscribed' : 'Unsubscribed'}</span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Danger Zone */}
            {activeSection === 'danger' && (
              <div className="settings-section danger-zone">
                <h2>Danger Zone</h2>
                <p className="warning-text">These actions are irreversible. Proceed with caution.</p>

                <div className="danger-options">
                  <div className="danger-option">
                    <div className="danger-info">
                      <h3>Deactivate Account</h3>
                      <p>Temporarily disable your account. You can reactivate anytime.</p>
                    </div>
                    <button className="danger-btn warning">
                      Deactivate Account
                    </button>
                  </div>

                  <div className="danger-option">
                    <div className="danger-info">
                      <h3>Delete Account</h3>
                      <p>Permanently delete your account and all associated data.</p>
                    </div>
                    <button
                      className="danger-btn critical"
                      onClick={() => setShowDeleteConfirm(true)}
                    >
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="modal-overlay">
          <div className="modal-content password-modal">
            <h2>Change Password</h2>

            <div className="password-form">
              <div className="form-group">
                <label>Current Password</label>
                <div className="password-input-wrapper">
                  <input
                    type={showPasswords.current ? 'text' : 'password'}
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => togglePasswordVisibility('current')}
                  >
                    <FontAwesomeIcon icon={showPasswords.current ? faEyeSlash : faEye} />
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label>New Password</label>
                <div className="password-input-wrapper">
                  <input
                    type={showPasswords.new ? 'text' : 'password'}
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => togglePasswordVisibility('new')}
                  >
                    <FontAwesomeIcon icon={showPasswords.new ? faEyeSlash : faEye} />
                  </button>
                </div>
                {passwordData.newPassword && (
                  <div className="password-strength">
                    <div className="strength-bar">
                      <div
                        className="strength-fill"
                        style={{
                          width: `${(passwordStrength / 5) * 100}%`,
                          backgroundColor: getPasswordStrengthText().color
                        }}
                      ></div>
                    </div>
                    <span style={{ color: getPasswordStrengthText().color }}>
                      {getPasswordStrengthText().text}
                    </span>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label>Confirm New Password</label>
                <div className="password-input-wrapper">
                  <input
                    type={showPasswords.confirm ? 'text' : 'password'}
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => togglePasswordVisibility('confirm')}
                  >
                    <FontAwesomeIcon icon={showPasswords.confirm ? faEyeSlash : faEye} />
                  </button>
                </div>
                {passwordData.confirmPassword && (
                  <div className="password-match">
                    {passwordData.newPassword === passwordData.confirmPassword ? (
                      <span className="match-success">
                        <FontAwesomeIcon icon={faCheck} /> Passwords match
                      </span>
                    ) : (
                      <span className="match-error">
                        <FontAwesomeIcon icon={faTimes} /> Passwords don't match
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="password-requirements">
                <p>Password must contain:</p>
                <ul>
                  <li className={passwordData.newPassword.length >= 8 ? 'met' : ''}>
                    At least 8 characters
                  </li>
                  <li className={/[a-z]/.test(passwordData.newPassword) ? 'met' : ''}>
                    One lowercase letter
                  </li>
                  <li className={/[A-Z]/.test(passwordData.newPassword) ? 'met' : ''}>
                    One uppercase letter
                  </li>
                  <li className={/[0-9]/.test(passwordData.newPassword) ? 'met' : ''}>
                    One number
                  </li>
                  <li className={/[^a-zA-Z0-9]/.test(passwordData.newPassword) ? 'met' : ''}>
                    One special character
                  </li>
                </ul>
              </div>
            </div>

            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowPasswordModal(false)}>
                Cancel
              </button>
              <button className="save-btn" onClick={() => {
                setShowPasswordModal(false);
                alert('Password changed successfully!');
              }}>
                Update Password
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Account Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="modal-overlay">
          <div className="modal-content delete-modal">
            <div className="delete-icon">
              <FontAwesomeIcon icon={faExclamationTriangle} />
            </div>
            <h2>Delete Account</h2>
            <p className="warning">
              This action cannot be undone. This will permanently delete your account and remove all your data from our servers.
            </p>

            <div className="form-group">
              <label>Please type "DELETE" to confirm</label>
              <input type="text" placeholder="DELETE" />
            </div>

            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowDeleteConfirm(false)}>
                Cancel
              </button>
              <button className="delete-confirm-btn" onClick={handleDeleteAccount}>
                I understand, delete my account
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
