import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { ModulesRoutes } from "./modules-routes";

interface PublicRouteProps {
  children: ReactNode;
}

export default function PublicRoute({ children }: PublicRouteProps) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return !isLoggedIn ? <>{children}</> : <Navigate to={ModulesRoutes.HomePage} />;
}
