import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Listpage from "../pages/Listpage";
import ProtectedRoute from "../components/ProtectedRoute";

const AppRoutes = () => {
  const isAuthenticated = false; // 로그인 상태 확인 (예제)

  return (
    <Router>
      <Routes>
        {/* 로그인 페이지 */}
        <Route path="/" element={<Login />} />

        {/* 인증된 사용자만 접근 가능 */}
        <Route
          path="/list"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Listpage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
