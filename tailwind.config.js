/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,tsx,jsx}"],
  theme: {
    extend: {
      animation:{
        'pulse-short': 'pulse 1s ease-in-out 2',
      }
    },
  },
  plugins: [],
}

