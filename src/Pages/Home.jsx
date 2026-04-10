import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Hero from '../Components/Hero';
import Services from '../Components/Services';
import VideoSection from '../Components/VideoSection';
import { ScrollReveal } from '../hooks/useScrollReveal.jsx';
import { AnimatedCounter } from '../components/AnimatedCounter.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowRight, 
  faStar, 
  faMapMarkerAlt, 
  faClock,
  faChevronLeft,
  faChevronRight,
  faPlay,
  faPause
} from '@fortawesome/free-solid-svg-icons';
import videoSrc from '../assets/welcome.mp4';
import serengetiImage from '../assets/serengeti-national-park-pool-of-water.jpg';
import zanzibarImage from '../assets/2.webp';
import kilimanjaroImage from '../assets/3.jpg';
import ngorongoroImage from '../assets/4.webp';
import user1Image from '../assets/1.jpg';
import user2Image from '../assets/2.webp';
import user3Image from '../assets/3.jpg';
import '../App.css';

// Sample tour data for featured tours
const featuredTours = [
  {
    id: 1,
    title: "Serengeti Safari Adventure",
    image: serengetiImage,
    location: "Serengeti National Park",
    rating: 4.9,
    reviews: 124,
    duration: "5 Days",
    price: 899,
    badge: "Bestseller"
  },
  {
    id: 2,
    title: "Zanzibar Beach Escape",
    image: zanzibarImage,
    location: "Zanzibar",
    rating: 4.8,
    reviews: 98,
    duration: "7 Days",
    price: 799,
    badge: "Popular"
  },
  {
    id: 3,
    title: "Kilimanjaro Climb",
    image: kilimanjaroImage,
    location: "Mount Kilimanjaro",
    rating: 4.9,
    reviews: 156,
    duration: "8 Days",
    price: 1499,
    badge: "Adventure"
  },
  {
    id: 4,
    title: "Ngorongoro Crater Tour",
    image: ngorongoroImage,
    location: "Ngorongoro",
    rating: 4.7,
    reviews: 87,
    duration: "3 Days",
    price: 699,
    badge: "New"
  }
];

// Testimonials data
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: user1Image,
    rating: 5,
    comment: "Amazing experience! The Serengeti safari exceeded all expectations. Our guide was knowledgeable and friendly.",
    location: "United States"
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: user2Image,
    rating: 5,
    comment: "Perfect organization from start to finish. The Zanzibar beach resort was paradise on earth!",
    location: "Singapore"
  },
  {
    id: 3,
    name: "Emma Williams",
    avatar: user3Image,
    rating: 4,
    comment: "Climbing Kilimanjaro was challenging but rewarding. Great support from the team throughout.",
    location: "United Kingdom"
  }
];

export function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-advance testimonials
  useEffect(() => {
    const timer = setInterval(nextTestimonial, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="modern-home">
      
      {/* Hero Section with Video Background */}
      <section className="modern-hero">
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        <div className="hero-overlay"></div>
        
        <div className="hero-content-modern">
          <span className="hero-badge">Welcome to AirKulty</span>
          <h1 className="hero-title">
            Discover the <span className="gradient-text">Magic</span> of Tanzania
          </h1>
          <p className="hero-subtitle">
            Experience unforgettable adventures, from the Serengeti plains to the beaches of Zanzibar
          </p>
          
          <div className="hero-cta">
            <button className="cta-primary">
              Explore Tours <FontAwesomeIcon icon={faArrowRight} />
            </button>
            <button className="cta-secondary">
              Watch Video <FontAwesomeIcon icon={faPlay} />
            </button>
          </div>
          
          {/* Stats */}
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number"><AnimatedCounter value={50} suffix="+" /></span>
              <span className="stat-label">Tours</span>
            </div>
            <div className="stat-item">
              <span className="stat-number"><AnimatedCounter value={5000} suffix="+" /></span>
              <span className="stat-label">Happy Customers</span>
            </div>
            <div className="stat-item">
              <span className="stat-number"><AnimatedCounter value={25} /></span>
              <span className="stat-label">Destinations</span>
            </div>
            <div className="stat-item">
              <span className="stat-number"><AnimatedCounter value={1500} suffix="+" /></span>
              <span className="stat-label">5-Star Reviews</span>
            </div>
          </div>
        </div>
        
        <div className="hero-scroll-indicator">
          <span className="scroll-text">Scroll to explore</span>
          <div className="scroll-line"></div>
        </div>
      </section>

      {/* Video Section */}
      <section className="video-showcase">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Experience Tanzania</span>
            <h2 className="section-title">Watch Our <span className="gradient-text">Journey</span></h2>
            <p className="section-description">
              Get a glimpse of the breathtaking experiences waiting for you
            </p>
          </div>
          
          <div className="video-wrapper">
            <VideoSection />
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <ScrollReveal>
        <section className="featured-services">
          <div className="container">
            <div className="section-header">
              <span className="section-badge">Our Services</span>
              <h2 className="section-title">Everything You Need for <span className="gradient-text">Perfect Travel</span></h2>
              <p className="section-description">
                From flights to accommodation, we've got you covered
              </p>
            </div>
            
            <Services />
          </div>
        </section>
      </ScrollReveal>

      {/* Featured Tours */}
      <ScrollReveal>
        <section className="featured-tours">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Popular Destinations</span>
            <h2 className="section-title">Featured <span className="gradient-text">Tours</span></h2>
            <p className="section-description">
              Hand-picked experiences our customers love
            </p>
          </div>
          
          <motion.div
            className="tours-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
          >
            {featuredTours.map((tour) => (
              <motion.div
                key={tour.id}
                className="tour-card-modern"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.45 }}
                whileHover={{ y: -8 }}
              >
                <div className="tour-image">
                  <img src={tour.image} alt={tour.title} />
                  {tour.badge && <span className="tour-badge">{tour.badge}</span>}
                </div>
                <div className="tour-content">
                  <div className="tour-location">
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                    <span>{tour.location}</span>
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
                    <span className="rating-value">{tour.rating}</span>
                    <span className="reviews-count">({tour.reviews} reviews)</span>
                  </div>
                  <div className="tour-duration">
                    <FontAwesomeIcon icon={faClock} />
                    <span>{tour.duration}</span>
                  </div>
                  <div className="tour-footer">
                    <div className="tour-price">
                      <span className="price-label">From</span>
                      <span className="price-value">${tour.price}</span>
                      <span className="price-period">/person</span>
                    </div>
                    <button className="view-details-btn">
                      View Details <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="view-all-container">
            <button className="view-all-btn">
              View All Tours <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* Why Choose Us */}
      <ScrollReveal>
        <section className="why-choose-us">
        <div className="container">
          <div className="choose-us-grid">
            <div className="choose-us-content">
              <span className="section-badge">Why Choose Us</span>
              <h2 className="section-title">Experience the <span className="gradient-text">Best</span> of Tanzania</h2>
              <p className="section-description">
                We're committed to providing unforgettable experiences with personalized service and expert local guides.
              </p>
              
              <div className="features-list">
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <div className="feature-text">
                    <h4>Expert Local Guides</h4>
                    <p>Knowledgeable guides who know every hidden gem</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <div className="feature-text">
                    <h4>Best Price Guarantee</h4>
                    <p>Competitive prices with no hidden fees</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <div className="feature-text">
                    <h4>24/7 Customer Support</h4>
                    <p>We're here to help anytime, anywhere</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <div className="feature-text">
                    <h4>Sustainable Tourism</h4>
                    <p>Responsible travel that protects nature</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="choose-us-image">
              <img src="/src/assets/serengeti-national-park-map.jfif" alt="Tanzania Safari" />
            </div>
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* Testimonials */}
      <ScrollReveal>
        <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Testimonials</span>
            <h2 className="section-title">What Our <span className="gradient-text">Travelers Say</span></h2>
            <p className="section-description">
              Real experiences from real travelers
            </p>
          </div>
          
          <div className="testimonials-carousel">
            <button className="carousel-nav prev" onClick={prevTestimonial}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            
            <div className="testimonial-card">
              <div className="testimonial-header">
                <img 
                  src={testimonials[currentTestimonial].avatar} 
                  alt={testimonials[currentTestimonial].name}
                  className="testimonial-avatar"
                />
                <div className="testimonial-info">
                  <h4>{testimonials[currentTestimonial].name}</h4>
                  <p>{testimonials[currentTestimonial].location}</p>
                </div>
                <div className="testimonial-rating">
                  {[...Array(5)].map((_, i) => (
                    <FontAwesomeIcon
                      key={i}
                      icon={faStar}
                      className={i < testimonials[currentTestimonial].rating ? 'star-filled' : 'star-empty'}
                    />
                  ))}
                </div>
              </div>
              <p className="testimonial-comment">
                "{testimonials[currentTestimonial].comment}"
              </p>
            </div>
            
            <button className="carousel-nav next" onClick={nextTestimonial}>
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
          
          <div className="testimonial-dots">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentTestimonial ? 'active' : ''}`}
                onClick={() => setCurrentTestimonial(index)}
              />
            ))}
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* Newsletter */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-content">
            <h2 className="newsletter-title">Ready for Your <span className="gradient-text">African Adventure?</span></h2>
            <p className="newsletter-description">
              Subscribe to get exclusive deals, travel tips, and inspiration
            </p>
            
            <form className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email address"
                className="newsletter-input"
              />
              <button type="submit" className="newsletter-btn">
                Subscribe <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </form>
            
            <p className="newsletter-note">
              No spam, only awesome content. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>
    </div>
  );

}