import React, { useState } from 'react';
import { DashboardLayout } from '../../Components/DashboardLayout';
import { useAgentStats, useRecentBookings, useMonthlyCommission } from '../../hooks/useAgentData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faCalendarCheck, faMoneyBillWave, faEye, faCheckCircle, faClock, faDownload } from '@fortawesome/free-solid-svg-icons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { motion } from 'framer-motion';
import { SkeletonStats, SkeletonTable } from '../../components/SkeletonLoader';
import { useToast } from '../../contexts/ToastContext';
import './AgentDashboard.css';

const AgentDashboard = ({ onLogout, user }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const { data: stats, isLoading: statsLoading } = useAgentStats();
  const { data: bookings, isLoading: bookingsLoading } = useRecentBookings();
  const { data: commissionData, isLoading: commissionLoading } = useMonthlyCommission();
  const { showToast } = useToast();

  if (statsLoading || bookingsLoading || commissionLoading) {
    return (
      <DashboardLayout activeSection="overview" onNavigate={() => {}} onLogout={onLogout} user={user}>
        <div className="agent-loading">
          <SkeletonStats count={4} />
          <div className="chart-card skeleton-chart">
            <div className="skeleton-line" style={{ width: '220px', height: '28px', marginBottom: '1rem' }} />
            <div className="skeleton-line" style={{ height: '300px' }} />
          </div>
          <SkeletonTable rows={4} cols={7} />
        </div>
      </DashboardLayout>
    );
  }

  const statCards = [
    { title: 'Active Customers', value: stats.activeCustomers, icon: faUsers, change: '+12%', color: '#1a237e' },
    { title: 'Pending Bookings', value: stats.pendingBookings, icon: faCalendarCheck, change: '+5', color: '#f59e0b' },
    { title: 'This Month Commission', value: `$${stats.commissionThisMonth.toLocaleString()}`, icon: faMoneyBillWave, change: '+18%', color: '#10b981' },
    { title: 'Total Earnings', value: `$${stats.totalEarnings.toLocaleString()}`, icon: faMoneyBillWave, change: '+$2,450', color: '#8b5cf6' },
  ];

  const getStatusBadge = (status) => {
    switch(status) {
      case 'confirmed': return <span className="status-badge confirmed"><FontAwesomeIcon icon={faCheckCircle} /> Confirmed</span>;
      case 'pending': return <span className="status-badge pending"><FontAwesomeIcon icon={faClock} /> Pending</span>;
      case 'completed': return <span className="status-badge completed"><FontAwesomeIcon icon={faCheckCircle} /> Completed</span>;
      default: return null;
    }
  };

  return (
    <DashboardLayout activeSection="overview" onNavigate={() => {}} onLogout={onLogout} user={user}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="agent-dashboard">
        <div className="dashboard-header">
          <h1>Agent Dashboard</h1>
          <p>Welcome back, {user?.name || 'Agent'}! Track your performance and manage bookings.</p>
        </div>

        {/* Stats Cards */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          className="stats-grid"
        >
          {statCards.map((stat, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.35 }}
              whileHover={{ y: -5 }}
              className="stat-card"
              style={{ borderTopColor: stat.color }}
            >
              <div className="stat-icon" style={{ background: stat.color }}><FontAwesomeIcon icon={stat.icon} /></div>
              <div className="stat-content">
                <h3>{stat.title}</h3>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-change positive">{stat.change} vs last month</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Commission Chart */}
        <div className="chart-card">
          <h2>Monthly Commission Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={commissionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `$${value}`} />
              <Tooltip formatter={(value) => [`$${value}`, 'Commission']} />
              <Line type="monotone" dataKey="commission" stroke="#1a237e" strokeWidth={2} dot={{ fill: '#1a237e', r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Bookings Table */}
        <div className="recent-bookings">
          <div className="section-header">
            <h2>Recent Bookings</h2>
            <button className="view-all-btn" onClick={() => showToast('View all bookings feature coming soon', 'info')}>
              View All <FontAwesomeIcon icon={faEye} />
            </button>
          </div>
          <div className="bookings-table-container">
            <table className="bookings-table">
              <thead>
                <tr><th>Booking ID</th><th>Customer</th><th>Tour</th><th>Date</th><th>Amount</th><th>Commission</th><th>Status</th></tr>
              </thead>
              <tbody>
                {bookings.map(booking => (
                  <tr key={booking.id}>
                    <td>{booking.id}</td>
                    <td>{booking.customer}</td>
                    <td>{booking.tour}</td>
                    <td>{booking.date}</td>
                    <td>${booking.amount}</td>
                    <td>${booking.commission}</td>
                    <td>{getStatusBadge(booking.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <button className="action-btn" onClick={() => showToast('Add customer feature', 'info')}>
              <span className="action-icon">➕</span> Add Customer
            </button>
            <button className="action-btn" onClick={() => showToast('Create booking feature', 'info')}>
              <span className="action-icon">📅</span> Create Booking
            </button>
            <button className="action-btn" onClick={() => showToast('Commission report', 'info')}>
              <span className="action-icon">💰</span> Commission Report
            </button>
            <button className="action-btn" onClick={() => showToast('Export data', 'info')}>
              <span className="action-icon">📊</span> Export Data
            </button>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default AgentDashboard;