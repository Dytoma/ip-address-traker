/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        veryDarkGray: 'hsl(0, 0%, 17%)',
        darkGray: 'hsl(0, 0%, 59%)'
      },
      backgroundImage: {
        'hero-banner': "url('/src/assets/images/pattern-bg-desktop.png')",
        'hero-banner-mobile': "url('/src/assets/images/pattern-bg-mobile.png')"
      },
      fontFamily: {
        rubik: ['Rubik', 'sans-serif']
      }
    },
  },
  plugins: [],
}