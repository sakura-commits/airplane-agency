import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlane, faUser, faPassport, faCreditCard, 
  faArrowLeft, faMobileScreenButton
} from '@fortawesome/free-solid-svg-icons';
import '../App.css';

export function DropFlights() {
  const flightData = [
    { id: 1, type: 'Local', airline: 'Air Tanzania', from: 'DAR', to: 'ZNZ', price: '$80', time: '10:00 AM', isOffer: true, promo: 'Early Bird' },
    { id: 2, type: 'International', airline: 'Emirates', from: 'DAR', to: 'DXB', price: '$650', time: '03:15 PM', isOffer: false },
    { id: 3, type: 'Local', airline: 'Precision Air', from: 'DAR', to: 'ARK', price: '$110', time: '08:00 AM', isOffer: true, promo: 'Flash Sale' },
  ];

  const [filter, setFilter] = useState('Local');
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [isBooking, setIsBooking] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' or 'mobile'

  // --- VIEW 3: BOOKING FORM ---
  if (isBooking) {
    return (
      <div className="booking-container">
        <button className="back-btn" onClick={() => setIsBooking(false)}>
          <FontAwesomeIcon icon={faArrowLeft} /> Back to Details
        </button>

        <div className="booking-grid">
          <div className="booking-form-card">
            <h3>1. Passenger Details</h3>
            <div className="form-section">
              <div className="input-group">
                <label><FontAwesomeIcon icon={faUser} /> Full Name</label>
                <input type="text" placeholder="Enter your full name" />
              </div>
              <div className="input-group">
                <label><FontAwesomeIcon icon={faPassport} /> Passport / ID Number</label>
                <input type="text" placeholder="Passport number" />
              </div>
            </div>

            <h3 style={{marginTop: '30px'}}>2. Payment Method</h3>
            <div className="payment-selector">
              <div 
                className={`pay-option ${paymentMethod === 'card' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('card')}
              >
                <FontAwesomeIcon icon={faCreditCard} /> Card
              </div>
              <div 
                className={`pay-option ${paymentMethod === 'mobile' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('mobile')}
              >
                <FontAwesomeIcon icon={faMobileScreenButton} /> Mobile Money
              </div>
            </div>

            <div className="payment-fields">
              {paymentMethod === 'card' ? (
                <div className="card-form">
                  <div className="input-group">
                    <label>Card Number</label>
                    <input type="text" placeholder="0000 0000 0000 0000" />
                  </div>
                  <div className="form-row">
                    <input type="text" placeholder="MM/YY" />
                    <input type="text" placeholder="CVV" />
                  </div>
                </div>
              ) : (
                <div className="mobile-form">
                  <p className="mobile-note">Enter your M-Pesa or Tigo Pesa number. You will receive a prompt on your phone.</p>
                  <div className="input-group">
                    <label>Mobile Number</label>
                    <input type="text" placeholder="e.g. 07XXXXXXXX" />
                  </div>
                </div>
              )}
            </div>

            <button className="confirm-pay-btn" onClick={() => alert("Payment Initiated!")}>
              Pay {selectedFlight.price} Now
            </button>
          </div>

          <div className="booking-summary">
            <h4>Booking Summary</h4>
            <div className="summary-info">
                <p><strong>{selectedFlight.airline}</strong></p>
                <p>{selectedFlight.from} <FontAwesomeIcon icon={faPlane} /> {selectedFlight.to}</p>
                {selectedFlight.isOffer && <span className="offer-badge-small">{selectedFlight.promo} Applied</span>}
            </div>
            <hr />
            <div className="total-row">
              <span>Total:</span>
              <span>{selectedFlight.price}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- VIEW 2: DETAILS VIEW ---
  if (selectedFlight) {
    return (
      <div className="flights-page">
        <div className="flight-details-view">
          <button className="back-btn" onClick={() => setSelectedFlight(null)}><FontAwesomeIcon icon={faArrowLeft} /> Back</button>
          <div className="summary-card">
            <h2>Review your trip to {selectedFlight.to}</h2>
            <p>Airline: {selectedFlight.airline}</p>
            <p>Departure: {selectedFlight.time}</p>
            <button className="sus" onClick={() => setIsBooking(true)}>Proceed to Booking</button>
          </div>
        </div>
      </div>
    );
  }

  // --- VIEW 1: LIST VIEW ---
  return (
    <div className="flights-page">
      <div className="flight-tabs">
        <button className={filter === 'Local' ? 'active' : ''} onClick={() => setFilter('Local')}>Local</button>
        <button className={filter === 'International' ? 'active' : ''} onClick={() => setFilter('International')}>International</button>
      </div>
      <div className="flight-list">
        {flightData.filter(f => f.type === filter).map(flight => (
          <div key={flight.id} className="flight-card">
             <div className="airline-info">
                <strong>{flight.airline}</strong>
                {flight.isOffer && <span className="offer-tag">SALE</span>}
             </div>
             <span className="route-text">{flight.from} <FontAwesomeIcon icon={faPlane} className="plane-icon" /> {flight.to}</span>
             <div className="price-tag">{flight.price}</div>
             <button className="select-btn" onClick={() => setSelectedFlight(flight)}>Select</button>
          </div>
        ))}
      </div>
    </div>
  );
}