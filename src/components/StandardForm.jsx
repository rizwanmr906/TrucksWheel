import React, { useState, useContext } from 'react';
import { useForm } from '../context/FormContext';
import './BasicForm.css'; // Reusing the same styles

const StandardForm = () => {
  const { closeForm } = useForm();
  const [paymentMethod, setPaymentMethod] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Standard payment form submitted');
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="basic-form">
      <h2>Payment Information</h2>
      
      <div className="form-group">
        <label htmlFor="fullName">Full Name</label>
        <input 
          type="text"
          id="fullName" 
          name="fullName" 
          required 
          placeholder="Enter your full name"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          required 
          placeholder="Enter your email"
        />
      </div>
      
      <div className="form-group">
        <label>Payment Method</label>
        <div className="radio-group">
          <label>
            <input 
              type="radio" 
              name="paymentMethod" 
              value="jazzcash" 
              onChange={handlePaymentMethodChange}
            />
            JazzCash
          </label>
          <label>
            <input 
              type="radio" 
              name="paymentMethod" 
              value="easypaisa" 
              onChange={handlePaymentMethodChange}
            />
            EasyPaisa
          </label>
        </div>
      </div>
      
      <div className="form-group">
        <label htmlFor="accountNumber">Account Number</label>
        <input 
          type="text" 
          id="accountNumber" 
          name="accountNumber" 
          required 
          placeholder="Enter account number"
          disabled={!paymentMethod}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="accountHolder">Account Holder Name</label>
        <input 
          type="text" 
          id="accountHolder" 
          name="accountHolder" 
          required 
          placeholder="Enter account holder name"
          disabled={!paymentMethod}
        />
      </div>
      
      <div className='price'>
        <p>price: 1000</p>
      </div>
      
      <div className="form-actions">
        <button type="button" className="cancel-btn" onClick={closeForm}>
          Cancel
        </button>
        <button type="submit" className="submit-btn" disabled={!paymentMethod}>
          Pay Now
        </button>
      </div>
    </form>
  );
};

export default StandardForm;
