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
    <div
      className="flex items-center justify-center w-screen h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/LoginBack.png')", // 이미지 경로를 확인하세요
      }}
    >
      <div className="bg-gray-800 bg-opacity-80 p-8 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold text-white text-center mb-6">로그인</h1>
        <form className="space-y-4" onSubmit={handleLogin}>
          {error && <p className="text-red-500 text-sm">{error}</p>} {/* 에러 메시지 */}
          <div>
            <label htmlFor="username" className="sr-only">
              아이디
            </label>
            <input
              type="text"
              id="username"
              value={username} // 상태와 연결
              onChange={(e) => setUsername(e.target.value)} // 상태 업데이트
              placeholder="아이디"
              className="w-full px-4 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              value={password} // 상태와 연결
              onChange={(e) => setPassword(e.target.value)} // 상태 업데이트
              placeholder="비밀번호"
              className="w-full px-4 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;