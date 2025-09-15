import React from 'react';

export const Step1 = ({ formData, errors, handleChange, years }) => (
  <div className="form-step">
    <div className="form-row">
      <div className="form-group">
        <label htmlFor="model">Model*</label>
        <input 
          type="text" 
          id="model" 
          name="model"
          value={formData.model}
          onChange={handleChange}
          placeholder="Enter model"
          className={errors.model ? 'error' : ''}
          required 
        />
        {errors.model && <span className="error-message">{errors.model}</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="year">Year*</label>
        <select 
          id="year" 
          name="year"
          value={formData.year}
          onChange={handleChange}
          className={errors.year ? 'error' : ''}
          required
        >
          <option value="">Select Year</option>
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
        {errors.year && <span className="error-message">{errors.year}</span>}
      </div>
    </div>

    <div className="form-row">
      <div className="form-group">
        <label htmlFor="city">City*</label>
        <input 
          type="text" 
          id="city" 
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="Enter city"
          className={errors.city ? 'error' : ''}
          required 
        />
        {errors.city && <span className="error-message">{errors.city}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="kilometers">Kilometers*</label>
        <input 
          type="number" 
          id="kilometers" 
          name="kilometers"
          value={formData.kilometers}
          onChange={handleChange}
          placeholder="Enter kilometers" 
          className={errors.kilometers ? 'error' : ''}
          required 
          min="0"
        />
        {errors.kilometers && <span className="error-message">{errors.kilometers}</span>}
      </div>
    </div>
    <div className="form-group">
        <label htmlFor="description">Description*</label>
        <textarea 
          id="description" 
          name="description"
          value={formData.description}
          onChange={handleChange}
          className={errors.description ? 'error' : ''}
          required 
        />
        {errors.description && <span className="error-message">{errors.description}</span>}
      </div>
  </div>
);

export const Step2 = ({ formData, errors, handleChange }) => {
  const maxPhotos = 20;
  const currentCount = formData.photos?.length || 0;
  const remainingPhotos = maxPhotos - currentCount;

  // Create object URLs for preview
  const previewUrls = React.useMemo(() => {
    return formData.photos?.map(file => URL.createObjectURL(file)) || [];
  }, [formData.photos]);

  // Clean up object URLs to prevent memory leaks
  React.useEffect(() => {
    return () => {
      previewUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  const handleRemoveImage = (index) => {
    const newPhotos = [...formData.photos];
    newPhotos.splice(index, 1);
    handleChange({
      target: {
        name: 'photos',
        value: newPhotos
      }
    });
  };

  return (
    <div className="upload-section">
      <h3>Upload Vehicle Photos (Max {maxPhotos})</h3>
      <div className="file-upload">
        <label htmlFor="photos" className="file-upload-label">
          <span>Choose Photos</span>
          <input 
            type="file" 
            id="photos" 
            name="photos"
            onChange={handleChange}
            multiple
            accept="image/*"
            disabled={currentCount >= maxPhotos}
          />
        </label>
        
        <div className="selected-files">
          {currentCount > 0 ? (
            <p>
              {currentCount} file(s) selected
              {currentCount >= maxPhotos ? (
                <span className="text-red-500"> (Maximum {maxPhotos} photos reached)</span>
              ) : (
                <span> (Up to {remainingPhotos} more can be added)</span>
              )}
            </p>
          ) : (
            <p>No photos selected (minimum 1 required)</p>
          )}
        </div>
        
        {previewUrls.length > 0 && (
          <div className="image-previews">
            {previewUrls.map((url, index) => (
              <div key={index} className="image-preview-item">
                <img 
                  src={url} 
                  alt={`Preview ${index + 1}`} 
                  className="preview-image"
                />
                <button 
                  type="button" 
                  className="remove-image"
                  onClick={() => handleRemoveImage(index)}
                  aria-label="Remove image"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
        
        {errors.photos && (
          <div className="error-message mt-2">
            {errors.photos}
          </div>
        )}
      </div>

      <style jsx>{`
        .image-previews {
          display: flex;
          flex-wrap: nowrap;
          gap: 10px;
          margin-top: 15px;
          overflow-x: auto;
          padding-bottom: 10px;
        }
        .image-preview-item {
          position: relative;
          flex: 0 0 auto;
          width: 100px;
          height: 100px;
          border: 1px solid #e2e8f0;
          border-radius: 4px;
          overflow: hidden;
        }
        .preview-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .remove-image {
          position: absolute;
          top: 5px;
          right: 5px;
          background: rgba(0, 0, 0, 0.6);
          color: white;
          border: none;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 16px;
          line-height: 1;
        }
        .remove-image:hover {
          background: #ef4444;
        }
      `}</style>
    </div>
  );
};

export const Step3 = ({ formData, errors, handleChange }) => (
  <div className="form-step">
    <div className="form-group">
      <label htmlFor="price">Price (PKR)*</label>
      <input 
        type="number" 
        id="price" 
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Enter price in PKR" 
        className={errors.price ? 'error' : ''}
        required 
        min="0"
      />
      {errors.price && <span className="error-message">{errors.price}</span>}
    </div>
  </div>
);
