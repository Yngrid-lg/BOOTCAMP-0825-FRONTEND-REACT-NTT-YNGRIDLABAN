import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { ModulesRoutes } from "./modules-routes";

interface PrivateRouteProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return isLoggedIn ? <>{children}</> : <Navigate to={ModulesRoutes.Login} />;
}
