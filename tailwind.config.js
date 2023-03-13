/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        loading: 'loading 0.8s linear infinite',
        'dot-flashing': 'dot-flashing 1s infinite linear alternate',
      },
      colors: {
        'rb-red-inactive': '#db0840',
        'rb-red-active': '#f30b47',
      },
      keyframes: {
        loading: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'dot-flashing': {
          '0%': { 'background-color': '#E2E3E5' },
          '50%': { 'background-color': 'white' },
          '100%': { 'background-color': '#E2E3E5' },
        },

      },
    },
  },
  plugins: [],
}
