import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserTie, faBuilding, faStar, faSearch, faFilter, faEdit, faTrash, faBan, faCheck, faEye, faPlus, faDownload, faEnvelope, faPhone, faCalendarAlt, faClock } from '@fortawesome/free-solid-svg-icons';
import { useUsers, useUpdateUserStatus } from '../../hooks/useUsers';
import { useToast } from '../../contexts/ToastContext';
import './AdminDashboard.css';

export function UserManagement() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { data: users, isLoading, error } = useUsers();
  const updateStatus = useUpdateUserStatus();
  const { showToast } = useToast();

  if (isLoading) return <div className="loading">Loading users...</div>;
  if (error) return <div className="error">Failed to load users</div>;

  const allUsers = [
    ...(users?.customers || []).map(u => ({ ...u, role: 'customer' })),
    ...(users?.agents || []).map(u => ({ ...u, role: 'agent' })),
    ...(users?.providers || []).map(u => ({ ...u, role: 'provider' })),
    ...(users?.guides || []).map(u => ({ ...u, role: 'guide' })),
  ];

  const getFilteredUsers = () => {
    let list = activeTab === 'all' ? allUsers : users?.[activeTab]?.map(u => ({ ...u, role: activeTab.slice(0, -1) })) || [];
    return list.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email?.toLowerCase().includes(searchTerm.toLowerCase()));
  };

  const handleStatusToggle = (user, role) => {
    const newStatus = user.status === 'active' ? 'inactive' : 'active';
    updateStatus.mutate({ role, userId: user.id, status: newStatus }, {
      onSuccess: () => showToast(`User ${newStatus === 'active' ? 'activated' : 'deactivated'}`, 'success'),
    });
  };

  const getStatusBadge = (status) => {
    return <span className={`status-badge ${status}`}>{status === 'active' ? <><FontAwesomeIcon icon={faCheck} /> Active</> : <><FontAwesomeIcon icon={faBan} /> Inactive</>}</span>;
  };

  return (
    <div className="user-management">
      <div className="management-header"><h1>User Management</h1><div className="header-actions"><button className="add-btn" onClick={() => showToast('Add user feature coming soon', 'info')}><FontAwesomeIcon icon={faPlus} /> Add New User</button><button className="export-btn"><FontAwesomeIcon icon={faDownload} /> Export</button></div></div>
      <div className="management-tabs">
        <button className={activeTab === 'all' ? 'active' : ''} onClick={() => setActiveTab('all')}>All Users ({allUsers.length})</button>
        <button className={activeTab === 'customers' ? 'active' : ''} onClick={() => setActiveTab('customers')}><FontAwesomeIcon icon={faUser} /> Customers ({users?.customers?.length || 0})</button>
        <button className={activeTab === 'agents' ? 'active' : ''} onClick={() => setActiveTab('agents')}><FontAwesomeIcon icon={faUserTie} /> Agents ({users?.agents?.length || 0})</button>
        <button className={activeTab === 'providers' ? 'active' : ''} onClick={() => setActiveTab('providers')}><FontAwesomeIcon icon={faBuilding} /> Providers ({users?.providers?.length || 0})</button>
        <button className={activeTab === 'guides' ? 'active' : ''} onClick={() => setActiveTab('guides')}><FontAwesomeIcon icon={faStar} /> Tour Guides ({users?.guides?.length || 0})</button>
      </div>
      <div className="search-bar"><FontAwesomeIcon icon={faSearch} className="search-icon" /><input type="text" placeholder="Search by name or email..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /><button className="filter-btn"><FontAwesomeIcon icon={faFilter} /> Filter</button></div>
      <div className="users-table-container">
        <table className="users-table"><thead><tr><th>User</th><th>Contact</th><th>Role</th><th>Details</th><th>Status</th><th>Actions</th></tr></thead><tbody>
          {getFilteredUsers().map(user => (
            <tr key={user.id}>
              <td><div className="user-info"><div className="user-avatar">{user.name.charAt(0)}</div><div><strong>{user.name}</strong><small>ID: {user.id}</small></div></div></td>
              <td><div className="contact-info"><div><FontAwesomeIcon icon={faEnvelope} /> {user.email}</div><div><FontAwesomeIcon icon={faPhone} /> {user.phone}</div></div></td>
              <td><span className="role-badge">{user.role}</span></td>
              <td>{user.bookings && <div>Bookings: {user.bookings}</div>}{user.commission && <div>Commission: {user.commission}</div>}{user.experience && <div>Experience: {user.experience}</div>}{user.listings && <div>Listings: {user.listings}</div>}{user.joined && <div><FontAwesomeIcon icon={faCalendarAlt} /> Joined: {user.joined}</div>}</td>
              <td>{getStatusBadge(user.status)}</td>
              <td><div className="action-buttons"><button className="action-btn edit" onClick={() => handleStatusToggle(user, activeTab === 'all' ? `${user.role}s` : activeTab)}><FontAwesomeIcon icon={user.status === 'active' ? faBan : faCheck} /></button><button className="action-btn delete" onClick={() => showToast('Delete feature coming', 'info')}><FontAwesomeIcon icon={faTrash} /></button></div></td>
            </tr>
          ))}
        </tbody></table>
      </div>
      <div className="pagination"><button disabled>Previous</button><span className="page-info">Page 1 of 5</span><button>Next</button></div>
    </div>
  );
}