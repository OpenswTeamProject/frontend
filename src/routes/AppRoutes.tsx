import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import ListPage from "../pages/ListPage";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Listpage" element={<ListPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
