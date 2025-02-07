/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        koulen: ['Koulen', 'serif'],
        moul_regular: ['Moul', 'serif'],
      
      },
    },
  },
  plugins: [],
}