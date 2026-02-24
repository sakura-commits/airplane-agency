import { useState } from 'react';
import { Navbar } from "../Components/Navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faEdit, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import '../App.css';

export function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+123 456 7890'
  });

  const [tempProfile, setTempProfile] = useState({ ...profile });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEdit = () => {
    setTempProfile({ ...profile });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = () => {
    setProfile({ ...tempProfile });
    setIsEditing(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <>
      <Navbar />
      <div className="profile-page-simple">
        <div className="profile-container-simple">
          <h1>Account Settings</h1>

          {showSuccess && (
            <div className="success-message-simple">
              <FontAwesomeIcon icon={faCheck} />
              Profile updated successfully!
            </div>
          )}

          <div className="profile-card">
            <div className="profile-header-simple">
              <h2>Profile Information</h2>
              {!isEditing ? (
                <button className="edit-btn-simple" onClick={handleEdit}>
                  <FontAwesomeIcon icon={faEdit} /> Edit
                </button>
              ) : (
                <div className="action-buttons">
                  <button className="cancel-btn-simple" onClick={handleCancel}>
                    <FontAwesomeIcon icon={faTimes} /> Cancel
                  </button>
                  <button className="save-btn-simple" onClick={handleSave}>
                    <FontAwesomeIcon icon={faSave} /> Save Changes
                  </button>
                </div>
              )}
            </div>

            <div className="profile-content">
              {/* Name */}
              <div className="info-group">
                <label>Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={tempProfile.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                  />
                ) : (
                  <p className="info-value">{profile.name}</p>
                )}
              </div>

              {/* Email */}
              <div className="info-group">
                <label>Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={tempProfile.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                  />
                ) : (
                  <p className="info-value">{profile.email}</p>
                )}
              </div>

              {/* Phone */}
              <div className="info-group">
                <label>Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={tempProfile.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                  />
                ) : (
                  <p className="info-value">{profile.phone}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
