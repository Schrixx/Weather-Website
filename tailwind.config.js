/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#131214",
        surface: "#1D1C1F",
        primary: "#35415e",
        primaryHover: "#4C5B80",
        secondary: "#0f5c6e",
        surfaceOutline: "#2E2D31",
        surfaceText: "#DDDAE5",
        infoText: "#FCA311",
        surfaceTextDark: "#86848A",
        panel: "rgba(74, 76, 77, 0.7)",
      },
      screens: {
        'xs': '400px',
        'menuWidth': '450px',
        'forecast': '731px',
        'forecastSm': '353px',
        'menuHeightSm': { 'raw': '(min-height: 665px)' },
        'menuHeightMd': { 'raw': '(min-height: 836px)' },
        'menuHeightLg': { 'raw': '(min-height: 950px)' },
      },
    },
  },
  plugins: [],
}

