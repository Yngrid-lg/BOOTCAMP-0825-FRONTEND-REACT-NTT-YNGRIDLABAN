import type { FC } from "react";
import { Route, Routes } from "react-router-dom";
import {ModulesRoutes } from "./router/modules-routes";
import LoginPage from "./pages/Login/LoginPage";
import HomePage from "./pages/Home/HomePage"
import "./index.css";


const App: FC = () => {
  return (
    <Routes>
      <Route path={ModulesRoutes.Login} element={<LoginPage />} />
      <Route path={ModulesRoutes.HomePage} element={<HomePage/>} />

    </Routes>
  )
}

export default App
