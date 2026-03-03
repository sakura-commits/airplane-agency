import React, { useState, useEffect } from 'react';
import { Navbar } from '../Components/Navbar';
import { TourCard } from '../Components/TourCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faFilter,
  faSlidersH,
  faTimes,
  faMapMarkedAlt,
  faMountain,
  faUmbrellaBeach,
  faTree,
  faCity,
  faCompass
} from '@fortawesome/free-solid-svg-icons';
import './ToursPage.css';

const tourData = [
  {
    id: 1,
    title: 'Serengeti Safari Adventure',
    category: 'Safari',
    image: '/src/assets/serengeti-safari.jpg',
    duration: '5 Days',
    groupSize: 8,
    price: 1850,
    rating: 4.9,
    reviews: 124,
    location: 'Serengeti NP',
    badge: 'Bestseller',
    discount: 15,
    highlights: ['Big Five', 'Camping', 'Hot Air Balloon']
  },
  {
    id: 2,
    title: 'Kilimanjaro Trek - Machame Route',
    category: 'Kilimanjaro',
    image: '/src/assets/kilimanjaro.jpg',
    duration: '7 Days',
    groupSize: 12,
    price: 2200,
    rating: 4.8,
    reviews: 89,
    location: 'Moshi',
    badge: 'Popular',
    highlights: ['Summit', 'Camping', 'Guides']
  },
  {
    id: 3,
    title: 'Zanzibar Beach & Stone Town',
    category: 'Beach',
    image: '/src/assets/zanzibar.jpg',
    duration: '4 Days',
    groupSize: 15,
    price: 850,
    rating: 4.7,
    reviews: 156,
    location: 'Zanzibar',
    badge: 'Top Rated',
    discount: 10,
    highlights: ['Snorkeling', 'Spice Tour', 'Sunset Cruise']
  },
  {
    id: 4,
    title: 'Ngorongoro Crater Safari',
    category: 'Safari',
    image: '/src/assets/ngorongoro.jpg',
    duration: '3 Days',
    groupSize: 6,
    price: 1200,
    rating: 4.9,
    reviews: 98,
    location: 'Ngorongoro',
    badge: 'Premium',
    highlights: ['Crater Floor', 'Wildlife', 'Luxury Lodge']
  },
  {
    id: 5,
    title: 'Tarangire National Park Safari',
    category: 'Safari',
    image: '/src/assets/tarangire.jpg',
    duration: '2 Days',
    groupSize: 8,
    price: 750,
    rating: 4.6,
    reviews: 67,
    location: 'Tarangire',
    highlights: ['Elephants', 'Baobabs', 'Birding']
  },
  {
    id: 6,
    title: 'Maasai Cultural Experience',
    category: 'Cultural',
    image: '/src/assets/maasai.jpg',
    duration: '1 Day',
    groupSize: 20,
    price: 180,
    rating: 4.5,
    reviews: 43,
    location: 'Arusha',
    highlights: ['Village Visit', 'Dancing', 'Crafts']
  },
  {
    id: 7,
    title: 'Kilimanjaro Trek - Lemosho Route',
    category: 'Kilimanjaro',
    image: '/src/assets/lemosho.jpg',
    duration: '8 Days',
    groupSize: 10,
    price: 2600,
    rating: 4.9,
    reviews: 72,
    location: 'Moshi',
    badge: 'Premium',
    highlights: ['Scenic', 'Acclimatization', 'Success Rate']
  },
  {
    id: 8,
    title: 'Prison Island & Spice Tour',
    category: 'Beach',
    image: '/src/assets/prison-island.jpg',
    duration: '1 Day',
    groupSize: 15,
    price: 120,
    rating: 4.4,
    reviews: 112,
    location: 'Zanzibar',
    highlights: ['Giant Tortoises', 'Spice Farm', 'Swimming']
  }
];

export function ToursPage() {
  const [tours] = useState(tourData);
  const [filteredTours, setFilteredTours] = useState(tourData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 3000]);
  const [duration, setDuration] = useState('Any');
  const [sortBy, setSortBy] = useState('popular');

  const categories = ['All', 'Safari', 'Kilimanjaro', 'Beach', 'Cultural'];

  useEffect(() => {
    let result = tours.slice();

    if (searchTerm) {
      result = result.filter(tour =>
        tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tour.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'All') {
      result = result.filter(tour => tour.category === selectedCategory);
    }

    result = result.filter(tour => tour.price >= priceRange[0] && tour.price <= priceRange[1]);

    if (duration !== 'Any') {
      const days = parseInt(duration);
      result = result.filter(tour => parseInt(tour.duration) === days);
    }

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'duration':
        result.sort((a, b) => parseInt(a.duration) - parseInt(b.duration));
        break;
      default:
        result.sort((a, b) => b.rating - a.rating);
    }

    setFilteredTours(result);
  }, [searchTerm, selectedCategory, priceRange, duration, sortBy, tours]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setPriceRange([0, 3000]);
    setDuration('Any');
    setSortBy('popular');
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Safari': return faTree;
      case 'Kilimanjaro': return faMountain;
      case 'Beach': return faUmbrellaBeach;
      case 'Cultural': return faCity;
      default: return faCompass;
    }
  };

  return (
    <>
      <Navbar />
      <div className="tours-page">
        <div className="tours-hero">
          <div className="hero-overlay" />
          <div className="hero-content">
            <h1>Discover Tanzania's Wonders</h1>
            <p>Experience the magic of safaris, climb Kilimanjaro, or relax on Zanzibar's beaches</p>

            <div className="hero-search">
              <div className="search-input-wrapper">
                <FontAwesomeIcon icon={faSearch} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search tours, destinations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="filter-toggle-btn" onClick={() => setShowFilters(!showFilters)}>
                <FontAwesomeIcon icon={faSlidersH} />
                Filters
              </button>
            </div>
          </div>
        </div>

        <div className="tours-container">
          <div className="category-tabs">
            {categories.map(category => (
              <button
                key={category}
                className={`category-tab ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                <FontAwesomeIcon icon={getCategoryIcon(category)} />
                {category}
              </button>
            ))}
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="filters-panel">
              <div className="filters-header">
                <h3><FontAwesomeIcon icon={faFilter} /> Filter Tours</h3>
                <button className="close-filters" onClick={() => setShowFilters(false)}>
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>

              <div className="filters-grid">
                {/* Price Range */}
                <div className="filter-group">
                  <label>Price Range ($)</label>
                  <div className="price-inputs">
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                      min="0"
                      max="3000"
                    />
                    <span>to</span>
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      min="0"
                      max="3000"
                    />
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="3000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="price-slider"
                  />
                </div>

                {/* Duration */}
                <div className="filter-group">
                  <label>Duration</label>
                  <select value={duration} onChange={(e) => setDuration(e.target.value)}>
                    <option value="Any">Any Duration</option>
                    <option value="1">1 Day</option>
                    <option value="2">2 Days</option>
                    <option value="3">3 Days</option>
                    <option value="4">4 Days</option>
                    <option value="5">5 Days</option>
                    <option value="7">7 Days</option>
                    <option value="8">8+ Days</option>
                  </select>
                </div>

                {/* Sort By */}
                <div className="filter-group">
                  <label>Sort By</label>
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="popular">Most Popular</option>
                    <option value="rating">Highest Rated</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="duration">Duration</option>
                  </select>
                </div>

                {/* Clear Filters */}
                <button className="clear-filters-btn" onClick={clearFilters}>
                  Clear All Filters
                </button>
              </div>
            </div>
          )}

          {/* Results Count */}
          <div className="results-header">
            <p className="results-count">
              <span>{filteredTours.length}</span> tours found
            </p>
            <button className="mobile-filter-btn" onClick={() => setShowFilters(true)}>
              <FontAwesomeIcon icon={faFilter} /> Filter
            </button>
          </div>

          {/* Tour Grid */}
          {filteredTours.length > 0 ? (
            <div className="tours-grid">
              {filteredTours.map(tour => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <FontAwesomeIcon icon={faSearch} />
              <h3>No tours found</h3>
              <p>Try adjusting your filters or search term</p>
              <button className="reset-filters-btn" onClick={clearFilters}>
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
