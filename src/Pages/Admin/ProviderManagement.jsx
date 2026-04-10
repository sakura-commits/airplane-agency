import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBuilding,
  faCheckCircle,
  faTimesCircle,
  faClock,
  faEye,
  faEdit,
  faTrash,
  faPlus,
  faSearch,
  faFilter,
  faStar,
  faMapMarkerAlt,
  faPhone,
  faEnvelope
} from '@fortawesome/free-solid-svg-icons';
import './AdminDashboard.css';

export function ProviderManagement() {
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const providers = [
    {
      id: 1,
      name: 'Zanzibar Beach Resort',
      type: 'hotel',
      email: 'reservations@zanzibarresort.com',
      phone: '+255 767 890 123',
      location: 'Zanzibar',
      listings: 24,
      rating: 4.8,
      status: 'active',
      joined: '2024-01-15'
    },
    {
      id: 2,
      name: 'Serengeti Safari Camps',
      type: 'hotel',
      email: 'book@serengeticamps.com',
      phone: '+255 778 901 234',
      location: 'Serengeti',
      listings: 12,
      rating: 4.9,
      status: 'active',
      joined: '2023-11-20'
    },
    {
      id: 3,
      name: 'Kilimanjaro Car Rentals',
      type: 'car',
      email: 'rent@kilimanjarocars.com',
      phone: '+255 789 012 345',
      location: 'Moshi',
      listings: 35,
      rating: 4.6,
      status: 'pending',
      joined: '2024-02-10'
    },
    {
      id: 4,
      name: 'Tanzania Tour Experts',
      type: 'tour',
      email: 'info@tzexperts.com',
      phone: '+255 790 123 456',
      location: 'Arusha',
      listings: 18,
      rating: 4.7,
      status: 'inactive',
      joined: '2023-09-05'
    }
  ];

  const getProviderIcon = (type) => {
    switch(type) {
      case 'hotel': return '🏨';
      case 'car': return '🚗';
      case 'tour': return '🗺️';
      default: return '🏢';
    }
  };

  return (
    <div className="provider-management">
      <div className="management-header">
        <h1>Service Provider Management</h1>
        <button className="add-btn">
          <FontAwesomeIcon icon={faPlus} />
          Add Provider
        </button>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid small">
        <div className="stat-card">
          <div className="stat-icon">🏢</div>
          <div className="stat-content">
            <h3>Total Providers</h3>
            <div className="stat-value">48</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>Active</h3>
            <div className="stat-value">32</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <h3>Pending</h3>
            <div className="stat-value">8</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>Total Listings</h3>
            <div className="stat-value">89</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="search-bar">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            placeholder="Search providers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-tabs">
          <button className={filterStatus === 'all' ? 'active' : ''} onClick={() => setFilterStatus('all')}>
            All
          </button>
          <button className={filterStatus === 'active' ? 'active' : ''} onClick={() => setFilterStatus('active')}>
            Active
          </button>
          <button className={filterStatus === 'pending' ? 'active' : ''} onClick={() => setFilterStatus('pending')}>
            Pending
          </button>
          <button className={filterStatus === 'inactive' ? 'active' : ''} onClick={() => setFilterStatus('inactive')}>
            Inactive
          </button>
        </div>
      </div>

      {/* Providers Grid */}
      <div className="providers-grid">
        {providers.map(provider => (
          <div key={provider.id} className="provider-card">
            <div className="provider-header">
              <div className="provider-type">
                <span className="type-icon">{getProviderIcon(provider.type)}</span>
                <span className="type-label">{provider.type}</span>
              </div>
              <span className={`status-badge ${provider.status}`}>
                {provider.status === 'active' && <FontAwesomeIcon icon={faCheckCircle} />}
                {provider.status === 'pending' && <FontAwesomeIcon icon={faClock} />}
                {provider.status === 'inactive' && <FontAwesomeIcon icon={faTimesCircle} />}
                {provider.status}
              </span>
            </div>

            <div className="provider-body">
              <h3 className="provider-name">{provider.name}</h3>

              <div className="provider-details">
                <div className="detail-item">
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                  <span>{provider.location}</span>
                </div>
                <div className="detail-item">
                  <FontAwesomeIcon icon={faEnvelope} />
                  <span>{provider.email}</span>
                </div>
                <div className="detail-item">
                  <FontAwesomeIcon icon={faPhone} />
                  <span>{provider.phone}</span>
                </div>
                <div className="detail-item">
                  <FontAwesomeIcon icon={faBuilding} />
                  <span>{provider.listings} listings</span>
                </div>
              </div>

              <div className="provider-rating">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < Math.floor(provider.rating) ? 'star-filled' : 'star-empty'}>★</span>
                  ))}
                </div>
                <span className="rating-value">{provider.rating}</span>
              </div>
            </div>

            <div className="provider-footer">
              <div className="action-buttons">
                <button className="action-btn view" title="View Details">
                  <FontAwesomeIcon icon={faEye} />
                </button>
                <button className="action-btn edit" title="Edit">
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button className="action-btn delete" title="Delete">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
              <small className="joined-date">Joined: {provider.joined}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}