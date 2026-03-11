import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./Pages/Home.jsx";
import { Flight } from "./Pages/Flight.jsx";
import { Settings } from "./Pages/Settings.jsx";
import { Hotel } from "./Pages/Hotel.jsx";
import { CarRental } from "./Pages/CarRental.jsx";
import { Profile } from "./Pages/Profile.jsx";
import { MyBookings } from "./Pages/MyBookings.jsx";
import { PaymentMethods } from "./Pages/PaymentMethods.jsx";
import { TravelPreferences } from "./Pages/TravelPreferences.jsx";
import { Contact } from "./Pages/Contact.jsx";
import { ToursPage } from "./Pages/ToursPage.jsx"; // Tours
import { TourDetails } from "./Pages/TourDetails.jsx"; // Tour details
import { Navbar } from "./Components/Navbar.jsx";
import Footer from "./Components/Footer.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/flights" element={<Flight />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/hotel" element={<Hotel />} />
        <Route path="/car-rental" element={<CarRental />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/payment-methods" element={<PaymentMethods />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/preferences" element={<TravelPreferences />} />
        <Route path="/tours" element={<ToursPage />} />
        <Route path="/tours/:id" element={<TourDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
