/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1A3C6E',
          50: '#E8F0FF',
          100: '#D1E1FF',
          200: '#A3C3FF',
          300: '#75A5FF',
          400: '#4787FF',
          500: '#1969FF',
          600: '#1A3C6E',
          700: '#142F57',
          800: '#0E2240',
          900: '#081529'
        },
        secondary: {
          DEFAULT: '#4D9DE0',
          50: '#F0F8FF',
          100: '#E1F1FF',
          200: '#C3E3FF',
          300: '#A5D5FF',
          400: '#87C7FF',
          500: '#4D9DE0',
          600: '#3E7EB3',
          700: '#2F5E86',
          800: '#203F59',
          900: '#101F2C'
        },
        accent: {
          DEFAULT: '#FF7D00',
          50: '#FFF4E6',
          100: '#FFE9CC',
          200: '#FFD399',
          300: '#FFBD66',
          400: '#FFA733',
          500: '#FF7D00',
          600: '#CC6400',
          700: '#994B00',
          800: '#663200',
          900: '#331900'
        },
        lightBg: '#F2F2F2',
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827'
        }
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Open Sans', 'sans-serif'],
      },
      fontSize: {
        // Mobile-first typography
        'h1-desktop': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.025em' }],
        'h1-mobile': ['2rem', { lineHeight: '1.2', letterSpacing: '-0.025em' }],
        'h2-desktop': ['2rem', { lineHeight: '1.3', letterSpacing: '-0.025em' }],
        'h2-mobile': ['1.5rem', { lineHeight: '1.3', letterSpacing: '-0.025em' }],
        'h3-desktop': ['1.5rem', { lineHeight: '1.4', letterSpacing: '-0.025em' }],
        'h3-mobile': ['1.25rem', { lineHeight: '1.4', letterSpacing: '-0.025em' }],
        'h4-desktop': ['1.25rem', { lineHeight: '1.5' }],
        'h4-mobile': ['1.125rem', { lineHeight: '1.5' }],
        'body-desktop': ['1rem', { lineHeight: '1.6' }],
        'body-mobile': ['1rem', { lineHeight: '1.6' }],
        'small-desktop': ['0.875rem', { lineHeight: '1.5' }],
        'small-mobile': ['0.875rem', { lineHeight: '1.5' }],
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'floating': '0 8px 16px rgba(0, 0, 0, 0.1)',
        'dropdown': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'focus': '0 0 0 2px rgba(77, 157, 224, 0.5)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, rgba(26, 60, 110, 0.9) 0%, rgba(26, 60, 110, 0.6) 100%)',
        'gradient-overlay': 'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.5) 100%)',
      },
      lineHeight: {
        'relaxed': '1.6',
        'loose': '1.8',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'focus-ring': 'focusRing 0.2s ease-out',
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
        focusRing: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      zIndex: {
        'dropdown': '100',
        'modal': '200',
        'tooltip': '300',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      // Mobile-first touch targets
      minHeight: {
        'touch': '44px',
        'touch-large': '48px',
      },
      minWidth: {
        'touch': '44px',
        'touch-large': '48px',
      },
      // Mobile-first breakpoints
      screens: {
        'xs': '375px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [
    // Plugin for accessibility and mobile improvements
    function({ addUtilities, theme }) {
      const newUtilities = {
        '.focus-ring': {
          '&:focus': {
            outline: '2px solid',
            outlineColor: theme('colors.secondary.DEFAULT'),
            outlineOffset: '2px',
          },
        },
        '.focus-ring-inset': {
          '&:focus': {
            outline: '2px solid',
            outlineColor: theme('colors.secondary.DEFAULT'),
            outlineOffset: '-2px',
          },
        },
        '.touch-target': {
          minHeight: theme('minHeight.touch'),
          minWidth: theme('minWidth.touch'),
        },
        '.touch-target-large': {
          minHeight: theme('minHeight.touch-large'),
          minWidth: theme('minWidth.touch-large'),
        },
        '.high-contrast': {
          filter: 'contrast(150%)',
        },
        '.reduced-motion': {
          '@media (prefers-reduced-motion: reduce)': {
            animation: 'none !important',
            transition: 'none !important',
          },
        },
        // Mobile-first utilities
        '.mobile-container': {
          paddingLeft: '1rem',
          paddingRight: '1rem',
          '@media (min-width: 640px)': {
            paddingLeft: '1.5rem',
            paddingRight: '1.5rem',
          },
        },
        '.mobile-touch-target': {
          minHeight: '48px',
          minWidth: '48px',
        },
        '.mobile-safe-area': {
          paddingLeft: 'env(safe-area-inset-left)',
          paddingRight: 'env(safe-area-inset-right)',
          paddingBottom: 'env(safe-area-inset-bottom)',
          paddingTop: 'env(safe-area-inset-top)',
        },
      };
      addUtilities(newUtilities);
    },
  ],
};