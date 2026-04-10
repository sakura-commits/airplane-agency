import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTachometerAlt,
  faUsers,
  faHotel,
  faCar,
  faMapMarkedAlt,
  faCalendarCheck,
  faMoneyBillWave,
  faChartLine,
  faCog,
  faSignOutAlt,
  faUserTie,
  faBuilding,
  faStar,
  faBell,
  faSearch,
  faBars,
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './DashboardLayout.css';

export function DashboardLayout({ children, activeSection, onNavigate, onLogout, user }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const getMenuItems = () => {
    switch(user?.role) {
      case 'super_admin':
      case 'admin':
      case 'manager':
        return [
          { id: 'overview', label: 'Dashboard', icon: faTachometerAlt, path: '/admin' },
          { id: 'users', label: 'User Management', icon: faUsers, path: '/admin/users' },
          { id: 'providers', label: 'Service Providers', icon: faBuilding, path: '/admin/providers' },
          { id: 'hotels', label: 'Hotels', icon: faHotel, path: '/admin/hotels' },
          { id: 'cars', label: 'Car Rentals', icon: faCar, path: '/admin/cars' },
          { id: 'tours', label: 'Tours', icon: faMapMarkedAlt, path: '/admin/tours' },
          { id: 'guides', label: 'Tour Guides', icon: faUserTie, path: '/admin/guides' },
          { id: 'bookings', label: 'Bookings', icon: faCalendarCheck, path: '/admin/bookings' },
          { id: 'payments', label: 'Payments', icon: faMoneyBillWave, path: '/admin/payments' },
          { id: 'commissions', label: 'Commissions', icon: faStar, path: '/admin/commissions' },
          { id: 'reports', label: 'Reports', icon: faChartLine, path: '/admin/reports' },
          { id: 'settings', label: 'Settings', icon: faCog, path: '/admin/settings' }
        ];

      case 'agent':
        return [
          { id: 'overview', label: 'Dashboard', icon: faTachometerAlt, path: '/agent/dashboard' },
          { id: 'customers', label: 'My Customers', icon: faUsers, path: '/agent/customers' },
          { id: 'bookings', label: 'Bookings', icon: faCalendarCheck, path: '/agent/bookings' },
          { id: 'commissions', label: 'Commissions', icon: faStar, path: '/agent/commissions' },
          { id: 'reports', label: 'Reports', icon: faChartLine, path: '/agent/reports' },
          { id: 'settings', label: 'Settings', icon: faCog, path: '/agent/settings' }
        ];

      case 'provider':
        return [
          { id: 'overview', label: 'Dashboard', icon: faTachometerAlt, path: '/provider/dashboard' },
          { id: 'listings', label: 'My Listings', icon: faHotel, path: '/provider/listings' },
          { id: 'bookings', label: 'Bookings', icon: faCalendarCheck, path: '/provider/bookings' },
          { id: 'reviews', label: 'Reviews', icon: faStar, path: '/provider/reviews' },
          { id: 'earnings', label: 'Earnings', icon: faMoneyBillWave, path: '/provider/earnings' },
          { id: 'settings', label: 'Settings', icon: faCog, path: '/provider/settings' }
        ];

      case 'guide':
        return [
          { id: 'overview', label: 'Dashboard', icon: faTachometerAlt, path: '/guide/dashboard' },
          { id: 'tours', label: 'My Tours', icon: faMapMarkedAlt, path: '/guide/tours' },
          { id: 'schedule', label: 'Schedule', icon: faCalendarCheck, path: '/guide/schedule' },
          { id: 'earnings', label: 'Earnings', icon: faMoneyBillWave, path: '/guide/earnings' },
          { id: 'reviews', label: 'Reviews', icon: faStar, path: '/guide/reviews' },
          { id: 'settings', label: 'Settings', icon: faCog, path: '/guide/settings' }
        ];

      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  const handleLogout = () => {
    console.log('DashboardLayout: handleLogout called, onLogout=', onLogout);
    if (typeof onLogout === 'function') {
      onLogout();
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('adminAuthenticated');
      navigate('/auth');
    }
  };

  return (
    <div className={`dashboard-layout ${sidebarCollapsed ? 'collapsed' : ''}`}>
      <button className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
        <FontAwesomeIcon icon={faBars} />
      </button>

      <aside className={`dashboard-sidebar ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo">
            <span className="logo-icon">✈️</span>
            {!sidebarCollapsed && <span className="logo-text">AirKulty</span>}
          </div>
          <button className="collapse-btn" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
            <FontAwesomeIcon icon={sidebarCollapsed ? faChevronRight : faChevronLeft} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map(item => (
            <button
              key={item.id}
              className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => {
                onNavigate(item.id);
                setMobileMenuOpen(false);
              }}
            >
              <FontAwesomeIcon icon={item.icon} className="nav-icon" />
              {!sidebarCollapsed && <span className="nav-label">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="nav-item logout" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} className="nav-icon" />
            {!sidebarCollapsed && <span className="nav-label">Logout</span>}
          </button>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div className="header-left">
            <h1>{menuItems.find(item => item.id === activeSection)?.label || 'Dashboard'}</h1>
          </div>

          <div className="header-right">
            <div className="search-bar">
              <FontAwesomeIcon icon={faSearch} />
              <input type="text" placeholder="Search..." />
            </div>

            <div className="notifications">
              <FontAwesomeIcon icon={faBell} />
              <span className="notification-badge">3</span>
            </div>

            <div className="user-profile">
              <img src={user?.avatar || '/src/assets/default-avatar.jpg'} alt={user?.name} />
              <div className="user-info">
                <span className="user-name">{user?.name || 'Guest'}</span>
                <span className="user-role">{user?.role || 'No role'}</span>
              </div>
            </div>
          </div>
        </header>

        <div className="dashboard-content">{children}</div>
      </main>

      {mobileMenuOpen && <div className="mobile-overlay" onClick={() => setMobileMenuOpen(false)}></div>}
    </div>
  );
}
