import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          50:  '#fefdf7',
          100: '#fdf8e8',
          200: '#faefc8',
          300: '#f5de8f',
          400: '#ecc94b',
          500: '#d4a017',
          600: '#b8860b',
          700: '#926b09',
          800: '#6d5007',
          900: '#4a3605',
        },
        cream: {
          100: '#fdfaf3',
          200: '#f8f1e0',
          300: '#f0e4c3',
        },
        jewel: {
          dark:  '#1a1208',
          light: '#f9f3e8',
        },
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans:  ['Jost', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in':   'fadeIn 0.5s ease-in-out',
        'slide-up':  'slideUp 0.5s ease-out',
        'shimmer':   'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn:  { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { transform: 'translateY(20px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
      },
    },
  },
  plugins: [],
};
export default config;
