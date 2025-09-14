import type { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { ModulesRoutes } from "./router/modules-routes";
import LoginPage from "./pages/Login/LoginPage";
import HomePage from "./pages/Home/HomePage"
import "./index.css";
import CarritoPage from "./pages/Carrito/CarritoPage";


const App: FC = () => {
  return (
    <Routes>
      <Route path={ModulesRoutes.Login} element={<LoginPage />} />
      <Route path={ModulesRoutes.HomePage} element={<HomePage />} />
      <Route path={ModulesRoutes.CarritoPage} element={<CarritoPage />} />

    </Routes>
  )
}

export default App
