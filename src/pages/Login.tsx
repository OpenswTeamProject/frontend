import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>(""); // 아이디 상태
  const [password, setPassword] = useState<string>(""); // 비밀번호 상태
  const [error, setError] = useState<string | null>(null); // 에러 메시지
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault(); // 기본 폼 제출 동작 방지
    if (username === "admin" && password === "password123") {
      navigate("/Listpage"); // 로그인 성공 시 ListPage로 이동
    } else {
      setError("아이디 또는 비밀번호가 잘못되었습니다."); // 로그인 실패 시 에러 메시지 설정
    }
  };

  return (
    <div className="flex items-center justify-between h-screen bg-white">
      {/* Left Side - Form Section */}
      <div className="w-full max-w-md px-8 py-16 bg-white rounded-lg m-auto md:m-0 md:ml-6">
        <h4 className="mb-4 text-3xl font-bold text-navy-700">Sign In</h4>
        <p className="mb-8 text-base text-gray-500">서울시 공공자전거 수요 예측 서비스</p>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>} {/* 에러 메시지 */}

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div>
            <label htmlFor="username" className="sr-only">
              아이디
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="아이디"
              className="w-full px-4 py-2 border border-gray-300 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호"
              className="w-full px-4 py-2 border border-gray-300 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            로그인
          </button>
        </form>
      </div>

      <div
        className="hidden md:block h-full w-3/4 bg-cover bg-center"
        style={{ backgroundImage: "url('/background.jpg')" }}
      ></div>
    </div>
  );
};

export default Login;