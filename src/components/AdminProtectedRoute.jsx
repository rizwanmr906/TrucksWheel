import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminProtectedRoute = ({ children }) => {
  const isAdminAuthenticated = localStorage.getItem('adminAuth') === 'true';

  if (!isAdminAuthenticated) {
    // Redirect to admin login page
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export default AdminProtectedRoute;
