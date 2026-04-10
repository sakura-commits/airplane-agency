import React, { useState } from 'react';
import { DashboardLayout } from '../../Components/DashboardLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faStar, faMoneyBillWave, faUsers, faClock, faCheckCircle, faChartLine, faComment } from '@fortawesome/free-solid-svg-icons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { useGuideStats, useUpcomingTours, usePastTours, useEarningsHistory, useReviews, useSchedule, useUpdateTourStatus } from '../../hooks/useGuideData';
import { useToast } from '../../contexts/ToastContext';
import './GuideDashboard.css';

const GuideDashboard = ({ onLogout, user }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const { data: stats, isLoading: statsLoading } = useGuideStats();
  const { data: upcomingTours, isLoading: upcomingLoading } = useUpcomingTours();
  const { data: pastTours, isLoading: pastLoading } = usePastTours();
  const { data: earningsHistory, isLoading: earningsLoading } = useEarningsHistory();
  const { data: reviews, isLoading: reviewsLoading } = useReviews();
  const { data: schedule, isLoading: scheduleLoading } = useSchedule();
  const updateStatus = useUpdateTourStatus();
  const { showToast } = useToast();

  if (statsLoading || upcomingLoading || pastLoading || earningsLoading || reviewsLoading || scheduleLoading) {
    return (
      <DashboardLayout activeSection="overview" onNavigate={() => {}} onLogout={onLogout} user={user}>
        <div className="guide-loading">Loading dashboard data...</div>
      </DashboardLayout>
    );
  }

  // Rating distribution for pie chart
  const ratingData = Object.entries(stats.ratingDistribution).map(([stars, count]) => ({
    name: `${stars} Star`,
    value: count,
    stars: parseInt(stars),
  })).filter(d => d.value > 0);
  const COLORS = ['#10b981', '#34d399', '#6ee7b7', '#a7f3d0', '#d1fae5'];

  // Stat cards
  const statCards = [
    { title: 'Total Tours', value: stats.totalTours, icon: faCalendarAlt, color: '#1a237e', change: '+5' },
    { title: 'Upcoming Tours', value: stats.upcomingTours, icon: faClock, color: '#f59e0b', change: '+2' },
    { title: 'Average Rating', value: stats.averageRating, icon: faStar, color: '#fbbf24', change: '+0.1' },
    { title: 'Total Earnings', value: `$${stats.totalEarnings.toLocaleString()}`, icon: faMoneyBillWave, color: '#10b981', change: '+$1,850' },
  ];

  const getStatusBadge = (status) => {
    return <span className={`tour-status ${status}`}>{status === 'confirmed' ? 'Confirmed' : 'Pending'}</span>;
  };

  return (
    <DashboardLayout activeSection="overview" onNavigate={() => {}} onLogout={onLogout} user={user}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="guide-dashboard">
        <div className="dashboard-header">
          <h1>Guide Dashboard</h1>
          <p>Welcome back, {user?.name || 'Guide'}! Manage your tours and track performance.</p>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          {statCards.map((stat, idx) => (
            <motion.div key={idx} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: idx * 0.1 }} className="stat-card" style={{ borderTopColor: stat.color }}>
              <div className="stat-icon" style={{ background: stat.color }}><FontAwesomeIcon icon={stat.icon} /></div>
              <div className="stat-content"><h3>{stat.title}</h3><div className="stat-value">{stat.value}</div><div className="stat-change positive">{stat.change} vs last month</div></div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="guide-tabs">
          <button className={activeTab === 'overview' ? 'active' : ''} onClick={() => setActiveTab('overview')}>Overview</button>
          <button className={activeTab === 'upcoming' ? 'active' : ''} onClick={() => setActiveTab('upcoming')}>Upcoming Tours</button>
          <button className={activeTab === 'past' ? 'active' : ''} onClick={() => setActiveTab('past')}>Past Tours</button>
          <button className={activeTab === 'earnings' ? 'active' : ''} onClick={() => setActiveTab('earnings')}>Earnings</button>
          <button className={activeTab === 'reviews' ? 'active' : ''} onClick={() => setActiveTab('reviews')}>Reviews</button>
          <button className={activeTab === 'schedule' ? 'active' : ''} onClick={() => setActiveTab('schedule')}>Schedule</button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="tab-content">
            <div className="charts-row">
              <div className="chart-card">
                <h2><FontAwesomeIcon icon={faChartLine} /> Monthly Earnings</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={earningsHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(v) => `$${v}`} />
                    <Tooltip formatter={(v) => [`$${v}`, 'Earnings']} />
                    <Line type="monotone" dataKey="earnings" stroke="#1a237e" strokeWidth={2} dot={{ fill: '#1a237e', r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="chart-card">
                <h2><FontAwesomeIcon icon={faStar} /> Rating Distribution</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={ratingData} cx="50%" cy="50%" labelLine={false} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} outerRadius={80} dataKey="value">
                      {ratingData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Reviews Preview */}
            <div className="recent-reviews">
              <h2>Recent Reviews</h2>
              <div className="reviews-list">
                {reviews.slice(0, 3).map(review => (
                  <div key={review.id} className="review-item">
                    <div className="review-header"><strong>{review.client}</strong><div className="rating">{'⭐'.repeat(Math.floor(review.rating))} {review.rating}</div><span className="review-date">{review.date}</span></div>
                    <p>{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Upcoming Tours Tab */}
        {activeTab === 'upcoming' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="tab-content">
            <div className="tours-table-container">
              <table className="tours-table">
                <thead><tr><th>Tour Name</th><th>Date</th><th>Client</th><th>Group Size</th><th>Status</th><th>Actions</th></tr></thead>
                <tbody>
                  {upcomingTours.map(tour => (
                    <tr key={tour.id}>
                      <td><FontAwesomeIcon icon={faCalendarAlt} /> {tour.tourName}</td>
                      <td>{tour.date}</td>
                      <td>{tour.client}</td>
                      <td>{tour.groupSize} people</td>
                      <td>{getStatusBadge(tour.status)}</td>
                      <td>
                        {tour.status === 'pending' && (
                          <button className="confirm-btn" onClick={() => updateStatus.mutate({ tourId: tour.id, status: 'confirmed' }, { onSuccess: () => showToast('Tour confirmed', 'success') })}>Confirm</button>
                        )}
                        {tour.status === 'confirmed' && (
                          <button className="complete-btn" onClick={() => showToast('Mark as completed feature coming', 'info')}>Mark Completed</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Past Tours Tab */}
        {activeTab === 'past' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="tab-content">
            <div className="tours-table-container">
              <table className="tours-table">
                <thead><tr><th>Tour Name</th><th>Date</th><th>Client</th><th>Group Size</th><th>Rating Given</th></tr></thead>
                <tbody>
                  {pastTours.map(tour => (
                    <tr key={tour.id}>
                      <td><FontAwesomeIcon icon={faCalendarAlt} /> {tour.tourName}</td>
                      <td>{tour.date}</td>
                      <td>{tour.client}</td>
                      <td>{tour.groupSize} people</td>
                      <td><div className="rating">{'⭐'.repeat(Math.floor(tour.rating))} {tour.rating}</div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Earnings Tab */}
        {activeTab === 'earnings' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="tab-content">
            <div className="earnings-summary">
              <div className="earnings-card"><h3>Total Earnings</h3><div className="big-number">${stats.totalEarnings.toLocaleString()}</div></div>
              <div className="earnings-card"><h3>This Month</h3><div className="big-number">${stats.thisMonthEarnings.toLocaleString()}</div></div>
            </div>
            <div className="chart-card full-width">
              <h2>Earnings Trend</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={earningsHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(v) => `$${v}`} />
                  <Tooltip formatter={(v) => [`$${v}`, 'Earnings']} />
                  <Bar dataKey="earnings" fill="#1a237e" radius={[8,8,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="tab-content">
            <div className="reviews-full-list">
              {reviews.map(review => (
                <div key={review.id} className="review-card">
                  <div className="review-header"><strong>{review.client}</strong><div className="rating">{'⭐'.repeat(Math.floor(review.rating))} {review.rating}</div><span>{review.date}</span></div>
                  <p>{review.comment}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Schedule Tab */}
        {activeTab === 'schedule' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="tab-content">
            <div className="schedule-grid">
              {schedule.map(item => (
                <div key={item.id} className="schedule-card">
                  <div className="schedule-day">{item.day}</div>
                  <div className="schedule-time"><FontAwesomeIcon icon={faClock} /> {item.time}</div>
                  <div className="schedule-tour"><strong>{item.tour}</strong></div>
                  <div className="schedule-client">with {item.client}</div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </DashboardLayout>
  );
};

export default GuideDashboard;