import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Navbar } from '../Components/Navbar';
import Footer from '../Components/Footer';
import '../App.css';
import { faStar, faLocationDot, faWifi, faSwimmingPool, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export function Hotel() {
  const hotelData = [
    { id: 1, name: 'Zanzibar Serene Resort', location: 'Nungwi', price: '$150/night', stars: 5, img: '🏖️' },
    { id: 2, name: 'Dar City Heights', location: 'Posta, Dar', price: '$90/night', stars: 4, img: '🏨' },
    { id: 3, name: 'Serengeti Safari Lodge', location: 'Serengeti', price: '$250/night', stars: 5, img: '🦓' },
  ];

  const [selectedHotel, setSelectedHotel] = useState(null);

  if (selectedHotel) {
    return (
      <div className="booking-container">
        <button className="back-btn" onClick={() => setSelectedHotel(null)}><FontAwesomeIcon icon={faArrowLeft} /> Back to Hotels</button>
        <div className="summary-card">
          <h2>Confirm Stay at {selectedHotel.name}</h2>
          <div className="amenities">
            <span><FontAwesomeIcon icon={faWifi} /> Free WiFi</span>
            <span><FontAwesomeIcon icon={faSwimmingPool} /> Pool</span>
          </div>
          <p>Location: {selectedHotel.location}</p>
          <button className="confirm-pay-btn">Book Now for {selectedHotel.price}</button>
        </div>
      </div>
    );
  }

  return (
    <>
    <Navbar/>
    <div className="flights-page">
      <div className="contact-header"><h1>Find Your Stay</h1></div>
      <div className="flight-list">
        {hotelData.map(hotel => (
          <div key={hotel.id} className="flight-card">
            <div className="airline-info">
              <span style={{fontSize: '2rem'}}>{hotel.img}</span>
              <strong>{hotel.name}</strong>
              <div className="stars">
                {[...Array(hotel.stars)].map((_, i) => <FontAwesomeIcon key={i} icon={faStar} style={{color: '#ffcf33', fontSize: '0.8rem'}} />)}
              </div>
            </div>
            <span><FontAwesomeIcon icon={faLocationDot} /> {hotel.location}</span>
            <div className="price-tag">{hotel.price}</div>
            <button className="select-btn" onClick={() => setSelectedHotel(hotel)}>View Rooms</button>
          </div>
        ))}
      </div>
    </div>
    <Footer />
    </>
  );
}