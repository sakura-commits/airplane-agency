import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus, faEdit, faTrash, faEye, faCheck, faTimes, faHotel, faMapMarkerAlt, faStar } from '@fortawesome/free-solid-svg-icons';
import { useHotels, useAddHotel } from '../../hooks/useHotels';
import { useToast } from '../../contexts/ToastContext';
import { motion, AnimatePresence } from 'framer-motion';
import './AdminDashboard.css';

export function HotelManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const { data: hotels, isLoading, error } = useHotels();
  const addHotelMutation = useAddHotel();
  const { showToast } = useToast();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    addHotelMutation.mutate(data, {
      onSuccess: () => {
        showToast('Hotel added successfully!', 'success');
        setShowModal(false);
        reset();
      },
      onError: () => showToast('Failed to add hotel', 'error'),
    });
  };

  const filteredHotels = hotels?.filter(hotel =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <div className="loading">Loading hotels...</div>;
  if (error) return <div className="error">Failed to load hotels</div>;

  return (
    <div className="hotel-management">
      <div className="management-header">
        <h1>Hotel Management</h1>
        <div className="header-actions">
          <button className="add-btn" onClick={() => setShowModal(true)}>
            <FontAwesomeIcon icon={faPlus} /> Add Hotel
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid small">
        <div className="stat-card"><div className="stat-icon">🏨</div><div><h3>Total Hotels</h3><div className="stat-value">{hotels.length}</div></div></div>
        <div className="stat-card"><div className="stat-icon">✅</div><div><h3>Active</h3><div className="stat-value">{hotels.filter(h => h.status === 'active').length}</div></div></div>
        <div className="stat-card"><div className="stat-icon">⏳</div><div><h3>Pending</h3><div className="stat-value">{hotels.filter(h => h.status === 'pending').length}</div></div></div>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
        <input type="text" placeholder="Search by hotel name or location..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>

      {/* Hotels Table */}
      <div className="hotels-table-container">
        <table className="hotels-table">
          <thead><tr><th>Hotel</th><th>Location</th><th>Price/Night</th><th>Rating</th><th>Rooms</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {filteredHotels.map(hotel => (
              <tr key={hotel.id}>
                <td><div className="hotel-info"><FontAwesomeIcon icon={faHotel} /> {hotel.name}</div></td>
                <td><FontAwesomeIcon icon={faMapMarkerAlt} /> {hotel.location}</td>
                <td>${hotel.price}</td>
                <td><div className="rating"><FontAwesomeIcon icon={faStar} className="star-filled" /> {hotel.rating}</div></td>
                <td>{hotel.rooms}</td>
                <td><span className={`status-badge ${hotel.status}`}>{hotel.status === 'active' ? 'Active' : hotel.status === 'pending' ? 'Pending' : 'Inactive'}</span></td>
                <td><div className="action-buttons"><button className="action-btn edit"><FontAwesomeIcon icon={faEdit} /></button><button className="action-btn delete"><FontAwesomeIcon icon={faTrash} /></button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Hotel Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowModal(false)}>
            <motion.div className="modal-content" initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }} onClick={(e) => e.stopPropagation()}>
              <h2>Add New Hotel</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group"><label>Hotel Name</label><input {...register('name', { required: 'Name required' })} /><span className="error">{errors.name?.message}</span></div>
                <div className="form-group"><label>Location</label><input {...register('location', { required: 'Location required' })} /></div>
                <div className="form-group"><label>Price per night ($)</label><input type="number" {...register('price', { required: true, min: 1 })} /></div>
                <div className="form-group"><label>Number of Rooms</label><input type="number" {...register('rooms', { required: true })} /></div>
                <div className="form-group"><label>Status</label><select {...register('status')}><option value="active">Active</option><option value="pending">Pending</option><option value="inactive">Inactive</option></select></div>
                <div className="modal-actions"><button type="button" onClick={() => setShowModal(false)} className="cancel-btn">Cancel</button><button type="submit" className="save-btn" disabled={addHotelMutation.isPending}>{addHotelMutation.isPending ? 'Adding...' : 'Add Hotel'}</button></div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}