/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        baseBlue: "#1d4ed8",
        baseBlueLight: "#3b82f6",
        baseGrey: "#e4e4e7",
        baseGreyDark: "#71717a",
        baseWhite: "#ffffff",
        baseGreen: "#16a34a",
        baseRed: "#dc2626",
      },
    },
  },
  plugins: [],
};
