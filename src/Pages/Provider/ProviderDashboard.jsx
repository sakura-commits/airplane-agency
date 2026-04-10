import React from 'react';
import { DashboardLayout } from '../../Components/DashboardLayout';

const ProviderDashboard = ({ onLogout, user }) => {
  return (
    <DashboardLayout activeSection="overview" onNavigate={() => {}} onLogout={onLogout} user={user}>
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Provider Dashboard</h1>
          <p>Manage your services and offerings</p>
        </div>

        <div className="dashboard-content">
        <div className="dashboard-card">
          <h3>Service Listings</h3>
          <p>Manage your hotel, tour, and transportation services</p>
          <div className="card-stats">
            <div className="stat">
              <span className="stat-number">45</span>
              <span className="stat-label">Active Listings</span>
            </div>
            <div className="stat">
              <span className="stat-number">8</span>
              <span className="stat-label">New This Week</span>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <h3>Bookings & Revenue</h3>
          <p>Track reservations and earnings</p>
          <div className="card-stats">
            <div className="stat">
              <span className="stat-number">156</span>
              <span className="stat-label">Total Bookings</span>
            </div>
            <div className="stat">
              <span className="stat-number">$12,800</span>
              <span className="stat-label">Monthly Revenue</span>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <h3>Customer Reviews</h3>
          <p>Monitor feedback and ratings</p>
          <div className="card-stats">
            <div className="stat">
              <span className="stat-number">4.8</span>
              <span className="stat-label">Average Rating</span>
            </div>
            <div className="stat">
              <span className="stat-number">89</span>
              <span className="stat-label">Total Reviews</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </DashboardLayout>
  );
};

export default ProviderDashboard;