import type { FC } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import PrivateRoute from "./router/PrivateRouter";
import PublicRoute from "./router/PublicRoute";

import LoginPage from "./app/pages/Login/LoginPage";
import HomePage from "./app/pages/Home/HomePage";
import CarritoPage from "./app/pages/Carrito/CarritoPage";

import { ModulesRoutes } from "./router/appRoutes";

const App: FC = () => {
  return (
    <Routes>
      <Route
        path={ModulesRoutes.Login}
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path={ModulesRoutes.HomePage}
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />
      <Route
        path={ModulesRoutes.CarritoPage}
        element={
          <PrivateRoute>
            <CarritoPage />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to={ModulesRoutes.Login} />} />
    </Routes>
  );
};

export default App;

