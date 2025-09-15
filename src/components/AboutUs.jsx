import React from 'react';


function AboutUs() {
  return (
    <>
      {/* Hero section (full-bleed under navbar) */}
      <div
        className="about-hero"
        style={{
          position: 'relative',
          left: '50%',
          right: '50%',
          marginLeft: '-50vw',
          marginRight: '-50vw',
          width: '100vw',
          // Counter the #root { padding: 2rem } top padding so hero hugs the navbar
          marginTop: '-2rem',
          // Responsive height: grow with viewport but keep sensible bounds
          height: 'clamp(380px, 70vh, 820px)',
          backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.35), rgba(0,0,0,0.15)), url("images/about us hero.jpg")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* OverView section (between hero and about-us) */}
      <section
        id="OverView"
        style={{
          position: 'relative',
          left: '50%',
          right: '50%',
          marginLeft: '-50vw',
          marginRight: '-50vw',
          width: '100vw',
          maxWidth: '100vw',
          overflowX: 'hidden',
          boxSizing: 'border-box',
          background: 'rgb(255, 252, 242)',
          padding: 'clamp(16px, 4vw, 32px) 16px',
          paddingBottom: 'clamp(16px, 3vw, 56px)',
        }}
      >
        <div style={{ 
          maxWidth: 1200, 
          margin: '0 auto',
          padding: '0 12px',
          boxSizing: 'border-box'
           }}>
          {/* Heading block centered on its own row */}
          <div style={{ textAlign: 'center', marginBottom: 'clamp(56px, 7vw, 96px)' }}>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              {/* Circle behind the heading */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 'clamp(120px, 22vw, 260px)',
                height: 'clamp(120px, 22vw, 260px)',
                borderRadius: '50%',
                background: 'rgba(255, 204, 0, 0.08)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                boxShadow: '0 14px 48px rgba(0,0,0,0.22), 0 8px 28px rgba(0,0,0,0.18), 0 0 0 8px rgba(255, 204, 0, 0.12)'
              }} />

              {/* Heading overlapping the circle, extending out left/right */}
              <h2 style={{
                margin: 0,
                fontWeight: 900,
                letterSpacing: '-0.3px',
                fontSize: 'clamp(28px, 5vw, 40px)',
                color: 'rgba(17, 24, 39, 0.85)',
                position: 'relative',
                zIndex: 1,
                whiteSpace: 'nowrap',
                padding: '0 clamp(12px, 4vw, 28px)',
                textShadow: '0 2px 6px rgba(0,0,0,0.25)'
              }}>
                Welcome To TrucksWheel
              </h2>
            </div>
          </div>

          {/* Two-column layout: paragraph left, image right */}
          <div
            style={{
              display: 'grid',
              gap: 'clamp(20px, 4vw, 40px)',
              alignItems: 'center',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
            }}
          >
            {/* Left: Paragraph only */}
            <div style={{ textAlign: 'left' }}>
              <p style={{
                margin: 0,
                maxWidth: '60ch',
                color: '#374151',
                lineHeight: 1.85,
                fontWeight: 700,
                fontSize: 'clamp(16px, 2.8vw, 20px)',
                textAlign: 'left'
              }}>
                Truckswheel is a modern online platform to buy and sell vehicles, including cars, trucks, jeeps, and commercial vehicles. Browse verified listings with detailed photos and specs, compare options, and chat directly with sellers. Post your vehicle in minutes and reach serious buyers fast with transparent pricing and secure communication. Whether for personal use or commercial fleets, find the right vehicle and close the deal with confidence.
              </p>
            </div>

            {/* Right: Image */}
            <div style={{ textAlign: 'center' }}>
              <img
                src="images/overview pic.png"
                alt="Overview vehicle showcase"
                style={{
                  width: '100%',
                  maxWidth: 640,
                  height: 'auto',
                  borderRadius: 12,
                  mixBlendMode: 'multiply',
                  opacity: 0.98
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <section
      className="vision-and-mission"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "1fr 1fr",
        gap: "0px",
        width: "110%",
        marginLeft:"-5vw",
        minHeight: "100vh",

      
      }}
    >
      {/* Grid 1 - Image */}
      <div
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      {/* Grid 2 - Text */}
      <div
        style={{
          backgroundColor: "#ffffff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px",
        }}
      >
        <h1
          style={{
            fontSize: "36px",
            fontWeight: "bold",
            marginBottom: "20px",
            color: "#000000",
          }}
        >
          Our Mission
        </h1>
        <p
          style={{
            fontSize: "16px",
            lineHeight: "1.6",
            color: "#333333",
          }}
        >
         To provide a reliable and transparent marketplace for people across Pakistan, connecting sellers and genuine buyers quickly.

        </p>
      </div>

      {/* Grid 3 - Text */}
      <div
        style={{
          backgroundColor: "#000000",
          color: "#ffffff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px",
        }}
      >
        <h1
          style={{
            fontSize: "36px",
            fontWeight: "bold",
            marginBottom: "20px",
            color: "white",
          }}
        >
          Our Vission
        </h1>
        <p
          style={{
            fontSize: "16px",
            lineHeight: "1.6",
            color: "white",
          }}
        >
         To provide a reliable and transparent marketplace for people across Pakistan, connecting sellers and genuine buyers quickly.

        </p>
      </div>

      {/* Grid 4 - Image */}
      <div
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1503736334956-4c8f8e92946d')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
    </section>

      <section
      className="about-us"
      style={{
        // Full-bleed background across viewport width
        position: 'relative',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
        width: '100vw',
        maxWidth: '100vw',
        overflowX: 'hidden',
        boxSizing: 'border-box',
        
        // Visual styles
        background: '#ffffff',
        minHeight: '100vh',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(24px, 4vw, 56px) 16px' }}>
        {/* Why Choose Us section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          alignItems: 'center',
          gap: 32,
        }}>
          {/* Left: image */}
          <div>
            <img
              src="images/whyus.png"
              alt="Premium vehicle on the road"
              style={{ width: '100%', maxWidth: 500, height: 'auto', borderRadius: 12, display: 'block', margin: 'clamp(8px, 3vw, 20px) auto 0' }}
            />
          </div>

          {/* Right: features list */}
          <div>
            {/* Inset heading to align with text start after icons (56px icon + 14px gap = 70px) */}
            <div style={{ paddingLeft: 10 }}>
              <h2 style={{
                margin: 0,
                fontWeight: 900,
                letterSpacing: '-0.3px',
                fontSize: 'clamp(22px, 3vw, 32px)',
                color: '#111827',
                marginLeft: 10,
              }}>
                Why Choose Us?
              </h2>
              <div style={{ width: 'clamp(48px, 12vw, 64px)', height: 4, background: '#ef4444', borderRadius: 9999, margin: '8px 0 24px' }} />
            </div>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 32 }}>
              {/* Item 1 */}
              <li style={{ display: 'grid', gridTemplateColumns: '56px 1fr', alignItems: 'center', gap: 14 }}>
                <span style={{
                  width: 56, height: 56, borderRadius: 9999,
                  background: 'rgba(239, 68, 68, 0.1)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.06)'
                }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M12 2l7 4v6c0 5-7 10-7 10S5 17 5 12V6l7-4z" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
                <div style={{ textAlign: 'left', minWidth: 0, overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                  <div style={{ fontWeight: 800, fontSize: 16, color: '#111827' }}>Highly Secured</div>
                  <div style={{ color: '#6b7280', fontSize: 13, lineHeight: 1.8, marginTop: 8 }}>Our stress‑free finance department can find financial solutions to save you money.</div>
                </div>
              </li>

              {/* Item 2 */}
              <li style={{ display: 'grid', gridTemplateColumns: '56px 1fr', alignItems: 'center', gap: 14 }}>
                <span style={{ width: 56, height: 56, borderRadius: 9999, background: 'rgba(59, 130, 246, 0.1)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 2px rgba(0,0,0,0.06)' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-1 10l-3 3 7-7" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
                <div style={{ textAlign: 'left', minWidth: 0, overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                  <div style={{ fontWeight: 800, fontSize: 16, color: '#111827' }}>Trusted Agents</div>
                  <div style={{ color: '#6b7280', fontSize: 13, lineHeight: 1.8, marginTop: 8 }}>Verified sellers and clear communication throughout your deal.</div>
                </div>
              </li>

              {/* Item 3 */}
              <li style={{ display: 'grid', gridTemplateColumns: '56px 1fr', alignItems: 'center', gap: 14 }}>
                <span style={{ width: 56, height: 56, borderRadius: 9999, background: 'rgba(16, 185, 129, 0.1)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 2px rgba(0,0,0,0.06)' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M12 5v14m-7-7h14" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
                <div style={{ textAlign: 'left', minWidth: 0, overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                  <div style={{ fontWeight: 800, fontSize: 16, color: '#111827' }}>Get an Offer</div>
                  <div style={{ color: '#6b7280', fontSize: 13, lineHeight: 1.8, marginTop: 8 }}>Quick appraisals and competitive offers for your vehicle.</div>
                </div>
              </li>

              {/* Item 4 */}
              <li style={{ display: 'grid', gridTemplateColumns: '56px 1fr', alignItems: 'center', gap: 14 }}>
                <span style={{ width: 56, height: 56, borderRadius: 9999, background: 'rgba(168, 85, 247, 0.1)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 2px rgba(0,0,0,0.06)' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M18 8a6 6 0 11-12 0" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
                <div style={{ textAlign: 'left', minWidth: 0, overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                  <div style={{ fontWeight: 800, fontSize: 16, color: '#111827' }}>Free Support</div>
                  <div style={{ color: '#6b7280', fontSize: 13, lineHeight: 1.8, marginTop: 8 }}>Friendly assistance before and after your purchase.</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    
    </>
  );
}

export default AboutUs;
