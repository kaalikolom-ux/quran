/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--bg-main)',
        card: 'var(--bg-card)',
        cardHover: 'var(--bg-card-hover)',
        border: 'var(--border-color)',
        primary: {
          DEFAULT: '#10b981',
          hover: '#059669',
          light: '#34d399',
          dark: '#047857'
        },
        gold: {
          DEFAULT: '#eab308',
          light: '#fde047',
          dark: '#ca8a04'
        }
      },
      fontFamily: {
        sans: ['"Noto Sans Bengali"', 'SolaimanLipi', 'Kalpurush', 'sans-serif'],
        arabic: ['Amiri', '"Scheherazade New"', 'serif'],
        kaushan: ['"Kaushan Script"', 'cursive'],
      },
      animation: {
        'star-fly-1': 'starFly1 3s ease-in-out infinite',
        'star-fly-2': 'starFly2 3.5s ease-in-out infinite',
        'star-fly-3': 'starFly3 4s ease-in-out infinite',
        'star-fly-4': 'starFly4 4.5s ease-in-out infinite',
      },
      keyframes: {
        starFly1: {
          '0%, 100%': { transform: 'translate(0, 0) scale(0.8)', opacity: '0.4' },
          '50%': { transform: 'translate(6px, -8px) scale(1.2)', opacity: '1' },
        },
        starFly2: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)', opacity: '0.6' },
          '50%': { transform: 'translate(-8px, -6px) scale(1.3)', opacity: '1' },
        },
        starFly3: {
          '0%, 100%': { transform: 'translate(0, 0) scale(0.9)', opacity: '0.5' },
          '50%': { transform: 'translate(8px, 6px) scale(1.1)', opacity: '0.9' },
        },
        starFly4: {
          '0%, 100%': { transform: 'translate(0, 0) scale(0.7)', opacity: '0.3' },
          '50%': { transform: 'translate(-6px, 8px) scale(1.2)', opacity: '1' },
        },
      }
    },
  },
  plugins: [],
}
