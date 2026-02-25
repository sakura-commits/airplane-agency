import {faPlane} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt, faCog, faCreditCard, faCalendarAlt, faHeart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import '../App.css';

export function Navbar() {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const userDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

 return(
    <>
    <nav className="navbar">
        <FontAwesomeIcon icon={faPlane} className="plane-icon"/>
        <ul className="nav-links">    
       <Link to="/"><li>Home</li></Link>
        <li>Flight
            <ul className="dropdown">
                <li>Schedules</li>
                <li>Offers</li>
            </ul>
            </li>
         <li>Services
          <ul className="dropdown">
            <li>Hotel</li>
            <li>Car Rental</li>
            <li>Tours</li>
          </ul>  
            </li>
          <Link to="/flights"><li>Book</li></Link>
          <Link to="/my-bookings"><li>My Bookings</li></Link>
           <Link to="/contact"><li>Contact</li></Link>
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
 )
}