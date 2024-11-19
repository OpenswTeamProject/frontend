import React from "react";

const Login: React.FC = () => {
  return (
    <div
      className="flex items-center justify-center w-screen h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/LoginBack.png')", // 이미지 경로를 확인하세요
      }}
    >
      <div className="bg-gray-800 bg-opacity-80 p-8 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold text-white text-center mb-6">로그인</h1>
        <form className="space-y-4">
          <div>
            <label htmlFor="username" className="sr-only">
            
            </label>
            <input
              type="text"
              id="username"
              placeholder="아이디"
              className="w-full px-4 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
            
            </label>
            <input
              type="password"
              id="password"
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