import type { FC } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import PrivateRoute from "./router/PrivateRouter";
import PublicRoute from "./router/PublicRoute";

import LoginPage from "./pages/Login/LoginPage";
import HomePage from "./pages/Home/HomePage";
import CarritoPage from "./pages/Carrito/CarritoPage";

import { ModulesRoutes } from "./router/modules-routes";

const App: FC = () => {
  return (
    <Routes>
      {/* 🔹 Login solo accesible si NO estás logueado */}
      <Route
        path={ModulesRoutes.Login}
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />

      {/* 🔹 Home solo accesible si estás logueado */}
      <Route
        path={ModulesRoutes.HomePage}
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />

      {/* 🔹 Carrito solo accesible si estás logueado */}
      <Route
        path={ModulesRoutes.CarritoPage}
        element={
          <PrivateRoute>
            <CarritoPage />
          </PrivateRoute>
        }
      />

      {/* 🔹 Ruta por defecto */}
      <Route path="*" element={<Navigate to={ModulesRoutes.Login} />} />
    </Routes>
  );
};

export default App;
