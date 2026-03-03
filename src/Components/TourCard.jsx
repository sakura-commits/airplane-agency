import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClock,
  faUser,
  faStar,
  faMapMarkerAlt,
  faCalendarAlt,
  faArrowRight,
  faHeart as faHeartSolid
} from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from 'react-router-dom';
import './TourCard.css';

export function TourCard({ tour }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const navigate = useNavigate();

  const {
    id,
    title,
    category,
    image,
    duration,
    groupSize,
    price,
    rating,
    reviews,
    location,
    badge,
    discount
  } = tour;

  const handleViewDetails = () => {
    navigate(`/tours/${id}`);
  };

  return (
    <div className="tour-card">
      <div className="tour-card-image">
        <img src={image} alt={title} loading="lazy" />
        {badge && <span className="tour-badge">{badge}</span>}
        {discount && <span className="tour-discount">-{discount}%</span>}

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
          <span className="tour-category">{category}</span>
          <span className="tour-location">
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            {location}
          </span>
        </div>

        <h3 className="tour-title">{title}</h3>

        <div className="tour-rating">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <FontAwesomeIcon
                key={i}
                icon={faStar}
                className={i < Math.floor(rating) ? 'star-filled' : 'star-empty'}
              />
            ))}
          </div>
          <span className="rating-text">{rating.toFixed(1)}</span>
          <span className="reviews-count">({reviews} reviews)</span>
        </div>

        <div className="tour-details-grid">
          <div className="detail-item">
            <FontAwesomeIcon icon={faClock} />
            <span>{duration}</span>
          </div>
          <div className="detail-item">
            <FontAwesomeIcon icon={faUser} />
            <span>Max {groupSize}</span>
          </div>
          <div className="detail-item">
            <FontAwesomeIcon icon={faCalendarAlt} />
            <span>Daily departures</span>
          </div>
        </div>

        <div className="tour-card-footer">
          <div className="tour-price">
            <span className="price-label">From</span>
            <span className="price-value">${price}</span>
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

