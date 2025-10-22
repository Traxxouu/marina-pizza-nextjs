import { fontFamily } from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './app/**/*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx,js,jsx}',
    './lib/**/*.{ts,tsx,js,jsx}',
    './sanity/**/*.{ts,tsx,js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff5f5',
          100: '#fee2e2',
          300: '#fca5a5',
          500: '#dc2626',
          700: '#b91c1c',
        },
        accent: {
          50: '#fffaf0',
          100: '#fff6e6',
          300: '#ffd7a6',
          500: '#ffb84d'
        }
      },
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
        display: ['Poppins', ...fontFamily.sans]
      },
      boxShadow: {
        card: '0 6px 18px rgba(16,24,40,0.08)'
      }
    }
  },
  plugins: []
};

export default config;
