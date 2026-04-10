import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers, faHotel, faCar, faMapMarkedAlt, faCalendarCheck,
  faMoneyBillWave, faArrowUp, faArrowDown, faEye,
  faDownload, faPrint
} from '@fortawesome/free-solid-svg-icons';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { motion } from 'framer-motion';
import { useDashboardStats } from '../../hooks/useDashboardStats';
import './AdminDashboard.css';

export function AdminOverview() {
  const { data: stats, isLoading, error } = useDashboardStats();

  if (isLoading) {
    return (
      <div className="admin-overview">
        <div className="loading-skeleton">Loading dashboard data...</div>
      </div>
    );
  }

  if (error) {
    return <div className="error-state">Failed to load dashboard. Please refresh.</div>;
  }

  const statCards = [
    { title: 'Total Users', value: stats.totalUsers, icon: faUsers, change: '+12%', trend: 'up' },
    { title: 'Total Bookings', value: stats.totalBookings, icon: faCalendarCheck, change: '+8%', trend: 'up' },
    { title: 'Revenue', value: `$${stats.totalRevenue.toLocaleString()}`, icon: faMoneyBillWave, change: '+15%', trend: 'up' },
    { title: 'Active Listings', value: stats.activeListings, icon: faHotel, change: '+5%', trend: 'up' },
    { title: 'Pending Approvals', value: stats.pendingApprovals, icon: faEye, change: '-2', trend: 'down' }
  ];

  // Sample data for charts
  const revenueData = [
    { month: 'Jan', revenue: 42000 },
    { month: 'Feb', revenue: 38000 },
    { month: 'Mar', revenue: 51000 },
    { month: 'Apr', revenue: 63000 },
    { month: 'May', revenue: 58000 },
    { month: 'Jun', revenue: 78000 },
  ];

  const bookingDistribution = [
    { name: 'Hotels', value: 45 },
    { name: 'Tours', value: 30 },
    { name: 'Cars', value: 25 },
  ];
  const COLORS = ['#1a237e', '#3949ab', '#5c6bc0'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="admin-overview"
    >
      <div className="overview-header">
        <h1>Dashboard Overview</h1>
        <div className="header-actions">
          <button className="export-btn"><FontAwesomeIcon icon={faDownload} /> Export Report</button>
          <button className="print-btn"><FontAwesomeIcon icon={faPrint} /> Print</button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {statCards.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="stat-card"
          >
            <div className="stat-icon"><FontAwesomeIcon icon={stat.icon} /></div>
            <div className="stat-content">
              <h3>{stat.title}</h3>
              <div className="stat-value">{stat.value}</div>
              <div className={`stat-change ${stat.trend}`}>
                <FontAwesomeIcon icon={stat.trend === 'up' ? faArrowUp : faArrowDown} />
                <span>{stat.change}</span>
                <span className="change-label">vs last month</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid with Recharts */}
      <div className="charts-grid">
        <div className="chart-card">
          <h2>Revenue Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `$${value/1000}k`} />
              <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
              <Bar dataKey="revenue" fill="#1a237e" radius={[8,8,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h2>Booking Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={bookingDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {bookingDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity - stays same but you can animate later */}
      <div className="recent-activity">
        <h2>Recent Activity</h2>
        <div className="activity-list">
          {stats.recentActivity.map(activity => (
            <div key={activity.id} className="activity-item">
              <div className={`activity-icon ${activity.type}`}>
                {activity.type === 'booking' && '📅'}
                {activity.type === 'provider' && '🏢'}
                {activity.type === 'payment' && '💰'}
                {activity.type === 'guide' && '👤'}
              </div>
              <div className="activity-details">
                <p className="activity-description">
                  <strong>{activity.user}</strong> {activity.action || (activity.type === 'booking' && 'booked')}
                  {activity.service && <span> {activity.service}</span>}
                  {activity.amount && <span> for {activity.amount}</span>}
                </p>
                <span className="activity-time">{activity.time}</span>
              </div>
              {activity.status && <span className={`status-badge ${activity.status}`}>{activity.status}</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions - unchanged */}
      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          {/* ... existing quick action buttons ... */}
        </div>
      </div>
    </motion.div>
  );
}