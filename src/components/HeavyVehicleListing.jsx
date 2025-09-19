import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SuccessMessage from './SuccessMessage';
import { Step1, Step2, Step3 } from './FormSteps';
import './HeavyVehicleListing.css';

const cities = [
  'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad',
  'Multan', 'Gujranwala', 'Peshawar', 'Quetta', 'Sialkot', 'Other'
];


const models = [
  'Volvo', 'Scania', 'Mercedes', 'MAN', 'Tata', 'Hino', 'Isuzu',
  'Hyundai', 'FAW', 'JAC', 'JMC', 'Other'
];

const insuranceTypes = [
  'Comprehensive', 'Third Party', 'None'
];

const currentYear = new Date().getFullYear();
const years = Array.from({length: 30}, (_, i) => currentYear - i);

const HeavyVehicleListing = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    //Basic Information
    title: '',
    year: '',
    kilometers: '',
    city: '',
    insuranceType: '',
    insuranceValidity: '',
    description: '',
    excelFile: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formStep, setFormStep] = useState(1);
  const [progress, setProgress] = useState(33);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    
    // For file inputs, use the files array, otherwise use the value
    const inputValue = type === 'file' ? Array.from(files) : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: inputValue
    }));
    
    // Clear error when field is being edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    switch(step) {
      case 1:
        if (!formData.title) newErrors.title = 'Please select a title';
        if (!formData.year) newErrors.year = 'Please select a year';
        if (!formData.kilometers) {
          newErrors.kilometers = 'Please enter kilometers';
        } else if (formData.kilometers < 0 || formData.kilometers > 2000000) {
          newErrors.kilometers = 'Please enter a valid mileage';
        }
        // Removed insuranceType validation as per user request
        // if (!formData.insuranceType) newErrors.insuranceType = 'Please select insurance type';
        // if (formData.insuranceType === 'comprehensive' && !formData.insuranceValidity) {
        //   newErrors.insuranceValidity = 'Please enter insurance validity date';
        // }
        if (!formData.city) newErrors.city = 'Please select a city';
        if (!formData.description) newErrors.description = 'Please enter a description';
        break;
        
      case 2:
        // Only check for photos in step 2
        if (!formData.photos || formData.photos.length === 0) {
          newErrors.photos = 'Please upload at least one photo';
        }
        break;
        
      case 3:
        if (!formData.price) {
          newErrors.price = 'Please enter a price';
        } else if (formData.price < 0) {
          newErrors.price = 'Price cannot be negative';
        }
        break;
        
      default:
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep(3)) {
      const firstError = Object.keys(errors)[0];
      if (firstError) {
        document.getElementById(firstError)?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
      return;
    }

    setIsSubmitting(true);

      try {
      const listingData = {
        title: formData.title,
        year: formData.year,
        city: formData.city,
        kilometers: formData.kilometers,
        description: formData.description,
        price: formData.price,
        seller: 'Anonymous Seller' // TODO: Get from user context
      };

      // Prepare form data for photos upload
      const formPayload = new FormData();
      formPayload.append('title', listingData.title);
      formPayload.append('year', listingData.year);
      formPayload.append('city', listingData.city);
      formPayload.append('kilometers', listingData.kilometers);
      formPayload.append('description', listingData.description);
      formPayload.append('price', listingData.price);
      formPayload.append('seller', listingData.seller);

      if (formData.photos && formData.photos.length > 0) {
        formData.photos.forEach((photo) => {
          formPayload.append('photos', photo);
        });
      }

      const response = await axios.post('http://localhost:5000/heavyvehicle/listings', formPayload, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Heavy vehicle listing submitted:', formData);
      setIsSubmitted(true);

    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your listing. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Update progress based on form step
  useEffect(() => {
    const calculatedProgress = Math.min(100, Math.max(0, (formStep / 3) * 100));
    setProgress(calculatedProgress);
  }, [formStep]);

  const nextStep = () => {
    const isValid = validateStep(formStep);
    if (isValid) {
      setFormStep(prev => Math.min(3, prev + 1));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Scroll to the first error immediately after validation
      const newErrors = {};
      switch(formStep) {
        case 1:
          if (!formData.title) newErrors.title = 'Please select a title';
          if (!formData.year) newErrors.year = 'Please select a year';
          if (!formData.kilometers) {
            newErrors.kilometers = 'Please enter kilometers';
          } else if (formData.kilometers < 0 || formData.kilometers > 2000000) {
            newErrors.kilometers = 'Please enter a valid mileage';
          }
          if (!formData.insuranceType) newErrors.insuranceType = 'Please select insurance type';
          if (formData.insuranceType === 'comprehensive' && !formData.insuranceValidity) {
            newErrors.insuranceValidity = 'Please enter insurance validity date';
          }
          if (!formData.city) newErrors.city = 'Please select a city';
          if (!formData.description) newErrors.description = 'Please enter a description';
          break;
        case 2:
          if (!formData.photos || formData.photos.length === 0) {
            newErrors.photos = 'Please upload at least one photo';
          }
          break;
        case 3:
          if (!formData.price) {
            newErrors.price = 'Please enter a price';
          } else if (formData.price < 0) {
            newErrors.price = 'Price cannot be negative';
          }
          break;
        default:
          break;
      }
      const firstError = Object.keys(newErrors)[0];
      if (firstError) {
        document.getElementById(firstError)?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    }
  };

  const prevStep = () => {
    setFormStep(prev => Math.max(1, prev - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isSubmitted) {
    return (
      <div className="heavy-vehicle-listing">
        <SuccessMessage 
          title="Listing Submitted Successfully!"
          message="Your heavy vehicle listing has been received and is under review. We'll notify you once it's live on our platform."
          buttonText="Back to Home"
          buttonLink="/"
        />
      </div>
    );
  }

  return (
    <div className="heavy-vehicle-listing">
      {/* Progress Bar */}
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>
      
      <div className="content-card">
        <div className="steps-header">
          <h1>Sell your Heavy Vehicle With 3 Easy & Simple Steps!</h1>
          <p>It's takes less than a minute</p>
        </div>
        
        <div className="steps-container">
          {[1, 2, 3].map((step) => (
            <div key={step} className={`step ${formStep >= step ? 'active' : ''}`}>
              <div className="step-icon">
                {formStep > step ? '✓' : step}
              </div>
              <p>
                {step === 1 && 'Vehicle Info'}
                {step === 2 && 'Upload Photos'}
                {step === 3 && 'Set Price'}
              </p>
            </div>
          ))}
        </div>
        
        <div className="info-container">
          <h2>
            {formStep === 1 && 'Basic Vehicle Information'}
            {formStep === 2 && 'Vehicle Photos'}
            {formStep === 3 && 'Pricing & Final Details'}
          </h2>
          <form className="vehicle-form" onSubmit={handleSubmit} noValidate>
            {/* Step 1: Basic Information */}
            {formStep === 1 && (
              <Step1 
                formData={formData}
                errors={errors}
                handleChange={handleChange}
                models={models}
                years={years}
                cities={cities}
                insuranceTypes={insuranceTypes}
                insuranceValidity={formData.insuranceValidity}
                description={formData.description}
              />
            )}
            
            {/* Step 2: Photos */}
            {formStep === 2 && (
              <Step2
              formData={formData}
              photos={formData.photos}
              errors={errors}
              handleChange={handleChange}
              />
            )}
            
            {/* Step 3: Pricing & Details */}
            {formStep === 3 && (
              <Step3 
                formData={formData}
                price={formData.price}
                errors={errors}
                handleChange={handleChange}          
              />
            )}
            
            {/* Navigation Buttons */}
            <div className="form-navigation">
              <div className="nav-buttons-container">
                {formStep > 1 && (
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={prevStep}
                  >
                    ← Back
                  </button>
                )}
                
                <div className="flex-grow"></div>
                
                {formStep < 3 ? (
                  <button 
                    type="button" 
                    className="btn btn-primary" 
                    onClick={nextStep}
                  >
                    Next →
                  </button>
                ) : (
                  <button 
                    type="submit" 
                    className="btn btn-primary submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Listing'}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HeavyVehicleListing;
