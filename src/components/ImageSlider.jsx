import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  if (images.length <= 1) {
    return (
      <div style={styles.singleImageContainer}>
        <img 
          src={images[0] || '/placeholder.jpg'} 
          alt="Vehicle"
          style={styles.singleImage}
        />
      </div>
    );
  }

  return (
    <div style={styles.sliderContainer}>
      <button onClick={prevSlide} style={styles.arrowButton}>
        <FaChevronLeft />
      </button>
      
      <div style={styles.imageContainer}>
        <img 
          src={images[currentIndex]} 
          alt={`Slide ${currentIndex + 1}`}
          style={styles.image}
        />
      </div>
      
      <button onClick={nextSlide} style={{ ...styles.arrowButton, right: 0 }}>
        <FaChevronRight />
      </button>

      <div style={styles.dotsContainer}>
        {images.map((_, index) => (
          <span 
            key={index}
            style={index === currentIndex ? styles.activeDot : styles.dot}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

const styles = {
  sliderContainer: {
    position: 'relative',
    width: '100%',
    maxHeight: '500px',
    overflow: 'hidden',
    borderRadius: '8px',
  },
  singleImageContainer: {
    width: '100%',
    maxHeight: '500px',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  singleImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  imageContainer: {
    width: '100%',
    height: '400px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  image: {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
  },
  arrowButton: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    border: 'none',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
    zIndex: 1,
  },
  dotsContainer: {
    position: 'absolute',
    bottom: '10px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '8px',
  },
  dot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: '#ccc',
    cursor: 'pointer',
  },
  activeDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: '#3182ce',
    cursor: 'pointer',
  },
};

export default ImageSlider;
