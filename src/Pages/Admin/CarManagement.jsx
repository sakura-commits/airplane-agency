import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus, faEdit, faTrash, faCar, faMapMarkerAlt, faCogs, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { useCars, useAddCar, useUpdateCar, useDeleteCar } from '../../hooks/useCars';
import { useToast } from '../../contexts/ToastContext';
import { motion, AnimatePresence } from 'framer-motion';

export function CarManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCar, setEditingCar] = useState(null);
  const { data: cars, isLoading } = useCars();
  const addCar = useAddCar();
  const updateCar = useUpdateCar();
  const deleteCar = useDeleteCar();
  const { showToast } = useToast();
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  const openEditModal = (car) => {
    setEditingCar(car);
    setValue('name', car.name);
    setValue('type', car.type);
    setValue('price', car.price);
    setValue('transmission', car.transmission);
    setValue('seats', car.seats);
    setValue('location', car.location);
    setValue('status', car.status);
    setModalOpen(true);
  };

  const onSubmit = (data) => {
    if (editingCar) {
      updateCar.mutate({ ...data, id: editingCar.id }, {
        onSuccess: () => {
          showToast('Car updated successfully', 'success');
          setModalOpen(false);
          setEditingCar(null);
          reset();
        },
        onError: () => showToast('Update failed', 'error'),
      });
    } else {
      addCar.mutate(data, {
        onSuccess: () => {
          showToast('Car added successfully', 'success');
          setModalOpen(false);
          reset();
        },
        onError: () => showToast('Add failed', 'error'),
      });
    }
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      deleteCar.mutate(id, {
        onSuccess: () => showToast('Car deleted', 'success'),
        onError: () => showToast('Delete failed', 'error'),
      });
    }
  };

  const filteredCars = cars?.filter(car =>
    car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <div className="loading">Loading cars...</div>;

  return (
    <div className="management-page">
      <div className="management-header">
        <h1>Car Rental Management</h1>
        <button className="add-btn" onClick={() => { setEditingCar(null); reset(); setModalOpen(true); }}>
          <FontAwesomeIcon icon={faPlus} /> Add Car
        </button>
      </div>

      <div className="stats-grid small">
        <div className="stat-card"><div className="stat-icon">🚗</div><div><h3>Total Cars</h3><div className="stat-value">{cars?.length || 0}</div></div></div>
        <div className="stat-card"><div className="stat-icon">✅</div><div><h3>Active</h3><div className="stat-value">{cars?.filter(c => c.status === 'active').length || 0}</div></div></div>
        <div className="stat-card"><div className="stat-icon">⏳</div><div><h3>Pending</h3><div className="stat-value">{cars?.filter(c => c.status === 'pending').length || 0}</div></div></div>
      </div>

      <div className="search-bar">
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
        <input type="text" placeholder="Search by name, type, or location..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>

      <div className="data-table-container">
        <table className="data-table">
          <thead><tr><th>Car</th><th>Type</th><th>Location</th><th>Price/Day</th><th>Transmission</th><th>Seats</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {filteredCars?.map(car => (
              <tr key={car.id}>
                <td><FontAwesomeIcon icon={faCar} /> {car.name}</td>
                <td>{car.type}</td>
                <td><FontAwesomeIcon icon={faMapMarkerAlt} /> {car.location}</td>
                <td>${car.price}</td>
                <td><FontAwesomeIcon icon={faCogs} /> {car.transmission}</td>
                <td><FontAwesomeIcon icon={faUserFriends} /> {car.seats}</td>
                <td><span className={`status-badge ${car.status}`}>{car.status}</span></td>
                <td><div className="action-buttons"><button className="action-btn edit" onClick={() => openEditModal(car)}><FontAwesomeIcon icon={faEdit} /></button><button className="action-btn delete" onClick={() => handleDelete(car.id, car.name)}><FontAwesomeIcon icon={faTrash} /></button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {modalOpen && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setModalOpen(false)}>
            <motion.div className="modal-content" initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} onClick={(e) => e.stopPropagation()}>
              <h2>{editingCar ? 'Edit Car' : 'Add New Car'}</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group"><label>Car Name</label><input {...register('name', { required: true })} /></div>
                <div className="form-group"><label>Type</label><input {...register('type', { required: true })} /></div>
                <div className="form-group"><label>Location</label><input {...register('location', { required: true })} /></div>
                <div className="form-group"><label>Price per day ($)</label><input type="number" {...register('price', { required: true, min: 1 })} /></div>
                <div className="form-group"><label>Transmission</label><select {...register('transmission')}><option>Auto</option><option>Manual</option></select></div>
                <div className="form-group"><label>Seats</label><input type="number" {...register('seats', { required: true, min: 1 })} /></div>
                <div className="form-group"><label>Status</label><select {...register('status')}><option value="active">Active</option><option value="pending">Pending</option><option value="inactive">Inactive</option></select></div>
                <div className="modal-actions"><button type="button" onClick={() => setModalOpen(false)} className="cancel-btn">Cancel</button><button type="submit" className="save-btn">{editingCar ? 'Update' : 'Add'}</button></div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}