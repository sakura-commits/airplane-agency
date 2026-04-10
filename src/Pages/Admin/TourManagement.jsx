import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus, faEdit, faTrash, faMapMarkedAlt, faClock, faUsers, faStar } from '@fortawesome/free-solid-svg-icons';
import { useTours, useAddTour, useUpdateTour, useDeleteTour } from '../../hooks/useTours';
import { useToast } from '../../contexts/ToastContext';
import { motion, AnimatePresence } from 'framer-motion';

export function TourManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const { data: tours, isLoading } = useTours();
  const addTour = useAddTour();
  const updateTour = useUpdateTour();
  const deleteTour = useDeleteTour();
  const { showToast } = useToast();
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  const openEdit = (tour) => {
    setEditing(tour);
    Object.keys(tour).forEach(key => setValue(key, tour[key]));
    setModalOpen(true);
  };

  const onSubmit = (data) => {
    if (editing) {
      updateTour.mutate({ ...data, id: editing.id }, {
        onSuccess: () => { showToast('Tour updated', 'success'); setModalOpen(false); setEditing(null); reset(); },
        onError: () => showToast('Update failed', 'error'),
      });
    } else {
      addTour.mutate(data, {
        onSuccess: () => { showToast('Tour added', 'success'); setModalOpen(false); reset(); },
        onError: () => showToast('Add failed', 'error'),
      });
    }
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) deleteTour.mutate(id, { onSuccess: () => showToast('Deleted', 'success') });
  };

  const filtered = tours?.filter(t => t.name.toLowerCase().includes(searchTerm.toLowerCase()));

  if (isLoading) return <div>Loading tours...</div>;

  return (
    <div className="management-page">
      <div className="management-header"><h1>Tour Management</h1><button className="add-btn" onClick={() => { setEditing(null); reset(); setModalOpen(true); }}><FontAwesomeIcon icon={faPlus} /> Add Tour</button></div>
      <div className="stats-grid small">
        <div className="stat-card"><div className="stat-icon">🗺️</div><div><h3>Total Tours</h3><div className="stat-value">{tours?.length || 0}</div></div></div>
        <div className="stat-card"><div className="stat-icon">⭐</div><div><h3>Avg Rating</h3><div className="stat-value">4.8</div></div></div>
      </div>
      <div className="search-bar"><FontAwesomeIcon icon={faSearch} className="search-icon" /><input type="text" placeholder="Search tours..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>
      <div className="data-table-container">
        <table className="data-table">
          <thead><tr><th>Tour</th><th>Duration</th><th>Max Group</th><th>Price</th><th>Rating</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {filtered?.map(tour => (
              <tr key={tour.id}>
                <td><FontAwesomeIcon icon={faMapMarkedAlt} /> {tour.name}</td>
                <td><FontAwesomeIcon icon={faClock} /> {tour.duration}</td>
                <td><FontAwesomeIcon icon={faUsers} /> {tour.maxGroup}</td>
                <td>${tour.price}</td>
                <td><FontAwesomeIcon icon={faStar} style={{ color: '#fbbf24' }} /> {tour.rating}</td>
                <td><span className={`status-badge ${tour.status}`}>{tour.status}</span></td>
                <td><div className="action-buttons"><button className="action-btn edit" onClick={() => openEdit(tour)}><FontAwesomeIcon icon={faEdit} /></button><button className="action-btn delete" onClick={() => handleDelete(tour.id, tour.name)}><FontAwesomeIcon icon={faTrash} /></button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AnimatePresence>{modalOpen && (<motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setModalOpen(false)}><motion.div className="modal-content" onClick={(e) => e.stopPropagation()}><h2>{editing ? 'Edit Tour' : 'Add Tour'}</h2><form onSubmit={handleSubmit(onSubmit)}><div className="form-group"><label>Tour Name</label><input {...register('name', { required: true })} /></div><div className="form-group"><label>Duration</label><input {...register('duration', { required: true })} /></div><div className="form-group"><label>Max Group Size</label><input type="number" {...register('maxGroup', { required: true })} /></div><div className="form-group"><label>Price ($)</label><input type="number" {...register('price', { required: true })} /></div><div className="form-group"><label>Status</label><select {...register('status')}><option value="active">Active</option><option value="pending">Pending</option><option value="inactive">Inactive</option></select></div><div className="modal-actions"><button type="button" onClick={() => setModalOpen(false)} className="cancel-btn">Cancel</button><button type="submit" className="save-btn">{editing ? 'Update' : 'Add'}</button></div></form></motion.div></motion.div>)}</AnimatePresence>
    </div>
  );
}