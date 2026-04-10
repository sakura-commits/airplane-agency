import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEye, faEdit, faPrint, faFileInvoice, faCheckCircle, faTimesCircle, faClock, faRefresh, faDownload, faFilter } from '@fortawesome/free-solid-svg-icons';
import { useBookings, useUpdateBookingStatus } from '../../hooks/useBookings';
import { useToast } from '../../contexts/ToastContext';
import './AdminDashboard.css';

export function BookingManagement() {
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { data: bookings, isLoading } = useBookings();
  const updateStatus = useUpdateBookingStatus();
  const { showToast } = useToast();

  const getStatusBadge = (status) => {
    switch(status) {
      case 'confirmed': return <span className="status-badge confirmed"><FontAwesomeIcon icon={faCheckCircle} /> Confirmed</span>;
      case 'pending': return <span className="status-badge pending"><FontAwesomeIcon icon={faClock} /> Pending</span>;
      case 'cancelled': return <span className="status-badge cancelled"><FontAwesomeIcon icon={faTimesCircle} /> Cancelled</span>;
      case 'completed': return <span className="status-badge completed"><FontAwesomeIcon icon={faCheckCircle} /> Completed</span>;
      default: return null;
    }
  };

  const getPaymentBadge = (payment) => {
    if (payment === 'paid') return <span className="payment-badge paid">✓ Paid</span>;
    if (payment === 'pending') return <span className="payment-badge pending">⏳ Pending</span>;
    if (payment === 'refunded') return <span className="payment-badge refunded">↩ Refunded</span>;
    return null;
  };

  const handleStatusUpdate = (bookingId, newStatus) => {
    updateStatus.mutate({ bookingId, status: newStatus }, {
      onSuccess: () => showToast(`Booking ${newStatus}`, 'success'),
      onError: () => showToast('Update failed', 'error'),
    });
  };

  const filteredBookings = bookings?.filter(b => {
    const matchesStatus = filterStatus === 'all' || b.status === filterStatus;
    const matchesSearch = b.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.service.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  if (isLoading) return <div>Loading bookings...</div>;

  return (
    <div className="booking-management">
      <div className="management-header"><h1>Booking Management</h1><div className="header-actions"><button className="refresh-btn" onClick={() => window.location.reload()}><FontAwesomeIcon icon={faRefresh} /> Refresh</button><button className="export-btn"><FontAwesomeIcon icon={faDownload} /> Export</button></div></div>
      <div className="stats-grid small">
        <div className="stat-card"><div className="stat-icon">📅</div><div><h3>Total Bookings</h3><div className="stat-value">{bookings?.length || 0}</div></div></div>
        <div className="stat-card"><div className="stat-icon">✅</div><div><h3>Confirmed</h3><div className="stat-value">{bookings?.filter(b => b.status === 'confirmed').length || 0}</div></div></div>
        <div className="stat-card"><div className="stat-icon">⏳</div><div><h3>Pending</h3><div className="stat-value">{bookings?.filter(b => b.status === 'pending').length || 0}</div></div></div>
        <div className="stat-card"><div className="stat-icon">💰</div><div><h3>Revenue</h3><div className="stat-value">${bookings?.reduce((sum, b) => sum + b.amount, 0).toLocaleString() || 0}</div></div></div>
      </div>
      <div className="filters-section">
        <div className="search-bar"><FontAwesomeIcon icon={faSearch} className="search-icon" /><input type="text" placeholder="Search by ID, customer, service..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>
        <div className="filter-tabs">
          <button className={filterStatus === 'all' ? 'active' : ''} onClick={() => setFilterStatus('all')}>All</button>
          <button className={filterStatus === 'confirmed' ? 'active' : ''} onClick={() => setFilterStatus('confirmed')}>Confirmed</button>
          <button className={filterStatus === 'pending' ? 'active' : ''} onClick={() => setFilterStatus('pending')}>Pending</button>
          <button className={filterStatus === 'cancelled' ? 'active' : ''} onClick={() => setFilterStatus('cancelled')}>Cancelled</button>
        </div>
      </div>
      <div className="bookings-table-container">
        <table className="bookings-table"><thead><tr><th>Booking ID</th><th>Customer</th><th>Service</th><th>Date</th><th>Amount</th><th>Status</th><th>Payment</th><th>Actions</th></tr></thead><tbody>
          {filteredBookings?.map(booking => (
            <tr key={booking.id}>
              <td><strong>{booking.id}</strong></td>
              <td>{booking.customer}</td>
              <td><div className="service-info"><span className={`service-type ${booking.type}`}>{booking.type === 'tour' ? '🗺️' : booking.type === 'hotel' ? '🏨' : '🚗'}</span> {booking.service}</div></td>
              <td>{booking.date}</td>
              <td>${booking.amount}</td>
              <td>{getStatusBadge(booking.status)}</td>
              <td>{getPaymentBadge(booking.payment)}</td>
              <td><div className="action-buttons"><button className="action-btn view" onClick={() => showToast('View details coming', 'info')}><FontAwesomeIcon icon={faEye} /></button><button className="action-btn edit" onClick={() => handleStatusUpdate(booking.id, booking.status === 'confirmed' ? 'cancelled' : 'confirmed')}><FontAwesomeIcon icon={booking.status === 'confirmed' ? faTimesCircle : faCheckCircle} /></button><button className="action-btn print" onClick={() => showToast('Print invoice', 'info')}><FontAwesomeIcon icon={faPrint} /></button></div></td>
            </tr>
          ))}
        </tbody></table>
      </div>
      <div className="pagination"><button disabled>Previous</button><span className="page-info">Showing 1-{filteredBookings?.length || 0} of {bookings?.length || 0} bookings</span><button>Next</button></div>
    </div>
  );
}