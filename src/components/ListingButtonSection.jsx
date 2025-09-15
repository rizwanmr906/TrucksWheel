import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import BasicForm from './BasicForm';
import StandardForm from './StandardForm';
import { useForm } from '../context/FormContext';

function ModalPortal({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const modalRoot = document.createElement('div');
  modalRoot.style.position = 'fixed';
  modalRoot.style.top = '0';
  modalRoot.style.left = '0';
  modalRoot.style.width = '100%';
  modalRoot.style.height = '100%';
  modalRoot.style.zIndex = '2147483647';
  
  useEffect(() => {
    if (mounted) {
      document.body.appendChild(modalRoot);
    }
    return () => {
      if (document.body.contains(modalRoot)) {
        document.body.removeChild(modalRoot);
      }
    };
  }, [mounted]);

  return mounted ? ReactDOM.createPortal(children, modalRoot) : null;
}

function ListingButtonSection() {
  const { isFormOpen, activeForm, openForm, closeForm } = useForm();
  
  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isFormOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
    } else {
      document.body.style.overflow = 'unset';
      document.documentElement.style.paddingRight = '0';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
      document.documentElement.style.paddingRight = '0';
    };
  }, [isFormOpen]);
  
  const closeOnOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeForm();
    }
  };
  
  const handleBasicClick = () => {
    openForm('basic');
  };

  const handleStandardClick = () => {
    openForm('standard');
  };

  const handleFeaturedClick = () => {
    openForm('featured');
  };

  return (
    <div className="hero-section"
      style={{
        minHeight: "100vh",
        marginRight: "-100px",
        marginLeft: "-100px",
        marginTop: "-60px",
        backgroundColor: "rgb(255, 252, 242)",
        paddingBottom: "25vh",
        position: "relative",
        // Removed z-index to prevent stacking context issues
        marginBottom: "-15vh",
      }}>

      <h1 className="hero-title">Your Vehicle, Our Marketplace — Sell with Ease</h1>

      <div className="grids-wrapper">
        <div className="button-container">
          {/* First Grid Card */}
          <div className="grid-card">
            <div className="card-media">
              <img src="https://images.unsplash.com/photo-1493238792000-8113da705763?q=80&w=800&auto=format&fit=crop" alt="Listing illustration" />
            </div>
            <div className="card-content">
              <ul className="feature-list">
              <li>✅ Simple, reliable listing</li>
                <li>📝 Add essential details in minutes</li>
                <li>🔍 Visible to active buyers</li>
                <li>📈 Good for steady traction</li>
              </ul>
              <div className="card-actions">
                <button 
                  className="action-button"
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
                  onClick={handleBasicClick}
                >
                  Verified
                </button>
              </div>
            </div>
          </div>

          {/* Second Grid Card */}
          <div className="grid-card">
            <div className="card-media">
              <img src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800&auto=format&fit=crop" alt="Featured listing" />
            </div>
            <div className="card-content">
              <ul className="feature-list">
              <li style={{ letterSpacing: "0em" }}>🏆 Stand Out from Other Sellers</li>
              <li>👀 2x More Views & Clicks</li>
              <li>🏎 Perfect for Quick Sales</li>
              <li>🌟 Top Spot on Search Results</li>
              </ul>
              <div className="card-actions">
                <button 
                  className="action-button"
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
                  onClick={handleStandardClick}
                >
                  Featured
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Modal */}
      {isFormOpen && (
        <ModalPortal>
        <div 
          className="modal-overlay"
          onClick={closeOnOverlayClick}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            zIndex: 9999,
            padding: '20px',
            overflow: 'auto',
            overscrollBehavior: 'contain',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            isolation: 'isolate',
            transform: 'translateZ(0)'
          }}
        >
          <div 
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              width: '100%',
              maxWidth: '500px',
              margin: '20px 0',
              position: 'relative',
              zIndex: 2147483647, // Maximum z-index value
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
            }}
          >
            <div style={{ 
              padding: '24px',
              position: 'relative',
              zIndex: 2147483647, // Maximum z-index value
            }}>
              <button 
                onClick={handleBasicClick}
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: 'rgba(0, 0, 0, 0.05)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '18px',
                  color: '#64748b',
                  transition: 'all 0.2s ease',
                  padding: 0
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.1)'}
                onMouseOut={(e) => e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.05)'}
                aria-label="Close modal"
              >
                ×
              </button>
              {activeForm === 'basic' ? (
                <BasicForm />
              ) : (
                <StandardForm />
              )}
            </div>
          </div>
        </div>
        </ModalPortal>
      )}

      <style jsx>{`
        .hero-section {
          min-height: 100vh;
          background-color: rgb(255, 252, 242);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          margin: 0;
          opacity: 1;
          overflow-x: hidden;
          border-top: 1px solid #f0f0f0;
          border-bottom: 1px solid #f0f0f0;
        }

        .hero-title {
          font-size: clamp(2rem, 5vw, 3rem);
          text-shadow: none;
          letter-spacing: 0.0em;
          font-weight: 500;
          font-family: 'Georgia', serif;
          margin-bottom: 2rem;
          margin-top: 6rem;
          color: black;
          text-align: center;
          max-width: 90%;
          line-height: 1.2;
          padding: 0 1rem;
        }

        .grids-wrapper {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 2rem;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .button-container {
          display: flex;
          flex-wrap: wrap;
          gap: 2rem;
          justify-content: center;
          width: 100%;
        }

        .grid-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 350px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .grid-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }

        .card-media {
          width: 100%;
          height: 200px;
          overflow: hidden;
        }

        .card-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .card-content {
          padding: 1.5rem;
        }

        .feature-list {
          list-style: none;
          padding: 0;
          margin: 0 0 1.5rem 0;
        }

        .feature-list li {
          margin-bottom: 0.75rem;
          color: #333;
          font-size: 0.95rem;
          line-height: 1.5;
        }

        .card-actions {
          display: flex;
          justify-content: center;
        }

        .action-button, .standard-button {
          background-color: #2563eb;
          color: white;
          border: none;
          border-radius: 6px;
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: center;
          width: 100%;
          max-width: 200px;
        }

        .action-button:hover, .standard-button:hover {
          background-color: #1d4ed8;
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .hero-section {
            margin-right: 0;
            margin-left: 0;
            padding: 1rem;
          }

          .grids-wrapper {
            flex-direction: column;
            align-items: center;
          }

          .grid-card {
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

export default ListingButtonSection;
