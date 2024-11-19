module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        login: "url('/LoginBack.png')", // Tailwind에서 직접 배경 이미지 설정
      },
    },
  },
  plugins: [],
};
