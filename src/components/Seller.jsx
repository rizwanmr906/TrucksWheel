import React, { useState, useEffect } from 'react';
import { BsFillBuildingFill } from 'react-icons/bs';

// Mock data for sellers - this would be fetched from your API
const mockSellers = [
  {
    id: 1,
    name: 'Ali Khan',
    company: 'Ali Motors',
    email: 'ali@example.com',
    phone: '0300-1234567',
    imageUrl: '/images/1.jpeg',
    rating: 4.8,
  },
  {
    id: 2,
    name: 'Sara Ahmed',
    company: 'Sara Cars',
    email: 'sara@example.com',
    phone: '0301-9876543',
    imageUrl: '/images/2.png',
    rating: 5.0,
  },
  {
    id: 3,
    name: 'Usman Malik',
    company: 'Malik Auto Traders',
    email: 'usman@example.com',
    phone: '0321-5554321',
    imageUrl: '/images/3.png',
    rating: 4.5,
  },
];

const SellerCard = ({ seller }) => {
  const cardStyle = {
    background: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    padding: '24px',
    textAlign: 'center',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    maxWidth: '280px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
  };

  const imageStyle = {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '12px',
  };

  const nameStyle = { fontSize: '1.25rem', fontWeight: '700', color: '#111827' };
  const detailStyle = { fontSize: '0.9rem', color: '#4b5563' };
  
  const buttonStyle = {
    background: '#2563eb',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    padding: '10px 20px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '16px',
    transition: 'background 0.2s ease',
  };

  return (
    <div style={cardStyle}>
      <img src={seller.imageUrl} alt={seller.name} style={imageStyle} />
      <h3 style={nameStyle}>{seller.name}</h3>
      <p style={detailStyle}>{seller.company}</p>
      <p style={detailStyle}>{seller.email}</p>
      <p style={detailStyle}>{seller.phone}</p>
      <button style={buttonStyle} onMouseOver={e => e.currentTarget.style.background='#1d4ed8'} onMouseOut={e => e.currentTarget.style.background='#2563eb'}>
        View Profile
      </button>
    </div>
  );
};

const SellerHero = () => {
  const heroStyle = {
    height: '380px',
    backgroundImage: `url('/images/seller hero.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <section className="listing-hero" style={heroStyle}>
      <div className="hero-inner" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
         <h1 style={{ color: 'white', fontSize: 'clamp(32px, 4vw, 50px)', fontWeight: '800', textShadow: '0 2px 10px rgba(0,0,0,0.5)', textAlign: 'center' }}>
            Our Trusted Sellers
         </h1>
         <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.1rem', marginTop: '1rem', textShadow: '0 1px 5px rgba(0,0,0,0.5)', textAlign: 'center' }}>
            Connecting you with the best in the industry.
         </p>
      </div>
    </section>
  );
};

const SellerDetails = () => {
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    // Simulate fetching data from an API
    // Replace this with your actual API call, e.g., fetch('/api/sellers')
    const fetchSellers = () => {
      // For demonstration, we'll use the mock data.
      // In a real app, you would get this from a server.
      const sortedSellers = mockSellers.sort((a, b) => b.rating - a.rating);
      setSellers(sortedSellers);
    };

    fetchSellers();
  }, []); // The empty array ensures this effect runs only once when the component mounts
  return (
    <div style={{ padding: '50px 20px' }}>
      <h1 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', fontSize: 'clamp(24px, 2.8vw, 36px)', fontWeight: '700', color: '#111827', textAlign: 'center', marginBottom: '40px' }}>
        <BsFillBuildingFill />
        Registered sellers
      </h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '24px' }}>
        {sellers.map(seller => (
          <SellerCard key={seller.id} seller={seller} />
        ))}
      </div>
    </div>
  );
};

const Seller = () => {
  return (
    <main>
      <SellerHero />
      <div style={{ width: '100vw', position: 'relative', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'rgb(255, 252, 242)', minHeight: 'calc(100vh - 380px)' }}>
        <SellerDetails />
      </div>
    </main>
  );
};

export default Seller;

