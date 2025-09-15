import React from 'react';
import { Link } from 'react-router-dom';
import './SuccessMessage.css';

const SuccessMessage = ({ title, message, buttonText, buttonLink }) => {
  return (
    <div className="success-message">
      <div className="success-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#38a169" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      </div>
      <h2>{title || 'Success!'}</h2>
      <p>{message || 'Your action has been completed successfully.'}</p>
      {buttonLink && (
        <Link to={buttonLink} className="success-button">
          {buttonText || 'Continue'}
        </Link>
      )}
    </div>
  );
};

export default SuccessMessage;
