import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { vehicles } from '../data/vehicles';
import { FaTimes } from 'react-icons/fa';
import './FeaturedList.css';

const FeaturedList = ({ onClose }) => {
  const [featuredVehicles, setFeaturedVehicles] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Filter featured vehicles
    const filtered = vehicles.filter(vehicle => vehicle.featured);
    setFeaturedVehicles(filtered);
  }, []);

  // Close the modal when clicking outside content
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (e.target.classList.contains('featured-list-overlay')) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div className="featured-list-overlay">
      <div className="featured-list-container">
        <button className="close-button" onClick={onClose} aria-label="Close">
          <FaTimes />
        </button>
        
        <div className="featured-list-header">
          <h1>Featured Used Cars</h1>
          <p>Browse our premium selection of featured vehicles</p>
        </div>
        
        <div className="featured-grid">
          {featuredVehicles.map((vehicle) => (
            <div key={vehicle.id} className="featured-card">
              <div className="image-container">
                <img 
                  src={vehicle.image.startsWith('http') ? vehicle.image : vehicle.image.startsWith('/') ? vehicle.image : `/${vehicle.image}`}
                  alt={vehicle.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Available';
                  }}
                />
                <span className="featured-badge">Featured</span>
              </div>
              <div className="card-details">
                <h3>{vehicle.title}</h3>
                <div className="price">{vehicle.price}</div>
                <div className="specs">
                  <span>{vehicle.year}</span>
                  <span>{vehicle.transmission}</span>
                  <span>{vehicle.city}</span>
                </div>
                <button 
                  className="view-details-btn"
                  onClick={() => navigate(`/vehicle/${vehicle.id}`)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedList;
