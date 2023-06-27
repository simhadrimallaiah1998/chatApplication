/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        light: "#e2f3f5",
        teal: "#22d1ee",
        dark: "#0e153a",
        blue: {
          DEFAULT: "#f00",
        },
      },
    },
  },
  plugins: [],
};
