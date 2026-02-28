import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEnvelope, faPhone, faLocationDot 
} from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import '../App.css';
import { Toast } from './Toast';

export function ContactDetails() {
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowToast(true);
    // In a real app, you'd send this data to a backend here
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1>Get in Touch</h1>
        <p>Have questions about your next flight? Our team is here to help 24/7.</p>
      </div>

      <div className="contact-grid">
        {showToast && (
          <Toast
            message="Your message has been sent! We'll get back to you within 24 hours."
            type="success"
            onClose={() => { setShowToast(false); }}
          />
        )}
        {/* Left Side: Contact Information */}
        <div className="contact-info">
          <div className="info-item">
            <div className="icon-box"><FontAwesomeIcon icon={faPhone} /></div>
            <div>
              <h4>Call Us</h4>
              <p>+255 712 345 678</p>
            </div>
          </div>

          <div className="info-item">
            <div className="icon-box"><FontAwesomeIcon icon={faEnvelope} /></div>
            <div>
              <h4>Email Us</h4>
              <p>support@airkulty.org</p>
            </div>
          </div>

          <div className="info-item">
            <div className="icon-box"><FontAwesomeIcon icon={faLocationDot} /></div>
            <div>
              <h4>Visit Us</h4>
              <p>123 Kilimanjaro St, Dar es Salaam, Tanzania</p>
            </div>
          </div>

          <div className="social-presence">
            <h4>Follow Our Journey</h4>
            <div className="social-icons">
              <FontAwesomeIcon icon={faFacebook} />
              <FontAwesomeIcon icon={faInstagram} />
              <FontAwesomeIcon icon={faTwitter} />
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="contact-form-card">
          <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Your Name</label>
                <input type="text" placeholder="John Doe" required />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" placeholder="john@example.com" required />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea rows="5" placeholder="How can we help you?" required></textarea>
              </div>
              <button type="submit" className="contact-submit-btn">
                Send Message
              </button>
            </form>
        </div>
      </div>
    </div>
  );
}