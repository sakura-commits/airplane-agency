import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './Pages/Home.jsx';
import { Flight } from './Pages/Flight.jsx';
import { Settings } from './Pages/Settings.jsx';
import { Profile } from './Pages/Profile.jsx';
import { MyBookings } from './Pages/MyBookings.jsx';
import { PaymentMethods } from './Pages/PaymentMethods.jsx';
import { TravelPreferences } from './Pages/TravelPreferences.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/flights" element={<Flight />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/payment-methods" element={<PaymentMethods />} />
        <Route path="/preferences" element={<TravelPreferences />} />
      </Routes>
    </Router>
  );
}

export default App;
