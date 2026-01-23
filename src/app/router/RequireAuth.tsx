import { getEmployeeInited } from '@/entities/Employee';
import { getIsAuth } from '@/features/login';
import { useAppSelector } from '@/shared/hooks/useAppSelector/useAppSelector';
import { getRouteAuth, getRouteHome } from '@/shared/lib/router/paths';
import { PageLoader } from '@/widgets/PageLoader';
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
  const isAuth = useAppSelector(getIsAuth);
  const _inited = useAppSelector(getEmployeeInited);

  if (!_inited) {
    return <PageLoader />;
  }

  if (guestOnly && isAuth) {
    return <Navigate to={getRouteHome()} replace />;
  }

  if (authOnly && !isAuth) {
    return <Navigate to={getRouteAuth()} state={{ from: location }} replace />;
  }

  return children;
};
