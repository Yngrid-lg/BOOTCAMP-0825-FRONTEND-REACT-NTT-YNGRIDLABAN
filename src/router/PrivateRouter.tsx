import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useLocalStorage } from '../components/shared/hooks/useLocalStorage';
import { ModulesRoutes } from './modules-routes';
import { StorageKeys } from '../components/shared/constants/StorageKey';

interface PrivateRouteProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const [isLoggedIn] = useLocalStorage<boolean>(StorageKeys.IsLoggedIn, false);

  if (!isLoggedIn) {
    return <Navigate to={ModulesRoutes.Login} replace />;
  }

  return <>{children}</>;
}
