/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      height:{
        'header':'64px',
      },
      minHeight:{
        'content':'calc(100vh - 64px)'
      }
    },
  },
  plugins: [],
}
