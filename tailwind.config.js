/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: "#007BFF",
        secondary: "#222222",
      },
      screens: {
        'xs': '320px',
    
      },
    },
  },
  plugins: [],
}

