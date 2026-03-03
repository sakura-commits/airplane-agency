<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './Pages/Home.jsx';
import { Flight } from './Pages/Flight.jsx';
import { Contact } from './Pages/Contact.jsx';
import { Settings } from './Pages/Settings.jsx';
import {Hotel} from './Pages/Hotel.jsx';
import { CarRental } from './Pages/CarRental.jsx';  
import { Profile } from './Pages/Profile.jsx';
import { MyBookings } from './Pages/MyBookings.jsx';
import { PaymentMethods } from './Pages/PaymentMethods.jsx';
import { TravelPreferences } from './Pages/TravelPreferences.jsx';
=======
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./Pages/Home.jsx";
import { Flight } from "./Pages/Flight.jsx";
import { Settings } from "./Pages/Settings.jsx";
import { Profile } from "./Pages/Profile.jsx";
import { MyBookings } from "./Pages/MyBookings.jsx";
import { PaymentMethods } from "./Pages/PaymentMethods.jsx";
import { TravelPreferences } from "./Pages/TravelPreferences.jsx";
import { Contact } from "./Pages/Contact.jsx";
import Footer from "./Components/Footer.jsx";
>>>>>>> 57d2e2fc0d4c45892d01ac95fed99722102943dd

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/flights" element={<Flight />} />
        <Route path="/settings" element={<Settings />} />
       <Route path="/hotel" element={<Hotel/>}/>
        <Route path="/car-rental" element={<CarRental/>}/>
        <Route path="/profile" element={<Profile />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/payment-methods" element={<PaymentMethods />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/preferences" element={<TravelPreferences />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;