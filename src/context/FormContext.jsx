import React, { createContext, useContext, useState } from 'react';

const FormContext = createContext();

export function FormProvider({ children }) {
  const [activeForm, setActiveForm] = useState(null); // 'basic', 'standard', 'featured', or null
  
  const openForm = (formType) => {
    setActiveForm(formType);
  };
  
  const closeForm = () => {
    setActiveForm(null);
  };
  
  return (
    <FormContext.Provider value={{ 
      isFormOpen: activeForm !== null, 
      activeForm,
      openForm, 
      closeForm 
    }}>
      {children}
    </FormContext.Provider>
  );
}

export const useForm = () => useContext(FormContext);
