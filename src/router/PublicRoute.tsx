import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { ModulesRoutes } from './modules-routes';

interface PublicRouteProps {
  children: ReactNode;
}

export default function PublicRoute({ children }: PublicRouteProps) {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  // ✅ Si ya hay sesión → redirigir al Home
  return isLoggedIn ? <Navigate to={ModulesRoutes.HomePage} /> : <>{children}</>;
}
