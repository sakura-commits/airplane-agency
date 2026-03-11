import {faPlane} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt, faCog, faCreditCard, faCalendarAlt, faHeart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import '../App.css';

export function Navbar() {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const userDropdownRef = useRef(null);
  const servicesRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target)
      ) {
        setIsUserDropdownOpen(false);
      }
      if (
        servicesRef.current &&
        !servicesRef.current.contains(event.target)
      ) {
        setIsServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="navbar">
        <FontAwesomeIcon icon={faPlane} className="plane-icon" />
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li
            className={`dropdown ${isServicesOpen ? 'open' : ''}`}
            ref={servicesRef}
          >
            {/* prevent default to avoid jump */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setIsServicesOpen((v) => !v);
              }}
            >
              Services
            </a>
            <ul className="dropdown-menu">
              <li><Link to="/hotel">Hotel</Link></li>
              <li><Link to="/car-rental">Car Rental</Link></li>
              <li><Link to="/tours">Tours</Link></li>
            </ul>
          </li>
          <li><Link to="/flights">Book</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
        <div className="user-menu" ref={userDropdownRef}>
          <FontAwesomeIcon icon={faUser} className="user-icon" onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)} />
          <ul className={`user-dropdown ${isUserDropdownOpen ? 'show' : ''}`}>
            <li><Link to="/profile"><FontAwesomeIcon icon={faUser} /> Profile</Link></li>
            <li><Link to="/my-bookings"><FontAwesomeIcon icon={faCalendarAlt} /> My Bookings</Link></li>
            <li><Link to="/settings"><FontAwesomeIcon icon={faCog} /> Settings</Link></li>
            <li><Link to="/payment-methods"><FontAwesomeIcon icon={faCreditCard} /> Payment Methods</Link></li>
            <li><Link to="/preferences"><FontAwesomeIcon icon={faHeart} /> Travel Preferences</Link></li>
            <li onClick={() => { alert('Logged out'); setIsUserDropdownOpen(false); }}><FontAwesomeIcon icon={faSignOutAlt} /> Logout</li>
          </ul>
        </div>
      </nav>
    </>
  );
}