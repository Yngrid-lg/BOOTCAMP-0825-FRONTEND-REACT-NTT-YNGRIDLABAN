import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { ModulesRoutes } from './appRoutes';
import { StorageKeys } from '../app/domain/auth';

interface PublicRouteProps {
  children: ReactNode;
}

export default function PublicRoute({ children }: PublicRouteProps) {
  const isLoggedIn = localStorage.getItem(StorageKeys.IsLoggedIn) === 'true';

  return isLoggedIn ? <Navigate to={ModulesRoutes.HomePage} /> : <>{children}</>;
}
