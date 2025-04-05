// filepath: /my-app-frontend/tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      borderImage: {
        gradient: 'linear-gradient(360deg, #7204FF -43.75%, #6B8BFA 100%)',
      },
      fontFamily: {
        "dm-sans": ["DM Sans", "sans-serif"],
      },
      animation: {
        'spin-slow': 'spin-slow 15s linear infinite',
      },
      keyframes: {
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      },
    },
  },
  plugins: [],
}