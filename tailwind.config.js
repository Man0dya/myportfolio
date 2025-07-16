/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        textStroke: {
          '0%': {
            fill: 'rgba(196,181,253,0)', // violet-300 transparent
            stroke: 'rgba(167,139,250,1)', // violet-400
            strokeDasharray: '0 50%',
            strokeWidth: '2',
          },
          '60%': {
            fill: 'rgba(196,181,253,0.2)',
            stroke: 'rgba(167,139,250,0.8)',
            strokeWidth: '2.5',
          },
          '100%': {
            fill: 'rgba(221,214,254,1)', // purple-200
            stroke: 'rgba(167,139,250,0)',
            strokeDasharray: '50% 0',
          },
        },
      },
      animation: {
        'text-stroke': 'textStroke 4s infinite alternate',
      },
    },
  },
  plugins: [],
}
