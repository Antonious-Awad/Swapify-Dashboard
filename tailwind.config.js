import { colors as systemColors } from './src/styles/colors'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,ts,tsx}'],
  theme: {
    extend: {
      colors: systemColors,
      fontSize: {
        h1SemiBold: '2rem',
      },
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif'],
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
}
