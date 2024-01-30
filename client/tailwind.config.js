/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        baseBlue: "#1d4ed8",
        baseBlueLight: "#3b82f6",
        baseGrey: "#a3a3a3",
        baseWhite: "#ffffff",
      },
    },
  },
  plugins: [],
};
