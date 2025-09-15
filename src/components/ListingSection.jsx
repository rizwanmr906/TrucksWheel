import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { vehicles } from '../data/vehicles';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import FeaturedList from './FeaturedList';

const ListingCard = ({ vehicle }) => {
  const cardStyle = {
    flex: '0 0 calc(25% - 24px)', // Show 4 cards, with gap
    margin: '0 12px',
    backgroundColor: '#fff',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    overflow: 'hidden',
    textAlign: 'left',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    
  };

  const imageContainerStyle = {
    position: 'relative',
    width: '100%',
    height: '180px',
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };

  const featuredTagStyle = {
    position: 'absolute',
    top: '10px',
    left: '10px',
    backgroundColor: '#ef4444', // Red
    color: '#fff',
    padding: '2px 8px',
    borderRadius: '4px',
    fontSize: '0.75rem',
    fontWeight: '700',
  };

  const contentStyle = {
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  };

  const titleStyle = { fontSize: '1rem', fontWeight: '600', color: '#111827', marginBottom: '8px' };
  const priceStyle = { fontSize: '1rem', fontWeight: '700', color: '#16a34a', marginBottom: '8px' }; // Green
  const locationStyle = { fontSize: '0.875rem', color: '#6b7280', marginBottom: '16px' };
  
  const detailButtonStyle = {
    display: 'inline-block',
    backgroundColor: '#3b82f6',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '4px',
    textAlign: 'center',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '0.875rem',
    border: 'none',
    cursor: 'pointer',
    width: '100%',
    transition: 'background-color 0.2s',
    marginTop: 'auto',
    ':hover': {
      backgroundColor: '#2563eb',
    }
  };

  return (
    <div style={cardStyle}>
      <div style={imageContainerStyle}>
        <img src={vehicle.image} alt={vehicle.title} style={imageStyle} />
        {vehicle.featured && <div style={featuredTagStyle}>FEATURED</div>}
      </div>
      <div style={contentStyle}>
        <h4 style={titleStyle}>{vehicle.title}</h4>
        <p style={priceStyle}>{vehicle.price}</p>
        <p style={locationStyle}>{vehicle.location}</p>
        <Link 
          to={`/vehicle/${vehicle.id}`}
          style={detailButtonStyle}
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

const ListingSection = () => {
  const [showFeaturedList, setShowFeaturedList] = useState(false);
  const featuredListings = vehicles.filter(v => v.featured);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  const sliderOuterRef = useRef(null);

  const slidesPerPage = 4;
  const totalPages = Math.ceil(featuredListings.length / slidesPerPage);

  const nextSlide = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentIndex(prevIndex => (prevIndex - 1 + totalPages) % totalPages);
  };

  useEffect(() => {
    if (sliderRef.current && sliderOuterRef.current) {
      const offset = currentIndex * sliderOuterRef.current.offsetWidth;
      sliderRef.current.style.transform = `translateX(-${offset}px)`;
    }
  }, [currentIndex]);

  const sectionStyle = {
    backgroundColor: 'rgb(255, 252, 242)', // Same as ListingButtonSection
    padding: '80px 0',
    width: '100vw',
    marginLeft: 'calc(-50vw + 50%)',
    marginRight: 'calc(-50vw + 50%)',
    marginTop: '-120px',
    position: 'relative',
    zIndex: 2,
  };

  const containerStyle = {
    width: '100%',
    padding: '0 40px', // Increased padding for wider component
  };

  const headerContainerStyle = {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 20px',
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
  };

  const titleStyle = {
    fontSize: '1.75rem',
    fontWeight: '700',
    color: '#111827',
  };

  const viewAllStyle = {
    color: '#3b82f6', // Blue
    textDecoration: 'none',
    fontWeight: '600',
  };

  const sliderWrapperStyle = {
    position: 'relative',
  };

  const sliderOuterContainerStyle = {
      overflow: 'hidden',
  }

  const sliderContainerStyle = {
    display: 'flex',
    transition: 'transform 0.5s ease-in-out',
  };

  const buttonStyle = {
    position: 'absolute',
    top: '40%',
    transform: 'translateY(-50%)',
    background: '#fff',
    border: '1px solid #e5e7eb',
    borderRadius: '50%',
    width: '44px',
    height: '44px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    zIndex: 2,
  };

  return (
    <>
      {showFeaturedList && (
        <FeaturedList onClose={() => setShowFeaturedList(false)} />
      )}
      <section style={sectionStyle}>
        <div style={containerStyle}>
          <div style={{...headerStyle, ...headerContainerStyle}}>
            <h2 style={titleStyle}>Featured Used Cars for Sale</h2>
            <a 
              href="#" 
              style={viewAllStyle} 
              onClick={(e) => {
                e.preventDefault();
                setShowFeaturedList(true);
              }}
            >
              View All Featured Used Cars
            </a>
          </div>
        <div style={sliderWrapperStyle}>
          <button style={{ ...buttonStyle, left: '-22px' }} onClick={prevSlide} aria-label="Previous Slide">
            <FaChevronLeft />
          </button>
          <div ref={sliderOuterRef} style={sliderOuterContainerStyle}>
            <div ref={sliderRef} style={sliderContainerStyle}>
                {featuredListings.map(vehicle => (
                  <ListingCard key={vehicle.id} vehicle={vehicle} />
                ))}
            </div>
          </div>
          <button style={{ ...buttonStyle, right: '-22px' }} onClick={nextSlide} aria-label="Next Slide">
            <FaChevronRight />
          </button>
        </div>
      </div>
      </section>
    </>
  );
};

export default ListingSection;
