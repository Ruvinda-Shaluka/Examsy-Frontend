/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class', // Enables class-based dark mode
  theme: {
    extend: {
      colors: {
        examsy: {
          primary: '#4F46E5',
          bg: '#F8FAFC',
          surface: '#FFFFFF',
          text: '#0F172A',
          muted: '#64748B',
        }
      }
    },
  },
  plugins: [],
}
