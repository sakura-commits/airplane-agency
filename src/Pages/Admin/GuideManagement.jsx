import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus, faEdit, faTrash, faUserTie, faStar, faLanguage, faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { useGuides, useAddGuide, useUpdateGuide, useDeleteGuide } from '../../hooks/useGuides';
import { useToast } from '../../contexts/ToastContext';
import { motion, AnimatePresence } from 'framer-motion';

export function GuideManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const { data: guides, isLoading } = useGuides();
  const addGuide = useAddGuide();
  const updateGuide = useUpdateGuide();
  const deleteGuide = useDeleteGuide();
  const { showToast } = useToast();
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  const openEdit = (guide) => {
    setEditing(guide);
    setValue('name', guide.name);
    setValue('experience', guide.experience);
    setValue('languages', guide.languages);
    setValue('rating', guide.rating);
    setValue('status', guide.status);
    setModalOpen(true);
  };

  const onSubmit = (data) => {
    if (editing) {
      updateGuide.mutate({ ...data, id: editing.id, tours: editing.tours }, {
        onSuccess: () => { showToast('Guide updated', 'success'); setModalOpen(false); setEditing(null); reset(); },
      });
    } else {
      addGuide.mutate({ ...data, tours: 0 }, {
        onSuccess: () => { showToast('Guide added', 'success'); setModalOpen(false); reset(); },
      });
    }
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete guide ${name}?`)) deleteGuide.mutate(id, { onSuccess: () => showToast('Deleted', 'success') });
  };

  const filtered = guides?.filter(g => g.name.toLowerCase().includes(searchTerm.toLowerCase()));

  if (isLoading) return <div>Loading guides...</div>;

  return (
    <div className="management-page">
      <div className="management-header"><h1>Tour Guide Management</h1><button className="add-btn" onClick={() => { setEditing(null); reset(); setModalOpen(true); }}><FontAwesomeIcon icon={faPlus} /> Add Guide</button></div>
      <div className="stats-grid small">
        <div className="stat-card"><div className="stat-icon">👤</div><div><h3>Total Guides</h3><div className="stat-value">{guides?.length || 0}</div></div></div>
        <div className="stat-card"><div className="stat-icon">⭐</div><div><h3>Avg Rating</h3><div className="stat-value">4.8</div></div></div>
      </div>
      <div className="search-bar"><FontAwesomeIcon icon={faSearch} className="search-icon" /><input type="text" placeholder="Search guides..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>
      <div className="data-table-container">
        <table className="data-table">
          <thead><tr><th>Guide</th><th>Experience</th><th>Languages</th><th>Tours Led</th><th>Rating</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {filtered?.map(guide => (
              <tr key={guide.id}>
                <td><FontAwesomeIcon icon={faUserTie} /> {guide.name}</td>
                <td><FontAwesomeIcon icon={faBriefcase} /> {guide.experience}</td>
                <td><FontAwesomeIcon icon={faLanguage} /> {guide.languages}</td>
                <td>{guide.tours}</td>
                <td><FontAwesomeIcon icon={faStar} style={{ color: '#fbbf24' }} /> {guide.rating}</td>
                <td><span className={`status-badge ${guide.status}`}>{guide.status}</span></td>
                <td><div className="action-buttons"><button className="action-btn edit" onClick={() => openEdit(guide)}><FontAwesomeIcon icon={faEdit} /></button><button className="action-btn delete" onClick={() => handleDelete(guide.id, guide.name)}><FontAwesomeIcon icon={faTrash} /></button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AnimatePresence>{modalOpen && (<motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setModalOpen(false)}><motion.div className="modal-content" onClick={(e) => e.stopPropagation()}><h2>{editing ? 'Edit Guide' : 'Add Guide'}</h2><form onSubmit={handleSubmit(onSubmit)}><div className="form-group"><label>Name</label><input {...register('name', { required: true })} /></div><div className="form-group"><label>Experience</label><input {...register('experience', { required: true })} placeholder="e.g., 12 years" /></div><div className="form-group"><label>Languages</label><input {...register('languages', { required: true })} placeholder="English, Swahili" /></div><div className="form-group"><label>Rating</label><input type="number" step="0.1" {...register('rating', { required: true, min: 0, max: 5 })} /></div><div className="form-group"><label>Status</label><select {...register('status')}><option value="active">Active</option><option value="pending">Pending</option><option value="inactive">Inactive</option></select></div><div className="modal-actions"><button type="button" onClick={() => setModalOpen(false)} className="cancel-btn">Cancel</button><button type="submit" className="save-btn">{editing ? 'Update' : 'Add'}</button></div></form></motion.div></motion.div>)}</AnimatePresence>
    </div>
  );
}