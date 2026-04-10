import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Pages
import { Home } from './Pages/Home.jsx';
import { Flight } from './Pages/Flight.jsx';
import { Settings } from './Pages/Settings.jsx';
import { Hotel } from './Pages/Hotel.jsx';
import { CarRental } from './Pages/CarRental.jsx';
import { Profile } from './Pages/Profile.jsx';
import { MyBookings } from './Pages/MyBookings.jsx';
import { PaymentMethods } from './Pages/PaymentMethods.jsx';
import { TravelPreferences } from './Pages/TravelPreferences.jsx';
import { Contact } from './Pages/Contact.jsx';
import { ToursPage } from './Pages/ToursPage.jsx';
import { TourDetails } from './Pages/TourDetails.jsx';
import { AdminDashboard } from './Pages/Admin/AdminDashboard.jsx';
import AgentDashboard from './Pages/Agent/AgentDashboard.jsx';
import ProviderDashboard from './Pages/Provider/ProviderDashboard.jsx';
import GuideDashboard from './Pages/Guide/GuideDashboard.jsx';
import { NotFound } from './Pages/NotFound.jsx';

// Components
import { Navbar } from './Components/Navbar.jsx';
import Footer from './Components/Footer.jsx';
import { Auth } from './Components/AuthNew.jsx';
import ProtectedRoute from './Components/ProtectedRoute.jsx';
import { PageTransition } from './components/PageTransition.jsx';

// Utils
import { getUserDashboard, ROLES } from './utils/auth.js';

function AppContent() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // Check login status on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser && storedUser !== 'undefined') {
      try {
        const parsed = JSON.parse(storedUser);
        if (parsed && typeof parsed === 'object') {
          setUser(parsed);
        } else {
          localStorage.removeItem('user');
        }
      } catch (e) {
        console.warn('Invalid user data in localStorage, clearing it.', e);
        localStorage.removeItem('user');
      }
    } else {
      localStorage.removeItem('user');
    }
    setLoading(false);
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    
    // Redirect based on role
    const dashboardRoute = getUserDashboard(userData.role);
    console.log('User role:', userData.role); // Debug log
    console.log('Redirecting to:', dashboardRoute); // Debug log
    navigate(dashboardRoute);
  };

  const handleLogout = () => {
    console.log('AppContent: handleLogout called');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/auth', { replace: true });
  };

  // Check if user is authenticated and has the right role for protected routes
  const isAuthenticated = !!user;
  const isAuthPage = location.pathname === '/auth';
  const isAdminPage = location.pathname.startsWith('/admin');
  
  // Don't show navbar/footer on auth or admin pages
  const shouldShowNavbar = !isAuthPage && !isAdminPage && isAuthenticated;

  useEffect(() => {
    if (loading) return;

    if (isAuthenticated && isAuthPage) {
      const dashboardRoute = getUserDashboard(user?.role);
      if (location.pathname !== dashboardRoute) {
        navigate(dashboardRoute, { replace: true });
      }
      return;
    }

    if (!isAuthenticated && !isAuthPage) {
      navigate('/auth', { replace: true });
    }
  }, [loading, isAuthenticated, isAuthPage, location.pathname, navigate, user]);

  // If still loading, show loading indicator
  if (loading) {
    return (
      <div className="loading-container" style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '18px',
        color: '#666'
      }}>
        Loading...
      </div>
    );
  }

  console.log('AppContent:', location.pathname, 'authenticated=', isAuthenticated);

  return (
    <div className="App">
      {shouldShowNavbar && <Navbar onLogout={handleLogout} user={user} />}

      <main style={{paddingTop:'30px'}}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* Root path - redirect based on auth status */}
            <Route 
              path="/" 
              element={
                isAuthenticated ? 
                  <Navigate to={getUserDashboard(user.role)} replace /> : 
                  <Navigate to="/auth" replace />
              } 
            />
            
            {/* Auth route (present always; guard handled by effect) */}
            <Route 
              path="/auth" 
              element={
                <PageTransition>
                  <Auth onLoginSuccess={handleLoginSuccess} />
                </PageTransition>
              } 
            />

            {/* Customer Routes */}
          <Route path="/home" element={
            <PageTransition>
              <ProtectedRoute user={user}><Home /></ProtectedRoute>
            </PageTransition>
          } />
          <Route path="/flights" element={
            <PageTransition>
              <ProtectedRoute user={user}><Flight /></ProtectedRoute>
            </PageTransition>
          } />
          <Route path="/hotel" element={
            <PageTransition>
              <ProtectedRoute user={user}><Hotel /></ProtectedRoute>
            </PageTransition>
          } />
          <Route path="/car-rental" element={
            <PageTransition>
              <ProtectedRoute user={user}><CarRental /></ProtectedRoute>
            </PageTransition>
          } />
          <Route path="/tours" element={
            <PageTransition>
              <ProtectedRoute user={user}><ToursPage /></ProtectedRoute>
            </PageTransition>
          } />
          <Route path="/tour-details/:id" element={
            <PageTransition>
              <ProtectedRoute user={user}><TourDetails /></ProtectedRoute>
            </PageTransition>
          } />

          {/* Account Routes */}
          <Route path="/profile" element={
            <PageTransition>
              <ProtectedRoute user={user}><Profile /></ProtectedRoute>
            </PageTransition>
          } />
          <Route path="/my-bookings" element={
            <PageTransition>
              <ProtectedRoute user={user}><MyBookings /></ProtectedRoute>
            </PageTransition>
          } />
          <Route path="/settings" element={
            <PageTransition>
              <ProtectedRoute user={user}><Settings /></ProtectedRoute>
            </PageTransition>
          } />
          <Route path="/payment-methods" element={
            <PageTransition>
              <ProtectedRoute user={user}><PaymentMethods /></ProtectedRoute>
            </PageTransition>
          } />
          <Route path="/preferences" element={
            <PageTransition>
              <ProtectedRoute user={user}><TravelPreferences /></ProtectedRoute>
            </PageTransition>
          } />
          <Route path="/contact" element={
            <PageTransition>
              <ProtectedRoute user={user}><Contact /></ProtectedRoute>
            </PageTransition>
          } />

          {/* Role-based Dashboard Routes */}
          <Route path="/admin/dashboard" element={
            <PageTransition>
              <ProtectedRoute user={user} requiredRole={[ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.MANAGER]}>
                <AdminDashboard onLogout={handleLogout} user={user} />
              </ProtectedRoute>
            </PageTransition>
          } />
          <Route path="/agent/dashboard" element={
            <PageTransition>
              <ProtectedRoute user={user} requiredRole={ROLES.AGENT}>
                <AgentDashboard onLogout={handleLogout} user={user} />
              </ProtectedRoute>
            </PageTransition>
          } />
          <Route path="/provider/dashboard" element={
            <PageTransition>
              <ProtectedRoute user={user} requiredRole={ROLES.PROVIDER}>
                <ProviderDashboard onLogout={handleLogout} user={user} />
              </ProtectedRoute>
            </PageTransition>
          } />
          <Route path="/guide/dashboard" element={
            <PageTransition>
              <ProtectedRoute user={user} requiredRole={ROLES.GUIDE}>
                <GuideDashboard onLogout={handleLogout} user={user} />
              </ProtectedRoute>
            </PageTransition>
          } />

          {/* Legacy redirects */}
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/agent" element={<Navigate to="/agent/dashboard" replace />} />
          <Route path="/provider" element={<Navigate to="/provider/dashboard" replace />} />
          <Route path="/guide" element={<Navigate to="/guide/dashboard" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
      </main>

      {shouldShowNavbar && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
