import type { FC } from "react";
import { Route, Routes } from "react-router-dom";
import {ModulesRoutes } from "./router/modules-routes";
import LoginPage from "./pages/LoginPage";
import "./index.css";


const App: FC = () => {
  return (
    <Routes>
      <Route path={ModulesRoutes.Login} element={<LoginPage />} />

    </Routes>
  )
}

export default App
