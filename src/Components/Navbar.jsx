import { faPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt, faCog, faCreditCard, faCalendarAlt, faHeart, faUserCog } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import '../App.css';

// 1. ADD onLogout to the props here
export function Navbar({ onLogout, user }) {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const userDropdownRef = useRef(null);
  const servicesRef = useRef(null);

  const handlePlaneClick = () => {
    if (user && ['admin', 'super_admin', 'manager'].includes(user.role)) {
      window.location.href = '/admin/dashboard';
    } else {
      window.location.href = '/home';
    }
  };

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
        <FontAwesomeIcon icon={faPlane} className="plane-icon" onClick={handlePlaneClick} />
        <ul className="nav-links">
          <Link to="/"><li>Home</li></Link>
          <li className="dropdown" ref={servicesRef}>Services
            <ul className="dropdown-menu">
              <Link to="/hotel"><li>Hotel</li></Link>
              <Link to="/car-rental"><li>Car Rental</li></Link>
              <Link to="/tours"><li>Tours</li></Link>
            </ul>
          </li>
          <li><Link to="/flights">Book</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          {['admin', 'super_admin', 'manager'].includes(user?.role) && (
            <li><Link to="/admin/dashboard"><FontAwesomeIcon icon={faUserCog} /> Admin</Link></li>
          )}
        </ul>
        <div className="user-menu" ref={userDropdownRef}>
          <FontAwesomeIcon icon={faUser} className="user-icon" onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)} />
          <ul className={`user-dropdown ${isUserDropdownOpen ? 'show' : ''}`}>
            <li><Link to="/profile"><FontAwesomeIcon icon={faUser} /> Profile</Link></li>
            <li><Link to="/my-bookings"><FontAwesomeIcon icon={faCalendarAlt} /> My Bookings</Link></li>
            <li><Link to="/settings"><FontAwesomeIcon icon={faCog} /> Settings</Link></li>
            <li><Link to="/payment-methods"><FontAwesomeIcon icon={faCreditCard} /> Payment Methods</Link></li>
            <li><Link to="/preferences"><FontAwesomeIcon icon={faHeart} /> Travel Preferences</Link></li>
            
            {/* 4. ATTACH the onLogout function here */}
            <li onClick={() => { 
              onLogout(); 
              setIsUserDropdownOpen(false); 
            }}>
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
