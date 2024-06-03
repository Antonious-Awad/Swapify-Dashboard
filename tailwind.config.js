import { colors as systemColors } from './src/styles/colors'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,ts,tsx}'],
  theme: {
    extend: {
      colors: systemColors,
      fontSize: {
        h1SemiBold: '2rem',
        h2Regular: '1.5rem',
      },
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif'],
      },
      gap: {
        '3xs': '0.625rem',
        '9xs': '0.25rem',
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
}
