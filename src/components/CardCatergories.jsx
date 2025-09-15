import React from 'react';

function CardCatergories({ children, onClick }) {
  const [hover, setHover] = React.useState(false);
  const cardStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.05)', // Semi-transparent white
    backdropFilter: 'blur(10px)', // Frosted glass effect
    border: '1px solid rgba(255, 255, 255, 0.3)', // Subtle border
    borderRadius: '15px', // Rounded corners
    padding: '20px',
    margin: '40px',
    color: 'black', // Text color, changed to black for better visibility
    minWidth: '180px',
    minHeight: '100px',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)', // Soft shadow
    marginTop: '350px',
    height: '250px',
    width: '350px', 
    cursor: 'pointer',
    transition: 'transform 200ms ease, box-shadow 200ms ease',
    
  };
  const style = {
    ...cardStyle,
    transform: hover ? 'scale(1.03)' : 'scale(1)',
    boxShadow: hover
      ? '0 12px 40px rgba(0, 0, 0, 0.18)'
      : cardStyle.boxShadow,
  };

  return (
    <div
      style={style}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick && onClick();
        }
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {children}
    </div>
  ); 
}

export default CardCatergories;
