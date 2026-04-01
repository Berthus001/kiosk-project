import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

/**
 * ProtectedRoute Component
 * Protects routes based on authentication and role
 * - Redirects to login if not authenticated
 * - Redirects to unauthorized page if role doesn't match
 */
const ProtectedRoute = ({ element, requiredRole }) => {
  const { user, loading, isAuthenticated } = useContext(AuthContext);

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}
      >
        <h2>Loading...</h2>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check if user has the required role
  if (requiredRole && user?.role !== requiredRole) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          flexDirection: 'column'
        }}
      >
        <h1>🔒 Access Denied</h1>
        <p>You don't have permission to access this page.</p>
      </div>
    );
  }

  return element;
};

export default ProtectedRoute;
