import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '../Components/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClock,
  faUser,
  faStar,
  faMapMarkerAlt,
  faCalendarAlt,
  faCheck,
  faTimes,
  faShieldAlt,
  faWifi,
  faCamera,
  faQuoteRight,
  faArrowLeft
} from '@fortawesome/free-solid-svg-icons';
import './TourDetails.css';
import { SerengetiGallery } from '../Components/SerengetiGallery';

const tourData = {
  1: {
    id: 1,
    title: 'Serengeti Safari Adventure',
    category: 'Safari',
    images: [
      '/src/assets/serengeti-1.jpg',
      '/src/assets/serengeti-2.jpg',
      '/src/assets/serengeti-3.jpg',
      '/src/assets/serengeti-4.jpg'
    ],
    duration: '5 Days / 4 Nights',
    groupSize: 8,
    price: 1850,
    rating: 4.9,
    reviewCount: 124,
    location: 'Serengeti National Park',
    description: `Experience the ultimate African safari in the world-famous Serengeti National Park. Witness the Great Migration, spot the Big Five, and camp under the stars in this unforgettable adventure.`,
    highlights: [
      'Game drives in Serengeti',
      'Visit Ngorongoro Crater',
      'Hot air balloon safari',
      'Maasai village visit',
      'Sundowners in the bush'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Arusha', description: 'Arrive at Kilimanjaro International Airport, meet your guide, and transfer to your hotel in Arusha for a welcome briefing.' },
      { day: 2, title: 'Drive to Serengeti', description: 'After breakfast, drive to Serengeti National Park with game drives en route. Arrive at your camp in time for sunset.' },
      { day: 3, title: 'Full Day in Serengeti', description: 'Early morning game drive to see predators. Return for breakfast, then continue exploring different areas of the park.' },
      { day: 4, title: 'Serengeti to Ngorongoro', description: 'Morning game drive, then drive to Ngorongoro Conservation Area. Afternoon descent into the crater.' },
      { day: 5, title: 'Departure', description: 'Morning game drive in Ngorongoro, then transfer to Arusha for departure.' }
    ],
    included: [
      'All park fees',
      'Professional guide',
      '4x4 safari vehicle',
      'Accommodation',
      'Meals as specified',
      'Bottled water',
      'Airport transfers'
    ],
    excluded: [
      'International flights',
      'Travel insurance',
      'Tips and gratuities',
      'Personal expenses',
      'Alcoholic beverages',
      'Visa fees'
    ],
    amenities: ['WiFi', 'Parking', 'Swimming Pool', 'Restaurant', 'Bar'],
    guide: {
      name: 'Joseph Maasai',
      experience: '12 years',
      languages: ['English', 'Swahili', 'Maa'],
      image: '/src/assets/guide-joseph.jpg',
      rating: 5.0
    },
    reviews: [
      { id: 1, user: 'Sarah Johnson', rating: 5, date: '2024-01-15', comment: 'Absolutely incredible experience! Joseph was an amazing guide - we saw lions, elephants, and even a leopard!', avatar: '/src/assets/reviewer1.jpg' },
      { id: 2, user: 'Michael Chen', rating: 5, date: '2024-01-10', comment: 'The Serengeti exceeded all expectations. The organization was perfect and the accommodations were comfortable.', avatar: '/src/assets/reviewer2.jpg' }
    ]
  }
};

export function TourDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [bookingDate, setBookingDate] = useState('');
  const [guests, setGuests] = useState(1);

  const tour = tourData[id];

  if (!tour) {
    return (
      <>
        <Navbar />
        <div className="tour-not-found">
          <h2>Tour Not Found</h2>
          <button onClick={() => navigate('/tours')}>Back to Tours</button>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="tour-details-page">
        <button className="back-to-tours" onClick={() => navigate('/tours')}>
          <FontAwesomeIcon icon={faArrowLeft} />
          Back to Tours
        </button>

        {tour.id === 1 ? (
          <SerengetiGallery />
        ) : (
          <div className="tour-gallery">
            <div className="main-image">
              <img src={tour.images[selectedImage]} alt={tour.title} />
            </div>
            <div className="image-thumbnails">
              {tour.images.map((img, index) => (
                <button key={index} className={`thumbnail ${selectedImage === index ? 'active' : ''}`} onClick={() => setSelectedImage(index)}>
                  <img src={img} alt={`${tour.title} ${index + 1}`} />
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="tour-details-container">
          <div className="tour-main-content">
            <div className="tour-header">
              <div className="tour-header-left">
                <div className="tour-meta">
                  <span className="tour-category">{tour.category}</span>
                  <span className="tour-location"><FontAwesomeIcon icon={faMapMarkerAlt} />{tour.location}</span>
                </div>
                <h1>{tour.title}</h1>
                <div className="tour-rating-large">
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <FontAwesomeIcon key={i} icon={faStar} className={i < Math.floor(tour.rating) ? 'star-filled' : 'star-empty'} />
                    ))}
                  </div>
                  <span className="rating-value">{tour.rating}</span>
                  <span className="review-count">({tour.reviewCount} reviews)</span>
                </div>
              </div>
              <div className="tour-header-right">
                <div className="price-badge">
                  <span className="from">from</span>
                  <span className="price">${tour.price}</span>
                  <span className="per">per person</span>
                </div>
              </div>
            </div>

            <div className="quick-info">
              <div className="info-item"><FontAwesomeIcon icon={faClock} /><div><span className="label">Duration</span><span className="value">{tour.duration}</span></div></div>
              <div className="info-item"><FontAwesomeIcon icon={faUser} /><div><span className="label">Group Size</span><span className="value">Max {tour.groupSize} people</span></div></div>
              <div className="info-item"><FontAwesomeIcon icon={faCalendarAlt} /><div><span className="label">Availability</span><span className="value">Daily departures</span></div></div>
            </div>

            <div className="tour-tabs">
              <button className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>Overview</button>
              <button className={`tab-btn ${activeTab === 'itinerary' ? 'active' : ''}`} onClick={() => setActiveTab('itinerary')}>Itinerary</button>
              <button className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`} onClick={() => setActiveTab('reviews')}>Reviews</button>
            </div>

            <div className="tab-content">
              {activeTab === 'overview' && (
                <div className="overview-tab">
                  <h3>About This Tour</h3>
                  <p className="tour-description">{tour.description}</p>

                  <h3>Highlights</h3>
                  <ul className="highlights-list">{tour.highlights.map((h, i) => (<li key={i}><FontAwesomeIcon icon={faCheck} className="check-icon" />{h}</li>))}</ul>

                  <div className="included-excluded">
                    <div className="included"><h4><FontAwesomeIcon icon={faCheck} /> Included</h4><ul>{tour.included.map((it, idx) => (<li key={idx}><FontAwesomeIcon icon={faCheck} />{it}</li>))}</ul></div>
                    <div className="excluded"><h4><FontAwesomeIcon icon={faTimes} /> Excluded</h4><ul>{tour.excluded.map((it, idx) => (<li key={idx}><FontAwesomeIcon icon={faTimes} />{it}</li>))}</ul></div>
                  </div>
                </div>
              )}

              {activeTab === 'itinerary' && (
                <div className="itinerary-tab"><h3>Detailed Itinerary</h3><div className="itinerary-timeline">{tour.itinerary.map((day, index) => (<div key={index} className="timeline-item"><div className="timeline-marker"><span>Day {day.day}</span></div><div className="timeline-content"><h4>{day.title}</h4><p>{day.description}</p></div></div>))}</div></div>
              )}

              {activeTab === 'reviews' && (
                <div className="reviews-tab"><div className="reviews-header"><h3>Guest Reviews</h3><div className="rating-summary"><span className="average">{tour.rating}</span><div className="stars">{[...Array(5)].map((_, i) => (<FontAwesomeIcon key={i} icon={faStar} className={i < Math.floor(tour.rating) ? 'star-filled' : 'star-empty'} />))}</div><span className="total">Based on {tour.reviewCount} reviews</span></div></div><div className="reviews-list">{tour.reviews.map(review => (<div key={review.id} className="review-item"><div className="reviewer-info"><img src={review.avatar} alt={review.user} /><div><h4>{review.user}</h4><div className="review-rating">{[...Array(5)].map((_, i) => (<FontAwesomeIcon key={i} icon={faStar} className={i < review.rating ? 'star-filled' : 'star-empty'} />))}</div></div><span className="review-date">{review.date}</span></div><p className="review-comment">{review.comment}</p></div>))}</div></div>
              )}
            </div>
          </div>

          <div className="tour-sidebar">
            <div className="booking-widget">
              <h3>Book This Tour</h3>
              <div className="booking-form">
                <div className="form-group"><label>Select Date</label><input type="date" value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} min={new Date().toISOString().split('T')[0]} /></div>
                <div className="form-group"><label>Number of Guests</label><div className="guest-selector"><button onClick={() => setGuests(Math.max(1, guests - 1))} disabled={guests <= 1}>-</button><span>{guests}</span><button onClick={() => setGuests(Math.min(tour.groupSize, guests + 1))} disabled={guests >= tour.groupSize}>+</button></div></div>
                <div className="price-breakdown"><div className="price-row"><span>Price per person</span><span>${tour.price}</span></div><div className="price-row"><span>Total ({guests} {guests === 1 ? 'person' : 'people'})</span><span className="total-price">${tour.price * guests}</span></div></div>
                <button className="book-now-btn" onClick={() => alert('Booking functionality coming soon!')}>Book Now</button>
              </div>
            </div>

            <div className="guide-card"><h3>Your Guide</h3><div className="guide-info"><img src={tour.guide.image} alt={tour.guide.name} /><div><h4>{tour.guide.name}</h4><p>{tour.guide.experience} experience</p><div className="guide-rating">{[...Array(5)].map((_, i) => (<FontAwesomeIcon key={i} icon={faStar} className={i < tour.guide.rating ? 'star-filled' : 'star-empty'} />))}</div></div></div><div className="guide-languages"><strong>Languages:</strong> {tour.guide.languages.join(', ')}</div></div>

            <div className="amenities-card"><h3>Amenities</h3><div className="amenities-grid">{tour.amenities.map((amenity, index) => (<div key={index} className="amenity-item"><FontAwesomeIcon icon={faWifi} /><span>{amenity}</span></div>))}</div></div>

            <div className="why-book-card"><h3>Why Book With Us</h3><ul><li><FontAwesomeIcon icon={faShieldAlt} /><span>Best Price Guarantee</span></li><li><FontAwesomeIcon icon={faCamera} /><span>Free Cancellation</span></li><li><FontAwesomeIcon icon={faQuoteRight} /><span>24/7 Customer Support</span></li></ul></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TourDetails;
