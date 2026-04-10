import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getUserDashboard, ROLES } from '../utils/auth.js';

const ProtectedRoute = ({ children, requiredRole, user }) => {
  const location = useLocation();

  // If no user is logged in, redirect to auth
  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // If a specific role is required and user doesn't have it
  if (requiredRole) {
    const allowedRoles = Array.isArray(requiredRole)
      ? requiredRole
      : [requiredRole];

    if (!allowedRoles.includes(user.role)) {
      // Redirect to appropriate dashboard based on actual role
      const dashboardMap = {
        [ROLES.CUSTOMER]: '/home',
        [ROLES.AGENT]: '/agent/dashboard',
        [ROLES.PROVIDER]: '/provider/dashboard',
        [ROLES.GUIDE]: '/guide/dashboard',
        [ROLES.ADMIN]: '/admin/dashboard',
        [ROLES.SUPER_ADMIN]: '/admin/dashboard',
        [ROLES.MANAGER]: '/admin/dashboard'
      };

      const redirectTo = dashboardMap[user.role] || '/auth';
      return <Navigate to={redirectTo} replace />;
    }
  }

  // User is authenticated and has the required role (or no role required)
  return children;
};

export default ProtectedRoute;