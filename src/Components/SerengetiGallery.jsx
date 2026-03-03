import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
  faExpand,
  faTimes,
  faHeart,
  faDownload,
  faShare,
  faInfoCircle,
  faCamera,
  faMapMarkerAlt,
  faClock,
  faSun,
  faCloudSun,
  faTree,
  faMountain,
  faWater
} from '@fortawesome/free-solid-svg-icons';
import './SerengetiGallery.css';

export function SerengetiGallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [likedImages, setLikedImages] = useState({});
  const [activeFilter, setActiveFilter] = useState('all');
  const [autoPlay, setAutoPlay] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  // Your Serengeti images with enhanced metadata
  const galleryImages = [
    {
      id: 1,
      src: '/src/assets/1.jpg',
      thumbnail: '/src/assets/1.jpg',
      title: 'Serengeti Sunrise',
      description: 'Golden morning light over the endless plains',
      category: 'landscape',
      location: 'Central Serengeti',
      time: 'Sunrise',
      season: 'Dry Season',
      featured: true,
      dimensions: '4K Ultra HD',
      photographer: 'Joseph Maasai',
      date: 'January 2024'
    },
    {
      id: 2,
      src: '/src/assets/2.webp',
      thumbnail: '/src/assets/2.webp',
      title: 'Lion Pride at Rest',
      description: 'Majestic lions relaxing after a successful hunt',
      category: 'wildlife',
      location: 'Seronera Valley',
      time: 'Late Afternoon',
      season: 'Green Season',
      featured: true,
      dimensions: '4K Ultra HD',
      photographer: 'Sarah Williams',
      date: 'March 2024'
    },
    {
      id: 3,
      src: '/src/assets/3.jpg',
      thumbnail: '/src/assets/3.jpg',
      title: 'The Great Migration',
      description: 'Thousands of wildebeest crossing the Mara River',
      category: 'wildlife',
      location: 'Mara River',
      time: 'Midday',
      season: 'Migration Season',
      featured: true,
      dimensions: '4K Ultra HD',
      photographer: 'Michael Chen',
      date: 'July 2023'
    },
    {
      id: 4,
      src: '/src/assets/4.webp',
      thumbnail: '/src/assets/4.webp',
      title: 'Acacia Trees at Sunset',
      description: 'Iconic Serengeti landscape with acacia trees',
      category: 'landscape',
      location: 'Central Serengeti',
      time: 'Sunset',
      season: 'Dry Season',
      dimensions: '4K Ultra HD',
      photographer: 'Emma Thompson',
      date: 'August 2023'
    },
    {
      id: 5,
      src: '/src/assets/5.jpg',
      thumbnail: '/src/assets/5.jpg',
      title: 'Elephant Family',
      description: 'Gentle giants roaming the savanna',
      category: 'wildlife',
      location: 'Tarangire Sector',
      time: 'Morning',
      season: 'Dry Season',
      featured: true,
      dimensions: '4K Ultra HD',
      photographer: 'David Ochieng',
      date: 'October 2023'
    },
    {
      id: 6,
      src: '/src/assets/6.jfif',
      thumbnail: '/src/assets/6.jfif',
      title: 'Serengeti Plains Panorama',
      description: 'Endless plains stretching to the horizon',
      category: 'landscape',
      location: 'Southern Serengeti',
      time: 'Afternoon',
      season: 'Green Season',
      dimensions: '4K Ultra HD',
      photographer: 'Joseph Maasai',
      date: 'December 2023'
    },
    {
      id: 7,
      src: '/src/assets/animals.webp',
      thumbnail: '/src/assets/animals.webp',
      title: 'Wildlife Collage',
      description: 'Diverse wildlife of Serengeti National Park',
      category: 'wildlife',
      location: 'Various Locations',
      time: 'Various',
      season: 'All Seasons',
      featured: true,
      dimensions: '4K Ultra HD',
      photographer: 'National Geographic',
      date: '2023'
    },
    {
      id: 8,
      src: '/src/assets/serengeti-national-park-map.jfif',
      thumbnail: '/src/assets/serengeti-national-park-map.jfif',
      title: 'Serengeti Park Map',
      description: 'Detailed map showing wildlife corridors and attractions',
      category: 'map',
      location: 'Entire Park',
      time: 'N/A',
      season: 'Reference',
      dimensions: 'High Resolution',
      photographer: 'Tanzania National Parks',
      date: '2024'
    },
    {
      id: 9,
      src: '/src/assets/serengeti-national-park-pool-of-water.jpg',
      thumbnail: '/src/assets/serengeti-national-park-pool-of-water.jpg',
      title: 'Retina Hippo Pool',
      description: 'Hippos cooling off in a natural water hole',
      category: 'wildlife',
      location: 'Retina Hippo Pool',
      time: 'Midday',
      season: 'Dry Season',
      featured: true,
      dimensions: '4K Ultra HD',
      photographer: 'James Peterson',
      date: 'February 2024'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Photos', icon: faCamera },
    { id: 'wildlife', label: 'Wildlife', icon: faTree },
    { id: 'landscape', label: 'Landscapes', icon: faMountain },
    { id: 'map', label: 'Maps & Guides', icon: faMapMarkerAlt }
  ];

  const filteredImages = activeFilter === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeFilter);

  const featuredImages = galleryImages.filter(img => img.featured);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setIsLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setAutoPlay(false);
    document.body.style.overflow = 'auto';
  };

  const navigateImage = (direction) => {
    if (direction === 'next') {
      setCurrentIndex((prev) => (prev + 1) % filteredImages.length);
    } else {
      setCurrentIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
    }
  };

  const toggleLike = (imageId) => {
    setLikedImages(prev => ({
      ...prev,
      [imageId]: !prev[imageId]
    }));
  };

  const downloadImage = async (image) => {
    try {
      const response = await fetch(image.src);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `serengeti-${image.title.toLowerCase().replace(/\s+/g, '-')}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  const shareImage = async (image) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: image.title,
          text: image.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      alert('Share feature is not supported on this browser');
    }
  };

  useEffect(() => {
    let interval;
    if (autoPlay && isLightboxOpen) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % filteredImages.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [autoPlay, isLightboxOpen, filteredImages.length]);

  return (
    <div className="serengeti-gallery">
      {/* Gallery Header */}
      <div className="gallery-header">
        <div className="header-content">
          <h1 className="gallery-title">
            <span className="title-icon">🦁</span>
            Serengeti Safari Adventure Gallery
          </h1>
          <p className="gallery-subtitle">
            Immerse yourself in the breathtaking beauty of Tanzania's most famous national park
          </p>
        </div>
        
        {/* Stats */}
        <div className="gallery-stats">
          <div className="stat-item">
            <span className="stat-value">{galleryImages.length}</span>
            <span className="stat-label">Photos</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">4K</span>
            <span className="stat-label">Quality</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">9</span>
            <span className="stat-label">Locations</span>
          </div>
        </div>
      </div>

      {/* Featured Images Carousel */}
      <div className="featured-carousel">
        <h2 className="section-title">
          <span className="section-icon">⭐</span>
          Featured Moments
        </h2>
        <div className="carousel-container">
          {featuredImages.map((image, index) => (
            <div
              key={image.id}
              className="carousel-item"
              onClick={() => openLightbox(galleryImages.findIndex(img => img.id === image.id))}
            >
              <div className="carousel-image-wrapper">
                <img src={image.src} alt={image.title} loading="lazy" />
                <div className="carousel-overlay">
                  <h3>{image.title}</h3>
                  <p>{image.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category Filters */}
      <div className="category-filters">
        {categories.map(category => (
          <button
            key={category.id}
            className={`filter-btn ${activeFilter === category.id ? 'active' : ''}`}
            onClick={() => setActiveFilter(category.id)}
          >
            <FontAwesomeIcon icon={category.icon} />
            <span>{category.label}</span>
            <span className="filter-count">
              {category.id === 'all' 
                ? galleryImages.length 
                : galleryImages.filter(img => img.category === category.id).length}
            </span>
          </button>
        ))}
      </div>

      {/* Main Gallery Grid */}
      <div className="gallery-grid">
        {filteredImages.map((image, index) => (
          <div
            key={image.id}
            className="gallery-item"
            onClick={() => openLightbox(index)}
          >
            <div className="image-container">
              <img src={image.src} alt={image.title} loading="lazy" />
              
              {/* Image Badges */}
              {image.featured && <span className="badge featured">Featured</span>}
              {image.category === 'map' && <span className="badge map">Map</span>}
              
              {/* Like Button */}
              <button
                className="like-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLike(image.id);
                }}
              >
                <FontAwesomeIcon
                  icon={faHeart}
                  className={likedImages[image.id] ? 'liked' : ''}
                />
              </button>

              {/* Image Info Overlay */}
              <div className="image-info">
                <h3>{image.title}</h3>
                <p className="image-location">
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                  {image.location}
                </p>
                <p className="image-description">{image.description}</p>
                
                <div className="image-meta">
                  <span>
                    <FontAwesomeIcon icon={faClock} />
                    {image.time}
                  </span>
                  <span>
                    <FontAwesomeIcon icon={faCloudSun} />
                    {image.season}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="lightbox-modal" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            {/* Lightbox Header */}
            <div className="lightbox-header">
              <div className="lightbox-title">
                <h2>{filteredImages[currentIndex]?.title}</h2>
                <p>{filteredImages[currentIndex]?.location}</p>
              </div>
              <div className="lightbox-controls">
                <button
                  className={`auto-play-btn ${autoPlay ? 'active' : ''}`} onClick={() => setAutoPlay(!autoPlay)}
                  title={autoPlay ? 'Pause slideshow' : 'Start slideshow'}
                >
                  {autoPlay ? '⏸️' : '▶️'}
                </button>
                <button
                  className="info-toggle-btn"
                  onClick={() => setShowInfo(!showInfo)}
                  title="Show image info"
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                </button>
                <button
                  className="download-btn"
                  onClick={() => downloadImage(filteredImages[currentIndex])}
                  title="Download image"
                >
                  <FontAwesomeIcon icon={faDownload} />
                </button>
                <button
                  className="share-btn"
                  onClick={() => shareImage(filteredImages[currentIndex])}
                  title="Share image"
                >
                  <FontAwesomeIcon icon={faShare} />
                </button>
                <button className="close-btn" onClick={closeLightbox}>
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            </div>

            {/* Lightbox Image */}
            <div className="lightbox-image-container">
              <button
                className="nav-btn prev"
                onClick={() => navigateImage('prev')}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              
              <img
                src={filteredImages[currentIndex]?.src}
                alt={filteredImages[currentIndex]?.title}
                className="lightbox-image"
              />
              
              <button
                className="nav-btn next"
                onClick={() => navigateImage('next')}
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>

              {/* Zoom Button */}
              <button
                className="zoom-btn"
                onClick={() => window.open(filteredImages[currentIndex]?.src, '_blank')}
                title="Open in full size"
              >
                <FontAwesomeIcon icon={faExpand} />
              </button>

              {/* Image Counter */}
              <div className="image-counter">
                {currentIndex + 1} / {filteredImages.length}
              </div>
            </div>

            {/* Image Info Panel */}
            {showInfo && (
              <div className="lightbox-info-panel">
                <h3>Image Details</h3>
                <div className="info-grid">
                  <div className="info-row">
                    <span className="info-label">Photographer:</span>
                    <span className="info-value">{filteredImages[currentIndex]?.photographer}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Date Taken:</span>
                    <span className="info-value">{filteredImages[currentIndex]?.date}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Location:</span>
                    <span className="info-value">{filteredImages[currentIndex]?.location}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Time:</span>
                    <span className="info-value">{filteredImages[currentIndex]?.time}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Season:</span>
                    <span className="info-value">{filteredImages[currentIndex]?.season}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Quality:</span>
                    <span className="info-value">{filteredImages[currentIndex]?.dimensions}</span>
                  </div>
                </div>
                <p className="image-description-full">
                  {filteredImages[currentIndex]?.description}
                </p>
              </div>
            )}

            {/* Thumbnail Strip */}
            <div className="thumbnail-strip">
              {filteredImages.map((image, idx) => (
                <div
                  key={image.id}
                  className={`thumbnail-item ${idx === currentIndex ? 'active' : ''}`}
                  onClick={() => setCurrentIndex(idx)}
                >
                  <img src={image.thumbnail} alt={image.title} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
