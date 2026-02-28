import { useState } from 'react';
import { Navbar } from "../Components/Navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Toast } from '../Components/Toast';
import {
  faPlane,
  faDownload,
  faPrint,
  faTimesCircle,
  faCheckCircle,
  faSpinner,
  faCalendarAlt,
  faMapMarkerAlt,
  faUser,
  faChair
} from '@fortawesome/free-solid-svg-icons';
import '../App.css';

export function MyBookings() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [toastData, setToastData] = useState({ visible: false, message: '', type: 'info' });

  // Dummy bookings data
  const bookings = {
    upcoming: [
      {
        id: 'BK001',
        bookingDate: '2026-02-20',
        status: 'confirmed',
        flights: [
          {
            airline: 'Air Tanzania',
            flightNumber: 'TC402',
            from: 'DAR',
            to: 'JRO',
            departure: '2026-03-20',
            departureTime: '08:30',
            arrival: '2026-03-20',
            arrivalTime: '10:15',
            class: 'Economy',
            seat: '12A',
            gate: 'B4'
          },
          {
            airline: 'Air Tanzania',
            flightNumber: 'TC405',
            from: 'JRO',
            to: 'ZNZ',
            departure: '2026-03-25',
            departureTime: '14:20',
            arrival: '2026-03-25',
            arrivalTime: '15:45',
            class: 'Economy',
            seat: '14C',
            gate: 'A2'
          }
        ],
        passengers: [
          { name: 'John Doe', type: 'Adult', passport: 'AB123456' },
          { name: 'Jane Doe', type: 'Adult', passport: 'CD789012' }
        ],
        totalPrice: '$450',
        paymentStatus: 'paid'
      },
      {
        id: 'BK002',
        bookingDate: '2026-02-15',
        status: 'pending',
        flights: [
          {
            airline: 'Emirates',
            flightNumber: 'EK725',
            from: 'DAR',
            to: 'DXB',
            departure: '2026-04-05',
            departureTime: '21:45',
            arrival: '2026-04-06',
            arrivalTime: '06:30',
            class: 'Business',
            seat: '3A',
            gate: 'C1'
          }
        ],
        passengers: [
          { name: 'John Doe', type: 'Adult', passport: 'AB123456' }
        ],
        totalPrice: '$1,250',
        paymentStatus: 'pending'
      }
    ],
    past: [
      {
        id: 'BK000',
        bookingDate: '2024-01-10',
        status: 'completed',
        flights: [
          {
            airline: 'Precision Air',
            flightNumber: 'PW456',
            from: 'DAR',
            to: 'NBO',
            departure: '2024-01-15',
            departureTime: '09:15',
            arrival: '2024-01-15',
            arrivalTime: '11:30',
            class: 'Economy',
            seat: '8B',
            gate: 'A1'
          }
        ],
        passengers: [
          { name: 'John Doe', type: 'Adult', passport: 'AB123456' }
        ],
        totalPrice: '$320',
        paymentStatus: 'paid'
      }
    ]
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'confirmed':
        return <FontAwesomeIcon icon={faCheckCircle} className="status-icon confirmed" />;
      case 'pending':
        return <FontAwesomeIcon icon={faSpinner} className="status-icon pending" spin />;
      case 'cancelled':
        return <FontAwesomeIcon icon={faTimesCircle} className="status-icon cancelled" />;
      case 'completed':
        return <FontAwesomeIcon icon={faCheckCircle} className="status-icon completed" />;
      default:
        return null;
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'confirmed': return 'Confirmed';
      case 'pending': return 'Pending Confirmation';
      case 'cancelled': return 'Cancelled';
      case 'completed': return 'Completed';
      default: return status;
    }
  };

  const handleCancelBooking = (bookingId) => {
    setSelectedBooking(bookingId);
    setShowCancelModal(true);
  };

  const confirmCancellation = () => {
    // API call to cancel booking
    setShowCancelModal(false);
    setToastData({ visible: true, message: `Booking ${selectedBooking} cancelled successfully`, type: 'success' });
  };

  const handleDownloadTicket = (bookingId) => {
    setToastData({ visible: true, message: `Downloading ticket for booking ${bookingId}`, type: 'info' });
  };

  const handlePrintTicket = (bookingId) => {
    setToastData({ visible: true, message: `Printing ticket for booking ${bookingId}`, type: 'info' });
  };

  const handleCheckIn = (bookingId) => {
    setToastData({ visible: true, message: `Proceeding to check-in for booking ${bookingId}`, type: 'info' });
  };

  return (
    <>
      <Navbar />
      <div className="bookings-page">
        {toastData.visible && (
          <Toast
            message={toastData.message}
            type={toastData.type}
            onClose={() => setToastData({ ...toastData, visible: false })}
          />
        )}
        <div className="bookings-header">
          <h1>My Bookings</h1>
          <div className="booking-tabs">
            <button
              className={activeTab === 'upcoming' ? 'active' : ''}
              onClick={() => setActiveTab('upcoming')}
            >
              Upcoming Flights ({bookings.upcoming.length})
            </button>
            <button
              className={activeTab === 'past' ? 'active' : ''}
              onClick={() => setActiveTab('past')}
            >
              Past Flights ({bookings.past.length})
            </button>
          </div>
        </div>

        <div className="bookings-container">
          {activeTab === 'upcoming' && bookings.upcoming.length === 0 && (
            <div className="no-bookings">
              <FontAwesomeIcon icon={faPlane} />
              <h3>No upcoming bookings</h3>
              <p>Ready for your next adventure? Book a flight now!</p>
              <button className="book-now-btn">Book a Flight</button>
            </div>
          )}

          {activeTab === 'past' && bookings.past.length === 0 && (
            <div className="no-bookings">
              <FontAwesomeIcon icon={faCalendarAlt} />
              <h3>No past bookings</h3>
              <p>Your travel history will appear here</p>
            </div>
          )}

          {activeTab === 'upcoming' && bookings.upcoming.map(booking => (
            <div key={booking.id} className="booking-card">
              <div className="booking-header">
                <div className="booking-id">
                  <span className="label">Booking Reference:</span>
                  <span className="value">{booking.id}</span>
                </div>
                <div className="booking-status">
                  {getStatusIcon(booking.status)}
                  <span>{getStatusText(booking.status)}</span>
                </div>
                <div className="booking-date">
                  <FontAwesomeIcon icon={faCalendarAlt} />
                  <span>Booked: {new Date(booking.bookingDate).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flights-list">
                {booking.flights.map((flight, index) => (
                  <div key={index} className="flight-item">
                    {index > 0 && <div className="flight-connector">⤷ Connecting Flight</div>}

                    <div className="flight-main">
                      <div className="airline-info">
                        <strong>{flight.airline}</strong>
                        <span className="flight-number">{flight.flightNumber}</span>
                      </div>

                      <div className="flight-route-detailed">
                        <div className="departure">
                          <div className="time">{flight.departureTime}</div>
                          <div className="date">{new Date(flight.departure).toLocaleDateString()}</div>
                          <div className="airport">
                            <FontAwesomeIcon icon={faMapMarkerAlt} />
                            {flight.from}
                          </div>
                        </div>

                        <div className="flight-duration">
                          <div className="line"></div>
                          <FontAwesomeIcon icon={faPlane} className="plane-icon" />
                          <div className="line"></div>
                        </div>

                        <div className="arrival">
                          <div className="time">{flight.arrivalTime}</div>
                          <div className="date">{new Date(flight.arrival).toLocaleDateString()}</div>
                          <div className="airport">
                            <FontAwesomeIcon icon={faMapMarkerAlt} />
                            {flight.to}
                          </div>
                        </div>
                      </div>

                      <div className="flight-details">
                        <div className="detail-item">
                          <FontAwesomeIcon icon={faChair} />
                          <span>Class: {flight.class}</span>
                        </div>
                        {flight.seat && (
                          <div className="detail-item">
                            <span>Seat: {flight.seat}</span>
                          </div>
                        )}
                        {flight.gate && (
                          <div className="detail-item">
                            <span>Gate: {flight.gate}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="passenger-summary">
                <h4>
                  <FontAwesomeIcon icon={faUser} />
                  Passengers ({booking.passengers.length})
                </h4>
                <div className="passenger-list">
                  {booking.passengers.map((passenger, idx) => (
                    <div key={idx} className="passenger-tag">
                      <span>{passenger.name}</span>
                      <small>({passenger.type})</small>
                    </div>
                  ))}
                </div>
              </div>

              <div className="booking-footer">
                <div className="price-info">
                  <span className="label">Total Amount:</span>
                  <span className="price">{booking.totalPrice}</span>
                  <span className={`payment-status ${booking.paymentStatus}`}>
                    {booking.paymentStatus === 'paid' ? '✓ Paid' : '⏳ Payment Pending'}
                  </span>
                </div>

                <div className="booking-actions">
                  {activeTab === 'upcoming' && booking.status === 'confirmed' && (
                    <>
                      <button
                        className="action-btn check-in"
                        onClick={() => handleCheckIn(booking.id)}
                      >
                        Check-in
                      </button>
                      <button
                        className="action-btn download"
                        onClick={() => handleDownloadTicket(booking.id)}
                      >
                        <FontAwesomeIcon icon={faDownload} />
                        E-Ticket
                      </button>
                    </>
                  )}

                  {activeTab === 'upcoming' && booking.status === 'pending' && (
                    <button
                      className="action-btn cancel"
                      onClick={() => handleCancelBooking(booking.id)}
                    >
                      <FontAwesomeIcon icon={faTimesCircle} />
                      Cancel Booking
                    </button>
                  )}

                  {activeTab === 'past' && (
                    <>
                      <button
                        className="action-btn download"
                        onClick={() => handleDownloadTicket(booking.id)}
                      >
                        <FontAwesomeIcon icon={faDownload} />
                        Receipt
                      </button>
                      <button
                        className="action-btn print"
                        onClick={() => handlePrintTicket(booking.id)}
                      >
                        <FontAwesomeIcon icon={faPrint} />
                        Print
                      </button>
                    </>
                  )}

                  <button className="action-btn details">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}

          {activeTab === 'past' && bookings.past.map(booking => (
            <div key={booking.id} className="booking-card">
              <div className="booking-header">
                <div className="booking-id">
                  <span className="label">Booking Reference:</span>
                  <span className="value">{booking.id}</span>
                </div>
                <div className="booking-status">
                  {getStatusIcon(booking.status)}
                  <span>{getStatusText(booking.status)}</span>
                </div>
                <div className="booking-date">
                  <FontAwesomeIcon icon={faCalendarAlt} />
                  <span>Booked: {new Date(booking.bookingDate).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flights-list">
                {booking.flights.map((flight, index) => (
                  <div key={index} className="flight-item">
                    {index > 0 && <div className="flight-connector">⤷ Connecting Flight</div>}

                    <div className="flight-main">
                      <div className="airline-info">
                        <strong>{flight.airline}</strong>
                        <span className="flight-number">{flight.flightNumber}</span>
                      </div>

                      <div className="flight-route-detailed">
                        <div className="departure">
                          <div className="time">{flight.departureTime}</div>
                          <div className="date">{new Date(flight.departure).toLocaleDateString()}</div>
                          <div className="airport">
                            <FontAwesomeIcon icon={faMapMarkerAlt} />
                            {flight.from}
                          </div>
                        </div>

                        <div className="flight-duration">
                          <div className="line"></div>
                          <FontAwesomeIcon icon={faPlane} className="plane-icon" />
                          <div className="line"></div>
                        </div>

                        <div className="arrival">
                          <div className="time">{flight.arrivalTime}</div>
                          <div className="date">{new Date(flight.arrival).toLocaleDateString()}</div>
                          <div className="airport">
                            <FontAwesomeIcon icon={faMapMarkerAlt} />
                            {flight.to}
                          </div>
                        </div>
                      </div>

                      <div className="flight-details">
                        <div className="detail-item">
                          <FontAwesomeIcon icon={faChair} />
                          <span>Class: {flight.class}</span>
                        </div>
                        {flight.seat && (
                          <div className="detail-item">
                            <span>Seat: {flight.seat}</span>
                          </div>
                        )}
                        {flight.gate && (
                          <div className="detail-item">
                            <span>Gate: {flight.gate}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="passenger-summary">
                <h4>
                  <FontAwesomeIcon icon={faUser} />
                  Passengers ({booking.passengers.length})
                </h4>
                <div className="passenger-list">
                  {booking.passengers.map((passenger, idx) => (
                    <div key={idx} className="passenger-tag">
                      <span>{passenger.name}</span>
                      <small>({passenger.type})</small>
                    </div>
                  ))}
                </div>
              </div>

              <div className="booking-footer">
                <div className="price-info">
                  <span className="label">Total Amount:</span>
                  <span className="price">{booking.totalPrice}</span>
                  <span className={`payment-status ${booking.paymentStatus}`}>
                    {booking.paymentStatus === 'paid' ? '✓ Paid' : '⏳ Payment Pending'}
                  </span>
                </div>

                <div className="booking-actions">
                  {activeTab === 'upcoming' && booking.status === 'confirmed' && (
                    <>
                      <button
                        className="action-btn check-in"
                        onClick={() => handleCheckIn(booking.id)}
                      >
                        Check-in
                      </button>
                      <button
                        className="action-btn download"
                        onClick={() => handleDownloadTicket(booking.id)}
                      >
                        <FontAwesomeIcon icon={faDownload} />
                        E-Ticket
                      </button>
                    </>
                  )}

                  {activeTab === 'upcoming' && booking.status === 'pending' && (
                    <button
                      className="action-btn cancel"
                      onClick={() => handleCancelBooking(booking.id)}
                    >
                      <FontAwesomeIcon icon={faTimesCircle} />
                      Cancel Booking
                    </button>
                  )}

                  {activeTab === 'past' && (
                    <>
                      <button
                        className="action-btn download"
                        onClick={() => handleDownloadTicket(booking.id)}
                      >
                        <FontAwesomeIcon icon={faDownload} />
                        Receipt
                      </button>
                      <button
                        className="action-btn print"
                        onClick={() => handlePrintTicket(booking.id)}
                      >
                        <FontAwesomeIcon icon={faPrint} />
                        Print
                      </button>
                    </>
                  )}

                  <button className="action-btn details">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cancellation Modal */}
      {showCancelModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Cancel Booking</h3>
            <p>Are you sure you want to cancel this booking?</p>
            <p className="warning">Cancellation fees may apply based on the fare rules.</p>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowCancelModal(false)}>No, Keep It</button>
              <button className="confirm-btn" onClick={confirmCancellation}>Yes, Cancel Booking</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
