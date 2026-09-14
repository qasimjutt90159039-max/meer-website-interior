import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4F7F7]">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-[#95B2B8] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="font-mono text-xs uppercase text-[#596568]">Verifying administrative access...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export default ProtectedRoute;
