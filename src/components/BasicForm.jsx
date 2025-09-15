import React, { useState, useContext } from 'react';
import './BasicForm.css';
import { useForm } from '../context/FormContext';

const BasicForm = () => {
  const { closeForm } = useForm();
  const [paymentMethod, setPaymentMethod] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Payment form submitted');
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="basic-form">
      <h2>Payment Information</h2>
      
      <div className="form-group">
        <label htmlFor="fullName">Full Name *</label>
        <input 
          type="text" 
          id="fullName" 
          required 
          placeholder="Enter your full name"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="email">Email *</label>
        <input 
          type="email" 
          id="email" 
          required 
          placeholder="Enter your email"
        />
      </div>
      
      <div className="form-group">
        <label>Payment Method *</label>
        <div className="checkbox-group">
          <label className="checkbox-label">
            <input
              type="radio"
              name="paymentMethod"
              value="jazzcash"
              checked={paymentMethod === 'jazzcash'}
              onChange={handlePaymentMethodChange}
              required
            />
            <span>Jazz Cash</span>
          </label>
          <label className="checkbox-label">
            <input
              type="radio"
              name="paymentMethod"
              value="easypaisa"
              checked={paymentMethod === 'easypaisa'}
              onChange={handlePaymentMethodChange}
            />
            <span>EasyPaisa</span>
          </label>
        </div>
      </div>
      
      <div className="form-group">
        <label htmlFor="accountNumber">Account Number *</label>
        <input 
          type="text" 
          id="accountNumber" 
          required 
          placeholder={`Enter your ${paymentMethod} account number`}
          disabled={!paymentMethod}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="accountHolderName">Account Holder Name *</label>
        <input 
          type="text" 
          id="accountHolderName" 
          required 
          placeholder="Enter account holder name"
          disabled={!paymentMethod}
        />
      </div>
      <div className='price'>
        <p>price:500</p>
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

export default BasicForm;
