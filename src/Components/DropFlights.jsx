import '../App.css';
import React, { useState } from 'react';

export function DropFlights(){
// Dummy Data
  const flightData = [
    { id: 1, type: 'Local', airline: 'Air Tanzania', from: 'DAR', to: 'ZNZ', price: '$80', time: '10:00 AM' },
    { id: 2, type: 'International', airline: 'Emirates', from: 'DAR', to: 'DXB', price: '$650', time: '03:15 PM' },
    // Add more here...
  ];

  const [filter, setFilter] = useState('Local');
  const [selectedFlight, setSelectedFlight] = useState(null);

  return (

    <div className="flights-page">
      <div className="flight-tabs">
        <button className={filter === 'Local' ? 'active' : ''} onClick={() => setFilter('Local')}>Local Flights</button>
        <button className={filter === 'International' ? 'active' : ''} onClick={() => setFilter('International')}>International</button>
      </div>

      <div className="flight-list">
        {flightData
          .filter(f => f.type === filter) // Only show the selected tab
          .map(flight => (
            <div key={flight.id} className="flight-card">
              <div className="airline-info">
                <strong>{flight.airline}</strong>
                <span>{flight.time}</span>
              </div>
              <div className="route">
                {flight.from} ✈️ {flight.to}
              </div>
              <div className="price-tag">{flight.price}</div>
              <button className="select-btn">Select</button>
            </div>
          ))}
      </div>
    </div>
    

  );
};