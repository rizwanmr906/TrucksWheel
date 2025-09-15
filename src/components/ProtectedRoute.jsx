import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

// Simple state to track authentication
let isAuthenticated = false;
const authListeners = new Set();

// Function to update auth state and notify listeners
export const setAuth = (status) => {
  isAuthenticated = status;
  authListeners.forEach(listener => listener(status));
};

// Hook to use auth state
const useAuth = () => {
  const [authState, setAuthState] = useState(isAuthenticated);

  useEffect(() => {
    const listener = (status) => setAuthState(status);
    authListeners.add(listener);
    return () => authListeners.delete(listener);
  }, []);

  return authState;
};

const ProtectedRoute = ({ children }) => {
  const isAuth = useAuth();
  const location = useLocation();

  if (!isAuth) {
    // Redirect to the login page and save the current location they were trying to go to
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
