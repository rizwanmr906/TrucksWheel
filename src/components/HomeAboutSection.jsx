import React from 'react';
const aboutImg = new URL('../../images/aboutus3.png', import.meta.url).href;

function HomeAboutSection() {
  return (
    <section
      className="about-us"
      style={{
        minHeight: '0vh',          // ensure tall section
        padding: '40px 16px 60px', // reduced vertical padding
        display: 'flex',
        flexDirection: 'row',
        gap: '24px',
        alignItems: 'center',
        justifyContent: 'space-between',
        // Overlap Categories slightly so this section's top edge sits over Categories' bottom
        marginTop: '-5px',
        position: 'relative',
        zIndex: 2000, /* Lower than modal's z-index of 2000 */
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        boxShadow: "0 0px 50px rgba(0, 0, 0, 0.86), 0 12px 70px rgba(0, 0, 0, 0.26)",
        marginLeft: "-75px",
        marginRight: "-75px",
        backgroundColor: '#ffffff',
      }}
    >
      <div style={{ flex: '1 1 50%', paddingRight: 16, minWidth: 280 }}>
        <h1 style={{ 
            margin: 0,
            fontWeight: 500,
            fontSize: '4rem',
            marginBottom: '200px',
            marginLeft: '100px',
            fontFamily: 'Georgia, serif',
            color: '#222',
            textShadow: '3px 3px 6px rgba(0, 0, 0, 0)',
            position: 'relative',
            zIndex: 2,
            transform: 'translateX(260px)',
        }}>Get To Know Us</h1>
        <p style={{
           maxWidth: 'min(960px, 100%)',
           fontSize: '2rem',
           transform: 'translateY(-80px)', // move up without affecting layout height
           overflowWrap: 'break-word',
           wordBreak: 'break-word',
           width: '100%',
           boxSizing: 'border-box',
           paddingLeft: 80,
        }}>
          TruckWheel is a platform that connects buyers and sellers of Vehicles.
          Our mission is to provide a seamless and efficient experience for all parties 
          involved in the TruckWheel market.
        </p>
      </div>

      <div style={{ flex: '1 1 50%', display: 'flex', justifyContent: 'flex-end', minWidth: 280 }}>
        <div
          style={{
            borderRadius: 0,
            overflow: 'hidden',
            backgroundColor: '#ffffff', // match section bg to blend corners
          }}
       >
          <img
            src={aboutImg}
            alt="About TruckWheel"
            style={{
              width: '100%',
              maxWidth: 720,
              height: '390px',
              border: 'none',
              borderRadius: 0,
              boxShadow: 'none',
              objectFit: 'contain',
              opacity: 1,
              backgroundColor: 'transparent',
              display: 'block',
              transform: 'translateX(-12px)',
            }}
          />
        </div>
      </div>
    </section>
  );
}

export default HomeAboutSection;
