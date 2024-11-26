import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import ListPage from "../pages/ListPage";
import Statistics from "../pages/Statistics";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Listpage" element={<ListPage />} />
        <Route path="/statistics" element={<Statistics />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
