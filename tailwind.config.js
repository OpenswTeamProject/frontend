module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        login: "url('/LoginBack.png')", 
        list: "url('/ListBack.png')"
      },
      fontSize: {
        sm: "0.85rem",
        base: "0.95rem",
        lg: "1.125rem",
        xl: "1.25rem",
      },
      spacing: {
        1: "0.25rem",
        2: "0.5rem",
        4: "1rem",
        6: "1.5rem",
      },
    },
  },
  plugins: [],
};