import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Alerte from "./pages/Dashboard";
import Erreur from "./utils/Erreur";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/alerte" element={<Alerte />} />
      <Route path="*" element={<Erreur />} />
    </Routes>
  );
}

export default AppRoutes;