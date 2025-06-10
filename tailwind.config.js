/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#007BFF',
          600: '#0056b3',
          700: '#004085',
        },
        medical: {
          blue: '#007BFF',
          light: '#f8f9fa',
          gray: '#6c757d',
        }
      },
      fontFamily: {
        sans: ['Roboto', 'Open Sans', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}