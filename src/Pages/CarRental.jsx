import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Navbar } from '../Components/Navbar';
import Footer from '../Components/Footer';
import { faCar, faGasPump, faCogs, faUserFriends, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export function CarRental() {
  const carData = [
    { id: 1, model: 'Toyota RAV4', type: 'SUV', price: '$50/day', trans: 'Auto', seats: 5 },
    { id: 2, model: 'Suzuki Carry', type: 'Van', price: '$40/day', trans: 'Manual', seats: 2 },
    { id: 3, model: 'Land Rover Defender', type: '4x4', price: '$120/day', trans: 'Manual', seats: 7 },
  ];

  const [selectedCar, setSelectedCar] = useState(null);

  if (selectedCar) {
    return (
      <div className="booking-container">
        <button className="back-btn" onClick={() => setSelectedCar(null)}><FontAwesomeIcon icon={faArrowLeft} /> Back to Cars</button>
        <div className="summary-card">
          <h2>Rent the {selectedCar.model}</h2>
          <div className="car-specs">
            <p><FontAwesomeIcon icon={faCogs} /> {selectedCar.trans}</p>
            <p><FontAwesomeIcon icon={faUserFriends} /> {selectedCar.seats} Seats</p>
          </div>
          <button className="confirm-pay-btn">Reserve Car ({selectedCar.price})</button>
        </div>
      </div>
    );
  }

  return (
    <>
    <Navbar/>
    <div className="flights-page">
      <div className="contact-header"><h1>Explore on Wheels</h1></div>
      <div className="flight-list">
        {carData.map(car => (
          <div key={car.id} className="flight-card">
            <div className="airline-info">
              <FontAwesomeIcon icon={faCar} style={{fontSize: '1.5rem', color: '#133a94'}} />
              <strong>{car.model}</strong>
              <span className="badge">{car.type}</span>
            </div>
            <div className="car-icons" style={{display: 'flex', gap: '10px', color: '#666'}}>
                <span><FontAwesomeIcon icon={faUserFriends} /> {car.seats}</span>
                <span><FontAwesomeIcon icon={faCogs} /> {car.trans}</span>
            </div>
            <div className="price-tag">{car.price}</div>
            <button className="select-btn" onClick={() => setSelectedCar(car)}>Rent Now</button>
          </div>
        ))}
      </div>
    </div>
    <Footer />
    </>
  );
}