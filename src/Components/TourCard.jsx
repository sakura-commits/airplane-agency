import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClock,
  faUser,
  faStar,
  faMapMarkerAlt,
  faCalendarAlt,
  faArrowRight,
  faHeart as faHeartSolid,
  faChevronLeft,
  faChevronRight,
  faCamera,
  faWifi,
  faInfoCircle,
  faTicketAlt,
  faShare
} from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from 'react-router-dom';
import './TourCard.css';

export function TourCard({ tour, variant = 'standard' }) { // variant: 'standard' or 'featured'
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  // For Serengeti-style cards with multiple images
  const hasGallery = tour.gallery && tour.gallery.length > 0;
  const images = hasGallery ? tour.gallery : [{ src: tour.image, title: tour.title }];

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleViewDetails = () => {
    navigate(`/tours/${tour.id}`);
  };

  const handleBookNow = () => {
    navigate(`/booking/${tour.id}`);
  };

  // Featured/Serengeti variant - larger, more detailed card
  if (variant === 'featured') {
    const discountedPrice = tour.discount 
      ? tour.price * (1 - tour.discount / 100) 
      : tour.price;

    return (
      <div className="tour-card featured">
        {/* Card Header with Logo (if provided) */}
        {tour.logo && (
          <div className="card-header-featured">
            <div className="logo-container">
              <img src={tour.logo} alt={`${tour.title} logo`} className="tour-logo" />
              <div className="logo-glow"></div>
            </div>
            
            <div className="header-badges">
              {tour.badge && <span className="badge bestseller">{tour.badge}</span>}
              {tour.discount && <span className="badge discount">-{tour.discount}% OFF</span>}
            </div>
          </div>
        )}

        {/* Image Gallery Preview */}
        <div className="gallery-preview">
          <div className="main-preview-image">
            <img 
              src={images[currentImageIndex].src} 
              alt={images[currentImageIndex].title || tour.title}
            />
            
            {/* Navigation Arrows - only if multiple images */}
            {images.length > 1 && (
              <>
                <button className="gallery-nav prev" onClick={prevImage}>
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <button className="gallery-nav next" onClick={nextImage}>
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </>
            )}

            {/* Image Counter */}
            {images.length > 1 && (
              <div className="image-counter">
                {currentImageIndex + 1} / {images.length}
              </div>
            )}

            {/* View Gallery Button */}
            <button 
              className="view-gallery-btn"
              onClick={() => {/* Open full gallery modal */}}
            >
              <FontAwesomeIcon icon={faCamera} />
              View Gallery
            </button>
          </div>

          {/* Thumbnail Strip - only if multiple images */}
          {images.length > 1 && (
            <div className="thumbnail-strip">
              {images.slice(0, 5).map((img, idx) => (
                <div 
                  key={idx}
                  className={`thumbnail ${idx === currentImageIndex ? 'active' : ''}`}
                  onClick={() => setCurrentImageIndex(idx)}
                >
                  <img src={img.src} alt={img.title} />
                </div>
              ))}
              {images.length > 5 && (
                <div className="thumbnail more">
                  <span>+{images.length - 5}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="card-content">
          {/* Title and Rating */}
          <div className="title-section">
            <h2 className="tour-title">{tour.title}</h2>
            {tour.subtitle && <p className="tour-subtitle">{tour.subtitle}</p>}
            
            <div className="rating-location">
              <div className="rating">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <FontAwesomeIcon
                      key={i}
                      icon={faStar}
                      className={i < Math.floor(tour.rating) ? 'star-filled' : 'star-empty'}
                    />
                  ))}
                </div>
                <span className="rating-value">{tour.rating}</span>
                <span className="reviews">({tour.reviews || tour.reviewCount} reviews)</span>
              </div>
              
              <div className="location">
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                <span>{tour.location}</span>
              </div>
            </div>
          </div>

          {/* Quick Info Grid */}
          <div className="quick-info-grid">
            <div className="info-item">
              <FontAwesomeIcon icon={faClock} />
              <div>
                <span className="label">Duration</span>
                <span className="value">{tour.duration}</span>
              </div>
            </div>
            
            <div className="info-item">
              <FontAwesomeIcon icon={faUser} />
              <div>
                <span className="label">Group Size</span>
                <span className="value">Max {tour.groupSize} people</span>
              </div>
            </div>
            
            {tour.nextDeparture && (
              <div className="info-item">
                <FontAwesomeIcon icon={faCalendarAlt} />
                <div>
                  <span className="label">Next Departure</span>
                  <span className="value">{tour.nextDeparture}</span>
                </div>
              </div>
            )}
            
            {tour.availability && (
              <div className="info-item availability">
                <span className="status-badge">{tour.availability}</span>
              </div>
            )}
          </div>

          {/* Highlights */}
          {tour.highlights && tour.highlights.length > 0 && (
            <div className="highlights">
              <h3>Tour Highlights</h3>
              <div className="highlights-grid">
                {tour.highlights.slice(0, 4).map((highlight, idx) => (
                  <div key={idx} className="highlight-item">
                    <span className="check-mark">✓</span>
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
              {tour.highlights.length > 4 && (
                <button className="view-all-link" onClick={handleViewDetails}>
                  View all {tour.highlights.length} highlights
                </button>
              )}
            </div>
          )}

          {/* Amenities */}
          {tour.amenities && tour.amenities.length > 0 && (
            <div className="amenities">
              {tour.amenities.slice(0, 4).map((amenity, idx) => (
                <span key={idx} className="amenity-tag">
                  <FontAwesomeIcon icon={faWifi} />
                  {amenity}
                </span>
              ))}
              {tour.amenities.length > 4 && (
                <span className="amenity-tag more">+{tour.amenities.length - 4}</span>
              )}
            </div>
          )}

          {/* Footer with Price and Actions */}
          <div className="card-footer">
            <div className="price-section">
              {tour.discount ? (
                <>
                  <div className="price-original">
                    <span className="label">Regular Price</span>
                    <span className="amount">${tour.price}</span>
                  </div>
                  <div className="price-discounted">
                    <span className="label">Today's Price</span>
                    <div>
                      <span className="currency">$</span>
                      <span className="amount">{discountedPrice}</span>
                      <span className="per">/person</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="price-simple">
                  <span className="label">From</span>
                  <div>
                    <span className="currency">$</span>
                    <span className="amount">{tour.price}</span>
                    <span className="per">/person</span>
                  </div>
                </div>
              )}
            </div>

            <div className="action-buttons">
              <button 
                className="action-btn like-btn"
                onClick={() => setIsWishlisted(!isWishlisted)}
              >
                <FontAwesomeIcon icon={isWishlisted ? faHeartSolid : faHeart} />
              </button>
              
              <button className="action-btn share-btn">
                <FontAwesomeIcon icon={faShare} />
              </button>
              
              <button 
                className="action-btn details-btn"
                onClick={handleViewDetails}
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                Details
              </button>
              
              <button 
                className="action-btn book-btn"
                onClick={handleBookNow}
              >
                <FontAwesomeIcon icon={faTicketAlt} />
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Standard variant - compact card for grid view
  return (
    <div className="tour-card standard">
      <div className="tour-card-image">
        <img src={tour.image} alt={tour.title} loading="lazy" />
        {tour.badge && <span className="tour-badge">{tour.badge}</span>}
        {tour.discount && <span className="tour-discount">-{tour.discount}%</span>}

        <button
          className="wishlist-btn"
          onClick={() => setIsWishlisted(!isWishlisted)}
          aria-label="Add to wishlist"
        >
          <FontAwesomeIcon icon={isWishlisted ? faHeartSolid : faHeart} />
        </button>
      </div>

      <div className="tour-card-content">
        <div className="tour-meta">
          <span className="tour-category">{tour.category}</span>
          <span className="tour-location">
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            {tour.location}
          </span>
        </div>

        <h3 className="tour-title">{tour.title}</h3>

        <div className="tour-rating">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <FontAwesomeIcon
                key={i}
                icon={faStar}
                className={i < Math.floor(tour.rating) ? 'star-filled' : 'star-empty'}
              />
            ))}
          </div>
          <span className="rating-text">{tour.rating.toFixed(1)}</span>
          <span className="reviews-count">({tour.reviews} reviews)</span>
        </div>

        <div className="tour-details-grid">
          <div className="detail-item">
            <FontAwesomeIcon icon={faClock} />
            <span>{tour.duration}</span>
          </div>
          <div className="detail-item">
            <FontAwesomeIcon icon={faUser} />
            <span>Max {tour.groupSize}</span>
          </div>
          <div className="detail-item">
            <FontAwesomeIcon icon={faCalendarAlt} />
            <span>Daily</span>
          </div>
        </div>

        <div className="tour-card-footer">
          <div className="tour-price">
            <span className="price-label">From</span>
            <span className="price-value">${tour.price}</span>
            <span className="price-period">/person</span>
          </div>
          <button className="view-details-btn" onClick={handleViewDetails}>
            View Details
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TourCard;

// end of TourCard component - no additional imports below

