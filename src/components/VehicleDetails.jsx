import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { vehicles } from '../data/vehicles';
import { FaMapMarkerAlt, FaCalendarAlt, FaTachometerAlt, FaGasPump, FaCarAlt, FaInfoCircle, FaPhone, FaEnvelope } from 'react-icons/fa';
import ImageSlider from './ImageSlider';

const VehicleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);

  useEffect(() => {
    // Find the vehicle with the matching ID
    const foundVehicle = vehicles.find(v => v.id === parseInt(id));
    if (foundVehicle) {
      setVehicle(foundVehicle);
    } else {
      // Redirect to 404 or home page if vehicle not found
      navigate('/');
    }
  }, [id, navigate]);

  if (!vehicle) {
    return (
      <div style={{
        backgroundColor: '#fffcf2',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem 0'
      }}>
        <p>Loading vehicle details...</p>
      </div>
    );
  }

  // Format price with commas
  const formatPrice = (price) => {
    if (!price) return 'N/A';
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <div style={{
      backgroundColor: '#fffcf2',
      minHeight: '100vh',
      width: '100%',
      padding: '2rem 0',
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, sans-serif'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1rem'
      }}>
        <button 
          onClick={() => navigate(-1)}
          style={{
            marginBottom: '1.5rem',
            padding: '0.5rem 1rem',
            backgroundColor: 'white',
            border: '1px solid #e2e8f0',
            borderRadius: '6px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.9rem',
            color: '#4a5568',
            transition: 'all 0.2s',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#f8f9fa';
            e.currentTarget.style.borderColor = '#cbd5e0';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'white';
            e.currentTarget.style.borderColor = '#e2e8f0';
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Results
        </button>
        
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '2rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
          border: '1px solid #edf2f7',
          marginBottom: '2rem'
        }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <h1 style={{
              fontSize: '1.8rem',
              margin: '0 0 0.5rem 0',
              color: '#1a202c',
              fontWeight: '600',
              lineHeight: '1.2'
            }}>
              {vehicle.title}
            </h1>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#4a5568',
              fontSize: '0.95rem',
              marginBottom: '1rem'
            }}>
              <FaMapMarkerAlt size={14} />
              <span>{vehicle.location || 'Location not specified'}</span>
            </div>

            {/* Price */}
            <div style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#2d3748',
              marginBottom: '1.5rem'
            }}>
              {formatPrice(vehicle.price)}
            </div>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2rem',
            marginTop: '1rem'
          }}>
            <div>
              {/* Image Slider */}
              <div style={{
                borderRadius: '8px',
                overflow: 'hidden',
                marginBottom: '1.5rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              }}>
                <ImageSlider images={vehicle.images || [vehicle.image]} />
              </div>
              
              {/* Vehicle description */}
              <div style={{ 
                backgroundColor: '#f8f9fa',
                padding: '1.5rem',
                borderRadius: '8px',
                border: '1px solid #edf2f7',
                marginBottom: '1.5rem'
              }}>
                <h3 style={{
                  fontSize: '1.25rem',
                  margin: '0 0 1.25rem 0',
                  color: '#2d3748',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <FaCarAlt /> Vehicle Specifications
                </h3>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '0.75rem'
                }}>
                  {[
                    { label: 'Make', value: vehicle.make || 'N/A' },
                    { label: 'Model', value: vehicle.model || 'N/A' },
                    { label: 'Year', value: vehicle.year || 'N/A' },
                    { label: 'Mileage', value: vehicle.kilometers ? `${vehicle.kilometers.toLocaleString()} km` : 'N/A' },
                    { label: 'Transmission', value: vehicle.trans || 'N/A' },
                    { label: 'Fuel Type', value: vehicle.fuelType || 'N/A' },
                    { label: 'Body Type', value: vehicle.body || 'N/A' },
                    { label: 'Status', value: vehicle.status || 'N/A' },
                    { label: 'City', value: vehicle.city || 'N/A' },
                    { label: 'Area', value: vehicle.area || 'N/A' }
                  ].map((item, index) => (
                    <div key={index} style={{
                      display: 'flex',
                      flexDirection: 'column',
                      padding: '0.5rem 0',
                      borderBottom: '1px solid #edf2f7'
                    }}>
                      <span style={{
                        fontSize: '0.8rem',
                        color: '#718096',
                        marginBottom: '0.25rem'
                      }}>
                        {item.label}
                      </span>
                      <span style={{
                        fontWeight: '500',
                        color: '#2d3748',
                        fontSize: '0.95rem'
                      }}>
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Additional description if available */}
              {vehicle.description && (
                <div style={{
                  backgroundColor: '#f8f9fa',
                  padding: '1.5rem',
                  borderRadius: '8px',
                  border: '1px solid #edf2f7',
                  marginBottom: '1.5rem'
                }}>
                  <h3 style={{
                    fontSize: '1.25rem',
                    margin: '0 0 1rem 0',
                    color: '#2d3748',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <FaInfoCircle /> Description
                  </h3>
                  <p style={{
                    color: '#4a5568',
                    lineHeight: '1.7',
                    fontSize: '0.95rem',
                    margin: 0
                  }}>
                    {vehicle.description}
                  </p>
                </div>
              )}
              
              {/* Features */}
              {vehicle.features && vehicle.features.length > 0 && (
                  <div style={{
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    padding: '1.5rem',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                    border: '1px solid #edf2f7'
                  }}>
                    <h3 style={{
                      fontSize: '1.25rem',
                      margin: '0 0 1.25rem 0',
                      color: '#2d3748'
                    }}>
                      Features
                    </h3>
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.5rem'
                    }}>
                      {vehicle.features.map((feature, index) => (
                        <span key={index} style={{
                          backgroundColor: '#ebf8ff',
                          color: '#2b6cb0',
                          padding: '0.35rem 0.75rem',
                          borderRadius: '9999px',
                          fontSize: '0.8rem',
                          fontWeight: '500'
                        }}>
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetails;
