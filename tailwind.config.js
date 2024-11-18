/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", 
    "./src/**/*.{js,ts,jsx,tsx}" // Tailwind가 스타일을 적용할 파일 경로
  ],
  theme: {
    extend: {}, // 사용자 정의 스타일 추가
  },
  plugins: [],
};