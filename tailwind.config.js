/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        primary: '#1A3C6E',
        secondary: '#4D9DE0',
        accent: '#FF7D00',
        lightBg: '#F2F2F2'
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Open Sans', 'sans-serif'],
      },
      fontSize: {
        'h1-desktop': '2.5rem',    // 40px
        'h1-mobile': '2.25rem',    // 36px (увеличено с 32px)
        'h2-desktop': '2rem',      // 32px
        'h2-mobile': '1.75rem',    // 28px (увеличено с 24px)
        'h3-desktop': '1.5rem',    // 24px
        'h3-mobile': '1.375rem',   // 22px (увеличено с 20px)
        'h4-desktop': '1.25rem',   // 20px
        'h4-mobile': '1.125rem',   // 18px
        'body-desktop': '1rem',    // 16px
        'body-mobile': '1rem',     // 16px (увеличено с 14px)
        'small-desktop': '0.875rem', // 14px
        'small-mobile': '0.875rem',  // 14px
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'floating': '0 8px 16px rgba(0, 0, 0, 0.1)',
        'dropdown': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, rgba(26, 60, 110, 0.9) 0%, rgba(26, 60, 110, 0.6) 100%)',
        'gradient-overlay': 'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.5) 100%)',
      },
      lineHeight: {
        'relaxed': '1.4',
        'loose': '1.6',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      zIndex: {
        'dropdown': '100',
        'modal': '200',
        'tooltip': '300',
      },
    },
  },
  plugins: [],
};