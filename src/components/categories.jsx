import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from './CardCatergories';

function Categories() {
    const navigate = useNavigate();
    return (
      <div
        className="categories"
        style={{
          position: "relative",
          minHeight: "150vh",
          marginRight: "-100px",
          marginLeft: "-100px",
          marginTop: "-40px",
          backgroundColor: "rgb(255, 255, 255)",
          overflow: "hidden", // prevent blur overflow
        }}
       
        
      >
        {/* Header */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 2, textAlign: 'center', paddingTop: '0' }}>
          <h1 style={{ margin: 0, 
            fontSize: '3rem', 
            color: '#222',
            marginTop: '120px',
            fontWeight: '500',
            fontFamily: 'Georgia, serif',
            textShadow: '3px 3px 6px rgba(0, 0, 0, 0)',
            }}>
                Browse by Category</h1>
        </div>
                        
        {/* Background Image Layer */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "80%",
            backgroundImage: "url('images/Airbrush-image-extender.jpeg')",
            backgroundSize: "contain",
            backgroundPosition: "center 250px",
            backgroundRepeat: "no-repeat",
            filter: "blur(2px)",
            opacity: 0.95,
            zIndex: 0,
          }}
        ></div>
  
        {/* Foreground Content */}
        <div style={{ position: "relative", zIndex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
          <Card onClick={() => navigate('/listing?status=heavy#results')}>
            <img src="images/2.png" alt="" />
            <h1 
            style={{fontWeight:'600',
                fontSize:'2rem',
                
                }}
            >
                Heavy Vehicles</h1>
            <p style={{
                fontWeight:'400',
                fontSize:'1rem',              
            }}>“Strength Meets Reliability”</p>
          </Card>
          <Card onClick={() => navigate('/listing?status=light#results')}>
            <img src="images/light_weight-removebg-preview.png" alt="" style={{ marginTop: '25px' }} />
            <h1
            style={{fontWeight:'600',
                fontSize:'2rem',
                
                }}>Light Vehicles</h1>
            <p style={{
                fontWeight:'400',
                fontSize:'1rem',              
            }}>
            "Smooth Rides, Light Load"</p>
          </Card>
        </div> 
      </div>
    );
  }
  
  export default Categories;
  