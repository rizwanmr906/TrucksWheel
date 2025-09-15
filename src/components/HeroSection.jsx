import React from 'react';
import { Link } from 'react-router-dom';

function HeroSection() {
  return (
    <div className=" HeroSection"
    style={{
       marginBottom: '200px',
      marginTop: '-50px',
      width: 'auto',
      height: 'auto',
      objectFit: 'cover',
      
    }}
    
    
    
    >

      {/* Background Image */}
      <div
        className="absolute top-0 left-0 w-full h-screen "
        style={{
          backgroundImage: "url('/images/1.jpeg')",
          backgroundSize: 'cover', // Makes it always fill both width & height
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.755, // keep as number instead of string
          filter: 'blur(2px)',
          border: "4px solid transparent", // transparent border
          borderRadius: "20px", // optional rounded corners
          
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col text-white px-4 sm:px-6 lg:px-8">
        <div className="space-y-6 text-center">
          {/* Title */}
          <Link
            to="/about"
            className="inline-grid font-black hover:text-cyan-300 transition-all duration-700 cursor-pointer transform hover:scale-110 hover:rotate-0 no-underline"
            style={{
              fontSize: 'clamp(3rem, 8vw, 4rem)',
              textShadow: '3px 3px 6px rgba(0,0,0,0.9)',
              letterSpacing: '0.01em',
              fontWeight: '530',
              fontFamily: 'Quicksand,round, sans-serif',
              borderRadius: '200px',
              color: 'white',
              textTransform: 'uppercase',
              marginLeft: '-500px',
              marginTop: '200px',
              position: 'relative',
              top: '-50px',

            }}
          >
            Trucks Wheel
          </Link>

          {/* Animation keyframes */}
          <style>{`
            @keyframes heroImageMove {
              from { transform: translateY(0); }
              to { transform: translateY(-10px); }
            }
          `}</style>

          {/* Subtitle */}
          <p
            className="font-bold max-w-6xl mx-auto leading-tight opacity-100"
            style={{
              fontSize: 'clamp(2rem, 5vw, 2.5rem)',
              textShadow: '3px 4px 6px rgba(0,0,0,0.9) 50px',
              letterSpacing: '0.0em',
              fontWeight: '500',
              fontFamily: 'Georgia, serif',
              marginTop: '8px',
              color: '#c5ae9a',
              marginLeft: '-185px',
              position: 'relative',
              top: '-50px',
            }}
          >
            The largest listing for light and heavy vehicles
          </p>
          
          {/* CTAs */}
          <div
            className="flex items-center justify-start gap-4"
            style={{ marginLeft: '100px', position: 'relative', top: '-40px' }}
          >
            <Link
              to="/about"
              className="no-underline"
              style={{
                padding: '12px 18px',
                borderRadius: 10,
                background: '#111827',
                color: 'white',
                fontWeight: 800,
                marginLeft: '40px',
                border: '1px solid #111827',
              }}
            >
              Contact Us
            </Link>
          </div>

          {/* Decorative line */}
          <div className="mt-16">
            <div className="w-32 h-2 bg-yellow-400 mx-auto rounded-full shadow-xl"></div>
          </div>
        </div>
      </div>

      {/* Overlay effect */}
      <div className="absolute inset-0 opacity-10 bg-gradient-to-r from-blue-900/20 to-purple-900/20"></div>
    </div>
  );
}

export default HeroSection;
