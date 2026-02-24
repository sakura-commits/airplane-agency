import { useState } from 'react';
import { Navbar } from "../Components/Navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChair,
  faUtensils,
  faWheelchair,
  faPlane,
  faHotel,
  faCar,
  faHeart,
  faStar,
  faCrown,
  faSuitcase,
  faWifi,
  faBed,
  faCoffee,
  faSave,
  faInfoCircle,
  faPlus,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import '../App.css';

export function TravelPreferences() {
  const [activeTab, setActiveTab] = useState('flight');
  const [isEditing, setIsEditing] = useState(false);
  const [showAddLoyalty, setShowAddLoyalty] = useState(false);

  // Flight Preferences
  const [flightPrefs, setFlightPrefs] = useState({
    seatPreference: 'window',
    mealPreference: 'vegetarian',
    classPreference: 'economy',
    airlinePreference: 'any',
    specialAssistance: false,
    wheelchairAssistance: false,
    unaccompaniedMinor: false,
    extraLegroom: true,
    nearExit: false,
    quietZone: false
  });

  // Hotel Preferences
  const [hotelPrefs, setHotelPrefs] = useState({
    roomType: 'standard',
    bedType: 'queen',
    smoking: 'non-smoking',
    floorPreference: 'high',
    quietRoom: true,
    nearElevator: false,
    connectingRoom: false,
    accessibility: false,
    amenities: ['wifi', 'breakfast', 'ac']
  });

  // Car Rental Preferences
  const [carPrefs, setCarPrefs] = useState({
    carType: 'sedan',
    transmission: 'automatic',
    insurance: 'full',
    gps: true,
    childSeat: false,
    extraDriver: false,
    unlimitedMileage: true,
    fuelPolicy: 'full-to-full'
  });

  // Loyalty Programs
  const [loyaltyPrograms, setLoyaltyPrograms] = useState([
    { id: 1, airline: 'Air Tanzania', program: 'Tanzanian Miles', number: 'TM12345678', tier: 'Silver' },
    { id: 2, airline: 'Emirates', program: 'Skywards', number: 'EK98765432', tier: 'Gold' }
  ]);

  const [newLoyalty, setNewLoyalty] = useState({
    airline: '',
    program: '',
    number: '',
    tier: ''
  });

  // Special Needs
  const [specialNeeds, setSpecialNeeds] = useState({
    dietaryRestrictions: ['vegetarian'],
    medicalConditions: [],
    mobilityIssues: false,
    visualImpairment: false,
    hearingImpairment: false,
    allergies: ['peanuts']
  });

  const handleFlightPrefChange = (pref, value) => {
    setFlightPrefs(prev => ({
      ...prev,
      [pref]: value
    }));
  };

  const handleHotelPrefChange = (pref, value) => {
    setHotelPrefs(prev => ({
      ...prev,
      [pref]: value
    }));
  };

  const handleCarPrefChange = (pref, value) => {
    setCarPrefs(prev => ({
      ...prev,
      [pref]: value
    }));
  };

  const handleAddLoyalty = (e) => {
    e.preventDefault();
    setLoyaltyPrograms([...loyaltyPrograms, { ...newLoyalty, id: loyaltyPrograms.length + 1 }]);
    setShowAddLoyalty(false);
    setNewLoyalty({ airline: '', program: '', number: '', tier: '' });
  };

  const handleRemoveLoyalty = (id) => {
    setLoyaltyPrograms(loyaltyPrograms.filter(program => program.id !== id));
  };

  const handleSaveAll = () => {
    setIsEditing(false);
    alert('All preferences saved successfully!');
  };

  const getSeatIcon = (pref) => {
    switch(pref) {
      case 'window': return '🪟';
      case 'aisle': return '🚪';
      case 'middle': return '🪑';
      default: return '💺';
    }
  };

  return (
    <>
      <Navbar />
      <div className="preferences-page">
        <div className="preferences-header">
          <div>
            <h1>Travel Preferences</h1>
            <p className="subtitle">Customize your travel experience across all services</p>
          </div>
          {!isEditing ? (
            <button className="edit-btn" onClick={() => setIsEditing(true)}>
              Edit Preferences
            </button>
          ) : (
            <button className="save-btn" onClick={handleSaveAll}>
              <FontAwesomeIcon icon={faSave} /> Save All Changes
            </button>
          )}
        </div>

        {/* Preferences Tabs */}
        <div className="preferences-tabs">
          <button
            className={activeTab === 'flight' ? 'active' : ''}
            onClick={() => setActiveTab('flight')}
          >
            <FontAwesomeIcon icon={faPlane} />
            Flight
          </button>
          <button
            className={activeTab === 'hotel' ? 'active' : ''}
            onClick={() => setActiveTab('hotel')}
          >
            <FontAwesomeIcon icon={faHotel} />
            Hotel
          </button>
          <button
            className={activeTab === 'car' ? 'active' : ''}
            onClick={() => setActiveTab('car')}
          >
            <FontAwesomeIcon icon={faCar} />
            Car Rental
          </button>
          <button
            className={activeTab === 'loyalty' ? 'active' : ''}
            onClick={() => setActiveTab('loyalty')}
          >
            <FontAwesomeIcon icon={faStar} />
            Loyalty Programs
          </button>
          <button
            className={activeTab === 'special' ? 'active' : ''}
            onClick={() => setActiveTab('special')}
          >
            <FontAwesomeIcon icon={faHeart} />
            Special Needs
          </button>
        </div>

        <div className="preferences-container">
          {/* Flight Preferences */}
          {activeTab === 'flight' && (
            <div className="preferences-section">
              <h2>Flight Preferences</h2>

              <div className="preferences-grid">
                {/* Seat Preference */}
                <div className="preference-card">
                  <div className="preference-icon">
                    <FontAwesomeIcon icon={faChair} />
                  </div>
                  <div className="preference-content">
                    <label>Seat Preference</label>
                    {isEditing ? (
                      <div className="seat-options">
                        {['window', 'aisle', 'middle'].map(seat => (
                          <button
                            key={seat}
                            className={`seat-option ${flightPrefs.seatPreference === seat ? 'active' : ''}`}
                            onClick={() => handleFlightPrefChange('seatPreference', seat)}
                          >
                            <span className="seat-icon">{getSeatIcon(seat)}</span>
                            <span>{seat.charAt(0).toUpperCase() + seat.slice(1)}</span>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <p className="preference-value">
                        {flightPrefs.seatPreference.charAt(0).toUpperCase() + flightPrefs.seatPreference.slice(1)} Seat
                      </p>
                    )}
                  </div>
                </div>

                {/* Meal Preference */}
                <div className="preference-card">
                  <div className="preference-icon">
                    <FontAwesomeIcon icon={faUtensils} />
                  </div>
                  <div className="preference-content">
                    <label>Meal Preference</label>
                    {isEditing ? (
                      <select
                        value={flightPrefs.mealPreference}
                        onChange={(e) => handleFlightPrefChange('mealPreference', e.target.value)}
                      >
                        <option value="regular">Regular</option>
                        <option value="vegetarian">Vegetarian</option>
                        <option value="vegan">Vegan</option>
                        <option value="halal">Halal</option>
                        <option value="kosher">Kosher</option>
                        <option value="diabetic">Diabetic</option>
                        <option value="gluten-free">Gluten Free</option>
                        <option value="child">Child Meal</option>
                      </select>
                    ) : (
                      <p className="preference-value">{flightPrefs.mealPreference}</p>
                    )}
                  </div>
                </div>

                {/* Class Preference */}
                <div className="preference-card">
                  <div className="preference-icon">
                    <FontAwesomeIcon icon={faCrown} />
                  </div>
                  <div className="preference-content">
                    <label>Travel Class</label>
                    {isEditing ? (
                      <div className="class-options">
                        {['economy', 'premium', 'business', 'first'].map(cls => (
                          <button
                            key={cls}
                            className={`class-option ${flightPrefs.classPreference === cls ? 'active' : ''}`}
                            onClick={() => handleFlightPrefChange('classPreference', cls)}
                          >
                            {cls.charAt(0).toUpperCase() + cls.slice(1)}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <p className="preference-value">
                        {flightPrefs.classPreference.charAt(0).toUpperCase() + flightPrefs.classPreference.slice(1)}
                      </p>
                    )}
                  </div>
                </div>

                {/* Additional Options */}
                <div className="preference-card full-width">
                  <div className="preference-icon">
                    <FontAwesomeIcon icon={faInfoCircle} />
                  </div>
                  <div className="preference-content">
                    <label>Additional Preferences</label>
                    {isEditing ? (
                      <div className="checkbox-grid">
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={flightPrefs.extraLegroom}
                            onChange={(e) => handleFlightPrefChange('extraLegroom', e.target.checked)}
                          />
                          Extra Legroom
                        </label>
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={flightPrefs.nearExit}
                            onChange={(e) => handleFlightPrefChange('nearExit', e.target.checked)}
                          />
                          Near Emergency Exit
                        </label>
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={flightPrefs.quietZone}
                            onChange={(e) => handleFlightPrefChange('quietZone', e.target.checked)}
                          />
                          Quiet Zone
                        </label>
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={flightPrefs.specialAssistance}
                            onChange={(e) => handleFlightPrefChange('specialAssistance', e.target.checked)}
                          />
                          Special Assistance
                        </label>
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={flightPrefs.wheelchairAssistance}
                            onChange={(e) => handleFlightPrefChange('wheelchairAssistance', e.target.checked)}
                          />
                          Wheelchair Assistance
                        </label>
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={flightPrefs.unaccompaniedMinor}
                            onChange={(e) => handleFlightPrefChange('unaccompaniedMinor', e.target.checked)}
                          />
                          Unaccompanied Minor
                        </label>
                      </div>
                    ) : (
                      <div className="preference-tags">
                        {flightPrefs.extraLegroom && <span className="tag">Extra Legroom</span>}
                        {flightPrefs.nearExit && <span className="tag">Near Exit</span>}
                        {flightPrefs.quietZone && <span className="tag">Quiet Zone</span>}
                        {flightPrefs.specialAssistance && <span className="tag">Special Assistance</span>}
                        {flightPrefs.wheelchairAssistance && <span className="tag">Wheelchair</span>}
                        {flightPrefs.unaccompaniedMinor && <span className="tag">Unaccompanied Minor</span>}
                        {!flightPrefs.extraLegroom && !flightPrefs.nearExit && !flightPrefs.quietZone &&
                         !flightPrefs.specialAssistance && !flightPrefs.wheelchairAssistance &&
                         !flightPrefs.unaccompaniedMinor && <span className="no-selection">No additional preferences</span>}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Hotel Preferences */}
          {activeTab === 'hotel' && (
            <div className="preferences-section">
              <h2>Hotel Preferences</h2>

              <div className="preferences-grid">
                <div className="preference-card">
                  <div className="preference-icon">
                    <FontAwesomeIcon icon={faBed} />
                  </div>
                  <div className="preference-content">
                    <label>Room Type</label>
                    {isEditing ? (
                      <select
                        value={hotelPrefs.roomType}
                        onChange={(e) => handleHotelPrefChange('roomType', e.target.value)}
                      >
                        <option value="standard">Standard Room</option>
                        <option value="deluxe">Deluxe Room</option>
                        <option value="suite">Suite</option>
                        <option value="family">Family Room</option>
                        <option value="executive">Executive Room</option>
                      </select>
                    ) : (
                      <p className="preference-value">{hotelPrefs.roomType}</p>
                    )}
                  </div>
                </div>

                <div className="preference-card">
                  <div className="preference-icon">
                    <FontAwesomeIcon icon={faBed} />
                  </div>
                  <div className="preference-content">
                    <label>Bed Type</label>
                    {isEditing ? (
                      <select
                        value={hotelPrefs.bedType}
                        onChange={(e) => handleHotelPrefChange('bedType', e.target.value)}
                      >
                        <option value="twin">Twin Beds</option>
                        <option value="double">Double Bed</option>
                        <option value="queen">Queen Bed</option>
                        <option value="king">King Bed</option>
                      </select>
                    ) : (
                      <p className="preference-value">{hotelPrefs.bedType}</p>
                    )}
                  </div>
                </div>

                <div className="preference-card">
                  <div className="preference-icon">
                    <FontAwesomeIcon icon={faCoffee} />
                  </div>
                  <div className="preference-content">
                    <label>Smoking Preference</label>
                    {isEditing ? (
                      <div className="radio-group">
                        <label>
                          <input
                            type="radio"
                            name="smoking"
                            value="smoking"
                            checked={hotelPrefs.smoking === 'smoking'}
                            onChange={(e) => handleHotelPrefChange('smoking', e.target.value)}
                          />
                          Smoking
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="smoking"
                            value="non-smoking"
                            checked={hotelPrefs.smoking === 'non-smoking'}
                            onChange={(e) => handleHotelPrefChange('smoking', e.target.value)}
                          />
                          Non-Smoking
                        </label>
                      </div>
                    ) : (
                      <p className="preference-value">{hotelPrefs.smoking}</p>
                    )}
                  </div>
                </div>

                <div className="preference-card full-width">
                  <div className="preference-icon">
                    <FontAwesomeIcon icon={faWifi} />
                  </div>
                  <div className="preference-content">
                    <label>Preferred Amenities</label>
                    {isEditing ? (
                      <div className="checkbox-grid">
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={hotelPrefs.amenities.includes('wifi')}
                            onChange={(e) => {
                              const newAmenities = e.target.checked
                                ? [...hotelPrefs.amenities, 'wifi']
                                : hotelPrefs.amenities.filter(a => a !== 'wifi');
                              handleHotelPrefChange('amenities', newAmenities);
                            }}
                          />
                          Free WiFi
                        </label>
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={hotelPrefs.amenities.includes('breakfast')}
                            onChange={(e) => {
                              const newAmenities = e.target.checked
                                ? [...hotelPrefs.amenities, 'breakfast']
                                : hotelPrefs.amenities.filter(a => a !== 'breakfast');
                              handleHotelPrefChange('amenities', newAmenities);
                            }}
                          />
                          Breakfast Included
                        </label>
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={hotelPrefs.amenities.includes('pool')}
                            onChange={(e) => {
                              const newAmenities = e.target.checked
                                ? [...hotelPrefs.amenities, 'pool']
                                : hotelPrefs.amenities.filter(a => a !== 'pool');
                              handleHotelPrefChange('amenities', newAmenities);
                            }}
                          />
                          Swimming Pool
                        </label>
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={hotelPrefs.amenities.includes('gym')}
                            onChange={(e) => {
                              const newAmenities = e.target.checked
                                ? [...hotelPrefs.amenities, 'gym']
                                : hotelPrefs.amenities.filter(a => a !== 'gym');
                              handleHotelPrefChange('amenities', newAmenities);
                            }}
                          />
                          Fitness Center
                        </label>
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={hotelPrefs.amenities.includes('parking')}
                            onChange={(e) => {
                              const newAmenities = e.target.checked
                                ? [...hotelPrefs.amenities, 'parking']
                                : hotelPrefs.amenities.filter(a => a !== 'parking');
                              handleHotelPrefChange('amenities', newAmenities);
                            }}
                          />
                          Free Parking
                        </label>
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={hotelPrefs.amenities.includes('spa')}
                            onChange={(e) => {
                              const newAmenities = e.target.checked
                                ? [...hotelPrefs.amenities, 'spa']
                                : hotelPrefs.amenities.filter(a => a !== 'spa');
                              handleHotelPrefChange('amenities', newAmenities);
                            }}
                          />
                          Spa
                        </label>
                      </div>
                    ) : (
                      <div className="preference-tags">
                        {hotelPrefs.amenities.map(amenity => (
                          <span key={amenity} className="tag">{amenity}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Car Rental Preferences */}
          {activeTab === 'car' && (
            <div className="preferences-section">
              <h2>Car Rental Preferences</h2>

              <div className="preferences-grid">
                <div className="preference-card">
                  <div className="preference-icon">
                    <FontAwesomeIcon icon={faCar} />
                  </div>
                  <div className="preference-content">
                    <label>Car Type</label>
                    {isEditing ? (
                      <select
                        value={carPrefs.carType}
                        onChange={(e) => handleCarPrefChange('carType', e.target.value)}
                      >
                        <option value="economy">Economy</option>
                        <option value="compact">Compact</option>
                        <option value="sedan">Sedan</option>
                        <option value="suv">SUV</option>
                        <option value="luxury">Luxury</option>
                        <option value="van">Van/Minivan</option>
                      </select>
                    ) : (
                      <p className="preference-value">{carPrefs.carType}</p>
                    )}
                  </div>
                </div>

                <div className="preference-card">
                  <div className="preference-icon">
                    <FontAwesomeIcon icon={faCar} />
                  </div>
                  <div className="preference-content">
                    <label>Transmission</label>
                    {isEditing ? (
                      <div className="radio-group">
                        <label>
                          <input
                            type="radio"
                            name="transmission"
                            value="automatic"
                            checked={carPrefs.transmission === 'automatic'}
                            onChange={(e) => handleCarPrefChange('transmission', e.target.value)}
                          />
                          Automatic
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="transmission"
                            value="manual"
                            checked={carPrefs.transmission === 'manual'}
                            onChange={(e) => handleCarPrefChange('transmission', e.target.value)}
                          />
                          Manual
                        </label>
                      </div>
                    ) : (
                      <p className="preference-value">{carPrefs.transmission}</p>
                    )}
                  </div>
                </div>

                <div className="preference-card full-width">
                  <div className="preference-icon">
                    <FontAwesomeIcon icon={faSuitcase} />
                  </div>
                  <div className="preference-content">
                    <label>Additional Options</label>
                    {isEditing ? (
                      <div className="checkbox-grid">
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={carPrefs.gps}
                            onChange={(e) => handleCarPrefChange('gps', e.target.checked)}
                          />
                          GPS Navigation
                        </label>
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={carPrefs.childSeat}
                            onChange={(e) => handleCarPrefChange('childSeat', e.target.checked)}
                          />
                          Child Seat
                        </label>
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={carPrefs.extraDriver}
                            onChange={(e) => handleCarPrefChange('extraDriver', e.target.checked)}
                          />
                          Extra Driver
                        </label>
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={carPrefs.unlimitedMileage}
                            onChange={(e) => handleCarPrefChange('unlimitedMileage', e.target.checked)}
                          />
                          Unlimited Mileage
                        </label>
                      </div>
                    ) : (
                      <div className="preference-tags">
                        {carPrefs.gps && <span className="tag">GPS</span>}
                        {carPrefs.childSeat && <span className="tag">Child Seat</span>}
                        {carPrefs.extraDriver && <span className="tag">Extra Driver</span>}
                        {carPrefs.unlimitedMileage && <span className="tag">Unlimited Mileage</span>}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Loyalty Programs */}
          {activeTab === 'loyalty' && (
            <div className="preferences-section">
              <div className="section-header">
                <h2>Loyalty Programs</h2>
                {isEditing && (
                  <button
                    className="add-loyalty-btn"
                    onClick={() => setShowAddLoyalty(true)}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                    Add Program
                  </button>
                )}
              </div>

              <div className="loyalty-cards">
                {loyaltyPrograms.map(program => (
                  <div key={program.id} className="loyalty-card">
                    <div className="loyalty-header">
                      <div className="loyalty-icon">
                        <FontAwesomeIcon icon={faStar} />
                      </div>
                      <div className="loyalty-info">
                        <h3>{program.airline}</h3>
                        <p className="program-name">{program.program}</p>
                      </div>
                      {isEditing && (
                        <button
                          className="remove-loyalty"
                          onClick={() => handleRemoveLoyalty(program.id)}
                        >
                          <FontAwesomeIcon icon={faTimes} />
                        </button>
                      )}
                    </div>
                    <div className="loyalty-details">
                      <div className="loyalty-number">
                        <span className="label">Membership #:</span>
                        <span className="value">{program.number}</span>
                      </div>
                      <div className="loyalty-tier">
                        <span className="label">Tier:</span>
                        <span className={`tier-badge ${program.tier.toLowerCase()}`}>
                          {program.tier}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {loyaltyPrograms.length === 0 && (
                  <div className="no-loyalty">
                    <FontAwesomeIcon icon={faStar} />
                    <p>No loyalty programs added yet</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Special Needs */}
          {activeTab === 'special' && (
            <div className="preferences-section">
              <h2>Special Needs & Accessibility</h2>

              <div className="preferences-grid">
                <div className="preference-card">
                  <div className="preference-icon">
                    <FontAwesomeIcon icon={faUtensils} />
                  </div>
                  <div className="preference-content">
                    <label>Dietary Restrictions</label>
                    {isEditing ? (
                      <div className="checkbox-grid">
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={specialNeeds.dietaryRestrictions.includes('vegetarian')}
                            onChange={(e) => {
                              const newRestrictions = e.target.checked
                                ? [...specialNeeds.dietaryRestrictions, 'vegetarian']
                                : specialNeeds.dietaryRestrictions.filter(r => r !== 'vegetarian');
                              setSpecialNeeds({...specialNeeds, dietaryRestrictions: newRestrictions});
                            }}
                          />
                          Vegetarian
                        </label>
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={specialNeeds.dietaryRestrictions.includes('vegan')}
                            onChange={(e) => {
                              const newRestrictions = e.target.checked
                                ? [...specialNeeds.dietaryRestrictions, 'vegan']
                                : specialNeeds.dietaryRestrictions.filter(r => r !== 'vegan');
                              setSpecialNeeds({...specialNeeds, dietaryRestrictions: newRestrictions});
                            }}
                          />
                          Vegan
                        </label>
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={specialNeeds.dietaryRestrictions.includes('gluten-free')}
                            onChange={(e) => {
                              const newRestrictions = e.target.checked
                                ? [...specialNeeds.dietaryRestrictions, 'gluten-free']
                                : specialNeeds.dietaryRestrictions.filter(r => r !== 'gluten-free');
                              setSpecialNeeds({...specialNeeds, dietaryRestrictions: newRestrictions});
                            }}
                          />
                          Gluten Free
                        </label>
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={specialNeeds.allergies.includes('peanuts')}
                            onChange={(e) => {
                              const newAllergies = e.target.checked
                                ? [...specialNeeds.allergies, 'peanuts']
                                : specialNeeds.allergies.filter(a => a !== 'peanuts');
                              setSpecialNeeds({...specialNeeds, allergies: newAllergies});
                            }}
                          />
                          Peanut Allergy
                        </label>
                      </div>
                    ) : (
                      <div className="preference-tags">
                        {specialNeeds.dietaryRestrictions.map(restriction => (
                          <span key={restriction} className="tag">{restriction}</span>
                        ))}
                        {specialNeeds.allergies.map(allergy => (
                          <span key={allergy} className="tag allergy">{allergy}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="preference-card full-width">
                  <div className="preference-icon">
                    <FontAwesomeIcon icon={faWheelchair} />
                  </div>
                  <div className="preference-content">
                    <label>Accessibility Needs</label>
                    {isEditing ? (
                      <div className="checkbox-grid">
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={specialNeeds.mobilityIssues}
                            onChange={(e) => setSpecialNeeds({...specialNeeds, mobilityIssues: e.target.checked})}
                          />
                          Mobility Assistance Required
                        </label>
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={specialNeeds.visualImpairment}
                            onChange={(e) => setSpecialNeeds({...specialNeeds, visualImpairment: e.target.checked})}
                          />
                          Visual Impairment Assistance
                        </label>
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={specialNeeds.hearingImpairment}
                            onChange={(e) => setSpecialNeeds({...specialNeeds, hearingImpairment: e.target.checked})}
                          />
                          Hearing Impairment Assistance
                        </label>
                      </div>
                    ) : (
                      <div className="preference-tags">
                        {specialNeeds.mobilityIssues && <span className="tag">Mobility Assistance</span>}
                        {specialNeeds.visualImpairment && <span className="tag">Visual Assistance</span>}
                        {specialNeeds.hearingImpairment && <span className="tag">Hearing Assistance</span>}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Loyalty Program Modal */}
      {showAddLoyalty && (
        <div className="modal-overlay">
          <div className="modal-content loyalty-modal">
            <h2>Add Loyalty Program</h2>
            <form onSubmit={handleAddLoyalty}>
              <div className="form-group">
                <label>Airline</label>
                <select
                  value={newLoyalty.airline}
                  onChange={(e) => setNewLoyalty({...newLoyalty, airline: e.target.value})}
                  required
                >
                  <option value="">Select Airline</option>
                  <option value="Air Tanzania">Air Tanzania</option>
                  <option value="Emirates">Emirates</option>
                  <option value="Qatar Airways">Qatar Airways</option>
                  <option value="Ethiopian Airlines">Ethiopian Airlines</option>
                  <option value="Kenya Airways">Kenya Airways</option>
                </select>
              </div>

              <div className="form-group">
                <label>Program Name</label>
                <input
                  type="text"
                  placeholder="e.g., Skywards, Miles & More"
                  value={newLoyalty.program}
                  onChange={(e) => setNewLoyalty({...newLoyalty, program: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Membership Number</label>
                <input
                  type="text"
                  placeholder="Enter your membership number"
                  value={newLoyalty.number}
                  onChange={(e) => setNewLoyalty({...newLoyalty, number: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Tier Level</label>
                <select
                  value={newLoyalty.tier}
                  onChange={(e) => setNewLoyalty({...newLoyalty, tier: e.target.value})}
                  required
                >
                  <option value="">Select Tier</option>
                  <option value="Blue">Blue</option>
                  <option value="Silver">Silver</option>
                  <option value="Gold">Gold</option>
                  <option value="Platinum">Platinum</option>
                  <option value="Titanium">Titanium</option>
                </select>
              </div>

              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowAddLoyalty(false)}>
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  Add Program
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
