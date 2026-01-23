import { getRouteAuth, getRouteHome } from '@/shared/lib/router/paths';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface RequireAuthProps {
  children: React.ReactElement;
  guestOnly?: boolean;
  authOnly?: boolean;
}

export const RequireAuth = ({
  children,
  guestOnly,
  authOnly,
}: RequireAuthProps) => {
  const location = useLocation();
  const isAuth = Boolean(localStorage.getItem('token'));

  if (guestOnly && isAuth) {
    return <Navigate to={getRouteHome()} replace />;
  }

  if (authOnly && !isAuth) {
    return <Navigate to={getRouteAuth()} state={{ from: location }} replace />;
  }

  return children;
};
