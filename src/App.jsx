import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';

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

// Components
import { Navbar } from './Components/Navbar.jsx';
import Footer from './Components/Footer.jsx';
import { Auth } from './Components/Auth.jsx';

// --- PROTECTED ROUTE COMPONENT ---
const ProtectedRoute = ({ children, isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
};

// --- MAIN CONTENT COMPONENT ---
function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Check login status on mount
  useEffect(() => {
    const loggedIn = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(loggedIn);
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    navigate('/home'); // Send user to home after login
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    setIsAuthenticated(false);
    navigate('/'); // Send user back to login page
  };

  // Logic to hide Navbar/Footer on Auth page
  // This checks if the URL is "/" or "/auth"
  const isAuthPage = location.pathname === '/' || location.pathname === '/auth';

  return (
    <div className="App">
      {/* Show Navbar only if NOT on Auth page AND user is logged in */}
      {!isAuthPage && isAuthenticated && <Navbar onLogout={handleLogout} />}

      <main className={isAuthPage ? "full-screen" : "content-area"}>
        <Routes>
          {/* Default Route: Login Page */}
          <Route path="/" element={<Auth onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/auth" element={<Auth onLoginSuccess={handleLoginSuccess} />} />

          {/* Protected Routes */}
          <Route path="/home" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Home /></ProtectedRoute>} />
          <Route path="/flights" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Flight /></ProtectedRoute>} />
          <Route path="/hotel" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Hotel /></ProtectedRoute>} />
          <Route path="/car-rental" element={<ProtectedRoute isAuthenticated={isAuthenticated}><CarRental /></ProtectedRoute>} />
          <Route path="/tours" element={<ProtectedRoute isAuthenticated={isAuthenticated}><ToursPage /></ProtectedRoute>} />
          <Route path="/tour-details/:id" element={<ProtectedRoute isAuthenticated={isAuthenticated}><TourDetails /></ProtectedRoute>} />
          
          {/* Account Routes */}
          <Route path="/profile" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Profile /></ProtectedRoute>} />
          <Route path="/my-bookings" element={<ProtectedRoute isAuthenticated={isAuthenticated}><MyBookings /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Settings /></ProtectedRoute>} />
          <Route path="/payment-methods" element={<ProtectedRoute isAuthenticated={isAuthenticated}><PaymentMethods /></ProtectedRoute>} />
          <Route path="/preferences" element={<ProtectedRoute isAuthenticated={isAuthenticated}><TravelPreferences /></ProtectedRoute>} />
          <Route path="/contact" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Contact /></ProtectedRoute>} />
        </Routes>
      </main>

      {/* Show Footer only if NOT on Auth page */}
      {!isAuthPage && isAuthenticated && <Footer />}
    </div>
  );
}

// --- ROOT APP COMPONENT ---
export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
